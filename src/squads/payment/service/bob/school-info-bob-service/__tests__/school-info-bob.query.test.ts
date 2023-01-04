import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/payment/internals/hasura-client/execute-query";
import {
    User_CountSchoolInfoByIdsQuery,
    User_CountSchoolInfoByIdsQueryVariables,
    User_CountSchoolInfoByPartnerIdsQuery,
    User_CountSchoolInfoByPartnerIdsQueryVariables,
    User_GetSchoolInfoIdByPartnerIdsQuery,
    User_GetSchoolInfoIdByPartnerIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import schoolInfoQueryBob from "src/squads/payment/service/bob/school-info-bob-service/school-info-bob.query";

jest.mock("src/squads/payment/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

describe("schoolInfoQueryBob", () => {
    it("countSchoolInfoByIds", async () => {
        const mockResult = {
            count: 1,
        };

        const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_CountSchoolInfoByIdsQuery> = {
            data: {
                school_info_aggregate: {
                    aggregate: mockResult,
                },
            },
        };

        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: User_CountSchoolInfoByIdsQueryVariables = {
            schoolInfoIds: ["school-1"],
        };

        const result = await schoolInfoQueryBob.countSchoolInfoByIds(variables);

        expect(result).toEqual(mockResult);
    });

    it("countSchoolInfoByPartnerIds", async () => {
        const mockResult = {
            count: 1,
        };

        const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_CountSchoolInfoByPartnerIdsQuery> =
            {
                data: {
                    school_info_aggregate: {
                        aggregate: mockResult,
                    },
                },
            };

        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: User_CountSchoolInfoByPartnerIdsQueryVariables = {
            schoolPartnerIds: ["partner-school-1"],
        };

        const result = await schoolInfoQueryBob.countSchoolInfoByPartnerIds(variables);

        expect(result).toEqual(mockResult);
    });

    it("getSchoolInfoIdByPartnerIds", async () => {
        const mockResult = [
            {
                school_id: "school-1",
                school_partner_id: "partner-school-1",
            },
        ];

        const mockDoQueryReturnValue: HasuraAndDefaultResponse<User_GetSchoolInfoIdByPartnerIdsQuery> =
            {
                data: {
                    school_info: mockResult,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(mockDoQueryReturnValue);

        const variables: User_GetSchoolInfoIdByPartnerIdsQueryVariables = {
            schoolPartnerIds: ["partner-school-1"],
        };

        const result = await schoolInfoQueryBob.getSchoolInfoIdByPartnerIds(variables);

        expect(result).toEqual(mockResult);
    });
});
