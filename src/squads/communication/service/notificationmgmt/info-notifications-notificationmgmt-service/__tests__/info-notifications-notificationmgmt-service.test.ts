import {
    DiscardNotification,
    NotifyUnreadUser,
    SendNotification,
    UpsertNotificationProps,
} from "src/squads/communication/common/constants/types";
import {
    createMockInfoNotificationByFilterResponse,
    queryRetrieveDiscardNotificationVariable,
    queryRetrieveNotifyUnreadUserVariable,
    queryRetrieveSendNotificationVariable,
    queryRetrieveUpsertNotificationPropsVariable,
    retrieveDiscardNotificationResponseReturn,
    retrieveNotifyUnreadUserReturn,
    retrieveSendNotificationResponseReturn,
} from "src/squads/communication/test-utils/query-data";

import { NotificationStatus } from "manabuf/common/v1/notifications_pb";
import { GetNotificationsByFilterRequest } from "manabuf/notificationmgmt/v1/notifications_pb";

import infoNotificationsNotificationMgmtModifierMutationService from "../info-notifications-notificationmgmt-modifier.mutation";
import infoNotificationsMgmtReaderMutationService from "../info-notifications-notificationmgmt-reader.mutation";
import { infoNotificationsMgmtService } from "../info-notifications-notificationmgmt-service";

import { MutationParams } from "@manabie-com/react-utils";

jest.mock(
    "src/squads/communication/service/notificationmgmt/info-notifications-notificationmgmt-service/info-notifications-notificationmgmt-modifier.mutation",
    () => ({
        __esModule: true,
        default: {
            resendNotification: jest.fn(),
            sendNotification: jest.fn(),
            discardNotification: jest.fn(),
            upsertNotification: jest.fn(),
        },
    })
);

jest.mock(
    "src/squads/communication/service/notificationmgmt/info-notifications-notificationmgmt-service/info-notifications-notificationmgmt-reader.mutation",
    () => ({
        __esModule: true,
        default: {
            getNotificationsByFilter: jest.fn(),
        },
    })
);

const mockInfoNotificationByFilter = createMockInfoNotificationByFilterResponse();

describe("communicationGetNotificationsByFilter get notifications by filter", () => {
    it("should return notifications by filter", async () => {
        (
            infoNotificationsMgmtReaderMutationService.getNotificationsByFilter as jest.Mock
        ).mockReturnValue(mockInfoNotificationByFilter);
        const notificationByFilterParams: GetNotificationsByFilterRequest.AsObject = {
            keyword: "keyword",
            status: NotificationStatus.NOTIFICATION_STATUS_NONE,
            tagIdsList: ["tag_id_1", "tag_id_2"],
            paging: {
                limit: 10,
                offsetInteger: 0,
                offsetString: "Notification_10",
            },
        };
        const result =
            await infoNotificationsMgmtService.query.communicationGetNotificationsByFilter(
                notificationByFilterParams
            );

        expect(infoNotificationsMgmtReaderMutationService.getNotificationsByFilter).toBeCalledWith(
            notificationByFilterParams
        );
        expect(infoNotificationsMgmtReaderMutationService.getNotificationsByFilter).toBeCalledTimes(
            1
        );
        expect(result).toEqual(mockInfoNotificationByFilter);
    });
});

describe("resend notification by communicationResendNotification", () => {
    it("should resend notification", async () => {
        const queryVariable: MutationParams<NotifyUnreadUser> = {
            data: queryRetrieveNotifyUnreadUserVariable,
        };

        (
            infoNotificationsNotificationMgmtModifierMutationService.resendNotification as jest.Mock
        ).mockResolvedValue(retrieveNotifyUnreadUserReturn);

        const response =
            await infoNotificationsMgmtService.mutation.communicationResendNotification(
                queryVariable
            );

        expect(
            infoNotificationsNotificationMgmtModifierMutationService.resendNotification
        ).toBeCalledWith(queryVariable);
        expect(response).toEqual(retrieveNotifyUnreadUserReturn);
    });
});

describe("send notification by communicationSendNotification", () => {
    it("should send notification", async () => {
        const queryVariable: MutationParams<SendNotification> = {
            data: queryRetrieveSendNotificationVariable,
        };

        (
            infoNotificationsNotificationMgmtModifierMutationService.sendNotification as jest.Mock
        ).mockResolvedValue(retrieveSendNotificationResponseReturn);

        const response = await infoNotificationsMgmtService.mutation.communicationSendNotification(
            queryVariable
        );

        expect(
            infoNotificationsNotificationMgmtModifierMutationService.sendNotification
        ).toBeCalledWith(queryVariable);
        expect(response).toEqual(retrieveSendNotificationResponseReturn);
    });
});

describe("delete notification by communicationDeleteNotification", () => {
    it("should discard notification", async () => {
        const queryVariable: MutationParams<DiscardNotification> = {
            data: queryRetrieveDiscardNotificationVariable,
        };

        (
            infoNotificationsNotificationMgmtModifierMutationService.discardNotification as jest.Mock
        ).mockResolvedValue(retrieveDiscardNotificationResponseReturn);

        const response =
            await infoNotificationsMgmtService.mutation.communicationDeleteNotification(
                queryVariable
            );

        expect(
            infoNotificationsNotificationMgmtModifierMutationService.discardNotification
        ).toBeCalledWith(queryVariable);
        expect(response).toEqual(retrieveDiscardNotificationResponseReturn);
    });
});

describe("update and create notification by communicationUpsertNotification", () => {
    it("should upsert notification", async () => {
        const queryVariable: MutationParams<UpsertNotificationProps> = {
            data: queryRetrieveUpsertNotificationPropsVariable,
        };

        (
            infoNotificationsNotificationMgmtModifierMutationService.upsertNotification as jest.Mock
        ).mockResolvedValue(queryRetrieveUpsertNotificationPropsVariable.notificationId);

        const response =
            await infoNotificationsMgmtService.mutation.communicationUpsertNotification(
                queryVariable
            );

        expect(
            infoNotificationsNotificationMgmtModifierMutationService.upsertNotification
        ).toBeCalledWith(queryVariable);
        expect(response).toEqual(queryRetrieveUpsertNotificationPropsVariable.notificationId);
    });
});
