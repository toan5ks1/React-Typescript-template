import {
    Payment_GetTaxByTaxIdV2Query,
    Payment_GetTaxByTaxIdV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { ArrayElement } from "src/squads/payment/types/common/array";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import { Product } from "src/squads/payment/__generated__/fatima/root-types";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseTaxDetailProps {
    taxId: Payment_GetTaxByTaxIdV2QueryVariables["tax_id"] | undefined;
    productId?: Product["product_id"];
    onSuccess?: (data: ArrayElement<Payment_GetTaxByTaxIdV2Query["tax"]>) => void;
}

function useTaxDetail({
    taxId,
    productId,
    onSuccess,
}: UseTaxDetailProps): UseQueryBaseReturn<ArrayElement<Payment_GetTaxByTaxIdV2Query["tax"]>> {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({
        entity: "tax",
        action: "paymentGetOneTaxByTaxId",
    })(
        {
            tax_id: taxId,
            productId,
        },
        {
            enabled: Boolean(taxId),
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useTaxDetail in Payment Order", error);

                showSnackbar(
                    `${t("ra.message.unableToLoadData")} tax - paymentGetOneTaxByTaxId`,
                    "error"
                );
            },
        }
    );
}

export default useTaxDetail;
