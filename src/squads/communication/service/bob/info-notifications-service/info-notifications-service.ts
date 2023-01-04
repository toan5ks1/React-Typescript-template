import {
    InfoNotificationsCountReadQueryVariables,
    InfoNotificationsGetStatusByIdQueryVariables,
    Communication_GetInfoNotificationByNotificationIdQueryVariables,
    Communication_GetListInfoNotificationsQueryVariables,
    Communication_GetInfoNotificationByNotificationIdV2QueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { InvalidParamError } from "src/squads/communication/service/service-types";
import { createEmptyResponse } from "src/squads/communication/service/utils/utils";
import {
    isInvalidOrEmptyArray,
    isInvalidOrEmptyVariable,
} from "src/squads/communication/service/utils/validation";

import infoNotificationsQueriesBob from "./info-notifications-bob.query";

import { defineService } from "@manabie-com/react-utils";

export const infoNotificationsService = defineService({
    query: {
        communicationGetInfoNotificationByNotificationId: ({
            notification_id,
        }: Communication_GetInfoNotificationByNotificationIdQueryVariables) => {
            if (isInvalidOrEmptyVariable(notification_id)) {
                throw new InvalidParamError({
                    action: "communicationGetInfoNotificationByNotificationId",
                    errors: [
                        {
                            field: "notification_id",
                            fieldValueIfNotSensitive: notification_id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }

            return infoNotificationsQueriesBob.getInfoNotificationByNotificationId({
                notification_id,
            });
        },

        communicationGetInfoNotificationByNotificationIdV2: ({
            notification_id,
        }: Communication_GetInfoNotificationByNotificationIdV2QueryVariables) => {
            if (isInvalidOrEmptyVariable(notification_id)) {
                throw new InvalidParamError({
                    action: "communicationGetInfoNotificationByNotificationIdV2",
                    errors: [
                        {
                            field: "notification_id",
                            fieldValueIfNotSensitive: notification_id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }

            return infoNotificationsQueriesBob.getInfoNotificationWithQuestionnaireByNotificationId(
                {
                    notification_id,
                }
            );
        },

        communicationGetStatusByNotificationId: ({
            notification_id,
        }: InfoNotificationsGetStatusByIdQueryVariables) => {
            if (isInvalidOrEmptyVariable(notification_id)) {
                throw new InvalidParamError({
                    action: "communicationGetStatusByNotificationId",
                    errors: [
                        {
                            field: "notification_id",
                            fieldValueIfNotSensitive: notification_id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }

            return infoNotificationsQueriesBob.getStatusById({
                notification_id,
            });
        },

        communicationGetListOfInfoNotifications: ({
            status,
            limit,
            offset,
        }: Communication_GetListInfoNotificationsQueryVariables) => {
            return infoNotificationsQueriesBob.getList({
                status,
                limit,
                offset,
            });
        },

        communicationCountReadRecipientsByNotificationId: ({
            notification_id,
        }: InfoNotificationsCountReadQueryVariables) => {
            if (isInvalidOrEmptyArray(notification_id)) {
                return createEmptyResponse([]);
            }

            return infoNotificationsQueriesBob.countReadOfNotifications({
                notification_id,
            });
        },

        communicationCountNotificationStatus: () => {
            return infoNotificationsQueriesBob.countByStatusV2({});
        },
    },
});
