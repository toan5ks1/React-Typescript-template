import { NsLesson_LessonMgmt_LessonsService } from "src/squads/lesson/service/lessonmgmt/lessons-service/types";

import { LessonSchedulingStatus } from "manabuf/common/v1/enums_pb";
import { LessonModifierServicePromiseClient } from "manabuf/lessonmgmt/v1/lessons_grpc_web_pb";

import lessonsServiceLessonMgmt, {
    newUpdateStatusLessonRequest,
} from "src/squads/lesson/service/lessonmgmt/lessons-service/lessons-management.mutation";

jest.mock("manabuf/lessonmgmt/v1/lessons_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/lessonmgmt/v1/lessons_grpc_web_pb");
    actual.LessonModifierServicePromiseClient.prototype.updateLessonSchedulingStatus = jest.fn();

    return actual;
});

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

describe("lessons-management.mutation updateLessonSchedulingStatus", () => {
    it("should update lesson status", async () => {
        (
            LessonModifierServicePromiseClient.prototype.updateLessonSchedulingStatus as jest.Mock
        ).mockReturnValue(fakeReturn);

        const data: NsLesson_LessonMgmt_LessonsService.UpdateLessonSchedulingStatusRequest = {
            lessonId: "Sample Lesson Id",
            schedulingStatus: LessonSchedulingStatus.LESSON_SCHEDULING_STATUS_COMPLETED,
        };

        const _callSpy = jest.spyOn(lessonsServiceLessonMgmt, "_call");

        await lessonsServiceLessonMgmt.updateLessonSchedulingStatus({ data });

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            LessonModifierServicePromiseClient.prototype.updateLessonSchedulingStatus
        ).toBeCalledWith(newUpdateStatusLessonRequest(data.lessonId, data.schedulingStatus));
    });
});
