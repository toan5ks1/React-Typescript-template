import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    User_GetManyManyReferenceSchoolInfoQuery,
    User_GetManyManyReferenceSchoolInfoQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

const getManyReferenceSchoolInfo = gql`
    query User_GetManyManyReferenceSchoolInfo(
        $school_level_id: String
        $name: String
        $limit: Int = 30
        $offset: Int = 0
    ) {
        school_info(
            limit: $limit
            offset: $offset
            where: { school_name: { _ilike: $name }, school_level_id: { _eq: $school_level_id } }
        ) {
            school_id
            school_name
            address
            is_archived
            school_level_id
        }
    }
`;

class SchoolInfoBobQuery extends InheritedHasuraServiceClient {
    async getManyReferenceSchoolInfo(
        variables: User_GetManyManyReferenceSchoolInfoQueryVariables
    ): Promise<User_GetManyManyReferenceSchoolInfoQuery["school_info"] | undefined> {
        const query = {
            query: getManyReferenceSchoolInfo,
            variables,
        };

        const res = await this._call<User_GetManyManyReferenceSchoolInfoQuery>(query);

        return res.data?.school_info;
    }
}

const schoolInfoQueriesBob = new SchoolInfoBobQuery(appConfigs, "bobGraphQL", doQuery);

export default schoolInfoQueriesBob;
