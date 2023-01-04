import { Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { isInvalidOrEmptyArray } from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import studentProductFatimaQueries from "src/squads/payment/service/fatima/student-product-service/student-product-fatima.query";

export const studentProductService = defineService({
    query: {
        paymentGetManyStudentProductByStudentProductIds: ({
            student_product_ids,
        }: Partial<Payment_GetManyStudentProductsByStudentProductIdsV2QueryVariables>) => {
            if (isInvalidOrEmptyArray(student_product_ids)) {
                throw new InvalidParamError({
                    action: "paymentGetManyStudentProductByStudentProductIds",
                    errors: [
                        {
                            field: "student_product_ids",
                            fieldValueIfNotSensitive: student_product_ids,
                        },
                    ],
                    serviceName: "fatimaGraphQL",
                });
            }

            return studentProductFatimaQueries.getManyStudentProductByStudentProductIds({
                student_product_ids,
            });
        },
    },
});
