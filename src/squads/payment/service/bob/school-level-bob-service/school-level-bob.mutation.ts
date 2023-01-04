import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportSchoolLevelsMutation } from "src/squads/payment/service/bob/bob-types";
import {
    InheritedHasuraServiceClient,
    InvalidParamError,
} from "src/squads/payment/service/service-types";
import { parseCSVFile } from "src/squads/payment/utils/file";

import { SchoolLevelCSV } from "./types";
import { convertToImportSchoolLevelData } from "./utils/parser";
import { validateSchoolLevelImportData } from "./utils/validation";

const importSchoolLevels = gql`
    mutation User_ImportSchoolLevels($data: [school_level_insert_input!]!) {
        insert_school_level(
            objects: $data
            on_conflict: {
                constraint: school_level__pk
                update_columns: [school_level_name, sequence, is_archived, updated_at]
            }
        ) {
            affected_rows
        }
    }
`;

class SchoolLevelBobMutation extends InheritedHasuraServiceClient {
    async importSchoolLevels(
        file: File
    ): Promise<User_ImportSchoolLevelsMutation["insert_school_level"]> {
        let csvRawData;
        try {
            csvRawData = await parseCSVFile<SchoolLevelCSV>(file);
        } catch (error) {
            throw new InvalidParamError({
                action: "ImportSchoolLevelParseCSVFile",
                serviceName: "bobGraphQL",
                errors: [{ field: "payload" }],
            });
        }

        await validateSchoolLevelImportData(csvRawData);
        const data = convertToImportSchoolLevelData(csvRawData);

        const query = {
            query: importSchoolLevels,
            variables: {
                data,
            },
        };

        const res = await this._call<User_ImportSchoolLevelsMutation>(query);

        return res.data?.insert_school_level;
    }
}

const schoolLevelMutationsBob = new SchoolLevelBobMutation(appConfigs, "bobGraphQL", doQuery);

export default schoolLevelMutationsBob;
