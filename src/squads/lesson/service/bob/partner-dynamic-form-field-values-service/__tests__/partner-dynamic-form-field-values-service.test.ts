import { PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { partnerDynamicFormFieldValuesService } from "src/squads/lesson/service/bob/partner-dynamic-form-field-values-service/partner-dynamic-form-field-values-service";
import { mockPreviousLessonReportLessonReport } from "src/squads/lesson/test-utils/lesson-report";

import partnerDynamicFormFieldValuesQueriesBob from "src/squads/lesson/service/bob/partner-dynamic-form-field-values-service/partner-dynamic-form-field-values-bob.query";

jest.mock(
    "src/squads/lesson/service/bob/partner-dynamic-form-field-values-service/partner-dynamic-form-field-values-bob.query",
    () => ({
        __esModule: true,
        default: {
            getOneByLessonReportDetailsIdAndStudentId: jest.fn(),
        },
    })
);

describe("partner-dynamic-form-field-values-service", () => {
    beforeEach(() => {
        (
            partnerDynamicFormFieldValuesQueriesBob.getOneByLessonReportDetailsIdAndStudentId as jest.Mock
        ).mockResolvedValue(mockPreviousLessonReportLessonReport);
    });

    it("should query getOneByLessonReportDetailsIdAndStudentId", async () => {
        const variables: PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQueryVariables =
            {
                user_id: "user id",
                report_id: "report id",
            };

        const response =
            await partnerDynamicFormFieldValuesService.query.partnerDynamicFormFieldValuesGetOneByLessonReportDetailsIdAndStudentId(
                variables
            );
        expect(
            partnerDynamicFormFieldValuesQueriesBob.getOneByLessonReportDetailsIdAndStudentId
        ).toBeCalledWith(variables);
        expect(response).toEqual(mockPreviousLessonReportLessonReport);
    });

    it("should not query getOneByLessonReportDetailsIdAndStudentId with invalid parameters", async () => {
        const invalidVariables: PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQueryVariables =
            {
                user_id: "",
                report_id: "",
            };

        await expect(async () => {
            await partnerDynamicFormFieldValuesService.query.partnerDynamicFormFieldValuesGetOneByLessonReportDetailsIdAndStudentId(
                invalidVariables
            );
        }).rejects.toMatchObject({
            action: "partnerDynamicFormFieldValuesGetOneByLessonReportDetailsIdAndStudentId",
            serviceName: "bobGraphQL",
            errors: [{ field: "user_id" }, { field: "report_id" }],
            name: "InvalidParamError",
        });

        expect(
            partnerDynamicFormFieldValuesQueriesBob.getOneByLessonReportDetailsIdAndStudentId
        ).not.toBeCalled();
    });
});
