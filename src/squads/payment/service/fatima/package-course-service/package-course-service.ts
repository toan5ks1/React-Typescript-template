import { Payment_GetManyPackageCourseByPackageIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { isInvalidOrEmptyVariable } from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import packageCourseQueriesFatima from "src/squads/payment/service/fatima/package-course-service/package-course-fatima.query";

export const packageCourseService = defineService({
    query: {
        paymentGetManyPackageCourseByPackageId: ({
            package_id,
        }: Partial<Payment_GetManyPackageCourseByPackageIdQueryVariables>) => {
            if (isInvalidOrEmptyVariable(package_id)) {
                throw new InvalidParamError({
                    action: "paymentGetManyPackageCourseByPackageId",
                    errors: [{ field: "package_id", fieldValueIfNotSensitive: package_id }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return packageCourseQueriesFatima.getManyPackageCourseByPackageId({
                package_id,
            });
        },
    },

    mutation: {},
});
