import { genId } from "src/common/utils/id-generator";
import { User_ImportBanksMutationVariables } from "src/squads/payment/service/bob/bob-types";

import { BankCSV } from "../types";

export function convertToImportBankData(
    data: BankCSV[]
): User_ImportBanksMutationVariables["data"] {
    return data.map(({ bank_id, bank_code, bank_name, bank_phonetic_name, is_archived }) => ({
        bank_id: bank_id || genId(),
        bank_code,
        bank_name,
        bank_name_phonetic: bank_phonetic_name,
        is_archived: Boolean(Number(is_archived)),
    }));
}
