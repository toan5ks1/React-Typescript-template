import { gql } from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/communication/internals/hasura-client/execute-query";
import {
    UsersInfoNotificationsListQuery,
    UsersInfoNotificationsListQueryVariables,
    Communication_UsersInfoNotificationsListQueryVariables,
    Communication_UsersInfoNotificationsListQuery,
} from "src/squads/communication/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/communication/service/service-types";

import { DataWithTotal } from "@manabie-com/react-utils";

const usersInfoNotificationsFragment = gql`
    fragment UsersInfoNotificationsAttrs on users_info_notifications {
        user_id
        user_notification_id
        notification_id
        current_grade
        course_ids
        status
        user_group
    }
`;

const usersInfoNotificationsWithQuestionnaireStatusFragment = gql`
    fragment UsersInfoNotificationsWithQnStatusAttrs on users_info_notifications {
        user_id
        user_notification_id
        notification_id
        current_grade
        course_ids
        status
        user_group
        qn_status
    }
`;

const getListQuery = gql`
    query UsersInfoNotificationsList(
        $notification_id: String!
        $limit: Int = 10
        $offset: Int = 0
    ) {
        users_info_notifications(
            where: { notification_id: { _eq: $notification_id } }
            limit: $limit
            offset: $offset
            order_by: { student_id: asc, user_group: desc }
        ) {
            ...UsersInfoNotificationsAttrs
            student_id
            parent_id
        }
        users_info_notifications_aggregate(where: { notification_id: { _eq: $notification_id } }) {
            aggregate {
                count
            }
        }
    }
    ${usersInfoNotificationsFragment}
`;

const getListQueryWithQuestionnaireStatus = gql`
    query Communication_UsersInfoNotificationsList(
        $notification_id: String!
        $limit: Int = 10
        $offset: Int = 0
    ) {
        users_info_notifications(
            where: { notification_id: { _eq: $notification_id } }
            limit: $limit
            offset: $offset
            order_by: { student_id: asc, user_group: desc }
        ) {
            ...UsersInfoNotificationsWithQnStatusAttrs
            student_id
            parent_id
        }
        users_info_notifications_aggregate(where: { notification_id: { _eq: $notification_id } }) {
            aggregate {
                count
            }
        }
    }
    ${usersInfoNotificationsWithQuestionnaireStatusFragment}
`;

class UsersInfoNotificationsQueriesBob extends InheritedHasuraServiceClient {
    async getList(
        variables: UsersInfoNotificationsListQueryVariables
    ): Promise<
        DataWithTotal<UsersInfoNotificationsListQuery["users_info_notifications"] | undefined>
    > {
        const res = await this._call<UsersInfoNotificationsListQuery>({
            query: getListQuery,
            variables,
        });

        return {
            data: res.data?.users_info_notifications,
            total: res.data?.users_info_notifications_aggregate.aggregate?.count ?? 0,
        };
    }

    async getListWithQuestionnaireStatus(
        variables: Communication_UsersInfoNotificationsListQueryVariables
    ): Promise<
        DataWithTotal<
            Communication_UsersInfoNotificationsListQuery["users_info_notifications"] | undefined
        >
    > {
        const res = await this._call<Communication_UsersInfoNotificationsListQuery>({
            query: getListQueryWithQuestionnaireStatus,
            variables,
        });

        return {
            data: res.data?.users_info_notifications,
            total: res.data?.users_info_notifications_aggregate.aggregate?.count ?? 0,
        };
    }
}

const usersInfoNotificationsQueriesBob = new UsersInfoNotificationsQueriesBob(
    appConfigs,
    "bobGraphQL",
    doQuery
);

export default usersInfoNotificationsQueriesBob;
