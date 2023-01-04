import {
    UsersInfoNotificationsListQueryVariables,
    Communication_UsersInfoNotificationsListQueryVariables,
} from "src/squads/communication/service/bob/bob-types";

import usersInfoNotificationsQueriesBob from "./users-info-notifications-bob.query";

import { defineService } from "@manabie-com/react-utils";

export const usersInfoNotificationsServices = defineService({
    query: {
        communicationGetRecipientList: ({
            notification_id,
            limit,
            offset,
        }: UsersInfoNotificationsListQueryVariables) => {
            return usersInfoNotificationsQueriesBob.getList({
                notification_id: notification_id!,
                limit,
                offset,
            });
        },
        communicationGetRecipientListWithQuestionnaireStatus: ({
            notification_id,
            limit,
            offset,
        }: Communication_UsersInfoNotificationsListQueryVariables) => {
            return usersInfoNotificationsQueriesBob.getListWithQuestionnaireStatus({
                notification_id,
                limit,
                offset,
            });
        },
    },
});
