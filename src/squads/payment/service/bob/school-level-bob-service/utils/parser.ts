import { genId } from "src/common/utils/id-generator";
import { User_ImportSchoolLevelsMutationVariables } from "src/squads/payment/service/bob/bob-types";

import { SchoolLevelCSV } from "../types";

export function convertToImportSchoolLevelData(
    data: SchoolLevelCSV[]
): User_ImportSchoolLevelsMutationVariables["data"] {
    return data.map(({ school_level_name, school_level_id, sequence, is_archived }) => ({
        school_level_id: school_level_id || genId(),
        school_level_name,
        sequence: Number(sequence),
        is_archived: Boolean(Number(is_archived)),
    }));
}
