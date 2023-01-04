import { User_ImportSchoolLevelGradesMutationVariables } from "src/squads/payment/service/bob/bob-types";

import { SchoolLevelGradeCSV } from "../types";

export function convertToImportSchoolLevelGradeData(
    data: SchoolLevelGradeCSV[]
): User_ImportSchoolLevelGradesMutationVariables["data"] {
    return data.map(({ school_level_id, grade_id }) => ({
        school_level_id,
        grade_id,
    }));
}
