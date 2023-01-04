import uniq from "lodash/uniq";
import { arrayHasItem } from "src/common/utils/other";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";
import { InvalidParamError } from "src/squads/payment/service/service-types";

import { BankCSV } from "../types";

const BANK_FIELDS = ["bank_id", "bank_code", "bank_name", "bank_phonetic_name", "is_archived"];

export const validationError = new InvalidParamError({
    action: "ImportBankValidateCSVFile",
    serviceName: "bobGraphQL",
    errors: [{ field: "payload" }],
});

export async function validateBankImportData(data: BankCSV[]) {
    if (!data || !arrayHasItem(data)) {
        throw validationError;
    }

    // check header data correctly
    const headers = Object.keys(data[0]);
    if (
        headers.length !== BANK_FIELDS.length ||
        headers.some((header) => !BANK_FIELDS.includes(header))
    ) {
        throw validationError;
    }

    // check data correctly
    if (
        data.some(({ bank_code, bank_name, bank_phonetic_name, is_archived }) => {
            // check all required field
            if (
                bank_code === "" ||
                bank_name === "" ||
                bank_phonetic_name === "" ||
                is_archived === ""
            ) {
                return true;
            }

            // check is_archived value is 0 or 1
            if (![0, 1].includes(Number(is_archived))) {
                return true;
            }

            return false;
        })
    ) {
        throw validationError;
    }

    // check valid bank_ids
    const bankIds = data.filter((record) => record.bank_id !== "").map((bank) => bank.bank_id);
    const bankIdsUniq = uniq(bankIds);

    if (arrayHasItem(bankIdsUniq)) {
        const countResponse = await inferStandaloneQuery({
            entity: "bank",
            action: "userCountBankByIds",
        })({ bankIds: bankIdsUniq });

        if (!countResponse || countResponse.count !== bankIdsUniq.length) {
            throw validationError;
        }
    }
}
