import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    Users_UserAddressByUserIdsQuery,
    Users_UserAddressByUserIdsQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

const getListQuery = gql`
    query Users_UserAddressByUserIds($user_ids: [String!]) {
        user_address(where: { user_id: { _in: $user_ids } }) {
            user_id
            user_address_id
            postal_code
            city
            first_street
            second_street
            prefecture {
                prefecture_id
                name
            }
        }
    }
`;

class UserAddressQueryBob extends InheritedHasuraServiceClient {
    async getList(
        variables: Users_UserAddressByUserIdsQueryVariables
    ): Promise<Users_UserAddressByUserIdsQuery["user_address"] | undefined> {
        const query = {
            query: getListQuery,
            variables,
        };
        const res = await this._call<Users_UserAddressByUserIdsQuery>(query);
        return res.data?.user_address;
    }
    async getOne(
        variables: Users_UserAddressByUserIdsQueryVariables
    ): Promise<ArrayElement<Users_UserAddressByUserIdsQuery["user_address"]> | undefined> {
        const query = {
            query: getListQuery,
            variables,
        };
        const res = await this._call<Users_UserAddressByUserIdsQuery>(query);
        return res.data?.user_address[0];
    }
}

const userAddressQueriesBob = new UserAddressQueryBob(appConfigs, "bobGraphQL", doQuery);

export default userAddressQueriesBob;
