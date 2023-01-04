import uniq from "lodash/uniq";
import { genId } from "src/common/utils/id-generator";
import { User_ImportBankBranchesMutationVariables } from "src/squads/payment/service/bob/bob-types";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";

import { BankBranchCSV } from "../types";

export async function convertToImportBankBranchData(
    data: BankBranchCSV[]
): Promise<User_ImportBankBranchesMutationVariables["data"]> {
    const bankCodes = data
        .filter((record) => record.bank_code !== "")
        .map((record) => record.bank_code);
    const bankCodesUniq = uniq(bankCodes);

    const banks = await inferStandaloneQuery({
        entity: "bank",
        action: "userGetBanksByBankCodes",
    })({ bankCodes: bankCodesUniq });

    const mapBanks = new Map<string, string>();
    banks?.forEach(({ bank_id, bank_code }) => {
        mapBanks.set(bank_code, bank_id);
    });
    return data.map(
        ({
            bank_branch_id,
            bank_branch_code,
            bank_branch_name,
            bank_branch_phonetic_name,
            bank_code,
            is_archived,
        }) => ({
            bank_branch_id: bank_branch_id || genId(),
            bank_branch_code,
            bank_branch_name,
            bank_branch_phonetic_name,
            bank_id: mapBanks.get(bank_code),
            is_archived: Boolean(Number(is_archived)),
        })
    );
}
