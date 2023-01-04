import { getEnumString } from "src/common/constants/helper";
import { User_ImportUserTagsMutationVariables } from "src/squads/payment/service/bob/bob-types";

import { UserTagType } from "manabuf/usermgmt/v2/enums_pb";

import { UserTagCSV } from "../../types";
import { convertToImportUserTagData } from "../parser";

jest.mock("src/common/utils/id-generator", () => ({
    genId: () => "id",
}));

const mockCSVData: UserTagCSV[] = [
    {
        user_tag_id: "",
        user_tag_name: "User Tag 1",
        user_tag_partner_id: "user-tag-partner-1",
        type: "0",
        is_archived: "0",
    },
    {
        user_tag_id: "user-tag-2",
        user_tag_name: "User Tag 2",
        user_tag_partner_id: "user-tag-partner-2",
        type: "1",
        is_archived: "1",
    },
];

const mockReturnValue: User_ImportUserTagsMutationVariables["data"] = [
    {
        user_tag_id: "id",
        user_tag_partner_id: "user-tag-partner-1",
        user_tag_name: "User Tag 1",
        user_tag_type: getEnumString(UserTagType, 0),
        is_archived: false,
    },
    {
        user_tag_id: "user-tag-2",
        user_tag_partner_id: "user-tag-partner-2",
        user_tag_name: "User Tag 2",
        user_tag_type: getEnumString(UserTagType, 1),
        is_archived: true,
    },
];

describe("convertToImportUserTagData", () => {
    it("should return data correctly", () => {
        const result = convertToImportUserTagData(mockCSVData);

        expect(result).toEqual(mockReturnValue);
    });
});
