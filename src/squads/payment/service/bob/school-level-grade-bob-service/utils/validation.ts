import uniq from "lodash/uniq";
import { arrayHasItem } from "src/common/utils/other";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";
import { InvalidParamError } from "src/squads/payment/service/service-types";

import { SchoolLevelGradeCSV } from "../types";

const SCHOOL_LEVEL_GRADE_FIELDS = ["school_level_id", "grade_id"];

export const validationError = new InvalidParamError({
    action: "ImportSchoolLevelGradeValidateCSVFile",
    serviceName: "bobGraphQL",
    errors: [{ field: "payload" }],
});

export async function validateSchoolLevelGradeImportData(data: SchoolLevelGradeCSV[]) {
    if (!data || !arrayHasItem(data)) {
        throw validationError;
    }

    // check header data correctly
    const headers = Object.keys(data[0]);
    if (
        headers.length !== SCHOOL_LEVEL_GRADE_FIELDS.length ||
        headers.some((header) => !SCHOOL_LEVEL_GRADE_FIELDS.includes(header))
    ) {
        throw validationError;
    }

    // check data correctly
    if (
        data.some(({ school_level_id, grade_id }) => {
            // check all required field
            if (school_level_id === "" || grade_id === "") {
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
        .map((schoolLevel) => schoolLevel.school_level_id);
    const schoolLevelIdsUniq = uniq(schoolLevelIds);

    const countResponse = await inferStandaloneQuery({
        entity: "schoolLevel",
        action: "userCountSchoolLevelByIds",
    })({ schoolLevelIds: schoolLevelIdsUniq });

    if (!countResponse || countResponse.count !== schoolLevelIdsUniq.length) {
        throw validationError;
    }

    // check valid grade_ids
    const gradeIds = data
        .filter((record) => record.grade_id !== "")
        .map((record) => record.grade_id);
    const gradeIdsUniq = uniq(gradeIds);

    const countSchoolInfoResponse = await inferStandaloneQuery({
        entity: "grade",
        action: "userCountGradeByIds",
    })({ gradeIds: gradeIdsUniq });

    if (!countSchoolInfoResponse || countSchoolInfoResponse.count !== gradeIdsUniq.length) {
        throw validationError;
    }
}
