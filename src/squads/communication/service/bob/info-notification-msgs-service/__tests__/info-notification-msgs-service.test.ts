import {
    InfoNotificationMsgsOneQueryVariables,
    InfoNotificationMsgsTitlesQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { infoNotificationMgsService } from "src/squads/communication/service/bob/info-notification-msgs-service/info-notification-msgs-service";
import { InvalidParamError } from "src/squads/communication/service/service-types";

import infoNotificationMsgQuery from "src/squads/communication/service/bob/info-notification-msgs-service/info-notification-msgs-bob.query";

jest.mock(
    "src/squads/communication/service/bob/info-notification-msgs-service/info-notification-msgs-bob.query",
    () => {
        return {
            __esModule: true,
            default: {
                getOne: jest.fn(),
                getTitles: jest.fn(),
            },
        };
    }
);

describe("info-notification-msgs-service communicationGetInfoNotificationMsgByNotificationMsgId", () => {
    it("should throw invalidParamError with notification_msg_id is empty", async () => {
        const queryVariable: InfoNotificationMsgsOneQueryVariables = {
            notification_msg_id: "",
        };

        await expect(async () => {
            await infoNotificationMgsService.query.communicationGetInfoNotificationMsgByNotificationMsgId(
                queryVariable
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "communicationGetInfoNotificationMsgByNotificationMsgId",
                errors: [
                    {
                        field: "notification_msg_id",
                        fieldValueIfNotSensitive: queryVariable.notification_msg_id,
                    },
                ],
                serviceName: "bobGraphQL",
            })
        );

        expect(infoNotificationMsgQuery.getOne).not.toBeCalled();
    });
});

describe("info-notification-msgs-service communicationGetTitlesOfNotificationByNotificationMsgId", () => {
    it("should throw invalidParamError with notification_msg_id is empty", async () => {
        const queryVariable: InfoNotificationMsgsTitlesQueryVariables = {
            notification_msg_id: "",
        };

        await expect(async () => {
            await infoNotificationMgsService.query.communicationGetTitlesOfNotificationByNotificationMsgId(
                queryVariable
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "communicationGetTitlesOfNotificationByNotificationMsgId",
                errors: [
                    {
                        field: "notification_msg_id",
                        fieldValueIfNotSensitive: queryVariable.notification_msg_id,
                    },
                ],
                serviceName: "bobGraphQL",
            })
        );

        expect(infoNotificationMsgQuery.getTitles).not.toBeCalled();
    });
});
