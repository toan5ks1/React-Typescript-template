import {
    Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables,
    Payment_GetManyProductsReferenceQueryVariables,
    Payment_GetManyProductsByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    isInvalidOrEmptyVariable,
    isInvalidOrEmptyArray,
} from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import productQueriesFatima from "src/squads/payment/service/fatima/product-service/product-fatima.query";

export const productService = defineService({
    query: {
        paymentGetManyReferenceProduct: ({
            available_from,
            available_until,
            product_ids,
            name,
        }: Payment_GetManyProductsByProductIdsAndAvailableDateQueryVariables) => {
            if (isInvalidOrEmptyVariable(product_ids)) {
                throw new InvalidParamError({
                    action: "paymentGetManyReferenceProduct",
                    errors: [{ field: "product_ids", fieldValueIfNotSensitive: product_ids }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return productQueriesFatima.getManyByIncludedAndExcludedProductIds({
                available_from,
                available_until,
                product_ids,
                name,
            });
        },

        paymentGetManyReferenceAutocompleteProduct: ({
            limit,
            name,
        }: Payment_GetManyProductsReferenceQueryVariables) => {
            return productQueriesFatima.getManyReference({ limit, name });
        },
        paymentGetManyProductsByProductIds: ({
            productIds,
        }: Payment_GetManyProductsByProductIdsQueryVariables) => {
            if (isInvalidOrEmptyArray(productIds)) {
                throw new InvalidParamError({
                    action: "paymentGetManyProductsByProductIds",
                    errors: [{ field: "productIds", fieldValueIfNotSensitive: productIds }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return productQueriesFatima.getProductByIds({ productIds });
        },
    },
});
