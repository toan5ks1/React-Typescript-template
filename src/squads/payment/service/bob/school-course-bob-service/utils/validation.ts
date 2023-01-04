import uniq from "lodash/uniq";
import { arrayHasItem } from "src/common/utils/other";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";
import { InvalidParamError } from "src/squads/payment/service/service-types";

import { SchoolCourseCSV } from "../types";

const SCHOOL_INFO_FIELDS = [
    "school_course_id",
    "school_course_partner_id",
    "school_course_name",
    "school_course_name_phonetic",
    "school_partner_id",
    "is_archived",
];

export const validationError = new InvalidParamError({
    action: "ImportSchoolCourseValidateCSVFile",
    serviceName: "bobGraphQL",
    errors: [{ field: "payload" }],
});

export async function validateSchoolCourseImportData(data: SchoolCourseCSV[]) {
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
        data.some(
            ({ school_course_name, school_course_partner_id, school_partner_id, is_archived }) => {
                // check all required field
                if (
                    school_course_name === "" ||
                    school_course_partner_id === "" ||
                    school_partner_id === "" ||
                    is_archived === ""
                ) {
                    return true;
                }

                // check is_archived value is 0 or 1
                if (![0, 1].includes(Number(is_archived))) {
                    return true;
                }

                return false;
            }
        )
    ) {
        throw validationError;
    }

    // check valid school_course_ids
    const schoolCourseIds = data
        .filter((record) => record.school_course_id !== "")
        .map((schoolCourse) => schoolCourse.school_course_id);
    const schoolCourseIdsUniq = uniq(schoolCourseIds);

    if (arrayHasItem(schoolCourseIdsUniq)) {
        const countResponse = await inferStandaloneQuery({
            entity: "schoolCourse",
            action: "userCountSchoolCourseByIds",
        })({ schoolCourseIds: schoolCourseIdsUniq });

        if (!countResponse || countResponse.count !== schoolCourseIdsUniq.length) {
            throw validationError;
        }
    }

    // check valid school_partner_ids
    const schoolPartnerIds = data
        .filter((record) => record.school_partner_id !== "")
        .map((record) => record.school_partner_id);
    const schoolPartnerIdsUniq = uniq(schoolPartnerIds);

    if (arrayHasItem(schoolPartnerIdsUniq)) {
        const countSchoolInfoResponse = await inferStandaloneQuery({
            entity: "schoolInfo",
            action: "userCountSchoolInfoByPartnerIds",
        })({ schoolPartnerIds: schoolPartnerIdsUniq });

        if (
            !countSchoolInfoResponse ||
            countSchoolInfoResponse.count !== schoolPartnerIdsUniq.length
        ) {
            throw validationError;
        }
    }
}
