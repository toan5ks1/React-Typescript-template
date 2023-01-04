import { Payment_GetManyPackageCourseMaterialsByPackageIdQueryVariables } from "src/squads/payment/service/fatima/fatima-types";
import { InvalidParamError } from "src/squads/payment/service/service-types";
import { isInvalidOrEmptyVariable } from "src/squads/payment/service/utils/validation";

import { defineService } from "@manabie-com/react-utils";
import packageCourseMaterialFatimaQueries from "src/squads/payment/service/fatima/package-course-material-service/package-course-material-fatima.query";

export const packageCourseMaterialService = defineService({
    query: {
        paymentGetManyPackageCourseMaterialByPackageId: ({
            package_id,
            current_date,
        }: Partial<Payment_GetManyPackageCourseMaterialsByPackageIdQueryVariables>) => {
            if (isInvalidOrEmptyVariable(package_id)) {
                throw new InvalidParamError({
                    action: "paymentGetManyPackageCourseMaterialByPackageId",
                    errors: [{ field: "package_id", fieldValueIfNotSensitive: package_id }],
                    serviceName: "fatimaGraphQL",
                });
            }

            if (isInvalidOrEmptyVariable(current_date)) {
                throw new InvalidParamError({
                    action: "paymentGetManyPackageCourseMaterialByPackageId",
                    errors: [{ field: "current_date", fieldValueIfNotSensitive: current_date }],
                    serviceName: "fatimaGraphQL",
                });
            }

            return packageCourseMaterialFatimaQueries.getManyPackageCourseMaterialByPackageId({
                package_id,
                current_date,
            });
        },
    },
});
