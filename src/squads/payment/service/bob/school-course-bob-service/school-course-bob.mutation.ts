import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportSchoolCoursesMutation } from "src/squads/payment/service/bob/bob-types";
import {
    InheritedHasuraServiceClient,
    InvalidParamError,
} from "src/squads/payment/service/service-types";
import { parseCSVFile } from "src/squads/payment/utils/file";

import { SchoolCourseCSV } from "./types";
import { convertToImportSchoolCourseData } from "./utils/parser";
import { validateSchoolCourseImportData } from "./utils/validation";

const importSchoolCourses = gql`
    mutation User_ImportSchoolCourses($data: [school_course_insert_input!]!) {
        insert_school_course(
            objects: $data
            on_conflict: {
                constraint: school_course__pk
                update_columns: [
                    school_course_name
                    school_course_name_phonetic
                    school_course_partner_id
                    school_id
                    is_archived
                    updated_at
                ]
            }
        ) {
            affected_rows
        }
    }
`;

class SchoolCourseBobMutation extends InheritedHasuraServiceClient {
    async importSchoolCourses(
        file: File
    ): Promise<User_ImportSchoolCoursesMutation["insert_school_course"]> {
        let csvRawData;
        try {
            csvRawData = await parseCSVFile<SchoolCourseCSV>(file);
        } catch (error) {
            throw new InvalidParamError({
                action: "ImportSchoolCourseParseCSVFile",
                serviceName: "bobGraphQL",
                errors: [{ field: "payload" }],
            });
        }

        await validateSchoolCourseImportData(csvRawData);
        const data = await convertToImportSchoolCourseData(csvRawData);

        const query = {
            query: importSchoolCourses,
            variables: {
                data,
            },
        };

        const res = await this._call<User_ImportSchoolCoursesMutation>(query);

        return res.data?.insert_school_course;
    }
}

const schoolCourseMutationsBob = new SchoolCourseBobMutation(appConfigs, "bobGraphQL", doQuery);

export default schoolCourseMutationsBob;
