import { GetPartnerDomainRequestQuery } from "src/squads/lesson/common/types";
import {
    LessonReportByLessonIdQueryVariables,
    Lesson_LessonReportListByLessonIdsQueryVariables,
    PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { lessonReportsService } from "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-service";
import { NsLesson_Bob_LessonReportsService } from "src/squads/lesson/service/bob/lesson-reports-service/types";
import { MutationLessonIndividualReportParams } from "src/squads/lesson/service/service-types";
import {
    createMockPreviousLessonReportLessonReport,
    createMockUpsertLessonReportData,
} from "src/squads/lesson/test-utils/lesson-management";

import {
    DeleteLessonReportResponse,
    DomainType,
    GetPartnerDomainResponse,
    SaveDraftLessonReportResponse,
    SubmitLessonReportResponse,
    ValueType,
} from "manabuf/bob/v1/lessons_pb";

import { lessonReports } from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";
import lessonReportsQueriesBob from "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-bob.query";
import lessonReportsModifierServiceBob from "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-modifier.mutation";
import lessonReportsReaderServiceBob from "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-reader.mutation";

jest.mock("src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getOne: jest.fn(),
            lessonGetLessonReportListByLessonIds: jest.fn(),
            getOneByCourseIdAndStudentIdAndReportIdAndLessonIdV2: jest.fn(),
        },
    };
});
jest.mock(
    "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-reader.mutation",
    () => {
        return {
            __esModule: true,
            default: {
                retrievePartnerDomain: jest.fn(),
            },
        };
    }
);
jest.mock(
    "src/squads/lesson/service/bob/lesson-reports-service/lesson-reports-modifier.mutation",
    () => {
        return {
            __esModule: true,
            default: {
                submitLessonReport: jest.fn(),
                saveDraftLessonReport: jest.fn(),
                deleteLessonReport: jest.fn(),
            },
        };
    }
);

describe("lesson-reports-service query", () => {
    const mockLessonReportList = [
        {
            report_submitting_status: "LESSON_REPORT_SUBMITTING_STATUS_SAVED",
            lesson_report_id: "Lesson report ID 1",
            lesson_id: "Lesson ID 1",
        },
    ];

    it("should call query getOne correctly", async () => {
        const mockLessonReport = lessonReports[0];
        const variables: LessonReportByLessonIdQueryVariables = {
            lesson_id: "lesson ID 1",
        };

        (lessonReportsQueriesBob.getOne as jest.Mock).mockResolvedValue(mockLessonReport);
        const response = await lessonReportsService.query.lessonReportsGetOne(variables);

        expect(lessonReportsQueriesBob.getOne).toBeCalledWith(variables);
        expect(response).toEqual(mockLessonReport);
    });

    it("should not call query getOne with invalid parameters", async () => {
        const mockLessonReport = lessonReports[0];
        const invalidQueryVariable: LessonReportByLessonIdQueryVariables = {
            lesson_id: "",
        };

        (lessonReportsQueriesBob.getOne as jest.Mock).mockResolvedValue(mockLessonReport);

        await expect(async () => {
            await lessonReportsService.query.lessonReportsGetOne(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "lessonReportsGetOne",
            serviceName: "bobGraphQL",
            errors: [{ field: "lesson_id" }],
            name: "InvalidParamError",
        });

        expect(lessonReportsQueriesBob.getOne).not.toBeCalled();
    });

    it("should call query lessonGetLessonReportListByLessonIds correctly", async () => {
        const variables: Lesson_LessonReportListByLessonIdsQueryVariables = {
            lesson_ids: ["lesson ID 1"],
        };

        (
            lessonReportsQueriesBob.lessonGetLessonReportListByLessonIds as jest.Mock
        ).mockResolvedValue(mockLessonReportList);
        const response = await lessonReportsService.query.lessonGetLessonReportListByLessonIds(
            variables
        );

        expect(lessonReportsQueriesBob.lessonGetLessonReportListByLessonIds).toBeCalledWith(
            variables
        );
        expect(response).toEqual(mockLessonReportList);
    });

    it("should not call query lessonGetLessonReportListByLessonIds with invalid parameters", async () => {
        const invalidQueryVariable: Lesson_LessonReportListByLessonIdsQueryVariables = {
            lesson_ids: [],
        };

        (
            lessonReportsQueriesBob.lessonGetLessonReportListByLessonIds as jest.Mock
        ).mockResolvedValue(mockLessonReportList);

        await expect(async () => {
            await lessonReportsService.query.lessonGetLessonReportListByLessonIds(
                invalidQueryVariable
            );
        }).rejects.toMatchObject({
            action: "lessonGetLessonReportListByLessonIds",
            serviceName: "bobGraphQL",
            errors: [{ field: "lesson_ids" }],
            name: "InvalidParamError",
        });

        expect(lessonReportsQueriesBob.lessonGetLessonReportListByLessonIds).not.toBeCalled();
    });

    it("should call query getOneByCourseIdAndStudentIdAndReportIdAndLessonIdV2", async () => {
        const mockPreviousLessonReportLessonReport = createMockPreviousLessonReportLessonReport();
        const queryVariable: PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables =
            {
                report_user_id: "report use id 1",
                report_course_id: "course id 1",
                report_id: "report id 1",
                report_lesson_id: "lesson id 1",
            };
        (
            lessonReportsQueriesBob.getOneByCourseIdAndStudentIdAndReportIdAndLessonIdV2 as jest.Mock
        ).mockResolvedValue(mockPreviousLessonReportLessonReport);

        const response =
            await lessonReportsService.query.lessonReportsGetOneByCourseIdAndStudentIdAndReportIdAndLessonId(
                queryVariable
            );

        expect(
            lessonReportsQueriesBob.getOneByCourseIdAndStudentIdAndReportIdAndLessonIdV2
        ).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockPreviousLessonReportLessonReport);
    });

    it("should not call query getOneByCourseIdAndStudentIdAndReportIdAndLessonIdV2 with invalid parameters", async () => {
        const mockPreviousLessonReportLessonReport = createMockPreviousLessonReportLessonReport();
        const invalidQueryVariable: PreviousLessonReportByCourseIdAndStudentIdAndReportIdAndLessonIdV2QueryVariables =
            {
                report_course_id: "",
                report_user_id: "",
                report_id: undefined,
                report_lesson_id: undefined,
            };
        (
            lessonReportsQueriesBob.getOneByCourseIdAndStudentIdAndReportIdAndLessonIdV2 as jest.Mock
        ).mockResolvedValue(mockPreviousLessonReportLessonReport);

        await expect(async () => {
            await lessonReportsService.query.lessonReportsGetOneByCourseIdAndStudentIdAndReportIdAndLessonId(
                invalidQueryVariable
            );
        }).rejects.toMatchObject({
            action: "lessonReportsGetOneByCourseIdAndStudentIdAndReportIdAndLessonId",
            serviceName: "bobGraphQL",
            errors: [{ field: "report_course_id" }, { field: "report_user_id" }],
            name: "InvalidParamError",
        });
        expect(
            lessonReportsQueriesBob.getOneByCourseIdAndStudentIdAndReportIdAndLessonIdV2
        ).not.toBeCalled();
    });

    it("should call query retrievePartnerDomain", async () => {
        const mockRetrievePartnerDomainLessonReport: GetPartnerDomainResponse.AsObject = {
            domain: "/teacher",
        };
        const variables: GetPartnerDomainRequestQuery = {
            type: DomainType.DOMAIN_TYPE_TEACHER,
        };

        (lessonReportsReaderServiceBob.retrievePartnerDomain as jest.Mock).mockResolvedValue(
            mockRetrievePartnerDomainLessonReport
        );

        const response = await lessonReportsService.query.lessonReportsRetrievePartnerDomain(
            variables
        );

        expect(lessonReportsReaderServiceBob.retrievePartnerDomain).toBeCalledWith(variables);
        expect(response).toEqual(mockRetrievePartnerDomainLessonReport);
    });

    it("should not call query lessonReportsRetrievePartnerDomain with invalid parameters", async () => {
        const mockRetrievePartnerDomainLessonReport: GetPartnerDomainResponse.AsObject = {
            domain: "/teacher",
        };
        const invalidQueryVariable = {
            type: null as unknown as DomainType,
        };
        (lessonReportsReaderServiceBob.retrievePartnerDomain as jest.Mock).mockResolvedValue(
            mockRetrievePartnerDomainLessonReport
        );

        await expect(async () => {
            await lessonReportsService.query.lessonReportsRetrievePartnerDomain(
                invalidQueryVariable
            );
        }).rejects.toMatchObject({
            action: "lessonReportsRetrievePartnerDomain",
            serviceName: "bobGraphQL",
            errors: [{ field: "type" }],
            name: "InvalidParamError",
        });

        expect(lessonReportsReaderServiceBob.retrievePartnerDomain).not.toBeCalled();
    });
});

describe("lesson-reports-service mutation", () => {
    const mockData: Required<
        MutationLessonIndividualReportParams<NsLesson_Bob_LessonReportsService.UpsertLessonReport>
    > = {
        data: createMockUpsertLessonReportData(ValueType.VALUE_TYPE_INT),
    };
    it("should call submitLessonReport", async () => {
        const mockReturnData: SubmitLessonReportResponse.AsObject = {
            lessonReportId: "lesson report 1",
        };
        (lessonReportsModifierServiceBob.submitLessonReport as jest.Mock).mockResolvedValue(
            mockReturnData
        );

        const response = await lessonReportsService.mutation.lessonReportsSubmit(mockData);

        expect(lessonReportsModifierServiceBob.submitLessonReport).toBeCalledWith(mockData);
        expect(response).toEqual(mockReturnData);
    });

    it("should not call submitLessonReport with invalid data", async () => {
        const mockInvalidData: Required<
            MutationLessonIndividualReportParams<NsLesson_Bob_LessonReportsService.UpsertLessonReport>
        > = {
            data: {
                ...mockData.data,
                lessonId: "",
                detailsList: [
                    {
                        ...mockData.data.detailsList[0],
                        attendanceStatus: 0,
                        studentId: "",
                        courseId: "",
                    },
                ],
            },
        };
        const mockReturnData: SubmitLessonReportResponse.AsObject = {
            lessonReportId: "lesson report 1",
        };
        (lessonReportsModifierServiceBob.submitLessonReport as jest.Mock).mockResolvedValue(
            mockReturnData
        );

        await expect(async () => {
            await lessonReportsService.mutation.lessonReportsSubmit(mockInvalidData);
        }).rejects.toMatchObject({
            action: "lessonReportsSubmit",
            serviceName: "bobGraphQL",
            errors: [
                { field: "lessonId", fieldValueIfNotSensitive: "" },
                {
                    field: "studentId",
                },
                {
                    field: "courseId",
                    fieldValueIfNotSensitive: "",
                },
                {
                    field: "attendanceStatus",
                    fieldValueIfNotSensitive: 0,
                },
            ],
            name: "InvalidParamError",
        });

        expect(lessonReportsModifierServiceBob.submitLessonReport).not.toBeCalled();
    });

    it("should call saveDraftLessonReport", async () => {
        const mockReturnData: SaveDraftLessonReportResponse.AsObject = {
            lessonReportId: "lesson report 1",
        };

        (lessonReportsModifierServiceBob.saveDraftLessonReport as jest.Mock).mockResolvedValue(
            mockReturnData
        );

        const response = await lessonReportsService.mutation.lessonReportsSaveDraft(mockData);

        expect(lessonReportsModifierServiceBob.saveDraftLessonReport).toBeCalledWith(mockData);
        expect(response).toEqual(mockReturnData);
    });

    it("should not call saveDraftLessonReport with invalid data", async () => {
        const mockInvalidData: Required<
            MutationLessonIndividualReportParams<NsLesson_Bob_LessonReportsService.UpsertLessonReport>
        > = {
            data: {
                ...mockData.data,
                lessonId: "",
                detailsList: [
                    {
                        ...mockData.data.detailsList[0],
                        attendanceStatus: 0,
                        studentId: "",
                        courseId: "",
                    },
                ],
            },
        };
        const mockReturnData: SubmitLessonReportResponse.AsObject = {
            lessonReportId: "lesson report 1",
        };
        (lessonReportsModifierServiceBob.saveDraftLessonReport as jest.Mock).mockResolvedValue(
            mockReturnData
        );

        await expect(async () => {
            await lessonReportsService.mutation.lessonReportsSaveDraft(mockInvalidData);
        }).rejects.toMatchObject({
            action: "lessonReportsSaveDraft",
            serviceName: "bobGraphQL",
            errors: [
                { field: "lessonId", fieldValueIfNotSensitive: "" },
                {
                    field: "studentId",
                },
                {
                    field: "courseId",
                    fieldValueIfNotSensitive: "",
                },
            ],
            name: "InvalidParamError",
        });

        expect(lessonReportsModifierServiceBob.saveDraftLessonReport).not.toBeCalled();
    });

    it("should call deleteLessonReport", async () => {
        const mockReturnData: DeleteLessonReportResponse.AsObject = {};

        (lessonReportsModifierServiceBob.deleteLessonReport as jest.Mock).mockResolvedValue(
            mockReturnData
        );

        const response = await lessonReportsService.mutation.lessonReportsDelete(mockData);

        expect(lessonReportsModifierServiceBob.deleteLessonReport).toBeCalledWith(mockData);
        expect(response).toEqual(mockReturnData);
    });
});
