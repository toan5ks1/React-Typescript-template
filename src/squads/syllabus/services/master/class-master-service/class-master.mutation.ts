import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { NsSyllabus_Master_ClassService } from "src/squads/syllabus/services/master/class-master-service/types";
import { InheritedGrpcServiceClient } from "src/squads/syllabus/services/service-types";

import { ClassServicePromiseClient } from "manabuf/mastermgmt/v1/class_grpc_web_pb";
import { UpdateClassRequest, DeleteClassRequest } from "manabuf/mastermgmt/v1/class_pb";

export const newUpdateClassRequest = (
    variables: NsSyllabus_Master_ClassService.UpdateClassRequest
) => {
    const request = new UpdateClassRequest();
    request.setClassId(variables.classId);
    request.setName(variables.name);

    return request;
};

export const newDeleteClassRequest = (
    variables: NsSyllabus_Master_ClassService.DeleteClassRequest
) => {
    const request = new DeleteClassRequest();
    request.setClassId(variables.classId);

    return request;
};

class ClassServiceMaster extends InheritedGrpcServiceClient<ClassServicePromiseClient> {
    async updateClass(variables: NsSyllabus_Master_ClassService.UpdateClassRequest) {
        const request = newUpdateClassRequest(variables);
        await this._call("updateClass", request);

        return { data: { classId: variables.classId } };
    }

    async deleteClass(variables: NsSyllabus_Master_ClassService.DeleteClassRequest) {
        const request = newDeleteClassRequest(variables);

        const response = await this._call("deleteClass", request);

        return { data: response.toObject };
    }
}

const classServiceMaster = new ClassServiceMaster(
    ClassServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default classServiceMaster;
