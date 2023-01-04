import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/communication/internals/hasura-client/execute-query";
import {
    InfoNotificationMsgsOneQuery,
    InfoNotificationMsgsOneQueryVariables,
    InfoNotificationMsgsTitlesQuery,
    InfoNotificationMsgsTitlesQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/communication/service/service-types";

const infoNotificationMsgsFragment = gql`
    fragment InfoNotificationMsgsAttrs on info_notification_msgs {
        notification_msg_id
        title
        content
        media_ids
        created_at
        updated_at
    }
`;

const getOneQuery = gql`
    query InfoNotificationMsgsOne($notification_msg_id: String!) {
        info_notification_msgs(where: { notification_msg_id: { _eq: $notification_msg_id } }) {
            ...InfoNotificationMsgsAttrs
        }
    }
    ${infoNotificationMsgsFragment}
`;

const getTitlesQuery = gql`
    query InfoNotificationMsgsTitles($notification_msg_id: [String!] = []) {
        info_notification_msgs(where: { notification_msg_id: { _in: $notification_msg_id } }) {
            notification_msg_id
            title
        }
    }
`;

class InfoNotificationMsgsQueriesBob extends InheritedHasuraServiceClient {
    async getOne(
        variables: InfoNotificationMsgsOneQueryVariables
    ): Promise<ArrayElement<InfoNotificationMsgsOneQuery["info_notification_msgs"]> | undefined> {
        const res = await this._call<InfoNotificationMsgsOneQuery>({
            query: getOneQuery,
            variables,
        });

        return res.data?.info_notification_msgs[0];
    }

    async getTitles(
        variables: InfoNotificationMsgsTitlesQueryVariables
    ): Promise<InfoNotificationMsgsTitlesQuery["info_notification_msgs"] | undefined> {
        const res = await this._call<InfoNotificationMsgsTitlesQuery>({
            query: getTitlesQuery,
            variables,
        });

        return res.data?.info_notification_msgs;
    }
}

const infoNotificationMsgsQueriesBob = new InfoNotificationMsgsQueriesBob(
    appConfigs,
    "bobGraphQL",
    doQuery
);

export default infoNotificationMsgsQueriesBob;
