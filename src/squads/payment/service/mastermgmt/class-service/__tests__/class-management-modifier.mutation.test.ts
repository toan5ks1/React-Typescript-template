import { ClassServicePromiseClient } from "manabuf/mastermgmt/v1/class_grpc_web_pb";

import classModifierMutationService from "src/squads/payment/service/mastermgmt/class-service/class-management-modifier.mutation";

jest.mock("manabuf/mastermgmt/v1/class_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/mastermgmt/v1/class_grpc_web_pb");

    actual.ClassServicePromiseClient.prototype.importClass = jest.fn();

    return actual;
});

const fakeReturn = {
    toObject: jest.fn(),
};

describe("import class", () => {
    it("should successfully import class with valid payload", async () => {
        (ClassServicePromiseClient.prototype.importClass as jest.Mock).mockImplementation(() => {
            return fakeReturn;
        });

        const filePayload: File = new File([], "newFile.csv");

        await classModifierMutationService.importClass(filePayload);

        expect(ClassServicePromiseClient.prototype.importClass).toBeCalled();
    });
});
