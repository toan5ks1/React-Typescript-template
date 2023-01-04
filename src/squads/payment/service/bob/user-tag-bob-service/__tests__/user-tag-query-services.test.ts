import {
    User_CountUserTagByIdsQuery,
    User_CountUserTagByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";
import { userTagQueryService } from "src/squads/payment/service/bob/user-tag-bob-service/user-tag-query-service";

import userTagQueryBob from "src/squads/payment/service/bob/user-tag-bob-service/user-tag-bob.query";

jest.mock("src/squads/payment/service/bob/user-tag-bob-service/user-tag-bob.query", () => {
    return {
        __esModule: true,
        default: {
            countUserTagByIds: jest.fn(),
        },
    };
});

describe("userTagQueryService", () => {
    it("userCountBankByIds", async () => {
        const queryVariable: User_CountUserTagByIdsQueryVariables = {
            userTagIds: ["user-tag-1"],
        };

        const mockReturnValue: User_CountUserTagByIdsQuery["user_tag_aggregate"] = {
            aggregate: {
                count: 1,
            },
        };

        (userTagQueryBob.countUserTagByIds as jest.Mock).mockResolvedValue(mockReturnValue);

        const response = await userTagQueryService.query.userCountUserTagByIds(queryVariable);

        expect(userTagQueryBob.countUserTagByIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockReturnValue);
    });
});
