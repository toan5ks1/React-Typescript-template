import { gql } from "graphql-tag";

import {
    MediasListQueryVariables,
    MediasManyQueryVariables,
    MediasOneQueryVariables,
} from "./../bob-types";

import { GraphqlBody } from "@manabie-com/graphql-client";

const mediaFragment = gql`
    fragment MediaAttrs on media {
        media_id
        resource
        type
        name
    }
`;

const getOneQuery = gql`
    query MediasOne($media_id: String = "") {
        media(where: { media_id: { _eq: $media_id } }) {
            ...MediaAttrs
        }
    }
    ${mediaFragment}
`;

const getListQuery = gql`
    query MediasList(
        $limit: Int = 10
        $offset: Int = 0
        $media_id: [String!]
        $resource: String
        $type: String
        $converted_images: Boolean
        $comments: jsonb
    ) {
        media(
            limit: $limit
            offset: $offset
            order_by: { created_at: desc }
            where: {
                resource: { _eq: $resource }
                type: { _eq: $type }
                media_id: { _in: $media_id }
                converted_images: { _is_null: $converted_images }
                comments: { _contains: $comments }
            }
        ) {
            ...MediaAttrs
        }
        media_aggregate(
            where: {
                resource: { _eq: $resource }
                type: { _eq: $type }
                media_id: { _in: $media_id }
                converted_images: { _is_null: $converted_images }
                comments: { _contains: $comments }
            }
        ) {
            aggregate {
                count
            }
        }
    }
    ${mediaFragment}
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

class MediaBobQuery {
    getOne(variables: MediasOneQueryVariables): GraphqlBody<MediasOneQueryVariables> {
        return {
            query: getOneQuery,
            variables,
        };
    }
    getMany(variables: MediasManyQueryVariables): GraphqlBody<MediasManyQueryVariables> {
        return {
            query: getManyQuery,
            variables,
        };
    }

    getList(variables: MediasListQueryVariables): GraphqlBody<MediasListQueryVariables> {
        return {
            query: getListQuery,
            variables,
        };
    }
}

const mediaQueriesBob = new MediaBobQuery();

export default mediaQueriesBob;
