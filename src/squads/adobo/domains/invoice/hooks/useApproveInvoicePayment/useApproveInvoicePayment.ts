import { useCallback } from "react";

import { Entities } from "src/common/constants/enum";
import { AppError } from "src/internals/errors";
import { inferMutation } from "src/squads/adobo/domains/invoice/services/infer-service";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import type { UseMutationOptions } from "src/squads/adobo/domains/invoice/services/service-creator";

import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/adobo/domains/invoice/hooks/useShowSnackbar";
import useTranslate from "src/squads/adobo/domains/invoice/hooks/useTranslate";

const useApproveInvoicePayment = (invoiceId: string) => {
    const t = useTranslate();
    const tInvoice = useResourceTranslate(Entities.INVOICE);
    const showSnackbar = useShowSnackbar();

    const { mutate, isLoading } = inferMutation({
        entity: "invoice",
        action: "approveInvoicePayment",
    })({
        onSuccess: () => {
            showSnackbar(tInvoice("messages.approveInvoicePayment.success"));
        },
        onError: (e) => {
            if (AppError.isAppError(e)) {
                return showSnackbar(t(`${e.message}`), "error");
            }

            showSnackbar(tInvoice("messages.approveInvoicePayment.failed"), "error");
        },
    });

    const approveInvoicePayment = useCallback(
        (
            params: NsInvoiceService.ApproveInvoicePaymentRequest,
            options: UseMutationOptions<
                NsInvoiceService.ApproveInvoicePaymentRequest,
                NsInvoiceService.ApproveInvoicePaymentResponse
            >
        ) => {
            mutate(
                {
                    ...params,
                    invoiceId,
                },
                options
            );
        },
        [invoiceId, mutate]
    );

    return { approveInvoicePayment, isLoading };
};

export default useApproveInvoicePayment;
