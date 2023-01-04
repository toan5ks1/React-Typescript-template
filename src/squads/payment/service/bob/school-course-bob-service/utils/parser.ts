import uniq from "lodash/uniq";
import { genId } from "src/common/utils/id-generator";
import { User_ImportSchoolCoursesMutationVariables } from "src/squads/payment/service/bob/bob-types";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";

import { SchoolCourseCSV } from "../types";

export async function convertToImportSchoolCourseData(
    data: SchoolCourseCSV[]
): Promise<User_ImportSchoolCoursesMutationVariables["data"]> {
    const schoolPartnerIds = data
        .filter((record) => record.school_partner_id !== "")
        .map((record) => record.school_partner_id);
    const schoolPartnerIdsUniq = uniq(schoolPartnerIds);

    const schoolInfos = await inferStandaloneQuery({
        entity: "schoolInfo",
        action: "getSchoolInfoIdByPartnerIds",
    })({ schoolPartnerIds: schoolPartnerIdsUniq });

    const mapSchoolInfos = new Map<string, string>();
    schoolInfos?.forEach(({ school_id, school_partner_id }) => {
        mapSchoolInfos.set(school_partner_id!, school_id);
    });

    return data.map(
        ({
            school_course_id,
            school_course_partner_id,
            school_course_name,
            school_course_name_phonetic,
            school_partner_id,
            is_archived,
        }) => ({
            school_course_id: school_course_id || genId(),
            school_course_partner_id,
            school_course_name,
            school_course_name_phonetic,
            school_id: mapSchoolInfos.get(school_partner_id),
            is_archived: Boolean(Number(is_archived)),
        })
    );
}
