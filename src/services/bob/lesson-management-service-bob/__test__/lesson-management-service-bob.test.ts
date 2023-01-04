import { handleUnknownError } from "src/common/utils/error";
import { createMockLessonManagementUpsertFormData } from "src/test-utils/lessons";
import { createMockMedia } from "src/test-utils/live-lesson";

import { LessonManagementServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";
import { LessonStatus, LessonTime, RetrieveLessonsFilterV2 } from "manabuf/bob/v1/lessons_pb";

import lessonManagementServiceBob from "../lesson-management-bob.mutation";
import {
    newCreateLessonRequest,
    newDeleteLessonRequest,
    newRetrieveLessonsRequestV2Req,
    newUpdateLessonRequest,
} from "../lesson-management-bob.request";
import { NsBobLessonManagementService } from "../types";

import { transformDataToUpsertLessonManagement } from "src/squads/lesson/pages/LessonManagement/common/transformers";

jest.mock("manabuf/bob/v1/lessons_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/bob/v1/lessons_grpc_web_pb");

    actual.LessonManagementServicePromiseClient.prototype.retrieveLessons = jest.fn();
    actual.LessonManagementServicePromiseClient.prototype.createLesson = jest.fn();
    actual.LessonManagementServicePromiseClient.prototype.updateLesson = jest.fn();
    actual.LessonManagementServicePromiseClient.prototype.deleteLesson = jest.fn();
    return actual;
});

const mediaIds = createMockMedia().map((media) => media.media_id);

const validCreateLessonData = transformDataToUpsertLessonManagement(
    createMockLessonManagementUpsertFormData(),
    mediaIds,
    LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED
);

const emptyUpsertLessonObject = {} as NsBobLessonManagementService.UpsertLessons;

const currentDate = new Date();
const lessonUpsertObjectWithEmptyData: NsBobLessonManagementService.UpsertLessons = {
    teacherIdsList: [],
    studentInfoListList: [],
    mediaIds: [],
    centerId: "",
    endTime: currentDate,
    startTime: currentDate,
    teachingMedium: 0,
    teachingMethod: 0,
    classId: "",
    courseId: "",
    schedulingStatus: LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED,
};

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

describe("create a lesson", () => {
    beforeEach(() => {
        (
            LessonManagementServicePromiseClient.prototype.createLesson as jest.Mock
        ).mockImplementation(() => {
            return fakeReturn;
        });
    });

    it("should create lesson", async () => {
        await lessonManagementServiceBob.createLesson({
            data: validCreateLessonData,
        });

        expect(LessonManagementServicePromiseClient.prototype.createLesson).toBeCalledWith(
            newCreateLessonRequest(validCreateLessonData)
        );
    });

    it("should not create a lesson when submit inValid data", async () => {
        try {
            await lessonManagementServiceBob.createLesson({
                data: emptyUpsertLessonObject,
            });
        } catch (err) {
            const error = handleUnknownError(err);
            expect(error.message).toEqual("ra.message.invalid_form");
        }

        try {
            await lessonManagementServiceBob.createLesson({
                data: lessonUpsertObjectWithEmptyData,
            });
        } catch (err) {
            const error = handleUnknownError(err);
            expect(error.message).toEqual("ra.message.invalid_form");
        }

        expect(LessonManagementServicePromiseClient.prototype.createLesson).not.toBeCalled();
    });
});

describe("retrieve lesson", () => {
    beforeEach(() => {
        (
            LessonManagementServicePromiseClient.prototype.retrieveLessons as jest.Mock
        ).mockImplementation(() => {
            return fakeReturn;
        });
    });

    it("should retrieve lessons correctly with valid param", async () => {
        const retrieveLessonParams: NsBobLessonManagementService.RetrieveLessonsRequest = {
            lessonTime: LessonTime.LESSON_TIME_FUTURE,
            keyword: "keyword",
            paging: {
                limit: 5,
                offsetInteger: 0,
                offsetString: "LessonId__10",
            },
            locationIdsList: [],
        };
        retrieveLessonParams.filter = {
            dateOfWeeksList: [0],
            timeZone: "Asia/Ho_Chi_Minh",
            centerIdsList: ["center id"],
            teacherIdsList: ["teacher id"],
            studentIdsList: ["student id"],
            courseIdsList: ["course id"],
            gradesList: [1],
            toDate: new Date(),
            fromDate: new Date(),
            fromTime: new Date(),
            toTime: new Date(),
        } as RetrieveLessonsFilterV2.AsObject;

        await lessonManagementServiceBob.retrieveLessons(retrieveLessonParams);

        expect(LessonManagementServicePromiseClient.prototype.retrieveLessons).toBeCalledWith(
            newRetrieveLessonsRequestV2Req(retrieveLessonParams)
        );
    });

    it("should throw error with invalid param retrieve lessons", async () => {
        const retrieveLessonParams: NsBobLessonManagementService.RetrieveLessonsRequest = {
            lessonTime: LessonTime.LESSON_TIME_FUTURE,
            keyword: "keyword",
            locationIdsList: [],
        };
        try {
            await lessonManagementServiceBob.retrieveLessons(retrieveLessonParams);
        } catch (error) {
            expect((error as Error).message).toBe("ra.message.invalid_form");
        }
    });
});

describe("update a lesson", () => {
    const fakeModifierReturn = {
        message: "FAKE_RETURN",
        toObject: () => "FAKE_TO_OBJECT_RETURN",
    };

    beforeEach(() => {
        (
            LessonManagementServicePromiseClient.prototype.updateLesson as jest.Mock
        ).mockImplementation(() => {
            return fakeModifierReturn;
        });
    });

    it("should update lesson", async () => {
        const validUpdateLessonData = {
            ...validCreateLessonData,
            lessonId: "FAKE_ID",
        };
        await lessonManagementServiceBob.updateLesson({
            data: validUpdateLessonData,
        });

        expect(LessonManagementServicePromiseClient.prototype.updateLesson).toBeCalledWith(
            newUpdateLessonRequest(validUpdateLessonData)
        );
    });

    it("should not update a lesson when submit inValid data", async () => {
        try {
            await lessonManagementServiceBob.updateLesson({
                data: emptyUpsertLessonObject,
            });
        } catch (err) {
            const error = handleUnknownError(err);
            expect(error.message).toEqual("ra.message.invalid_form");
        }

        try {
            await lessonManagementServiceBob.updateLesson({
                data: lessonUpsertObjectWithEmptyData,
            });
        } catch (err) {
            const error = handleUnknownError(err);
            expect(error.message).toEqual("ra.message.invalid_form");
        }

        try {
            await lessonManagementServiceBob.updateLesson({
                data: validCreateLessonData, // Missing lessonID
            });
        } catch (err) {
            const error = handleUnknownError(err);
            expect(error.message).toEqual("ra.message.invalid_form");
        }

        expect(LessonManagementServicePromiseClient.prototype.updateLesson).not.toBeCalled();
    });
});

describe("delete lesson", () => {
    it("should delete lesson", async () => {
        (
            LessonManagementServicePromiseClient.prototype.deleteLesson as jest.Mock
        ).mockImplementation(() => {
            return fakeReturn;
        });

        const data = {
            lessonId: "Sample Lesson Id",
        };

        await lessonManagementServiceBob.deleteLesson({ data });

        expect(LessonManagementServicePromiseClient.prototype.deleteLesson).toBeCalledWith(
            newDeleteLessonRequest(data.lessonId)
        );
    });
});
