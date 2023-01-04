import {
    User_CountSchoolLevelByIdsQuery,
    User_CountSchoolLevelByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";
import { schoolLevelQueryService } from "src/squads/payment/service/bob/school-level-bob-service/school-level-query-service";

import schoolLevelQueryBob from "src/squads/payment/service/bob/school-level-bob-service/school-level-bob.query";

jest.mock("src/squads/payment/service/bob/school-level-bob-service/school-level-bob.query", () => {
    return {
        __esModule: true,
        default: {
            countSchoolLevelByIds: jest.fn(),
        },
    };
});

describe("schoolLevelQueryService", () => {
    it("userCountBankByIds", async () => {
        const queryVariable: User_CountSchoolLevelByIdsQueryVariables = {
            schoolLevelIds: ["school-level-1"],
        };

        const mockReturnValue: User_CountSchoolLevelByIdsQuery["school_level_aggregate"] = {
            aggregate: {
                count: 1,
            },
        };

        (schoolLevelQueryBob.countSchoolLevelByIds as jest.Mock).mockResolvedValue(mockReturnValue);

        const response = await schoolLevelQueryService.query.userCountSchoolLevelByIds(
            queryVariable
        );

        expect(schoolLevelQueryBob.countSchoolLevelByIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockReturnValue);
    });
});
