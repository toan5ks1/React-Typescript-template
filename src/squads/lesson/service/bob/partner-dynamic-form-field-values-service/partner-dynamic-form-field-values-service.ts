import { arrayHasItem } from "src/common/utils/other";
import { PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { defineService } from "src/squads/lesson/service/service-creator";
import { InvalidParamError } from "src/squads/lesson/service/service-types";
import { getInvalidParamErrorsOfNonSensitiveStringVariables } from "src/squads/lesson/service/utils/validation";

import partnerDynamicFormFieldValuesQueriesBob from "src/squads/lesson/service/bob/partner-dynamic-form-field-values-service/partner-dynamic-form-field-values-bob.query";

export const partnerDynamicFormFieldValuesService = defineService({
    query: {
        partnerDynamicFormFieldValuesGetOneByLessonReportDetailsIdAndStudentId: (
            variables: PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQueryVariables
        ) => {
            const errors = getInvalidParamErrorsOfNonSensitiveStringVariables(variables);

            if (arrayHasItem(errors)) {
                throw new InvalidParamError({
                    action: "partnerDynamicFormFieldValuesGetOneByLessonReportDetailsIdAndStudentId",
                    serviceName: "bobGraphQL",
                    errors,
                });
            }

            return partnerDynamicFormFieldValuesQueriesBob.getOneByLessonReportDetailsIdAndStudentId(
                variables
            );
        },
    },
});
