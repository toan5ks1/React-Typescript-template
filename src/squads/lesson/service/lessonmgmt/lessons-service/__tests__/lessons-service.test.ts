import { lessonsService } from "src/squads/lesson/service/lessonmgmt/lessons-service/lessons-service";
import { NsLesson_LessonMgmt_LessonsService } from "src/squads/lesson/service/lessonmgmt/lessons-service/types";

import { LessonSchedulingStatus } from "manabuf/common/v1/enums_pb";
import { UpdateLessonSchedulingStatusResponse } from "manabuf/lessonmgmt/v1/lessons_pb";

import lessonsServiceLessonMgmt from "src/squads/lesson/service/lessonmgmt/lessons-service/lessons-management.mutation";

jest.mock(
    "src/squads/lesson/service/lessonmgmt/lessons-service/lessons-management.mutation",
    () => {
        return {
            __esModule: true,
            default: {
                updateLessonSchedulingStatus: jest.fn(),
            },
        };
    }
);

const mockReturnData: UpdateLessonSchedulingStatusResponse.AsObject = {};

describe("lessons-service mutation", () => {
    it("should update lesson status", async () => {
        const data: NsLesson_LessonMgmt_LessonsService.UpdateLessonSchedulingStatusRequest = {
            lessonId: "Sample Lesson Id",
            schedulingStatus: LessonSchedulingStatus.LESSON_SCHEDULING_STATUS_COMPLETED,
        };

        (lessonsServiceLessonMgmt.updateLessonSchedulingStatus as jest.Mock).mockResolvedValue(
            mockReturnData
        );

        const response = await lessonsService.mutation.lessonsUpdateStatus(data);

        expect(lessonsServiceLessonMgmt.updateLessonSchedulingStatus).toBeCalledWith({
            data: data,
        });
        expect(response).toEqual(mockReturnData);
    });
});

describe("lessons-service mutation with invalid parameter", () => {
    it("should not update lesson lesson with invalid parameter", async () => {
        const dataInvalid: NsLesson_LessonMgmt_LessonsService.UpdateLessonSchedulingStatusRequest =
            {
                lessonId: "",
                schedulingStatus: LessonSchedulingStatus.LESSON_SCHEDULING_STATUS_COMPLETED,
            };

        (lessonsServiceLessonMgmt.updateLessonSchedulingStatus as jest.Mock).mockResolvedValue(
            mockReturnData
        );

        await expect(async () => {
            await lessonsService.mutation.lessonsUpdateStatus(dataInvalid);
        }).rejects.toMatchObject({
            action: "lessonsUpdateStatus",
            name: "InvalidParamError",
            errors: [{ field: "lessonId" }],
            serviceName: "lessonmgmtGraphQL",
        });

        expect(lessonsServiceLessonMgmt.updateLessonSchedulingStatus).not.toBeCalled();
    });
});
