import { UserGroupMgmtServicePromiseClient } from "manabuf/usermgmt/v2/user_groups_grpc_web_pb";

import userGroupServiceUsermgmt from "../user-group-service-user-mgmt";
import {
    createUserGroupReq,
    updateUserGroupReq,
    validateUserLoginReq,
} from "../user-group-service-user-mgmt.request";

import {
    createMockCreateUserGroupResponse,
    createMockUpdateUserGroupResponse,
    createMockValidateUserLogin,
    createUserGroupReq as mockUserGroupReq,
    updateUserGroupReq as mockUpdateUserGroupReq,
    validateUserLoginReq as mockValidateUserLoginReq,
} from "src/squads/user/test-utils/mocks/userGroups";

jest.mock("manabuf/usermgmt/v2/user_groups_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/usermgmt/v2/user_groups_grpc_web_pb");

    actual.UserGroupMgmtServicePromiseClient.prototype.createUserGroup = jest.fn();
    actual.UserGroupMgmtServicePromiseClient.prototype.updateUserGroup = jest.fn();
    actual.UserGroupMgmtServicePromiseClient.prototype.validateUserLogin = jest.fn();

    return actual;
});
describe("UserGroup Service", () => {
    it("should call create user group method correctly", async () => {
        const mockCreateUserGroupResponse = createMockCreateUserGroupResponse();

        (
            UserGroupMgmtServicePromiseClient.prototype.createUserGroup as jest.Mock
        ).mockImplementation(() => {
            return mockCreateUserGroupResponse;
        });

        const resp = await userGroupServiceUsermgmt.createUserGroup(mockUserGroupReq);
        expect(resp?.userGroupId).toEqual(mockCreateUserGroupResponse.toObject().userGroupId);

        expect(UserGroupMgmtServicePromiseClient.prototype.createUserGroup).toBeCalledWith(
            createUserGroupReq(mockUserGroupReq)
        );
    });
    it("should call update user group method correctly", async () => {
        const mockUpdateUserGroupResponse = createMockUpdateUserGroupResponse();

        (
            UserGroupMgmtServicePromiseClient.prototype.updateUserGroup as jest.Mock
        ).mockImplementation(() => {
            return mockUpdateUserGroupResponse;
        });

        const resp = await userGroupServiceUsermgmt.updateUserGroup(mockUpdateUserGroupReq);
        expect(resp?.successful).toBe(mockUpdateUserGroupResponse.toObject().successful);

        expect(UserGroupMgmtServicePromiseClient.prototype.updateUserGroup).toBeCalledWith(
            updateUserGroupReq(mockUpdateUserGroupReq)
        );
    });
    it("should call validateUserLogin method correctly", async () => {
        const mockValidateUserLoginResponse = createMockValidateUserLogin();

        (
            UserGroupMgmtServicePromiseClient.prototype.validateUserLogin as jest.Mock
        ).mockImplementation(() => {
            return mockValidateUserLoginResponse;
        });

        const resp = await userGroupServiceUsermgmt.validateUserLogin(mockValidateUserLoginReq);
        expect(resp?.allowable).toBe(mockValidateUserLoginResponse.toObject().allowable);

        expect(UserGroupMgmtServicePromiseClient.prototype.validateUserLogin).toBeCalledWith(
            validateUserLoginReq(mockValidateUserLoginReq)
        );
    });
});
