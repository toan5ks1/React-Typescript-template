import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";

import { LearningObjectiveModifierServicePromiseClient } from "manabuf/eureka/v1/learning_objective_modifier_grpc_web_pb";

import { InheritedGrpcServiceClient } from "../../service-types";
import { validateDeleteLos } from "../../yasuo/courses-service-yasuo/courses-yasuo.mutation";
import {
    createUpsertLOsRequest,
    createDeleteLOsRequest,
    validateUpsertLOs,
} from "./learning-objective-modifier.request";
import NsSyllabus_LearningObjectiveService from "./types";

class LearningObjectiveModifierService extends InheritedGrpcServiceClient<LearningObjectiveModifierServicePromiseClient> {
    async upsertLOs(payload: NsSyllabus_LearningObjectiveService.UpsertLOs) {
        validateUpsertLOs(payload);

        const request = createUpsertLOsRequest(payload);

        const response = await this._call("upsertLOs", request);

        return response.toObject();
    }

    async deleteLOs(payload: NsSyllabus_LearningObjectiveService.DeleteLOs) {
        validateDeleteLos(payload);

        const request = createDeleteLOsRequest(payload);

        const response = await this._call("deleteLos", request);

        return response.toObject();
    }
}

const learningObjectiveModifierService = new LearningObjectiveModifierService(
    LearningObjectiveModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default learningObjectiveModifierService;
