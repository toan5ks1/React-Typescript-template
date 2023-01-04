import {
    StudentsManyQueryVariables,
    UserNameByIdsQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { usersService } from "src/squads/communication/service/bob/users-service/users-service";
import { InvalidParamError } from "src/squads/communication/service/service-types";
import {
    createMockStudentMany,
    createMockUserNames,
} from "src/squads/communication/test-utils/query-data";

import usersQueriesBob from "src/squads/communication/service/bob/users-service/users-bob.query";

jest.mock("src/squads/communication/service/bob/users-service/users-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getUserNameList: jest.fn(),
            getStudentsMany: jest.fn(),
        },
    };
});

const mockStudentMany = createMockStudentMany();
const mockStudentNames = createMockUserNames();

describe("users-service communicationGetManyStudents", () => {
    it("should return student list", async () => {
        const studentIds = mockStudentMany.map((student) => student.user_id);

        const queryVariable: StudentsManyQueryVariables = { user_ids: studentIds };

        (usersQueriesBob.getStudentsMany as jest.Mock).mockResolvedValue(mockStudentMany);

        const response = await usersService.query.communicationGetManyStudents(queryVariable);

        expect(usersQueriesBob.getStudentsMany).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockStudentMany);
    });

    it("should empty response when user_ids is undefined", async () => {
        const queryVariable: StudentsManyQueryVariables = { user_ids: undefined };

        (usersQueriesBob.getStudentsMany as jest.Mock).mockResolvedValue(mockStudentMany);

        const response = await usersService.query.communicationGetManyStudents(queryVariable);

        expect(usersQueriesBob.getStudentsMany).not.toBeCalled();
        expect(response).toEqual([]);
    });
});

describe("users-service communicationGetUsernames", () => {
    it("should return student names", async () => {
        const studentIds = mockStudentMany.map((student) => student.user_id);

        const queryVariable: UserNameByIdsQueryVariables = { user_id: studentIds };

        (usersQueriesBob.getUserNameList as jest.Mock).mockResolvedValue(mockStudentNames);

        const response = await usersService.query.communicationGetUsernames(queryVariable);

        expect(usersQueriesBob.getUserNameList).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockStudentNames);
    });

    it("should empty response when user_ids is undefined", async () => {
        const queryVariable: UserNameByIdsQueryVariables = { user_id: undefined };

        await expect(async () => {
            await usersService.query.communicationGetUsernames(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "communicationGetUsernames",
                errors: [
                    {
                        field: "user_id",
                        fieldValueIfNotSensitive: queryVariable.user_id,
                    },
                ],
                serviceName: "bobGraphQL",
            })
        );

        expect(usersQueriesBob.getUserNameList).not.toBeCalled();
    });
});
