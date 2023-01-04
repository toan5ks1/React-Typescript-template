import { createUserGroupReq, updateUserGroupReq } from "../user-group-service-user-mgmt.request";

import {
    createUserGroupReq as mockCreateUserGroupReq,
    updateUserGroupReq as mockUpdateUserGroupReq,
} from "src/squads/user/test-utils/mocks/userGroups";

describe("Create user group request", () => {
    it("should return correctly request", () => {
        const userGroupReq = createUserGroupReq(mockCreateUserGroupReq);
        expect(userGroupReq.toObject().userGroupName).toEqual(mockCreateUserGroupReq.userGroupName);
        expect(userGroupReq.toObject().roleWithLocationsList).toEqual(
            mockCreateUserGroupReq.roleWithLocationsList
        );
    });
});

describe("Update user group request", () => {
    it("should return correctly request", () => {
        const userGroupReq = updateUserGroupReq(mockUpdateUserGroupReq);
        expect(userGroupReq.toObject().userGroupId).toEqual(mockUpdateUserGroupReq.userGroupId);
        expect(userGroupReq.toObject().userGroupName).toEqual(mockUpdateUserGroupReq.userGroupName);
        expect(userGroupReq.toObject().roleWithLocationsList).toEqual(
            mockUpdateUserGroupReq.roleWithLocationsList
        );
    });
});
