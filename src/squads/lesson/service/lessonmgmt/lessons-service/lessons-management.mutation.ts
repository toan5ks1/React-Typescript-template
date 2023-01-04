import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { NsLesson_LessonMgmt_LessonsService } from "src/squads/lesson/service/lessonmgmt/lessons-service/types";
import { InheritedGrpcServiceClient } from "src/squads/lesson/service/service-types";

import { LessonSchedulingStatus } from "manabuf/common/v1/enums_pb";
import { LessonModifierServicePromiseClient } from "manabuf/lessonmgmt/v1/lessons_grpc_web_pb";
import { UpdateLessonSchedulingStatusRequest } from "manabuf/lessonmgmt/v1/lessons_pb";

export function newUpdateStatusLessonRequest(
    lessonId: NsLesson_LessonMgmt_LessonsService.UpdateLessonSchedulingStatusRequest["lessonId"],
    lessonStatus: LessonSchedulingStatus
) {
    const req = new UpdateLessonSchedulingStatusRequest();

    req.setLessonId(lessonId);
    req.setSchedulingStatus(lessonStatus);

    return req;
}

class LessonsManagementServiceLessonMgmt extends InheritedGrpcServiceClient<LessonModifierServicePromiseClient> {
    async updateLessonSchedulingStatus({
        data: lesson,
    }: {
        data: NsLesson_LessonMgmt_LessonsService.UpdateLessonSchedulingStatusRequest;
    }) {
        const request = newUpdateStatusLessonRequest(lesson.lessonId, lesson.schedulingStatus);

        const response = await this._call("updateLessonSchedulingStatus", request);

        return response.toObject();
    }
}

const lessonsServiceLessonMgmt = new LessonsManagementServiceLessonMgmt(
    LessonModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default lessonsServiceLessonMgmt;
