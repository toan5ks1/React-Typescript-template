import { genId } from "src/common/utils/id-generator";
import { User_ImportSchoolInfosMutationVariables } from "src/squads/payment/service/bob/bob-types";

import { SchoolInfoCSV } from "../types";

export function convertToImportSchoolInfoData(
    data: SchoolInfoCSV[]
): User_ImportSchoolInfosMutationVariables["data"] {
    return data.map(
        ({
            school_id,
            school_partner_id,
            school_name,
            school_name_phonetic,
            school_level_id,
            address,
            is_archived,
        }) => ({
            school_id: school_id || genId(),
            school_partner_id,
            school_name,
            school_name_phonetic,
            school_level_id,
            address,
            is_archived: Boolean(Number(is_archived)),
        })
    );
}
