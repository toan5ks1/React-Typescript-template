import { Entities } from "src/common/constants/enum";
import {
    InvoiceCurrency,
    CreateInvoiceBillingItemsStatus,
} from "src/squads/adobo/domains/invoice/common/constants/enum";
import { StudentBillingItem } from "src/squads/adobo/domains/invoice/common/types/invoice";
import { inferQueryPagination } from "src/squads/adobo/domains/invoice/services/infer-service";

import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import TableWithCheckboxBillingItems from "src/squads/adobo/domains/invoice/pages/student-invoice/components/TableWithCheckboxBillingItems";

import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";

export interface DialogCreateInvoiceProps
    extends Pick<DialogWithHeaderFooterProps, "open" | "title"> {
    onClose: () => void;
    onSave: () => void;
    onSelect: (value: StudentBillingItem[]) => void;
    selectedBillItems: StudentBillingItem[];
    currency: InvoiceCurrency;
    loading: boolean;
    studentId: string;
}

const DialogCreateInvoice = (props: DialogCreateInvoiceProps) => {
    const tInvoice = useResourceTranslate(Entities.INVOICE);
    const { onClose, onSave, currency, open, studentId, onSelect, selectedBillItems } = props;

    const {
        data: billingItems,
        pagination,
        result: { isFetching },
    } = inferQueryPagination({
        entity: "billItems",
        action: "billItemsGetMany",
    })(
        {
            student_id: studentId,
            billing_statuses: [
                CreateInvoiceBillingItemsStatus.BILLING_STATUS_PENDING,
                CreateInvoiceBillingItemsStatus.BILLING_STATUS_BILLED,
            ],
        },
        {
            enabled: open,
        }
    );

    return (
        // Disable Save if selectedBillItems is empty
        <DialogFullScreenHF
            open={open}
            title={tInvoice("createInvoice.title")}
            footerConfirmButtonProps={{ disabled: selectedBillItems.length === 0 }}
            onClose={onClose}
            onSave={onSave}
            contentSize="medium"
            maxWidth="md"
        >
            {open ? (
                <TableWithCheckboxBillingItems
                    billingItems={billingItems?.data}
                    onSelect={onSelect}
                    selectedBillItems={selectedBillItems}
                    currency={currency}
                    isLoading={isFetching}
                    pagination={pagination}
                />
            ) : null}
        </DialogFullScreenHF>
    );
};

export default DialogCreateInvoice;
