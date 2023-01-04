import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportSchoolInfosMutation } from "src/squads/payment/service/bob/bob-types";
import {
    InheritedHasuraServiceClient,
    InvalidParamError,
} from "src/squads/payment/service/service-types";
import { parseCSVFile } from "src/squads/payment/utils/file";

import { SchoolInfoCSV } from "./types";
import { convertToImportSchoolInfoData } from "./utils/parser";
import { validateSchoolInfoImportData } from "./utils/validation";

const importSchoolInfos = gql`
    mutation User_ImportSchoolInfos($data: [school_info_insert_input!]!) {
        insert_school_info(
            objects: $data
            on_conflict: {
                constraint: school_info_pk
                update_columns: [
                    school_name
                    school_name_phonetic
                    school_partner_id
                    school_level_id
                    address
                    is_archived
                    updated_at
                ]
            }
        ) {
            affected_rows
        }
    }
`;

class SchoolInfoBobMutation extends InheritedHasuraServiceClient {
    async importSchoolInfos(
        file: File
    ): Promise<User_ImportSchoolInfosMutation["insert_school_info"]> {
        let csvRawData;
        try {
            csvRawData = await parseCSVFile<SchoolInfoCSV>(file);
        } catch (error) {
            throw new InvalidParamError({
                action: "ImportSchoolInfoParseCSVFile",
                serviceName: "bobGraphQL",
                errors: [{ field: "payload" }],
            });
        }

        await validateSchoolInfoImportData(csvRawData);
        const data = convertToImportSchoolInfoData(csvRawData);

        const query = {
            query: importSchoolInfos,
            variables: {
                data,
            },
        };

        const res = await this._call<User_ImportSchoolInfosMutation>(query);

        return res.data?.insert_school_info;
    }
}

const schoolInfoMutationsBob = new SchoolInfoBobMutation(appConfigs, "bobGraphQL", doQuery);

export default schoolInfoMutationsBob;
