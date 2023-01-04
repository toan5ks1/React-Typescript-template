import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/services/service-types";

import { LessonManagementServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";

import {
    newCreateLessonRequest,
    newDeleteLessonRequest,
    newRetrieveLessonsRequestV2Req,
    newUpdateLessonRequest,
    validateUpsertLesson,
} from "./lesson-management-bob.request";
import { NsBobLessonManagementService } from "./types";

class LessonManagementServiceBob extends InheritedGrpcServiceClient<LessonManagementServicePromiseClient> {
    async createLesson({ data: lesson }: { data: NsBobLessonManagementService.UpsertLessons }) {
        validateUpsertLesson(lesson, "CREATE");

        const req = newCreateLessonRequest(lesson);
        const result = await this._call("createLesson", req);
        return result.toObject();
    }

    async updateLesson({ data: lesson }: { data: NsBobLessonManagementService.UpsertLessons }) {
        validateUpsertLesson(lesson, "EDIT");

        const req = newUpdateLessonRequest(lesson);
        const result = await this._call("updateLesson", req);
        return result.toObject();
    }

    async deleteLesson({
        data: lesson,
    }: {
        data: NsBobLessonManagementService.DeleteLessonRequest;
    }) {
        const req = newDeleteLessonRequest(lesson.lessonId);

        const result = await this._call("deleteLesson", req);
        return result.toObject();
    }

    async retrieveLessons(params: NsBobLessonManagementService.RetrieveLessonsRequest) {
        const request = newRetrieveLessonsRequestV2Req(params);

        const response = await this._call("retrieveLessons", request);

        return { data: response.toObject() };
    }
}

const lessonManagementServiceBob = new LessonManagementServiceBob(
    LessonManagementServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default lessonManagementServiceBob;
