import uniq from "lodash/uniq";
import { arrayHasItem } from "src/common/utils/other";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";
import { InvalidParamError } from "src/squads/payment/service/service-types";

import { SchoolLevelCSV } from "../types";

const SCHOOL_LEVEL_FIELDS = ["school_level_id", "school_level_name", "sequence", "is_archived"];
export const validationError = new InvalidParamError({
    action: "ImportSchoolLevelValidateCSVFile",
    serviceName: "bobGraphQL",
    errors: [{ field: "payload" }],
});

export async function validateSchoolLevelImportData(data: SchoolLevelCSV[]) {
    if (!data || !arrayHasItem(data)) {
        throw validationError;
    }

    // check header data correctly
    const headers = Object.keys(data[0]);
    if (
        headers.length !== SCHOOL_LEVEL_FIELDS.length ||
        headers.some((header) => !SCHOOL_LEVEL_FIELDS.includes(header))
    ) {
        throw validationError;
    }

    // check data correctly
    if (
        data.some(({ school_level_name, sequence, is_archived }) => {
            // check all required field
            if (school_level_name === "" || sequence === "" || is_archived === "") {
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

    // check valid school_level_ids
    const schoolLevelIds = data
        .filter((record) => record.school_level_id !== "")
        .map((schoolInfo) => schoolInfo.school_level_id);
    const schoolLevelIdsUniq = uniq(schoolLevelIds);

    if (arrayHasItem(schoolLevelIdsUniq)) {
        const countResponse = await inferStandaloneQuery({
            entity: "schoolLevel",
            action: "userCountSchoolLevelByIds",
        })({ schoolLevelIds: schoolLevelIdsUniq });

        if (!countResponse || countResponse.count !== schoolLevelIdsUniq.length) {
            throw validationError;
        }
    }
}
