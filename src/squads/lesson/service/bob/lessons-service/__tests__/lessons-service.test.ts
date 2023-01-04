import { Lesson_LessonByLessonIdForLessonManagementV3QueryVariables } from "src/squads/lesson/service/bob/bob-types";
import { lessonsService } from "src/squads/lesson/service/bob/lessons-service/lessons-service";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import {
    createMockLessonManagementUpsertFormData,
    createMockMedia,
} from "src/squads/lesson/test-utils/lesson-management";
import { createMockRetrieveLesson } from "src/squads/lesson/test-utils/lesson-management-list";

import {
    CreateLessonResponse,
    DeleteLessonResponse,
    LessonStatus,
    LessonTime,
} from "manabuf/bob/v1/lessons_pb";

import { lessonData } from "src/squads/lesson/pages/LessonManagement/common/real-data-from-hasura";
import { transformDataToUpsertLessonManagement } from "src/squads/lesson/pages/LessonManagement/common/transformers";
import lessonsQueriesBob from "src/squads/lesson/service/bob/lessons-service/lessons-bob.query";
import lessonsManagementServiceBob from "src/squads/lesson/service/bob/lessons-service/lessons-management.mutation";

jest.mock("src/squads/lesson/service/bob/lessons-service/lessons-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getOneForLessonManagement: jest.fn(),
        },
    };
});
jest.mock("src/squads/lesson/service/bob/lessons-service/lessons-management.mutation", () => {
    return {
        __esModule: true,
        default: {
            createLesson: jest.fn(),
            updateLesson: jest.fn(),
            deleteLesson: jest.fn(),
            retrieveLessons: jest.fn(),
        },
    };
});

describe("lessons-service query", () => {
    it("should get one lesson", async () => {
        const mockLesson = lessonData;
        const variables: Lesson_LessonByLessonIdForLessonManagementV3QueryVariables = {
            lesson_id: "lesson ID 1",
        };

        (lessonsQueriesBob.getOneForLessonManagement as jest.Mock).mockResolvedValue(mockLesson);
        const response = await lessonsService.query.lessonsGetOne(variables);

        expect(lessonsQueriesBob.getOneForLessonManagement).toBeCalledWith(variables);
        expect(response).toEqual(mockLesson);
    });

    it("should not get one lesson with invalid parameter", async () => {
        const mockLesson = lessonData;
        const queryVariable: Lesson_LessonByLessonIdForLessonManagementV3QueryVariables = {
            lesson_id: "",
        };

        (lessonsQueriesBob.getOneForLessonManagement as jest.Mock).mockResolvedValue(mockLesson);

        await expect(async () => {
            await lessonsService.query.lessonsGetOne(queryVariable);
        }).rejects.toMatchObject({
            action: "lessonsGetOne",
            name: "InvalidParamError",
            errors: [{ field: "lesson_id" }],
            serviceName: "bobGraphQL",
        });

        expect(lessonsQueriesBob.getOneForLessonManagement).not.toBeCalled();
    });

    it("should get lessons list", async () => {
        const retrieveLesson = createMockRetrieveLesson();
        const mockInferQueryWithGRPCPaginationReturn = {
            results: { data: retrieveLesson, isFetching: false },
            goToFirstPage: jest.fn(),
        };
        const variables: NsLesson_Bob_LessonsService.RetrieveLessonsRequest = {
            lessonTime: LessonTime.LESSON_TIME_FUTURE,
            keyword: "keyword",
            locationIdsList: [],
            paging: {
                limit: 10,
                offsetInteger: 0,
                offsetString: "",
            },
        };
        (lessonsManagementServiceBob.retrieveLessons as jest.Mock).mockResolvedValue(
            mockInferQueryWithGRPCPaginationReturn
        );

        const response = await lessonsService.query.lessonsRetrieve(variables);

        expect(lessonsManagementServiceBob.retrieveLessons).toBeCalledWith(variables);
        expect(response).toEqual(mockInferQueryWithGRPCPaginationReturn);
    });

    it("should not return lesson list when calling lessonsRetrieve function with invalid param", async () => {
        const invalidQueryVariable: NsLesson_Bob_LessonsService.RetrieveLessonsRequest = {
            lessonTime: LessonTime.LESSON_TIME_FUTURE,
            keyword: "keyword",
            locationIdsList: [],
            paging: undefined,
        };

        await expect(async () => {
            await lessonsService.query.lessonsRetrieve(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "lessonsRetrieve",
            serviceName: "bobGraphQL",
            errors: [{ field: "paging" }],
            name: "InvalidParamError",
        });
        expect(lessonsManagementServiceBob.retrieveLessons).not.toBeCalled();
    });
});

describe("lessons-service mutation", () => {
    const mediaIds = createMockMedia().map((media) => media.media_id);

    const lessonUpsertPayload: NsLesson_Bob_LessonsService.UpsertLessons =
        transformDataToUpsertLessonManagement(
            createMockLessonManagementUpsertFormData(),
            mediaIds,
            LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED
        );

    it("should create lesson", async () => {
        const mockReturnData: CreateLessonResponse.AsObject = {
            id: "lesson ID 1",
        };
        (lessonsManagementServiceBob.createLesson as jest.Mock).mockResolvedValue(mockReturnData);

        const response = await lessonsService.mutation.lessonsCreate(lessonUpsertPayload);

        expect(lessonsManagementServiceBob.createLesson).toBeCalledWith({
            data: lessonUpsertPayload,
        });
        expect(response).toEqual(mockReturnData);
    });

    it("should update lesson", async () => {
        const mockReturnData: CreateLessonResponse.AsObject = {
            id: "lesson ID 1",
        };
        (lessonsManagementServiceBob.updateLesson as jest.Mock).mockResolvedValue(mockReturnData);

        const updateLessonPayload = {
            ...lessonUpsertPayload,
            lessonId: "Lesson_Id_01",
        };

        const response = await lessonsService.mutation.lessonsUpdate(updateLessonPayload);

        expect(lessonsManagementServiceBob.updateLesson).toBeCalledWith({
            data: updateLessonPayload,
        });
        expect(response).toEqual(mockReturnData);
    });

    it("should delete lesson", async () => {
        const mockVariable: NsLesson_Bob_LessonsService.DeleteLessonRequest = {
            lessonId: "lesson ID 1",
        };
        const mockReturnData: DeleteLessonResponse.AsObject = {};

        (lessonsManagementServiceBob.deleteLesson as jest.Mock).mockResolvedValue(mockReturnData);

        const response = await lessonsService.mutation.lessonsDelete(mockVariable);

        expect(lessonsManagementServiceBob.deleteLesson).toBeCalledWith({ data: mockVariable });
        expect(response).toEqual(mockReturnData);
    });

    it("should create draft lesson", async () => {
        const mockReturnData: CreateLessonResponse.AsObject = {
            id: "lesson ID 1",
        };
        (lessonsManagementServiceBob.createLesson as jest.Mock).mockResolvedValue(mockReturnData);

        const response = await lessonsService.mutation.lessonsSaveDraft(lessonUpsertPayload);

        expect(lessonsManagementServiceBob.createLesson).toBeCalledWith({
            data: lessonUpsertPayload,
        });
        expect(response).toEqual(mockReturnData);
    });

    it("should update draft lesson", async () => {
        const mockReturnData: CreateLessonResponse.AsObject = {
            id: "lesson ID 1",
        };
        (lessonsManagementServiceBob.updateLesson as jest.Mock).mockResolvedValue(mockReturnData);

        const updateLessonPayload = {
            ...lessonUpsertPayload,
            lessonId: "Lesson_Id_01",
        };

        const response = await lessonsService.mutation.lessonsUpdateDraft(updateLessonPayload);

        expect(lessonsManagementServiceBob.updateLesson).toBeCalledWith({
            data: updateLessonPayload,
        });
        expect(response).toEqual(mockReturnData);
    });
});

describe("lessons-service mutation with invalid parameter", () => {
    const invalidLessonUpsertPayload: NsLesson_Bob_LessonsService.UpsertLessons = {
        teacherIdsList: [],
        studentInfoListList: [],
        mediaIds: [],
        centerId: "",
        startTime: new Date(),
        endTime: new Date(),
        teachingMedium: 10,
        teachingMethod: 10,
        classId: "",
        courseId: "",
        schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED,
    };

    it("should not create lesson with invalid parameter", async () => {
        const mockReturnData: CreateLessonResponse.AsObject = {
            id: "Lesson ID 1",
        };
        (lessonsManagementServiceBob.createLesson as jest.Mock).mockResolvedValue(mockReturnData);

        await expect(async () => {
            await lessonsService.mutation.lessonsCreate(invalidLessonUpsertPayload);
        }).rejects.toMatchObject({
            action: "lessonsCreate",
            name: "InvalidParamError",
            errors: [
                { field: "centerId" },
                { field: "savingOption" },
                { field: "teachingMedium" },
                { field: "teachingMethod" },
                { field: "teacherIdsList" },
                { field: "studentInfoListList" },
            ],
            serviceName: "bobGraphQL",
        });

        expect(lessonsManagementServiceBob.createLesson).not.toBeCalled();
    });

    it("should not update lesson with invalid parameter", async () => {
        const mockReturnData: CreateLessonResponse.AsObject = {
            id: "lesson ID 1",
        };

        (lessonsManagementServiceBob.updateLesson as jest.Mock).mockResolvedValue(mockReturnData);

        await expect(async () => {
            await lessonsService.mutation.lessonsUpdate(invalidLessonUpsertPayload);
        }).rejects.toMatchObject({
            action: "lessonsUpdate",
            name: "InvalidParamError",
            errors: [
                { field: "centerId" },
                { field: "savingOption" },
                { field: "teachingMedium" },
                { field: "teachingMethod" },
                { field: "teacherIdsList" },
                { field: "studentInfoListList" },
                { field: "lessonId" },
            ],
            serviceName: "bobGraphQL",
        });

        expect(lessonsManagementServiceBob.updateLesson).not.toBeCalled();
    });

    it("should not delete lesson with invalid parameter", async () => {
        const mockReturnData: DeleteLessonResponse.AsObject = {};

        (lessonsManagementServiceBob.deleteLesson as jest.Mock).mockResolvedValue(mockReturnData);

        await expect(async () => {
            await lessonsService.mutation.lessonsDelete({ lessonId: "" });
        }).rejects.toMatchObject({
            action: "lessonsUpdate",
            name: "InvalidParamError",
            errors: [{ field: "lessonId" }],
            serviceName: "bobGraphQL",
        });

        expect(lessonsManagementServiceBob.deleteLesson).not.toBeCalled();
    });

    it("should not update draft lesson with invalid parameter", async () => {
        const mockReturnData: CreateLessonResponse.AsObject = {
            id: "lesson ID 1",
        };

        (lessonsManagementServiceBob.updateLesson as jest.Mock).mockResolvedValue(mockReturnData);

        await expect(async () => {
            await lessonsService.mutation.lessonsUpdateDraft(invalidLessonUpsertPayload);
        }).rejects.toMatchObject({
            action: "lessonsUpdateDraft",
            name: "InvalidParamError",
            errors: [
                { field: "centerId" },
                { field: "savingOption" },
                { field: "teachingMedium" },
                { field: "teachingMethod" },
                { field: "lessonId" },
            ],
            serviceName: "bobGraphQL",
        });

        expect(lessonsManagementServiceBob.updateLesson).not.toBeCalled();
    });
});
