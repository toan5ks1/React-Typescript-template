import { fileToPayload } from "src/common/utils/file";
import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { InheritedGrpcServiceClient } from "src/squads/payment/service/service-types";

import { ClassServicePromiseClient } from "manabuf/mastermgmt/v1/class_grpc_web_pb";
import { ImportClassRequest } from "manabuf/mastermgmt/v1/class_pb";

export const newImportClassRequest = async (file: File) => {
    const request = new ImportClassRequest();

    const filePayload = await fileToPayload(file);
    request.setPayload(filePayload);

    return request;
};

class ClassMutationServiceMaster extends InheritedGrpcServiceClient<ClassServicePromiseClient> {
    async importClass(file: File) {
        const request = await newImportClassRequest(file);
        const response = await this._call("importClass", request);
        return response.toObject();
    }
}

const classModifierMutationService = new ClassMutationServiceMaster(
    ClassServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default classModifierMutationService;
