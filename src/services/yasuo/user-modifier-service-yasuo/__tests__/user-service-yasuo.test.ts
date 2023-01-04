import { formInvalidErr } from "src/internals/errors";
import { getFakeLocalUser, getFakeCreateUserResponse } from "src/test-utils/user";

import { UserGroup } from "manabie-yasuo/enum_pb";
import { UserModifierServicePromiseClient } from "manabuf/yasuo/v1/users_grpc_web_pb";

import { NsYasuoUserService } from "../types";
import userServiceYasuo from "../user-modifier-service-yasuo";
import { newCreateUserReq, validateCreateUser } from "../user-modifier-service-yasuo.request";

jest.mock("manabuf/yasuo/v1/users_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/yasuo/v1/users_grpc_web_pb");

    actual.UserModifierServicePromiseClient.prototype.createUser = jest.fn();
    return actual;
});

const validCreateUser: NsYasuoUserService.CreateUser = {
    user: {
        name: "Lộc",
        email: "loc.nguyen@manabie.com",
        phone_number: "08371308554",
    },
    current_grade: 1,
    country: "COUNTRY_VN",
    user_group: UserGroup.USER_GROUP_SCHOOL_ADMIN,
    school_id: 2,
};
const validCreateUser1: NsYasuoUserService.CreateUser = {
    user: {
        name: "Lộc",
        email: "loc.nguyen@manabie.com",
        phone_number: "08371308554",
    },
    current_grade: 1,
    country: "COUNTRY_VN",
    user_group: UserGroup.USER_GROUP_TEACHER,
    school_id: 2,
};

describe("create user account", () => {
    const original = UserModifierServicePromiseClient.prototype.createUser;
    beforeEach(() => {
        (UserModifierServicePromiseClient.prototype.createUser as jest.Mock).mockImplementation(
            () => {
                return getFakeCreateUserResponse();
            }
        );
    });
    afterEach(() => {
        UserModifierServicePromiseClient.prototype.createUser = original;
        jest.resetAllMocks();
    });

    it("should create user account", async () => {
        const useProfile = getFakeLocalUser();
        const request = {
            data: validCreateUser,
        };
        await userServiceYasuo.createUser(request, useProfile);

        expect(UserModifierServicePromiseClient.prototype.createUser).toBeCalledWith(
            await newCreateUserReq(validCreateUser, useProfile)
        );
    });

    it("should create user account with group teacher", async () => {
        const useProfile = getFakeLocalUser();
        const request = {
            data: validCreateUser1,
        };
        await userServiceYasuo.createUser(request, useProfile);

        expect(UserModifierServicePromiseClient.prototype.createUser).toBeCalledWith(
            await newCreateUserReq(validCreateUser1, useProfile)
        );
    });

    it("should create user account but submit inValid data", async () => {
        const useProfile = getFakeLocalUser();
        expect(() => validateCreateUser(useProfile, "email")).toThrowError(formInvalidErr);
        expect(UserModifierServicePromiseClient.prototype.createUser).not.toBeCalled();
    });
});
