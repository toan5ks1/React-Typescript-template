import {
    InfoNotificationMsgsOneQueryVariables,
    InfoNotificationMsgsTitlesQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { InvalidParamError } from "src/squads/communication/service/service-types";
import {
    isInvalidOrEmptyArray,
    isInvalidOrEmptyVariable,
} from "src/squads/communication/service/utils/validation";

import infoNotificationMsgsQueriesBob from "./info-notification-msgs-bob.query";

import { defineService } from "@manabie-com/react-utils";

export const infoNotificationMgsService = defineService({
    query: {
        communicationGetInfoNotificationMsgByNotificationMsgId: ({
            notification_msg_id,
        }: InfoNotificationMsgsOneQueryVariables) => {
            if (isInvalidOrEmptyVariable(notification_msg_id)) {
                throw new InvalidParamError({
                    action: "communicationGetInfoNotificationMsgByNotificationMsgId",
                    errors: [
                        {
                            field: "notification_msg_id",
                            fieldValueIfNotSensitive: notification_msg_id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }

            return infoNotificationMsgsQueriesBob.getOne({
                notification_msg_id,
            });
        },

        communicationGetTitlesOfNotificationByNotificationMsgId: ({
            notification_msg_id,
        }: InfoNotificationMsgsTitlesQueryVariables) => {
            if (isInvalidOrEmptyArray(notification_msg_id)) {
                throw new InvalidParamError({
                    action: "communicationGetTitlesOfNotificationByNotificationMsgId",
                    errors: [
                        {
                            field: "notification_msg_id",
                            fieldValueIfNotSensitive: notification_msg_id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }

            return infoNotificationMsgsQueriesBob.getTitles({
                notification_msg_id,
            });
        },
    },
});
