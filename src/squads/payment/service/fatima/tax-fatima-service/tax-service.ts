import {
    Payment_GetManyTaxesByTaxIdsQueryVariables,
    Payment_GetManyTaxesReferenceQueryVariables,
    Payment_GetTaxByTaxIdV2QueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    isInvalidOrEmptyArray,
    isInvalidOrEmptyVariable,
} from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import { Product } from "src/squads/payment/__generated__/fatima/root-types";
import taxFatimaQueries from "src/squads/payment/service/fatima/tax-fatima-service/tax-fatima.query";

// this is used to make sure queryKey is unique so useQuery can fetched again
type GetTaxByTaxIdCustomQueryVariables = Record<"productId", Product["product_id"]>;

export const taxService = defineService({
    query: {
        paymentGetOneTaxByTaxId: ({
            tax_id,
        }: Partial<Payment_GetTaxByTaxIdV2QueryVariables & GetTaxByTaxIdCustomQueryVariables>) => {
            if (isInvalidOrEmptyVariable(tax_id)) {
                throw new InvalidParamError({
                    action: "paymentGetOneTaxById",
                    errors: [{ field: "tax_id", fieldValueIfNotSensitive: tax_id }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return taxFatimaQueries.getOne({
                tax_id,
            });
        },
        paymentGetManyTaxesByTaxIds: ({
            tax_ids,
        }: Partial<Payment_GetManyTaxesByTaxIdsQueryVariables>) => {
            if (isInvalidOrEmptyArray(tax_ids)) {
                throw new InvalidParamError({
                    action: "paymentGetManyTaxesByTaxIds",
                    errors: [{ field: "tax_ids", fieldValueIfNotSensitive: tax_ids }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return taxFatimaQueries.getManyTaxesByTaxIds({
                tax_ids,
            });
        },
        paymentGetManyReference: ({ limit }: Payment_GetManyTaxesReferenceQueryVariables) => {
            return taxFatimaQueries.getManyReference({ limit });
        },
    },

    mutation: {},
});
