import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    MediasManyQuery,
    MediasManyQueryVariables,
    Syllabus_MediasManyQuery,
    Syllabus_MediasManyQueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";

import { InheritedHasuraServiceClient } from "../../service-types";

const mediaFragment = gql`
    fragment MediaAttrs on media {
        media_id
        resource
        type
        name
    }
`;

const getManyQuery = gql`
    query MediasMany($media_id: [String!] = []) {
        media(where: { media_id: { _in: $media_id } }) {
            ...MediaAttrs
            conversion_tasks(order_by: { created_at: desc }, limit: 1) {
                status
            }
        }
    }
    ${mediaFragment}
`;

const getManyQueryV2 = gql`
    query Syllabus_MediasMany($media_id: [String!] = []) {
        media(where: { media_id: { _in: $media_id } }) {
            ...MediaAttrs
        }
    }
    ${mediaFragment}
`;

class MediaBobQuery extends InheritedHasuraServiceClient {
    async getMany(
        variables: MediasManyQueryVariables
    ): Promise<MediasManyQuery["media"] | undefined> {
        const body = {
            query: getManyQuery,
            variables,
        };

        const resp = await this._call<MediasManyQuery>(body);

        return resp.data?.media;
    }

    async getManyV2(
        variables: Syllabus_MediasManyQueryVariables
    ): Promise<Syllabus_MediasManyQuery["media"] | undefined> {
        const body = {
            query: getManyQueryV2,
            variables,
        };

        const resp = await this._call<Syllabus_MediasManyQuery>(body);

        return resp.data?.media;
    }
}

const mediaQueriesBob = new MediaBobQuery(appConfigs, "bobGraphQL", doQuery);

export default mediaQueriesBob;
