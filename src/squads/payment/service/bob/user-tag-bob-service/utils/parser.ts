import { getEnumString } from "src/common/constants/helper";
import { genId } from "src/common/utils/id-generator";
import { User_ImportUserTagsMutationVariables } from "src/squads/payment/service/bob/bob-types";

import { UserTagType } from "manabuf/usermgmt/v2/enums_pb";

import { UserTagCSV } from "../types";

export function convertToImportUserTagData(
    data: UserTagCSV[]
): User_ImportUserTagsMutationVariables["data"] {
    return data.map(({ user_tag_id, user_tag_partner_id, user_tag_name, type, is_archived }) => ({
        user_tag_id: user_tag_id || genId(),
        user_tag_partner_id,
        user_tag_name,
        user_tag_type: getEnumString(UserTagType, Number(type)),
        is_archived: Boolean(Number(is_archived)),
    }));
}
