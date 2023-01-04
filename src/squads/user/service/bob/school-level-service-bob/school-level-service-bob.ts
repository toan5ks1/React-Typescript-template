import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/user/internals/hasura-client/execute-query";
import {
    User_GetManyReferenceSchoolLevelQueryVariables,
    User_GetManyReferenceSchoolLevelQuery,
} from "src/squads/user/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/user/service/service-types";

const getManyReferenceSchoolLevel = gql`
    query User_GetManyReferenceSchoolLevel(
        $school_id: String
        $name: String
        $limit: Int = 30
        $offset: Int = 0
    ) {
        school_level(
            where: {
                school_level_name: { _eq: $name }
                school_infos: { school_id: { _eq: $school_id } }
            }
            limit: $limit
            offset: $offset
        ) {
            school_level_id
            school_level_name
            is_archived
            school_infos {
                school_id
            }
        }
    }
`;

class SchoolLevelBobQuery extends InheritedHasuraServiceClient {
    async getManyReferenceSchoolLevel(
        variables: User_GetManyReferenceSchoolLevelQueryVariables
    ): Promise<User_GetManyReferenceSchoolLevelQuery["school_level"] | undefined> {
        const query = {
            query: getManyReferenceSchoolLevel,
            variables,
        };

        const res = await this._call<User_GetManyReferenceSchoolLevelQuery>(query);

        return res.data?.school_level;
    }
}

const schoolLevelQueriesBob = new SchoolLevelBobQuery(appConfigs, "bobGraphQL", doQuery);

export default schoolLevelQueriesBob;
