import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    User_CountBankBranchByIdsQuery,
    User_CountBankBranchByIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import { InheritedHasuraServiceClient } from "../../service-types";

const countBankBranchByIds = gql`
    query User_CountBankBranchByIds($bankBranchIds: [String!]!) {
        bank_branch_aggregate(where: { bank_branch_id: { _in: $bankBranchIds } }) {
            aggregate {
                count
            }
        }
    }
`;

class BankQueryBob extends InheritedHasuraServiceClient {
    async countBankBranchByIds(
        variables: User_CountBankBranchByIdsQueryVariables
    ): Promise<User_CountBankBranchByIdsQuery["bank_branch_aggregate"]["aggregate"] | null> {
        const response = await this._call<User_CountBankBranchByIdsQuery>({
            query: countBankBranchByIds,
            variables,
        });

        return response.data?.bank_branch_aggregate.aggregate;
    }
}

const bankQueryBob = new BankQueryBob(appConfigs, "bobGraphQL", doQuery);

export default bankQueryBob;
