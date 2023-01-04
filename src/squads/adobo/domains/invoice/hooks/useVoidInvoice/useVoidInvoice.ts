import { useCallback } from "react";

import { Entities } from "src/common/constants/enum";
import { AppError } from "src/internals/errors";
import { inferMutation } from "src/squads/adobo/domains/invoice/services/infer-service";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import type { UseMutationOptions } from "src/squads/adobo/domains/invoice/services/service-creator";

import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/adobo/domains/invoice/hooks/useShowSnackbar";
import useTranslate from "src/squads/adobo/domains/invoice/hooks/useTranslate";

const useVoidInvoice = (invoiceId: string) => {
    const t = useTranslate();
    const tInvoice = useResourceTranslate(Entities.INVOICE);
    const showSnackbar = useShowSnackbar();

    const { mutate, isLoading } = inferMutation({
        entity: "invoice",
        action: "voidInvoice",
    })({
        onSuccess: () => {
            // TODO: Update snackbar content
            showSnackbar(t("ra.common.updatedSuccess", { name: tInvoice("name") }));
        },
        onError: (e) => {
            // TODO: Update snackbar content
            if (AppError.isAppError(e)) {
                return showSnackbar(t(`${e.message}`), "error");
            }

            showSnackbar(
                `${t("ra.common.updatedFail")}: ${t("ra.manabie-error.unknown")}`,
                "error"
            );
        },
    });

    const voidInvoice = useCallback(
        (
            params: NsInvoiceService.VoidInvoiceRequest,
            options: UseMutationOptions<
                NsInvoiceService.VoidInvoiceRequest,
                NsInvoiceService.VoidInvoiceResponse
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

    return { voidInvoice, isLoading };
};

export default useVoidInvoice;
