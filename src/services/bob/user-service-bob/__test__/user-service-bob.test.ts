import {
    createMockTeacher,
    createMockTeacherUsersData,
} from "src/squads/user/test-utils/mocks/staff";

import { UserServicePromiseClient } from "manabie-bob/user_grpc_web_pb";
import { UpdateUserProfileResponse } from "manabuf/bob/v1/users_pb";

import userServiceBob from "../user-service-bob";
import { newUpdateUserProfileRequest } from "../user-service-bob.request";

jest.mock("manabie-bob/user_grpc_web_pb", () => {
    const actual = jest.requireActual("manabie-bob/user_grpc_web_pb");

    actual.UserServicePromiseClient.prototype.updateUserProfile = jest.fn();

    return actual;
});

describe("userServiceBob", () => {
    const fakeResponse = {
        toObject: () => {
            const returnValue: UpdateUserProfileResponse.AsObject = {
                successful: true,
            };
            return returnValue;
        },
    };

    beforeEach(() => {
        (UserServicePromiseClient.prototype.updateUserProfile as jest.Mock).mockImplementation(
            () => {
                return fakeResponse;
            }
        );
    });

    it("should return correct result", async () => {
        const previousData = createMockTeacher();
        const data = {
            ...previousData,
            users: createMockTeacherUsersData({ name: "Teacher Name Editted" }),
        };

        const result = await userServiceBob.updateUserProfile({ data });

        expect(result?.data?.teacher_id).toEqual(previousData.teacher_id);
        expect(result?.data?.users?.name).toEqual("Teacher Name Editted");

        expect(UserServicePromiseClient.prototype.updateUserProfile).toBeCalledWith(
            newUpdateUserProfileRequest(data)
        );
    });
});
