import {
    Payment_GetManyTaxesByTaxIdsQuery,
    Payment_GetManyTaxesByTaxIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";

import { UseQueryBaseReturn } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseTaxesProps {
    taxIds: Payment_GetManyTaxesByTaxIdsQueryVariables["tax_ids"] | undefined;
    onSuccess?: (data: Payment_GetManyTaxesByTaxIdsQuery["tax"]) => void;
    enabled?: boolean;
}

function useTaxes({
    taxIds,
    onSuccess,
    enabled = true,
}: UseTaxesProps): UseQueryBaseReturn<Payment_GetManyTaxesByTaxIdsQuery["tax"]> {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferQuery({ entity: "tax", action: "paymentGetManyTaxesByTaxIds" })(
        {
            tax_ids: taxIds,
        },
        {
            enabled: enabled,
            onSuccess: (data) => {
                onSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useTaxes in Payment Order", error);

                showSnackbar(
                    `${t("ra.message.unableToLoadData")} tax - paymentGetManyTaxesByTaxIds`,
                    "error"
                );
            },
        }
    );
}

export default useTaxes;
