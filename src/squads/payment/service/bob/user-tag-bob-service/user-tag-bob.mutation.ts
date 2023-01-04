import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportUserTagsMutation } from "src/squads/payment/service/bob/bob-types";
import {
    InheritedHasuraServiceClient,
    InvalidParamError,
} from "src/squads/payment/service/service-types";
import { parseCSVFile } from "src/squads/payment/utils/file";

import { UserTagCSV } from "./types";
import { convertToImportUserTagData } from "./utils/parser";
import { validateUserTagImportData } from "./utils/validation";

const importUserTags = gql`
    mutation User_ImportUserTags($data: [user_tag_insert_input!]!) {
        insert_user_tag(
            objects: $data
            on_conflict: {
                constraint: user_tag__pk
                update_columns: [user_tag_name, user_tag_partner_id, is_archived, updated_at]
            }
        ) {
            affected_rows
        }
    }
`;

class UserTagBobMutation extends InheritedHasuraServiceClient {
    async importUserTags(file: File): Promise<User_ImportUserTagsMutation["insert_user_tag"]> {
        let csvRawData;
        try {
            csvRawData = await parseCSVFile<UserTagCSV>(file);
        } catch (error) {
            throw new InvalidParamError({
                action: "ImportUserTagParseCSVFile",
                serviceName: "bobGraphQL",
                errors: [{ field: "payload" }],
            });
        }

        await validateUserTagImportData(csvRawData);
        const data = await convertToImportUserTagData(csvRawData);

        const query = {
            query: importUserTags,
            variables: {
                data,
            },
        };

        const res = await this._call<User_ImportUserTagsMutation>(query);

        return res.data?.insert_user_tag;
    }
}

const userTagMutationsBob = new UserTagBobMutation(appConfigs, "bobGraphQL", doQuery);

export default userTagMutationsBob;
