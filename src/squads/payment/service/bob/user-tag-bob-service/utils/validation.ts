import uniq from "lodash/uniq";
import { getEnumString } from "src/common/constants/helper";
import { arrayHasItem } from "src/common/utils/other";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";
import { InvalidParamError } from "src/squads/payment/service/service-types";

import { UserTagType } from "manabuf/usermgmt/v2/enums_pb";

import { UserTagCSV } from "../types";

const USER_TAG_FIELDS = [
    "user_tag_id",
    "user_tag_partner_id",
    "user_tag_name",
    "type",
    "is_archived",
];

export const validationError = new InvalidParamError({
    action: "ImportUserTagValidateCSVFile",
    serviceName: "bobGraphQL",
    errors: [{ field: "payload" }],
});

export async function validateUserTagImportData(data: UserTagCSV[]) {
    if (!data || !arrayHasItem(data)) {
        throw validationError;
    }

    // check header data correctly
    const headers = Object.keys(data[0]);
    if (
        headers.length !== USER_TAG_FIELDS.length ||
        headers.some((header) => !USER_TAG_FIELDS.includes(header))
    ) {
        throw validationError;
    }

    // check data correctly
    if (
        data.some(({ user_tag_partner_id, user_tag_name, type, is_archived }) => {
            // check all required field
            if (
                user_tag_partner_id === "" ||
                user_tag_name === "" ||
                type === "" ||
                is_archived === ""
            ) {
                return true;
            }

            // check is_archived value is 0 or 1
            if (![0, 1].includes(Number(is_archived))) {
                return true;
            }

            // check type value correcly
            const configType = getEnumString(UserTagType, Number(type));

            if (configType === "") return true;

            return false;
        })
    ) {
        throw validationError;
    }

    // check valid user_tag_ids
    const userTagIds = data
        .filter((record) => record.user_tag_id !== "")
        .map((userTag) => userTag.user_tag_id);
    const userTagIdsUniq = uniq(userTagIds);

    if (arrayHasItem(userTagIdsUniq)) {
        const countResponse = await inferStandaloneQuery({
            entity: "userTag",
            action: "userCountUserTagByIds",
        })({ userTagIds: userTagIdsUniq });

        if (!countResponse || countResponse.count !== userTagIdsUniq.length) {
            throw validationError;
        }
    }
}
