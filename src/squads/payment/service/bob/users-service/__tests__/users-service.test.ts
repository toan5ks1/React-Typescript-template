import {
    UserNameByIdsQuery,
    UserNameByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";
import { usersService } from "src/squads/payment/service/bob/users-service/users-service";
import { InvalidParamError } from "src/squads/payment/service/service-types";

import usersQueriesBob from "src/squads/payment/service/bob/users-service/users-bob.query";

jest.mock("src/squads/payment/service/bob/users-service/users-bob.query", () => {
    return {
        __esModule: true,
        default: {
            getUserNameList: jest.fn(),
        },
    };
});

describe("users-service", () => {
    it("should return list of userNames when calling paymentGetTitleListByUserId", async () => {
        const mockUserId = "user_id_1";
        const queryVariable: UserNameByIdsQueryVariables = {
            user_id: mockUserId,
        };

        const mockQueryReturn: UserNameByIdsQuery["users"] = [
            {
                user_id: mockUserId,
                name: "user name",
            },
        ];

        (usersQueriesBob.getUserNameList as jest.Mock).mockResolvedValue(mockQueryReturn);

        const response = await usersService.query.paymentGetTitleListByUserId(queryVariable);

        expect(usersQueriesBob.getUserNameList).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockQueryReturn);
    });

    it("should throw an error if user_id is empty when calling paymentGetTitleListByUserId", async () => {
        const queryVariable: UserNameByIdsQueryVariables = {
            user_id: "",
        };

        await expect(async () => {
            await usersService.query.paymentGetTitleListByUserId(queryVariable);
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "paymentGetTitleListByUserId",
                errors: [{ field: "user_id", fieldValueIfNotSensitive: queryVariable }],
                serviceName: "bobGraphQL",
            })
        );

        expect(usersQueriesBob.getUserNameList).not.toBeCalled();
    });
});
