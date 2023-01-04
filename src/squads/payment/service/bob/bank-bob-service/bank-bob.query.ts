import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    User_CountBankByIdsQuery,
    User_CountBankByIdsQueryVariables,
    User_GetBanksByBankCodesQuery,
    User_GetBanksByBankCodesQueryVariables,
    User_CountBankByBankCodesQuery,
    User_CountBankByBankCodesQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import { InheritedHasuraServiceClient } from "../../service-types";

const countBankByIds = gql`
    query User_CountBankByIds($bankIds: [String!]!) {
        bank_aggregate(where: { bank_id: { _in: $bankIds } }) {
            aggregate {
                count
            }
        }
    }
`;

const countBankByBankCodes = gql`
    query User_CountBankByBankCodes($bankCodes: [String!]!) {
        bank_aggregate(where: { bank_code: { _in: $bankCodes } }) {
            aggregate {
                count
            }
        }
    }
`;

const getBanksByBankCodes = gql`
    query User_GetBanksByBankCodes($bankCodes: [String!]!) {
        bank(where: { bank_code: { _in: $bankCodes } }) {
            bank_id
            bank_code
        }
    }
`;

class BankQueryBob extends InheritedHasuraServiceClient {
    async countBankByIds(
        variables: User_CountBankByIdsQueryVariables
    ): Promise<User_CountBankByIdsQuery["bank_aggregate"]["aggregate"] | null> {
        const response = await this._call<User_CountBankByIdsQuery>({
            query: countBankByIds,
            variables,
        });

        return response.data?.bank_aggregate.aggregate;
    }

    async countBankByBankCodes(
        variables: User_CountBankByBankCodesQueryVariables
    ): Promise<User_CountBankByBankCodesQuery["bank_aggregate"]["aggregate"] | null> {
        const response = await this._call<User_CountBankByBankCodesQuery>({
            query: countBankByBankCodes,
            variables,
        });

        return response.data?.bank_aggregate.aggregate;
    }

    async getBanksByBankCodes(
        variables: User_GetBanksByBankCodesQueryVariables
    ): Promise<User_GetBanksByBankCodesQuery["bank"] | undefined> {
        const response = await this._call<User_GetBanksByBankCodesQuery>({
            query: getBanksByBankCodes,
            variables,
        });

        return response.data?.bank;
    }
}

const bankQueryBob = new BankQueryBob(appConfigs, "bobGraphQL", doQuery);

export default bankQueryBob;
