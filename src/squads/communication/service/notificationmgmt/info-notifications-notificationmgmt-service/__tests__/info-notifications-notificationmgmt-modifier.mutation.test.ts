import {
    DiscardNotification,
    NotifyUnreadUser,
    SendNotification,
    UpsertNotificationProps,
} from "src/squads/communication/common/constants/types";
import {
    queryRetrieveDiscardNotificationVariable,
    queryRetrieveNotifyUnreadUserVariable,
    queryRetrieveSendNotificationVariable,
    queryRetrieveUpsertNotificationPropsVariable,
    retrieveNotifyUnreadUserReturn,
    retrieveSendNotificationResponseReturn,
} from "src/squads/communication/test-utils/query-data";
import { createMockQuestionnaireFormData } from "src/squads/communication/test-utils/questionnaire";

import { NotificationModifierServicePromiseClient } from "manabuf/notificationmgmt/v1/notifications_grpc_web_pb";

import infoNotificationsNotificationMgmtModifierMutationService, {
    resendNotificationRequest,
    sendNotificationRequest,
    discardNotificationRequest,
    upsertNotificationRequest,
} from "../info-notifications-notificationmgmt-modifier.mutation";

import { MutationParams } from "@manabie-com/react-utils";

jest.mock("manabuf/notificationmgmt/v1/notifications_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/notificationmgmt/v1/notifications_grpc_web_pb");

    actual.NotificationModifierServicePromiseClient.prototype.notifyUnreadUser = jest.fn();
    actual.NotificationModifierServicePromiseClient.prototype.sendNotification = jest.fn();
    actual.NotificationModifierServicePromiseClient.prototype.discardNotification = jest.fn();
    actual.NotificationModifierServicePromiseClient.prototype.upsertNotification = jest.fn();

    return actual;
});

const fakeReturnUpsertNotification = {
    getNotificationId: () => "notificationId1",
};

describe("resend notification by infoNotificationMutationService.resendNotification", () => {
    it("should throw error when validate notification with undefined data", async () => {
        const params: MutationParams<NotifyUnreadUser> = {
            data: undefined,
        };

        const _callSpy = jest.spyOn(
            infoNotificationsNotificationMgmtModifierMutationService,
            "_call"
        );

        await expect(async () => {
            await infoNotificationsNotificationMgmtModifierMutationService.resendNotification(
                params
            );
        }).rejects.toThrowError("ra.message.invalid_form");

        expect(_callSpy).not.toBeCalled();
    });

    it("should re-send notification successfully", async () => {
        const params: MutationParams<NotifyUnreadUser> = {
            data: queryRetrieveNotifyUnreadUserVariable,
        };
        (
            NotificationModifierServicePromiseClient.prototype.notifyUnreadUser as jest.Mock
        ).mockReturnValue(retrieveNotifyUnreadUserReturn);

        const _callSpy = jest.spyOn(
            infoNotificationsNotificationMgmtModifierMutationService,
            "_call"
        );

        await infoNotificationsNotificationMgmtModifierMutationService.resendNotification(params);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(NotificationModifierServicePromiseClient.prototype.notifyUnreadUser).toBeCalledWith(
            resendNotificationRequest(queryRetrieveNotifyUnreadUserVariable)
        );
    });
});

describe("send notification by infoNotificationMutationService.sendNotification", () => {
    it("should send notification successfully", async () => {
        const params: MutationParams<SendNotification> = {
            data: queryRetrieveSendNotificationVariable,
        };
        (
            NotificationModifierServicePromiseClient.prototype.sendNotification as jest.Mock
        ).mockReturnValue(retrieveSendNotificationResponseReturn);

        const _callSpy = jest.spyOn(
            infoNotificationsNotificationMgmtModifierMutationService,
            "_call"
        );
        await infoNotificationsNotificationMgmtModifierMutationService.sendNotification(params);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(NotificationModifierServicePromiseClient.prototype.sendNotification).toBeCalledWith(
            sendNotificationRequest(queryRetrieveSendNotificationVariable)
        );
    });
});

describe("delete notification by infoNotificationMutationService.discardNotification", () => {
    it("should discard notification successfully", async () => {
        const params: MutationParams<DiscardNotification> = {
            data: queryRetrieveDiscardNotificationVariable,
        };

        const _callSpy = jest.spyOn(
            infoNotificationsNotificationMgmtModifierMutationService,
            "_call"
        );
        await infoNotificationsNotificationMgmtModifierMutationService.discardNotification(params);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            NotificationModifierServicePromiseClient.prototype.discardNotification
        ).toBeCalledWith(discardNotificationRequest(queryRetrieveDiscardNotificationVariable));
    });
});

describe("create and update notification by infoNotificationMutationService.upsertNotification", () => {
    it("should throw error when validation upsert notification with undefined data", async () => {
        const params: MutationParams<UpsertNotificationProps> = {
            data: undefined,
        };

        const _callSpy = jest.spyOn(
            infoNotificationsNotificationMgmtModifierMutationService,
            "_call"
        );

        await expect(async () => {
            await infoNotificationsNotificationMgmtModifierMutationService.upsertNotification(
                params
            );
        }).rejects.toThrowError("ra.message.invalid_form");

        expect(_callSpy).not.toBeCalled();
    });

    it("should run upsertNotification when have UpsertNotificationProps.mediaIds have new mediasIds", async () => {
        const params: MutationParams<UpsertNotificationProps> = {
            data: queryRetrieveUpsertNotificationPropsVariable,
        };
        (
            NotificationModifierServicePromiseClient.prototype.upsertNotification as jest.Mock
        ).mockReturnValue(fakeReturnUpsertNotification);

        const _callSpy = jest.spyOn(
            infoNotificationsNotificationMgmtModifierMutationService,
            "_call"
        );
        await infoNotificationsNotificationMgmtModifierMutationService.upsertNotification(params);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            NotificationModifierServicePromiseClient.prototype.upsertNotification
        ).toBeCalledWith(
            upsertNotificationRequest(queryRetrieveUpsertNotificationPropsVariable, ["mediaIds"])
        );
    });

    it("should run upsertNotification when have UpsertNotificationProps.mediaIds and don't have new mediasIds", async () => {
        const params: MutationParams<UpsertNotificationProps> = {
            data: queryRetrieveUpsertNotificationPropsVariable,
        };
        (
            NotificationModifierServicePromiseClient.prototype.upsertNotification as jest.Mock
        ).mockReturnValue(fakeReturnUpsertNotification);

        const _callSpy = jest.spyOn(
            infoNotificationsNotificationMgmtModifierMutationService,
            "_call"
        );
        await infoNotificationsNotificationMgmtModifierMutationService.upsertNotification(params);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            NotificationModifierServicePromiseClient.prototype.upsertNotification
        ).toBeCalledWith(
            upsertNotificationRequest(queryRetrieveUpsertNotificationPropsVariable, [])
        );
    });

    it("should run upsertNotification when don't have UpsertNotificationProps.mediaIds and new mediasIds", async () => {
        const params: MutationParams<UpsertNotificationProps> = {
            data: { ...queryRetrieveUpsertNotificationPropsVariable, mediaIds: undefined },
        };
        (
            NotificationModifierServicePromiseClient.prototype.upsertNotification as jest.Mock
        ).mockReturnValue(fakeReturnUpsertNotification);

        const _callSpy = jest.spyOn(
            infoNotificationsNotificationMgmtModifierMutationService,
            "_call"
        );
        await infoNotificationsNotificationMgmtModifierMutationService.upsertNotification(params);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            NotificationModifierServicePromiseClient.prototype.upsertNotification
        ).toBeCalledWith(
            upsertNotificationRequest(
                { ...queryRetrieveUpsertNotificationPropsVariable, mediaIds: undefined },
                []
            )
        );
    });

    it("should run upsertNotification when have UpsertNotificationProps.scheduleAt", async () => {
        const params: MutationParams<UpsertNotificationProps> = {
            data: {
                ...queryRetrieveUpsertNotificationPropsVariable,
                mediaIds: undefined,
                scheduledAt: "2021-10-10T09:30:09+00:00",
            },
        };
        (
            NotificationModifierServicePromiseClient.prototype.upsertNotification as jest.Mock
        ).mockReturnValue(fakeReturnUpsertNotification);

        const _callSpy = jest.spyOn(
            infoNotificationsNotificationMgmtModifierMutationService,
            "_call"
        );
        await infoNotificationsNotificationMgmtModifierMutationService.upsertNotification(params);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            NotificationModifierServicePromiseClient.prototype.upsertNotification
        ).toBeCalledWith(
            upsertNotificationRequest(
                {
                    ...queryRetrieveUpsertNotificationPropsVariable,
                    mediaIds: undefined,
                    scheduledAt: "2021-10-10T09:30:09+00:00",
                },
                []
            )
        );
    });

    it("should run upsertNotification when have UpsertNotificationProps.questionnaire", async () => {
        const params: MutationParams<UpsertNotificationProps> = {
            data: {
                ...queryRetrieveUpsertNotificationPropsVariable,
                questionnaire: createMockQuestionnaireFormData(),
            },
        };
        (
            NotificationModifierServicePromiseClient.prototype.upsertNotification as jest.Mock
        ).mockReturnValue(fakeReturnUpsertNotification);

        const _callSpy = jest.spyOn(
            infoNotificationsNotificationMgmtModifierMutationService,
            "_call"
        );
        await infoNotificationsNotificationMgmtModifierMutationService.upsertNotification(params);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            NotificationModifierServicePromiseClient.prototype.upsertNotification
        ).toBeCalledWith(upsertNotificationRequest(params.data!, []));
    });

    it("should run upsertNotification when have UpsertNotificationProps.tagIdsList", async () => {
        const params: MutationParams<UpsertNotificationProps> = {
            data: {
                ...queryRetrieveUpsertNotificationPropsVariable,
                tagIdsList: ["tag_id1", "tag_id2"],
            },
        };
        (
            NotificationModifierServicePromiseClient.prototype.upsertNotification as jest.Mock
        ).mockReturnValue(fakeReturnUpsertNotification);

        const _callSpy = jest.spyOn(
            infoNotificationsNotificationMgmtModifierMutationService,
            "_call"
        );
        await infoNotificationsNotificationMgmtModifierMutationService.upsertNotification(params);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            NotificationModifierServicePromiseClient.prototype.upsertNotification
        ).toBeCalledWith(upsertNotificationRequest(params.data!, []));
    });

    it("should run upsertNotification when isAllCourses and isAllGrades is false , courseIds and gradeIds is empty", async () => {
        const params: MutationParams<UpsertNotificationProps> = {
            data: {
                ...queryRetrieveUpsertNotificationPropsVariable,
                notificationId: "",
                gradeIds: [],
                courseIds: [],
                isAllCourses: false,
                isAllGrades: false,
                mediaIds: undefined,
            },
        };
        (
            NotificationModifierServicePromiseClient.prototype.upsertNotification as jest.Mock
        ).mockReturnValue(fakeReturnUpsertNotification);

        const _callSpy = jest.spyOn(
            infoNotificationsNotificationMgmtModifierMutationService,
            "_call"
        );
        await infoNotificationsNotificationMgmtModifierMutationService.upsertNotification(params);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            NotificationModifierServicePromiseClient.prototype.upsertNotification
        ).toBeCalledWith(
            upsertNotificationRequest(
                {
                    ...queryRetrieveUpsertNotificationPropsVariable,
                    notificationId: "",
                    gradeIds: [],
                    courseIds: [],
                    isAllCourses: false,
                    isAllGrades: false,
                    mediaIds: undefined,
                },
                []
            )
        );
    });

    it("should run upsertNotification when isAllCourses and isAllGrades is false , courseIds and gradeIds have item", async () => {
        const params: MutationParams<UpsertNotificationProps> = {
            data: {
                ...queryRetrieveUpsertNotificationPropsVariable,
                notificationId: "",
                isAllCourses: false,
                isAllGrades: false,
                mediaIds: undefined,
            },
        };
        (
            NotificationModifierServicePromiseClient.prototype.upsertNotification as jest.Mock
        ).mockReturnValue(fakeReturnUpsertNotification);

        const _callSpy = jest.spyOn(
            infoNotificationsNotificationMgmtModifierMutationService,
            "_call"
        );
        await infoNotificationsNotificationMgmtModifierMutationService.upsertNotification(params);

        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(
            NotificationModifierServicePromiseClient.prototype.upsertNotification
        ).toBeCalledWith(
            upsertNotificationRequest(
                {
                    ...queryRetrieveUpsertNotificationPropsVariable,
                    notificationId: "",
                    isAllCourses: false,
                    isAllGrades: false,
                    mediaIds: undefined,
                },
                []
            )
        );
    });
});
