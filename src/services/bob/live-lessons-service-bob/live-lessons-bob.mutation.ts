import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";

import { LessonReaderServicePromiseClient } from "manabuf/bob/v1/lessons_grpc_web_pb";
import { RetrieveLessonsRequest } from "manabuf/bob/v1/lessons_pb";

import { InheritedGrpcServiceClient } from "../../service-types";
import { newRetrieveLessonReq } from "./live-lessons-bob.request";

class LessonServiceBob extends InheritedGrpcServiceClient<LessonReaderServicePromiseClient> {
    async retrieveLesson(params: RetrieveLessonsRequest.AsObject) {
        const req = newRetrieveLessonReq(params);
        const resp = await this._call("retrieveLessons", req);
        return { data: resp.toObject() };
    }
}

const lessonServiceBob = new LessonServiceBob(
    LessonReaderServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default lessonServiceBob;
