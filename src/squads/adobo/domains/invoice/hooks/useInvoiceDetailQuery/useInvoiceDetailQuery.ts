import { useCallback } from "react";

import { ArrayElement } from "src/common/constants/types";
import { inferQuery } from "src/squads/adobo/domains/invoice/services/infer-service";
import {
    Invoice_ActionLogQuery,
    Invoice_BillItemManyQuery,
    Invoice_InvoiceOneQuery,
    Invoice_InvoiceOneQueryVariables,
    Invoice_PaymentHistoryQuery,
} from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoicemgmt-types";
import { DataWithTotal } from "src/squads/adobo/domains/invoice/services/service-creator";

import { arrayHasItem } from "@manabie-com/mana-utils";

export interface InvoiceDetailProps {
    invoiceId: Invoice_InvoiceOneQueryVariables["invoice_id"] | undefined;
}

export interface InvoiceDetailReturn {
    refetch: () => void;
    invoice?: ArrayElement<Invoice_InvoiceOneQuery["invoice"]>;
    paymentHistory?: DataWithTotal<Invoice_PaymentHistoryQuery["payment"] | undefined>;
    billItems?: Invoice_BillItemManyQuery["bill_item"];
    actionLogs?: DataWithTotal<Invoice_ActionLogQuery["invoice_action_log"] | undefined>;
    isFetching?: boolean;
}

const useInvoiceDetailQuery = ({ invoiceId }: InvoiceDetailProps): InvoiceDetailReturn => {
    const {
        data: invoice,
        isFetching: isGetInvoiceFetching,
        refetch: refetchInvoice,
    } = inferQuery({
        entity: "invoice",
        action: "invoiceGetOne",
    })(
        {
            invoice_id: invoiceId,
        },
        {
            enabled: Boolean(invoiceId),
            onError: (error) => {
                window.warner?.error("useInvoiceDetailInfo", error);
            },
        }
    );

    const {
        data: paymentHistory,
        isFetching: isPaymentHistoryFetching,
        refetch: refetchPaymentHistory,
    } = inferQuery({
        entity: "paymentHistory",
        action: "paymentHistoryMany",
    })(
        {
            invoice_id: invoiceId,
        },
        {
            enabled: Boolean(invoiceId),
            onError: (error) => {
                window.warner?.error("usePaymentHistory", error);
            },
        }
    );

    const { data: billItemsIds, isFetching: isFetchingBillItems } = inferQuery({
        entity: "invoiceBillItems",
        action: "invoiceBillItemsGetMany",
    })(
        {
            invoice_id: invoiceId || "",
        },
        {
            enabled: Boolean(invoiceId),
            onError: (error) => {
                window.warner?.error("useInvoiceBillItems", error);
            },
        }
    );

    const billItemsSequenceNumbers =
        billItemsIds?.data?.map((billItem) => billItem.bill_item_sequence_number) || [];

    const { data: billItems } = inferQuery({
        entity: "invoiceBillItems",
        action: "billItemGetMany",
    })(
        {
            bill_item_sequence_number: billItemsSequenceNumbers,
        },
        {
            enabled: arrayHasItem(billItemsSequenceNumbers),
            onError: (error) => {
                window.warner?.error("billItems", error);
            },
        }
    );

    const {
        data: actionLogs,
        isFetching: isInvoiceActionLogFetching,
        refetch: refetchActionLogs,
    } = inferQuery({
        entity: "invoiceActionLog",
        action: "invoiceActionLogMany",
    })(
        {
            invoice_id: invoiceId,
        },
        {
            enabled: Boolean(invoiceId),
            onError: (error) => {
                window.warner?.error("useInvoiceActionLog", error);
            },
        }
    );

    const isFetching =
        isGetInvoiceFetching ||
        isPaymentHistoryFetching ||
        isFetchingBillItems ||
        isInvoiceActionLogFetching;

    const refetch = useCallback(
        () => Promise.all([refetchInvoice(), refetchPaymentHistory(), refetchActionLogs()]),
        [refetchActionLogs, refetchInvoice, refetchPaymentHistory]
    );

    return {
        refetch,
        invoice,
        paymentHistory,
        billItems,
        actionLogs,
        isFetching,
    };
};

export default useInvoiceDetailQuery;
