import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/communication/internals/hasura-client/execute-query";
import {
    MediasManyQuery,
    MediasManyQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/communication/service/service-types";

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

class MediaQueriesBob extends InheritedHasuraServiceClient {
    async getMany(
        variables: MediasManyQueryVariables
    ): Promise<MediasManyQuery["media"] | undefined> {
        const res = await this._call<MediasManyQuery>({
            query: getManyQuery,
            variables,
        });

        return res.data?.media;
    }
}

const mediaQueriesBob = new MediaQueriesBob(appConfigs, "bobGraphQL", doQuery);

export default mediaQueriesBob;
