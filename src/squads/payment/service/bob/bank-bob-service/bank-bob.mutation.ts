import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportBanksMutation } from "src/squads/payment/service/bob/bob-types";
import {
    InheritedHasuraServiceClient,
    InvalidParamError,
} from "src/squads/payment/service/service-types";
import { parseCSVFile } from "src/squads/payment/utils/file";

import { BankCSV } from "./types";
import { convertToImportBankData } from "./utils/parser";
import { validateBankImportData } from "./utils/validation";

const importBanks = gql`
    mutation User_ImportBanks($data: [bank_insert_input!]!) {
        insert_bank(
            objects: $data
            on_conflict: {
                constraint: bank__pk
                update_columns: [bank_code, bank_name, bank_name_phonetic, is_archived, updated_at]
            }
        ) {
            affected_rows
        }
    }
`;

class BankBobMutation extends InheritedHasuraServiceClient {
    async importBanks(file: File): Promise<User_ImportBanksMutation["insert_bank"]> {
        let csvRawData;
        try {
            csvRawData = await parseCSVFile<BankCSV>(file);
        } catch (error) {
            throw new InvalidParamError({
                action: "ImportBankParseCSVFile",
                serviceName: "bobGraphQL",
                errors: [{ field: "payload" }],
            });
        }

        await validateBankImportData(csvRawData);
        const data = convertToImportBankData(csvRawData);

        const query = {
            query: importBanks,
            variables: {
                data,
            },
        };

        const res = await this._call<User_ImportBanksMutation>(query);

        return res.data?.insert_bank;
    }
}

const bankMutationsBob = new BankBobMutation(appConfigs, "bobGraphQL", doQuery);

export default bankMutationsBob;
