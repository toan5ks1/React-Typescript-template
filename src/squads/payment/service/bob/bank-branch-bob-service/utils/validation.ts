import uniq from "lodash/uniq";
import { arrayHasItem } from "src/common/utils/other";
import inferStandaloneQuery from "src/squads/payment/service/infer-standalone-query";
import { InvalidParamError } from "src/squads/payment/service/service-types";

import { BankBranchCSV } from "../types";

const BANK_BRANCH_FIELDS = [
    "bank_branch_id",
    "bank_branch_code",
    "bank_branch_name",
    "bank_branch_phonetic_name",
    "bank_code",
    "is_archived",
];

export const validationError = new InvalidParamError({
    action: "ImportBankBranchValidateCSVFile",
    serviceName: "bobGraphQL",
    errors: [{ field: "payload" }],
});

export async function validateBankBranchImportData(data: BankBranchCSV[]) {
    if (!data || !arrayHasItem(data)) {
        throw validationError;
    }

    // check header data correctly
    const headers = Object.keys(data[0]);
    if (
        headers.length !== BANK_BRANCH_FIELDS.length ||
        headers.some((header) => !BANK_BRANCH_FIELDS.includes(header))
    ) {
        throw validationError;
    }

    // check data correctly
    if (
        data.some(
            ({
                bank_branch_code,
                bank_branch_name,
                bank_branch_phonetic_name,
                bank_code,
                is_archived,
            }) => {
                // check all required field
                if (
                    bank_branch_code === "" ||
                    bank_branch_name === "" ||
                    bank_branch_phonetic_name === "" ||
                    bank_code === "" ||
                    is_archived === ""
                ) {
                    return true;
                }

                // check is_archived value is 0 or 1
                if (![0, 1].includes(Number(is_archived))) {
                    return true;
                }

                return false;
            }
        )
    ) {
        throw validationError;
    }

    // check valid bank_branch_ids
    const bankBranchIds = data
        .filter((record) => record.bank_branch_id !== "")
        .map((bankBranch) => bankBranch.bank_branch_id);
    const bankBranchIdsUniq = uniq(bankBranchIds);

    if (arrayHasItem(bankBranchIdsUniq)) {
        const countResponse = await inferStandaloneQuery({
            entity: "bankBranch",
            action: "userCountBankBranchByIds",
        })({ bankBranchIds: bankBranchIdsUniq });

        if (!countResponse || countResponse.count !== bankBranchIdsUniq.length) {
            throw validationError;
        }
    }

    // check valid bank_codes
    const bankCodes = data
        .filter((record) => record.bank_code !== "")
        .map((record) => record.bank_code);
    const bankCodesUniq = uniq(bankCodes);

    if (arrayHasItem(bankCodesUniq)) {
        const countBankResponse = await inferStandaloneQuery({
            entity: "bank",
            action: "userCountBankByBankCodes",
        })({ bankCodes: bankCodesUniq });

        if (!countBankResponse || countBankResponse.count !== bankCodesUniq.length) {
            throw validationError;
        }
    }
}
