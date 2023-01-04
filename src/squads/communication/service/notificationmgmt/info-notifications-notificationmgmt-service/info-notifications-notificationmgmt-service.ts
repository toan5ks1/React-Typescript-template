import {
    DiscardNotification,
    NotifyUnreadUser,
    SendNotification,
    UpsertNotificationProps,
} from "src/squads/communication/common/constants/types";

import { GetNotificationsByFilterRequest } from "manabuf/notificationmgmt/v1/notifications_pb";

import infoNotificationsNotificationMgmtModifierMutationService from "./info-notifications-notificationmgmt-modifier.mutation";
import infoNotificationsMgmtReaderMutationService from "./info-notifications-notificationmgmt-reader.mutation";

import { defineService, MutationParams } from "@manabie-com/react-utils";

export const infoNotificationsMgmtService = defineService({
    query: {
        communicationGetNotificationsByFilter: (
            params: GetNotificationsByFilterRequest.AsObject
        ) => {
            return infoNotificationsMgmtReaderMutationService.getNotificationsByFilter(params);
        },
    },
    mutation: {
        communicationResendNotification: ({ data }: MutationParams<NotifyUnreadUser>) => {
            return infoNotificationsNotificationMgmtModifierMutationService.resendNotification({
                data,
            });
        },

        communicationDeleteNotification: ({ data }: MutationParams<DiscardNotification>) => {
            return infoNotificationsNotificationMgmtModifierMutationService.discardNotification({
                data,
            });
        },

        communicationSendNotification: ({ data }: MutationParams<SendNotification>) => {
            return infoNotificationsNotificationMgmtModifierMutationService.sendNotification({
                data,
            });
        },

        communicationUpsertNotification: ({ data }: MutationParams<UpsertNotificationProps>) => {
            return infoNotificationsNotificationMgmtModifierMutationService.upsertNotification({
                data,
            });
        },
    },
});
