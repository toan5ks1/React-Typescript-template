import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/communication/internals/hasura-client/execute-query";
import {
    Communication_GetListTagsByTagIdsQuery,
    Communication_GetListTagsByTagIdsQueryVariables,
    Communication_GetListTagNameByTagIdsQuery,
    Communication_GetListTagNameByTagIdsQueryVariables,
    Communication_GetTagsManyReferenceQuery,
    Communication_GetTagsManyReferenceQueryVariables,
    Communication_GetTagsSelectedByNotificationIdQuery,
    Communication_GetTagsSelectedByNotificationIdQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/communication/service/service-types";
import { getSearchString } from "src/squads/communication/service/utils/utils";

const TagFragment = gql`
    fragment TagAttrs on tags {
        tag_id
        tag_name
        created_at
        updated_at
    }
`;

const communicationGetManyTagReferenceQuery = gql`
    query Communication_GetTagsManyReference($name: String, $limit: Int = 30, $offset: Int = 0) {
        tags(
            limit: $limit
            offset: $offset
            where: { tag_name: { _ilike: $name } }
            order_by: { updated_at: desc }
        ) {
            ...TagAttrs
        }
        tags_aggregate(where: { tag_name: { _ilike: $name } }) {
            aggregate {
                count
            }
        }
    }

    ${TagFragment}
`;

const communicationGetListTagNameByTagIds = gql`
    query Communication_GetListTagNameByTagIds($tag_ids: [String!] = []) {
        tags(where: { tag_id: { _in: $tag_ids } }) {
            name: tag_name
        }
    }
`;

const communicationGetTagsSelectedByNotificationId = gql`
    query Communication_GetTagsSelectedByNotificationId($notification_id: String!) {
        tags(
            where: { info_notifications_tags: { notification_id: { _eq: $notification_id } } }
            order_by: { updated_at: desc }
        ) {
            ...TagAttrs
        }
    }

    ${TagFragment}
`;

const communicationGetTagsByTagIds = gql`
    query Communication_GetListTagsByTagIds($tag_ids: [String!] = []) {
        tags(where: { tag_id: { _in: $tag_ids } }) {
            ...TagAttrs
        }
    }

    ${TagFragment}
`;

class TagsQueriesBob extends InheritedHasuraServiceClient {
    async getManyReferenceAutocomplete(
        variables: Communication_GetTagsManyReferenceQueryVariables
    ): Promise<Communication_GetTagsManyReferenceQuery["tags"] | undefined> {
        const { name, limit, offset } = variables;

        const response = await this._call<Communication_GetTagsManyReferenceQuery>({
            query: communicationGetManyTagReferenceQuery,
            variables: {
                name: getSearchString(name),
                limit,
                offset,
            },
        });

        return response.data?.tags;
    }

    async getListTagNameByTagIds({
        tag_ids,
    }: Communication_GetListTagNameByTagIdsQueryVariables): Promise<
        Communication_GetListTagNameByTagIdsQuery["tags"] | undefined
    > {
        const response = await this._call<Communication_GetListTagNameByTagIdsQuery>({
            query: communicationGetListTagNameByTagIds,
            variables: {
                tag_ids,
            },
        });

        return response.data?.tags;
    }

    async getTagsSelectedByNotificationId({
        notification_id,
    }: Communication_GetTagsSelectedByNotificationIdQueryVariables): Promise<
        Communication_GetTagsSelectedByNotificationIdQuery["tags"] | undefined
    > {
        const response = await this._call<Communication_GetTagsSelectedByNotificationIdQuery>({
            query: communicationGetTagsSelectedByNotificationId,
            variables: {
                notification_id,
            },
        });

        return response.data?.tags;
    }

    async getTagsByTagIds({
        tag_ids,
    }: Communication_GetListTagsByTagIdsQueryVariables): Promise<
        Communication_GetListTagsByTagIdsQuery["tags"] | undefined
    > {
        const response = await this._call<Communication_GetListTagsByTagIdsQuery>({
            query: communicationGetTagsByTagIds,
            variables: {
                tag_ids,
            },
        });

        return response.data?.tags;
    }
}

const tagQueriesBob = new TagsQueriesBob(appConfigs, "bobGraphQL", doQuery);

export default tagQueriesBob;
