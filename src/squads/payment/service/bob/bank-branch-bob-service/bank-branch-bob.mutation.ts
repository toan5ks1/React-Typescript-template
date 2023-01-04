import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import { User_ImportBankBranchesMutation } from "src/squads/payment/service/bob/bob-types";
import {
    InheritedHasuraServiceClient,
    InvalidParamError,
} from "src/squads/payment/service/service-types";
import { parseCSVFile } from "src/squads/payment/utils/file";

import { BankBranchCSV } from "./types";
import { convertToImportBankBranchData } from "./utils/parser";
import { validateBankBranchImportData } from "./utils/validation";

const importBankBranches = gql`
    mutation User_ImportBankBranches($data: [bank_branch_insert_input!]!) {
        insert_bank_branch(
            objects: $data
            on_conflict: {
                constraint: bank_branch__pk
                update_columns: [
                    bank_branch_code
                    bank_branch_name
                    bank_branch_phonetic_name
                    bank_id
                    is_archived
                    updated_at
                ]
            }
        ) {
            affected_rows
        }
    }
`;

class BankBranchBobMutation extends InheritedHasuraServiceClient {
    async importBankBranches(
        file: File
    ): Promise<User_ImportBankBranchesMutation["insert_bank_branch"]> {
        let csvRawData;
        try {
            csvRawData = await parseCSVFile<BankBranchCSV>(file);
        } catch (error) {
            throw new InvalidParamError({
                action: "ImportBankParseCSVFile",
                serviceName: "bobGraphQL",
                errors: [{ field: "payload" }],
            });
        }

        await validateBankBranchImportData(csvRawData);
        const data = await convertToImportBankBranchData(csvRawData);

        const query = {
            query: importBankBranches,
            variables: {
                data,
            },
        };

        const res = await this._call<User_ImportBankBranchesMutation>(query);

        return res.data?.insert_bank_branch;
    }
}

const bankBanrchMutationsBob = new BankBranchBobMutation(appConfigs, "bobGraphQL", doQuery);

export default bankBanrchMutationsBob;
