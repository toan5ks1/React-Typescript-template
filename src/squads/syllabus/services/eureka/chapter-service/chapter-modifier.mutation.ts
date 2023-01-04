import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/syllabus/services/service-types";

import { ChapterModifierServicePromiseClient } from "manabuf/eureka/v1/chapter_modifier_grpc_web_pb";

import {
    createUpsertChaptersRequest,
    validateUpsertChapters,
    createDeleteChaptersRequest,
    validateDeleteChapters,
} from "./chapter-modifier.request";
import NsSyllabus_ChapterService from "./types";

class ChapterModifierService extends InheritedGrpcServiceClient<ChapterModifierServicePromiseClient> {
    async upsertChapters(payload: NsSyllabus_ChapterService.UpsertChapters) {
        validateUpsertChapters(payload);

        const request = createUpsertChaptersRequest(payload);

        const response = await this._call("upsertChapters", request);

        return response.toObject();
    }

    async deleteChapters(payload: NsSyllabus_ChapterService.DeleteChapters) {
        validateDeleteChapters(payload);

        const request = createDeleteChaptersRequest(payload);

        const response = await this._call("deleteChapters", request);

        return response.toObject();
    }
}

const chapterModifierService = new ChapterModifierService(
    ChapterModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default chapterModifierService;
