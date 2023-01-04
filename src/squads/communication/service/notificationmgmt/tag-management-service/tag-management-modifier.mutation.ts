import appConfigs from "src/internals/configuration";
import { formInvalidErr } from "src/internals/errors";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/communication/service/service-types";

import { TagMgmtModifierServicePromiseClient } from "manabuf/notificationmgmt/v1/tags_grpc_web_pb";
import { UpsertTagRequest, UpsertTagResponse } from "manabuf/notificationmgmt/v1/tags_pb";

import { MutationParams } from "@manabie-com/react-utils";

function validateUpsertTag(data?: UpsertTagRequest.AsObject) {
    if (!data || !data.name) {
        throw formInvalidErr;
    }
}

export const createUpsertTagRequest = (data: UpsertTagRequest.AsObject): UpsertTagRequest => {
    const req = new UpsertTagRequest();

    req.setTagId(data.tagId);
    req.setName(data.name);

    return req;
};

class tagManagementNotificationMutationService extends InheritedGrpcServiceClient<TagMgmtModifierServicePromiseClient> {
    async upsertTag({
        data,
    }: MutationParams<UpsertTagRequest.AsObject>): Promise<UpsertTagResponse.AsObject> {
        validateUpsertTag(data);
        const req = createUpsertTagRequest(data!);

        const resp = await this._call("upsertTag", req);

        return resp.toObject();
    }
}

const tagManagementMutationService = new tagManagementNotificationMutationService(
    TagMgmtModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default tagManagementMutationService;
