import { Payment_GetManyPackageCourseFeesByPackageIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { isInvalidOrEmptyVariable } from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import packageCourseFeeFatimaQueries from "src/squads/payment/service/fatima/package-course-fee-service/package-course-fee-fatima.query";

export const packageCourseFeeService = defineService({
    query: {
        paymentGetManyPackageCourseFeesByPackageId: ({
            package_id,
            current_date,
        }: Partial<Payment_GetManyPackageCourseFeesByPackageIdQueryVariables>) => {
            if (isInvalidOrEmptyVariable(package_id)) {
                throw new InvalidParamError({
                    action: "paymentGetManyPackageCourseFeesByPackageId",
                    errors: [{ field: "package_id", fieldValueIfNotSensitive: package_id }],
                    serviceName: "fatimaGraphQL",
                });
            }

            if (isInvalidOrEmptyVariable(current_date)) {
                throw new InvalidParamError({
                    action: "paymentGetManyPackageCourseFeesByPackageId",
                    errors: [{ field: "current_date", fieldValueIfNotSensitive: current_date }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return packageCourseFeeFatimaQueries.getManyPackageCourseFeesByPackageId({
                package_id,
                current_date,
            });
        },
    },
});
