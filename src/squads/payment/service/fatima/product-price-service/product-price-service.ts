import {
    Payment_GetProductPriceByProductIdQueryVariables,
    Payment_GetManyProductPricesByProductIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import {
    isInvalidOrEmptyArray,
    isInvalidOrEmptyVariable,
} from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import productPriceQueriesFatima from "src/squads/payment/service/fatima/product-price-service/product-price-fatima.query";

export const productPriceService = defineService({
    query: {
        paymentGetOneProductPriceByProductId: ({
            product_id,
        }: Partial<Payment_GetProductPriceByProductIdQueryVariables>) => {
            if (isInvalidOrEmptyVariable(product_id)) {
                throw new InvalidParamError({
                    action: "paymentGetOneProductPriceByProductId",
                    errors: [{ field: "product_id", fieldValueIfNotSensitive: product_id }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return productPriceQueriesFatima.getOne({
                product_id,
            });
        },

        paymentGetManyProductPricesByProductId: ({
            product_id,
        }: Partial<Payment_GetProductPriceByProductIdQueryVariables>) => {
            if (typeof product_id === "undefined") {
                throw new InvalidParamError({
                    action: "paymentGetManyProductPricesByProductId",
                    errors: [{ field: "product_id", fieldValueIfNotSensitive: product_id }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return productPriceQueriesFatima.getMany({
                product_id,
            });
        },

        paymentGetManyProductsPriceByProductIds: ({
            productIds,
        }: Payment_GetManyProductPricesByProductIdsQueryVariables) => {
            if (isInvalidOrEmptyArray(productIds)) {
                throw new InvalidParamError({
                    action: "paymentGetManyProductsPriceByProductIds",
                    errors: [{ field: "productIds", fieldValueIfNotSensitive: productIds }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return productPriceQueriesFatima.getManyPricesByIds({ productIds });
        },
    },

    mutation: {},
});
