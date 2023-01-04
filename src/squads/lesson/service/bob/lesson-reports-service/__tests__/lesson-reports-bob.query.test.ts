import graphqlClient from "src/squads/lesson/internals/hasura-client";
import reactiveStorage from "src/squads/lesson/internals/reactive-storage";
import {
    LessonReportByLessonIdQueryVariables,
    Lesson_LessonReportListByLessonIdsQueryVariables,
    PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { createMockPreviousLessonReportLessonReport } from "src/squads/lesson/test-utils/lesson-management";
import { getFakeLocalUser } from "src/squads/lesson/test-utils/mocks/user";

import { lessonReports } from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";
import lessonReportsQueriesBob from "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-bob.query";

jest.mock("@manabie-com/graphql-client", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { request: jest.fn() };
        }),
    };
});

const user = getFakeLocalUser();
const mockLessonReportData = lessonReports[0];
const mockPreviousLessonReportLessonReport = createMockPreviousLessonReportLessonReport();

describe("lesson-reports-bob.query", () => {
    it("getOne method", async () => {
        const variables: LessonReportByLessonIdQueryVariables = {
            lesson_id: "Lesson ID 1",
        };
        reactiveStorage.set("PROFILE", user);

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                lesson_reports: lessonReports,
            },
        });

        const _callSpy = jest.spyOn(lessonReportsQueriesBob, "_call");
        const result = await lessonReportsQueriesBob.getOne(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockLessonReportData);
    });

    it("lessonGetLessonReportListByLessonIds query", async () => {
        const variables: Lesson_LessonReportListByLessonIdsQueryVariables = {
            lesson_ids: ["Lesson ID 1"],
        };

        const mockLessonReportByLessonId = [
            {
                report_submitting_status: "LESSON_REPORT_SUBMITTING_STATUS_SAVED",
                lesson_report_id: "Lesson report ID 1",
                lesson_id: "Lesson ID 1",
            },
        ];

        const _callSpy = jest.spyOn(lessonReportsQueriesBob, "_call");
        _callSpy.mockResolvedValue({
            data: {
                lesson_reports: mockLessonReportByLessonId,
            },
        });

        const result = await lessonReportsQueriesBob.lessonGetLessonReportListByLessonIds(
            variables
        );

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockLessonReportByLessonId);
    });

    it("getOneByCourseIdAndStudentIdAndReportIdAndLessonIdV2 method", async () => {
        const variables: PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables =
            {
                report_user_id: "report use id 1",
                report_course_id: "course id 1",
                report_id: "report id 1",
                report_lesson_id: "lesson id 1",
            };
        reactiveStorage.set("PROFILE", user);

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                get_previous_report_of_student_v3: [mockPreviousLessonReportLessonReport],
            },
        });
        const _callSpy = jest.spyOn(lessonReportsQueriesBob, "_call");
        const result =
            await lessonReportsQueriesBob.getOneByCourseIdAndStudentIdAndReportIdAndLessonIdV2(
                variables
            );
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockPreviousLessonReportLessonReport);
    });
});
