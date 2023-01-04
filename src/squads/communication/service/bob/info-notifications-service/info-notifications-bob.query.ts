import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { InfoNotification } from "src/squads/communication/common/constants/types";
import { doQuery } from "src/squads/communication/internals/hasura-client/execute-query";
import {
    Communication_GetInfoNotificationByNotificationIdQuery,
    Communication_GetInfoNotificationByNotificationIdQueryVariables,
    Communication_GetInfoNotificationByNotificationIdV2QueryVariables,
    Communication_GetListInfoNotificationsQueryVariables,
    InfoNotificationCountsByStatusV2Query,
    InfoNotificationCountsByStatusV2QueryVariables,
    InfoNotificationsCountReadQuery,
    InfoNotificationsCountReadQueryVariables,
    InfoNotificationsGetStatusByIdQuery,
    InfoNotificationsGetStatusByIdQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/communication/service/service-types";

import { DataWithTotal } from "@manabie-com/react-utils";

const infoNotificationsFragment = gql`
    fragment InfoNotificationsAttrs on info_notifications {
        notification_id
        notification_msg_id
        sent_at
        receiver_ids
        status
        type
        target_groups
        updated_at
        created_at
        editor_id
        event
        scheduled_at
    }
`;

const infoNotificationsWithQuestionnaireFragment = gql`
    fragment InfoNotificationsWithQuestionnaireAttrs on info_notifications {
        notification_id
        notification_msg_id
        sent_at
        receiver_ids
        status
        type
        target_groups
        updated_at
        created_at
        editor_id
        event
        scheduled_at
        is_important
        questionnaire_id
    }
`;

const GetListInfoNotifications = gql`
    query Communication_GetListInfoNotifications($status: String, $limit: Int, $offset: Int) {
        info_notifications(
            limit: $limit
            offset: $offset
            order_by: { updated_at: desc }
            where: { status: { _eq: $status } }
        ) {
            ...InfoNotificationsAttrs
        }
    }

    ${infoNotificationsFragment}
`;

const readCountOfNotificationsQuery = gql`
    query InfoNotificationsCountRead($notification_id: [String!] = []) {
        info_notifications(
            order_by: { updated_at: desc }
            where: { notification_id: { _in: $notification_id } }
        ) {
            notification_id
            all_receiver_aggregate: users_info_notifications_aggregate {
                aggregate {
                    count
                }
            }
            read_aggregate: users_info_notifications_aggregate(
                where: { status: { _eq: "USER_NOTIFICATION_STATUS_READ" } }
            ) {
                aggregate {
                    count
                }
            }
        }
    }
`;

const GetInfoNotificationByNotificationId = gql`
    query Communication_GetInfoNotificationByNotificationId($notification_id: String!) {
        info_notifications(where: { notification_id: { _eq: $notification_id } }) {
            ...InfoNotificationsAttrs
        }
    }
    ${infoNotificationsFragment}
`;

const GetInfoNotificationByNotificationIdV2 = gql`
    query Communication_GetInfoNotificationByNotificationIdV2($notification_id: String!) {
        info_notifications(where: { notification_id: { _eq: $notification_id } }) {
            ...InfoNotificationsWithQuestionnaireAttrs
        }
    }

    ${infoNotificationsWithQuestionnaireFragment}
`;

const getStatusByIdQuery = gql`
    query InfoNotificationsGetStatusByID($notification_id: String!) {
        info_notifications(where: { notification_id: { _eq: $notification_id } }) {
            status
        }
    }
`;

const countByStatusQueryV2 = gql`
    query InfoNotificationCountsByStatusV2 {
        draft: info_notifications_aggregate(
            where: { status: { _eq: "NOTIFICATION_STATUS_DRAFT" } }
        ) {
            aggregate {
                count
            }
        }
        sent: info_notifications_aggregate(where: { status: { _eq: "NOTIFICATION_STATUS_SENT" } }) {
            aggregate {
                count
            }
        }
        schedule: info_notifications_aggregate(
            where: { status: { _eq: "NOTIFICATION_STATUS_SCHEDULED" } }
        ) {
            aggregate {
                count
            }
        }
    }
`;

export interface CustomCommunication_GetInfoNotificationByNotificationIdQuery {
    info_notifications: InfoNotification[];
}

class InfoNotificationsQueriesBob extends InheritedHasuraServiceClient {
    async getInfoNotificationByNotificationId(
        variables: Communication_GetInfoNotificationByNotificationIdQueryVariables
    ): Promise<InfoNotification | undefined> {
        const resultQuery = {
            query: GetInfoNotificationByNotificationId,
            variables,
        };

        const res = await this._call<CustomCommunication_GetInfoNotificationByNotificationIdQuery>(
            resultQuery
        );

        return res.data?.info_notifications[0];
    }

    async getInfoNotificationWithQuestionnaireByNotificationId(
        variables: Communication_GetInfoNotificationByNotificationIdV2QueryVariables
    ): Promise<InfoNotification | undefined> {
        const resultQuery = {
            query: GetInfoNotificationByNotificationIdV2,
            variables,
        };

        const res = await this._call<CustomCommunication_GetInfoNotificationByNotificationIdQuery>(
            resultQuery
        );

        return res.data?.info_notifications[0];
    }

    async getStatusById(
        variables: InfoNotificationsGetStatusByIdQueryVariables
    ): Promise<
        ArrayElement<InfoNotificationsGetStatusByIdQuery["info_notifications"]> | undefined
    > {
        const resultQuery = {
            query: getStatusByIdQuery,
            variables,
        };

        const res = await this._call<InfoNotificationsGetStatusByIdQuery>(resultQuery);

        return res.data?.info_notifications[0];
    }

    async getList(
        variables: Communication_GetListInfoNotificationsQueryVariables
    ): Promise<
        DataWithTotal<
            Communication_GetInfoNotificationByNotificationIdQuery["info_notifications"] | undefined
        >
    > {
        const resultQuery = {
            query: GetListInfoNotifications,
            variables,
        };

        const res = await this._call<Communication_GetInfoNotificationByNotificationIdQuery>(
            resultQuery
        );

        return {
            data: res.data?.info_notifications,
            total: 0,
        };
    }

    async countReadOfNotifications(
        variables: InfoNotificationsCountReadQueryVariables
    ): Promise<InfoNotificationsCountReadQuery["info_notifications"] | undefined> {
        const resultQuery = {
            query: readCountOfNotificationsQuery,
            variables,
        };

        const res = await this._call<InfoNotificationsCountReadQuery>(resultQuery);

        return res.data?.info_notifications;
    }

    async countByStatusV2(
        variables: InfoNotificationCountsByStatusV2QueryVariables
    ): Promise<InfoNotificationCountsByStatusV2Query | null> {
        const resultQuery = {
            query: countByStatusQueryV2,
            variables,
        };

        const res = await this._call<InfoNotificationCountsByStatusV2Query>(resultQuery);

        return res.data;
    }
}

const infoNotificationsQueriesBob = new InfoNotificationsQueriesBob(
    appConfigs,
    "bobGraphQL",
    doQuery
);

export default infoNotificationsQueriesBob;
