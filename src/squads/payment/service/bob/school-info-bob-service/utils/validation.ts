import uniq from "lodash/uniq";
import { arrayHasItem } from "src/common/utils/other";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";
import { InvalidParamError } from "src/squads/payment/service/service-types";

import { SchoolInfoCSV } from "../types";

const SCHOOL_INFO_FIELDS = [
    "school_id",
    "school_name",
    "school_name_phonetic",
    "school_level_id",
    "school_partner_id",
    "address",
    "is_archived",
];

export const validationError = new InvalidParamError({
    action: "ImportSchoolInfoValidateCSVFile",
    serviceName: "bobGraphQL",
    errors: [{ field: "payload" }],
});

export async function validateSchoolInfoImportData(data: SchoolInfoCSV[]) {
    if (!data || !arrayHasItem(data)) {
        throw validationError;
    }

    // check header data correctly
    const headers = Object.keys(data[0]);
    if (
        headers.length !== SCHOOL_INFO_FIELDS.length ||
        headers.some((header) => !SCHOOL_INFO_FIELDS.includes(header))
    ) {
        throw validationError;
    }

    // check data correctly
    if (
        data.some(({ school_name, school_partner_id, school_level_id, is_archived }) => {
            // check all required field
            if (
                school_name === "" ||
                school_partner_id === "" ||
                school_level_id === "" ||
                is_archived === ""
            ) {
                return true;
            }

            // check is_archived value is 0 or 1
            if (![0, 1].includes(Number(is_archived))) {
                return true;
            }

            return false;
        })
    ) {
        throw validationError;
    }

    // check valid school_ids
    const schoolInfoIds = data
        .filter((record) => record.school_id !== "")
        .map((schoolInfo) => schoolInfo.school_id);
    const schoolInfoIdsUniq = uniq(schoolInfoIds);

    if (arrayHasItem(schoolInfoIdsUniq)) {
        const countResponse = await inferStandaloneQuery({
            entity: "schoolInfo",
            action: "userCountSchoolInfoByIds",
        })({ schoolInfoIds: schoolInfoIdsUniq });

        if (!countResponse || countResponse.count !== schoolInfoIdsUniq.length) {
            throw validationError;
        }
    }

    // check valid school_level_ids
    const schoolLevelIds = data
        .filter((record) => record.school_level_id !== "")
        .map((schoolInfo) => schoolInfo.school_level_id);
    const schoolLevelIdsUniq = uniq(schoolLevelIds);

    if (arrayHasItem(schoolLevelIdsUniq)) {
        const countSchoolLevelResponse = await inferStandaloneQuery({
            entity: "schoolLevel",
            action: "userCountSchoolLevelByIds",
        })({ schoolLevelIds: schoolLevelIdsUniq });

        if (
            !countSchoolLevelResponse ||
            countSchoolLevelResponse.count !== schoolLevelIdsUniq.length
        ) {
            throw validationError;
        }
    }
}
