import {
    createFakeProtoResponse,
    createMockClass,
} from "src/squads/syllabus/test-utils/service/mutation";

import { LearningObjectiveModifierServicePromiseClient } from "manabuf/eureka/v1/learning_objective_modifier_grpc_web_pb";

import learningObjectiveModifierService from "../learning-objective-modifier.mutation";
import {
    createDeleteLOsRequest,
    createUpsertLOsRequest,
} from "../learning-objective-modifier.request";
import { createMockDataUpsertLOs } from "./data";

describe(learningObjectiveModifierService.upsertLOs.name, () => {
    const payload = createMockDataUpsertLOs();
    const response = "response_upsertLOs";

    beforeEach(() => {
        createMockClass<LearningObjectiveModifierServicePromiseClient>(
            LearningObjectiveModifierServicePromiseClient,
            {
                upsertLOs: () => createFakeProtoResponse(response),
            }
        );
    });

    it("should return correct data after successfully (object of response)", async () => {
        const resp = await learningObjectiveModifierService.upsertLOs(payload);

        expect(resp).toEqual(response);
    });

    it("should call upsertLOs with correct payload", async () => {
        await learningObjectiveModifierService.upsertLOs(payload);

        expect(LearningObjectiveModifierServicePromiseClient.prototype.upsertLOs).toBeCalledWith(
            createUpsertLOsRequest(payload)
        );
    });
});

describe(learningObjectiveModifierService.deleteLOs.name, () => {
    it("should return correct request and response after success", async () => {
        const response = "response_deleteLos";

        createMockClass(LearningObjectiveModifierServicePromiseClient, {
            deleteLos: () => createFakeProtoResponse(response),
        });

        const request = createDeleteLOsRequest({ loIdsList: ["lo_id"] });

        const result = await learningObjectiveModifierService.deleteLOs({ loIdsList: ["lo_id"] });

        expect(result).toEqual(response);
        expect(LearningObjectiveModifierServicePromiseClient.prototype.deleteLos).toBeCalledWith(
            request
        );
    });
});
