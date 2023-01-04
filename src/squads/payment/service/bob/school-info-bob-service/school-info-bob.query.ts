import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/payment/internals/hasura-client/execute-query";
import {
    User_CountSchoolInfoByIdsQuery,
    User_CountSchoolInfoByIdsQueryVariables,
    User_CountSchoolInfoByPartnerIdsQuery,
    User_CountSchoolInfoByPartnerIdsQueryVariables,
    User_GetSchoolInfoIdByPartnerIdsQuery,
    User_GetSchoolInfoIdByPartnerIdsQueryVariables,
} from "src/squads/payment/service/bob/bob-types";

import { InheritedHasuraServiceClient } from "../../service-types";

const countSchoolInfoByIds = gql`
    query User_CountSchoolInfoByIds($schoolInfoIds: [String!]!) {
        school_info_aggregate(where: { school_id: { _in: $schoolInfoIds } }) {
            aggregate {
                count
            }
        }
    }
`;

const countSchoolInfoByPartnerIds = gql`
    query User_CountSchoolInfoByPartnerIds($schoolPartnerIds: [String!]!) {
        school_info_aggregate(where: { school_partner_id: { _in: $schoolPartnerIds } }) {
            aggregate {
                count
            }
        }
    }
`;

const getSchoolInfoIdByPartnerIds = gql`
    query User_GetSchoolInfoIdByPartnerIds($schoolPartnerIds: [String!]!) {
        school_info(where: { school_partner_id: { _in: $schoolPartnerIds } }) {
            school_id
            school_partner_id
        }
    }
`;

class SchoolInfoQueryBob extends InheritedHasuraServiceClient {
    async countSchoolInfoByIds(
        variables: User_CountSchoolInfoByIdsQueryVariables
    ): Promise<User_CountSchoolInfoByIdsQuery["school_info_aggregate"]["aggregate"] | null> {
        const response = await this._call<User_CountSchoolInfoByIdsQuery>({
            query: countSchoolInfoByIds,
            variables,
        });

        return response.data?.school_info_aggregate.aggregate;
    }

    async countSchoolInfoByPartnerIds(
        variables: User_CountSchoolInfoByPartnerIdsQueryVariables
    ): Promise<User_CountSchoolInfoByPartnerIdsQuery["school_info_aggregate"]["aggregate"] | null> {
        const response = await this._call<User_CountSchoolInfoByPartnerIdsQuery>({
            query: countSchoolInfoByPartnerIds,
            variables,
        });

        return response.data?.school_info_aggregate.aggregate;
    }

    async getSchoolInfoIdByPartnerIds(
        variables: User_GetSchoolInfoIdByPartnerIdsQueryVariables
    ): Promise<User_GetSchoolInfoIdByPartnerIdsQuery["school_info"] | undefined> {
        const response = await this._call<User_GetSchoolInfoIdByPartnerIdsQuery>({
            query: getSchoolInfoIdByPartnerIds,
            variables,
        });

        return response.data?.school_info;
    }
}

const schoolInfoQueryBob = new SchoolInfoQueryBob(appConfigs, "bobGraphQL", doQuery);

export default schoolInfoQueryBob;
