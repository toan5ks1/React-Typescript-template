import { NsSyllabus_Master_ClassService } from "src/squads/syllabus/services/master/class-master-service/types";

import { ClassServicePromiseClient } from "manabuf/mastermgmt/v1/class_grpc_web_pb";

import classServiceMaster, {
    newDeleteClassRequest,
    newUpdateClassRequest,
} from "src/squads/syllabus/services/master/class-master-service/class-master.mutation";

jest.mock("manabuf/mastermgmt/v1/class_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/mastermgmt/v1/class_grpc_web_pb");

    actual.ClassServicePromiseClient.prototype.updateClass = jest.fn();
    actual.ClassServicePromiseClient.prototype.deleteClass = jest.fn();
    return actual;
});

describe("classes-modifier.mutation", () => {
    it("should call gRPC updateClass", async () => {
        (ClassServicePromiseClient.prototype.updateClass as jest.Mock).mockReturnValue({});

        const _callSpy = jest.spyOn(classServiceMaster, "_call");

        const variables: NsSyllabus_Master_ClassService.UpdateClassRequest = {
            classId: "class_id",
            name: "class_name",
        };

        const response = await classServiceMaster.updateClass(variables);

        expect(_callSpy).toBeCalledWith("updateClass", newUpdateClassRequest(variables));
        expect(response).toEqual({ data: { classId: variables.classId } });
    });
});

describe("classes-modifier.mutation", () => {
    it("should call gRPC deleteClass", async () => {
        (ClassServicePromiseClient.prototype.deleteClass as jest.Mock).mockReturnValue({});

        const _callSpy = jest.spyOn(classServiceMaster, "_call");

        const variables: NsSyllabus_Master_ClassService.DeleteClassRequest = {
            classId: "class_id",
        };

        await classServiceMaster.deleteClass(variables);

        expect(_callSpy).toBeCalledWith("deleteClass", newDeleteClassRequest(variables));
    });
});
