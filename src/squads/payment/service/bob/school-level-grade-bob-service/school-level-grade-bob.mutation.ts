import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportSchoolLevelGradesMutation } from "src/squads/payment/service/bob/bob-types";
import {
    InheritedHasuraServiceClient,
    InvalidParamError,
} from "src/squads/payment/service/service-types";
import { parseCSVFile } from "src/squads/payment/utils/file";

import { SchoolLevelGradeCSV } from "./types";
import { convertToImportSchoolLevelGradeData } from "./utils/parser";
import { validateSchoolLevelGradeImportData } from "./utils/validation";

const importSchoolLevelGrades = gql`
    mutation User_ImportSchoolLevelGrades($data: [school_level_grade_insert_input!]!) {
        insert_school_level_grade(
            objects: $data
            on_conflict: { constraint: school_level_grade__pk, update_columns: [] }
        ) {
            affected_rows
        }
    }
`;

class SchoolLevelGradeBobMutation extends InheritedHasuraServiceClient {
    async importSchoolLevelGrades(
        file: File
    ): Promise<User_ImportSchoolLevelGradesMutation["insert_school_level_grade"]> {
        let csvRawData;
        try {
            csvRawData = await parseCSVFile<SchoolLevelGradeCSV>(file);
        } catch (error) {
            throw new InvalidParamError({
                action: "ImportSchoolLevelGradeParseCSVFile",
                serviceName: "bobGraphQL",
                errors: [{ field: "payload" }],
            });
        }

        await validateSchoolLevelGradeImportData(csvRawData);
        const data = convertToImportSchoolLevelGradeData(csvRawData);

        const query = {
            query: importSchoolLevelGrades,
            variables: {
                data,
            },
        };

        const res = await this._call<User_ImportSchoolLevelGradesMutation>(query);

        return res.data?.insert_school_level_grade;
    }
}

const schoolLevelGradeMutationsBob = new SchoolLevelGradeBobMutation(
    appConfigs,
    "bobGraphQL",
    doQuery
);

export default schoolLevelGradeMutationsBob;
