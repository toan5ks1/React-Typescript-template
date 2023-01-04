import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import {
    createMockLessonManagementUpsertFormData,
    createMockMedia,
    retrieveLessonParams,
} from "src/squads/lesson/test-utils/lesson-management";

import { LessonManagementServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";
import { LessonStatus } from "manabuf/bob/v1/lessons_pb";

import { transformDataToUpsertLessonManagement } from "src/squads/lesson/pages/LessonManagement/common/transformers";
import lessonsManagementServiceBob, {
    newCreateLessonRequest,
    newDeleteLessonRequest,
    newRetrieveLessonsRequestV2Req,
    newUpdateLessonRequest,
} from "src/squads/lesson/service/bob/lessons-service/lessons-management.mutation";

jest.mock("manabuf/bob/v1/lessons_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/lessons_grpc_web_pb");

    actual.LessonManagementServicePromiseClient.prototype.createLesson = jest.fn();
    actual.LessonManagementServicePromiseClient.prototype.updateLesson = jest.fn();
    actual.LessonManagementServicePromiseClient.prototype.deleteLesson = jest.fn();
    actual.LessonManagementServicePromiseClient.prototype.retrieveLessons = jest.fn();
    return actual;
});

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

const mediaIds = createMockMedia().map((media) => media.media_id);
const mockLessonDataWithoutLessonId: NsLesson_Bob_LessonsService.UpsertLessons =
    transformDataToUpsertLessonManagement(
        createMockLessonManagementUpsertFormData(),
        mediaIds,
        LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED
    );

describe("lessons-management.mutation create lesson", () => {
    beforeEach(() => {
        (LessonManagementServicePromiseClient.prototype.createLesson as jest.Mock).mockReturnValue(
            fakeReturn
        );
    });
    it("should submit lesson data", async () => {
        const data = mockLessonDataWithoutLessonId;
        const _callSpy = jest.spyOn(lessonsManagementServiceBob, "_call");
        await lessonsManagementServiceBob.createLesson({ data });

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(LessonManagementServicePromiseClient.prototype.createLesson).toBeCalledWith(
            newCreateLessonRequest(data)
        );
    });
});

describe("lessons-management.mutation update lesson", () => {
    beforeEach(() => {
        (LessonManagementServicePromiseClient.prototype.updateLesson as jest.Mock).mockReturnValue(
            fakeReturn
        );
    });

    it("should update Lesson with valid data", async () => {
        const data = { ...mockLessonDataWithoutLessonId, lessonId: "FAKE_ID" };
        const _callSpy = jest.spyOn(lessonsManagementServiceBob, "_call");
        await lessonsManagementServiceBob.updateLesson({ data });

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(LessonManagementServicePromiseClient.prototype.updateLesson).toBeCalledWith(
            newUpdateLessonRequest(data)
        );
    });
});

describe("lessons-management.mutation delete lesson", () => {
    it("should delete lesson", async () => {
        (LessonManagementServicePromiseClient.prototype.deleteLesson as jest.Mock).mockReturnValue(
            fakeReturn
        );

        const data = {
            lessonId: "Sample Lesson Id",
        };

        const _callSpy = jest.spyOn(lessonsManagementServiceBob, "_call");
        await lessonsManagementServiceBob.deleteLesson({ data });

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(LessonManagementServicePromiseClient.prototype.deleteLesson).toBeCalledWith(
            newDeleteLessonRequest(data.lessonId)
        );
    });
});

describe("lessons-management.mutation retrieve lesson", () => {
    it("should retrieve lesson with valid param", async () => {
        (
            LessonManagementServicePromiseClient.prototype.retrieveLessons as jest.Mock
        ).mockReturnValue(fakeReturn);

        const mockRetrieveLessonParams: NsLesson_Bob_LessonsService.RetrieveLessonsRequest =
            retrieveLessonParams;

        const _callSpy = jest.spyOn(lessonsManagementServiceBob, "_call");
        await lessonsManagementServiceBob.retrieveLessons(mockRetrieveLessonParams);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(LessonManagementServicePromiseClient.prototype.retrieveLessons).toBeCalledWith(
            newRetrieveLessonsRequestV2Req(mockRetrieveLessonParams)
        );
    });
});
