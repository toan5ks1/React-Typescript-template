import { ArrayElement } from "src/common/constants/types";
import {
    LessonMemberByUserIdAndCourseIdAndLessonIdV2Query,
    LessonMemberByUserIdAndCourseIdAndLessonIdV2QueryVariables,
    PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQuery,
    PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQueryVariables,
    PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2Query,
    PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";
import { createMockUsePreviousLessonReport } from "src/squads/lesson/test-utils/lesson-management";
import { MockInferQueryFn } from "src/squads/lesson/test-utils/types";
import { mockWarner } from "src/squads/lesson/test-utils/warner";

import { renderHook } from "@testing-library/react-hooks";
import usePreviousLessonReport, {
    UsePreviousLessonReportProps,
} from "src/squads/lesson/hooks/usePreviousLessonReport";

jest.mock("src/squads/lesson/hooks/useShowSnackbar", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const mockPreviousReport = createMockUsePreviousLessonReport();

jest.mock("src/squads/lesson/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

const mockInferQuery = (params?: {
    lessonReportMockFn?: MockInferQueryFn<
        PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables,
        PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2Query
    >;
    partnerDynamicFormFieldMockFn?: MockInferQueryFn<
        PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQueryVariables,
        PartnerDynamicFormFieldValuesByLessonReportDetailsIdAndStudentIdQuery
    >;
    lessonMemberMockFn?: MockInferQueryFn<
        LessonMemberByUserIdAndCourseIdAndLessonIdV2QueryVariables,
        ArrayElement<LessonMemberByUserIdAndCourseIdAndLessonIdV2Query["lesson_members"]>
    >;
}) => {
    const { lessonReportMockFn, partnerDynamicFormFieldMockFn, lessonMemberMockFn } = params || {};

    (inferQuery as jest.Mock).mockImplementation(
        ({
            entity,
            action,
        }: {
            entity: "lessonReports" | "partnerDynamicFormFieldValues" | "lessonMembers";
            action:
                | "lessonReportsGetOneByCourseIdAndStudentIdAndReportIdAndLessonId"
                | "partnerDynamicFormFieldValuesGetOneByLessonReportDetailsIdAndStudentId"
                | "lessonMembersGetOneLessonMemberByUserIdAndCourseIdAndLessonId";
        }) => {
            switch (true) {
                case entity === "lessonReports" &&
                    action === "lessonReportsGetOneByCourseIdAndStudentIdAndReportIdAndLessonId": {
                    if (lessonReportMockFn) return lessonReportMockFn;
                    return () => ({ data: { form_config_id: mockPreviousReport.formConfigId } });
                }

                case entity === "partnerDynamicFormFieldValues" &&
                    action ===
                        "partnerDynamicFormFieldValuesGetOneByLessonReportDetailsIdAndStudentId": {
                    if (partnerDynamicFormFieldMockFn) return partnerDynamicFormFieldMockFn;
                    return () => ({ data: mockPreviousReport.dynamicValues });
                }

                case entity === "lessonMembers" &&
                    action === "lessonMembersGetOneLessonMemberByUserIdAndCourseIdAndLessonId": {
                    if (lessonMemberMockFn) return lessonMemberMockFn;
                    return () => ({ data: mockPreviousReport.attendanceValues });
                }
            }
        }
    );
};

describe("usePreviousLessonReport", () => {
    const std = mockWarner();
    const props: UsePreviousLessonReportProps = {
        studentId: "student_id_1",
        courseId: "course_id_1",
        reportId: "report_id_1",
        lessonId: "lesson_id_1",
    };

    it("should fetch success with data", () => {
        mockInferQuery();

        const { result } = renderHook(() => usePreviousLessonReport(props));
        expect(result.current.formConfigId).toEqual(mockPreviousReport.formConfigId);
        expect(result.current.dynamicValues).toEqual(mockPreviousReport.dynamicValues);
        expect(result.current.attendanceValues).toEqual(mockPreviousReport.attendanceValues);
    });

    it("should fetch success with data = null", () => {
        mockInferQuery({
            lessonReportMockFn: () => ({ data: { form_config_id: "" } }),
            partnerDynamicFormFieldMockFn: () => ({ data: [] }),
            lessonMemberMockFn: () => ({ data: [] }),
        });

        const { result } = renderHook(() => usePreviousLessonReport(props));
        expect(result.current.formConfigId).toEqual("");
        expect(result.current.dynamicValues).toEqual([]);
        expect(result.current.attendanceValues).toEqual([]);
    });

    it("should call onError when fetching lessonReport", () => {
        let ranOnError = false;

        mockInferQuery({
            lessonReportMockFn: (_, options) => {
                if (!ranOnError) {
                    options.onError?.(Error("ERROR LESSON REPORTS"));
                    ranOnError = true;
                }

                return { data: [] };
            },
        });

        renderHook(() => usePreviousLessonReport(props));

        expect(std.warn).toBeCalledWith(
            `usePreviousLessonReport getLessonReport`,
            Error("ERROR LESSON REPORTS")
        );
    });

    it("should call onError when fetching dynamicValues", () => {
        let ranOnError = false;

        mockInferQuery({
            partnerDynamicFormFieldMockFn: (_, options) => {
                if (!ranOnError) {
                    options.onError?.(Error("ERROR DYNAMIC VALUES"));
                    ranOnError = true;
                }

                return { data: [] };
            },
        });

        renderHook(() => usePreviousLessonReport(props));

        expect(std.warn).toBeCalledWith(
            `usePreviousLessonReport getPartnerFormDynamicValues`,
            Error("ERROR DYNAMIC VALUES")
        );
    });

    it("should call onError when fetching attendanceValues", () => {
        let ranOnError = false;

        mockInferQuery({
            lessonMemberMockFn: (_, options) => {
                if (!ranOnError) {
                    options.onError?.(Error("ERROR ATTENDANCE VALUES"));
                    ranOnError = true;
                }

                return { data: [] };
            },
        });

        renderHook(() => usePreviousLessonReport(props));

        expect(std.warn).toBeCalledWith(
            `usePreviousLessonReport getLessonMember`,
            Error("ERROR ATTENDANCE VALUES")
        );
    });
});
