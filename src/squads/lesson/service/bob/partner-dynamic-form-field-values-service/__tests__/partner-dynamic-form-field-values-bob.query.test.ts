import graphqlClient from "src/squads/lesson/internals/hasura-client";
import reactiveStorage from "src/squads/lesson/internals/reactive-storage";
import { PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { mockPreviousLessonReportLessonReport } from "src/squads/lesson/test-utils/lesson-report";
import { getFakeLocalUser } from "src/squads/lesson/test-utils/mocks/user";

import partnerDynamicFormFieldValuesQueriesBob from "src/squads/lesson/service/bob/partner-dynamic-form-field-values-service/partner-dynamic-form-field-values-bob.query";

jest.mock("@manabie-com/graphql-client", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { request: jest.fn() };
        }),
    };
});

const user = getFakeLocalUser();

describe("partner-dynamic-form-field-values-bob.query", () => {
    it("should query getOneByLessonReportDetailsIdAndStudentId", async () => {
        reactiveStorage.set("PROFILE", user);
        const variables: PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQueryVariables =
            {
                user_id: "user id",
                report_id: "report id",
            };

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                get_partner_dynamic_form_field_values_by_student:
                    mockPreviousLessonReportLessonReport,
            },
        });
        const _callSpy = jest.spyOn(partnerDynamicFormFieldValuesQueriesBob, "_call");
        const result =
            await partnerDynamicFormFieldValuesQueriesBob.getOneByLessonReportDetailsIdAndStudentId(
                variables
            );
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockPreviousLessonReportLessonReport);
    });
});
