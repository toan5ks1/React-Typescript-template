import { useCallback } from "react";

import { Entities } from "src/common/constants/enum";
import { AppError } from "src/internals/errors";
import { inferMutation } from "src/squads/adobo/domains/invoice/services/infer-service";
import { NsInvoiceService } from "src/squads/adobo/domains/invoice/services/invoicemgmt/invoice-service/types";
import type { UseMutationOptions } from "src/squads/adobo/domains/invoice/services/service-creator";

import useResourceTranslate from "src/squads/adobo/domains/invoice/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/adobo/domains/invoice/hooks/useShowSnackbar";
import useTranslate from "src/squads/adobo/domains/invoice/hooks/useTranslate";

const useGenerateInvoices = () => {
    const t = useTranslate();
    const tInvoice = useResourceTranslate(Entities.INVOICE);
    const showSnackbar = useShowSnackbar();

    const { mutate, isLoading } = inferMutation({
        entity: "invoice",
        action: "CREATE",
    })({
        onSuccess: (res) => {
            if (res.successful) {
                showSnackbar(t("ra.common.createdSuccess", { name: tInvoice("name") }));
            } else {
                const { errorsList } = res;
                if (errorsList.length) {
                    // set console logs for errorsList for now
                    errorsList.forEach((e) => {
                        window.warner?.warn(e.error);
                    });
                    showSnackbar(
                        `${t("ra.common.createdFail")}: ${t("ra.manabie-error.unknown")}`,
                        "error"
                    );
                }
            }
        },
        onError: (e) => {
            if (AppError.isAppError(e)) {
                return showSnackbar(t(`${e.message}`), "error");
            }

            showSnackbar(
                `${t("ra.common.createdFail")}: ${t("ra.manabie-error.unknown")}`,
                "error"
            );
        },
    });

    const generateInvoices = useCallback(
        (
            params: NsInvoiceService.GenerateInvoiceDetail[],
            options: UseMutationOptions<
                NsInvoiceService.GenerateInvoicesRequest,
                NsInvoiceService.GenerateInvoicesResponse
            >
        ) => {
            mutate(
                {
                    invoicesList: params,
                },
                options
            );
        },
        [mutate]
    );

    return { generateInvoices, isLoading };
};

export default useGenerateInvoices;
