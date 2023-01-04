import { NotificationStatus } from "manabuf/common/v1/notifications_pb";
import { NotificationReaderServicePromiseClient } from "manabuf/notificationmgmt/v1/notifications_grpc_web_pb";
import { GetNotificationsByFilterRequest } from "manabuf/notificationmgmt/v1/notifications_pb";

import infoNotificationsMgmtReaderMutationService, {
    newGetNotificationsByFilter,
} from "../info-notifications-notificationmgmt-reader.mutation";

jest.mock("manabuf/notificationmgmt/v1/notifications_grpc_web_pb", () => {
    const actual = jest.requireActual("manabuf/notificationmgmt/v1/notifications_grpc_web_pb");

    actual.NotificationReaderServicePromiseClient.prototype.getNotificationsByFilter = jest.fn();

    return actual;
});

const fakeReturn = {
    message: "FAKE_RETURN",
    toObject: () => "FAKE_TO_OBJECT_RETURN",
};

describe("getNotificationsByFilter get notification list by filter", () => {
    it("should return notification list with valid params", async () => {
        (
            NotificationReaderServicePromiseClient.prototype.getNotificationsByFilter as jest.Mock
        ).mockImplementation(() => fakeReturn);

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

        await infoNotificationsMgmtReaderMutationService.getNotificationsByFilter(
            notificationByFilterParams
        );

        expect(
            NotificationReaderServicePromiseClient.prototype.getNotificationsByFilter
        ).toBeCalledWith(newGetNotificationsByFilter(notificationByFilterParams));
    });

    it("should throw error with invalid params", async () => {
        (
            NotificationReaderServicePromiseClient.prototype.getNotificationsByFilter as jest.Mock
        ).mockImplementation(() => fakeReturn);

        const notificationByFilterParams: GetNotificationsByFilterRequest.AsObject = {
            keyword: "keyword",
            status: NotificationStatus.NOTIFICATION_STATUS_NONE,
            tagIdsList: ["tag_id_1", "tag_id_2"],
        };

        await expect(async () => {
            await infoNotificationsMgmtReaderMutationService.getNotificationsByFilter(
                notificationByFilterParams
            );
        }).rejects.toMatchObject({
            message: "ra.message.invalid_form",
            name: "AppError",
        });
    });
});
