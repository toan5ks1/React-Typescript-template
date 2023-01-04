import {
    User_CountSchoolInfoByIdsQuery,
    User_CountSchoolInfoByIdsQueryVariables,
    User_CountSchoolInfoByPartnerIdsQuery,
    User_CountSchoolInfoByPartnerIdsQueryVariables,
    User_GetSchoolInfoIdByPartnerIdsQuery,
    User_GetSchoolInfoIdByPartnerIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";
import { schoolInfoQueryService } from "src/squads/payment/service/bob/school-info-bob-service/school-info-query-service";

import schoolInfoQueryBob from "src/squads/payment/service/bob/school-info-bob-service/school-info-bob.query";

jest.mock("src/squads/payment/service/bob/school-info-bob-service/school-info-bob.query", () => {
    return {
        __esModule: true,
        default: {
            countSchoolInfoByIds: jest.fn(),
            countSchoolInfoByPartnerIds: jest.fn(),
            getSchoolInfoIdByPartnerIds: jest.fn(),
        },
    };
});

describe("schoolInfoQueryService", () => {
    it("countSchoolInfoByIds", async () => {
        const queryVariable: User_CountSchoolInfoByIdsQueryVariables = {
            schoolInfoIds: ["school-1"],
        };

        const mockReturnValue: User_CountSchoolInfoByIdsQuery["school_info_aggregate"] = {
            aggregate: {
                count: 1,
            },
        };

        (schoolInfoQueryBob.countSchoolInfoByIds as jest.Mock).mockResolvedValue(mockReturnValue);

        const response = await schoolInfoQueryService.query.userCountSchoolInfoByIds(queryVariable);

        expect(schoolInfoQueryBob.countSchoolInfoByIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockReturnValue);
    });

    it("countSchoolInfoByPartnerIds", async () => {
        const queryVariable: User_CountSchoolInfoByPartnerIdsQueryVariables = {
            schoolPartnerIds: ["partner-school-1"],
        };

        const mockReturnValue: User_CountSchoolInfoByPartnerIdsQuery["school_info_aggregate"] = {
            aggregate: {
                count: 1,
            },
        };

        (schoolInfoQueryBob.countSchoolInfoByPartnerIds as jest.Mock).mockResolvedValue(
            mockReturnValue
        );

        const response = await schoolInfoQueryService.query.userCountSchoolInfoByPartnerIds(
            queryVariable
        );

        expect(schoolInfoQueryBob.countSchoolInfoByPartnerIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockReturnValue);
    });

    it("getSchoolInfoIdByPartnerIds", async () => {
        const queryVariable: User_GetSchoolInfoIdByPartnerIdsQueryVariables = {
            schoolPartnerIds: ["partner-school-1"],
        };

        const mockReturnValue: User_GetSchoolInfoIdByPartnerIdsQuery["school_info"] = [
            {
                school_id: "school-1",
                school_partner_id: "partner-school-1",
            },
        ];

        (schoolInfoQueryBob.getSchoolInfoIdByPartnerIds as jest.Mock).mockResolvedValue(
            mockReturnValue
        );

        const response = await schoolInfoQueryService.query.getSchoolInfoIdByPartnerIds(
            queryVariable
        );

        expect(schoolInfoQueryBob.getSchoolInfoIdByPartnerIds).toBeCalledWith(queryVariable);
        expect(response).toEqual(mockReturnValue);
    });
});
