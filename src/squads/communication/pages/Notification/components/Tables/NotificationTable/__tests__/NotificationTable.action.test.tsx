import { useHistory } from "react-router";
import { ArrayElement } from "src/common/constants/types";
import {
    InfoNotificationsGetStatusByIdQuery,
    InfoNotificationsGetStatusByIdQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { infoNotificationsService } from "src/squads/communication/service/bob/info-notifications-service/info-notifications-service";
import { inferQuery } from "src/squads/communication/service/infer-query";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import {
    notificationCategoriesHookData,
    notificationListHookData,
    NotificationTableContainerTest,
} from "./NotificationTable.test";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useHistory: jest.fn(() => ({
            push: jest.fn(),
        })),
    };
});

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

// TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const refetchNotificationStatus = jest.fn();

function mockInferQuery(
    data: ArrayElement<InfoNotificationsGetStatusByIdQuery["info_notifications"]> | undefined
) {
    let callbackRan = false;

    (inferQuery as jest.Mock).mockImplementation(
        (resource: {
                entity: "infoNotifications";
                action: keyof typeof infoNotificationsService["query"];
            }) =>
            (
                _params: InfoNotificationsGetStatusByIdQueryVariables,
                options: UseQueryBaseOptions<
                    | ArrayElement<InfoNotificationsGetStatusByIdQuery["info_notifications"]>
                    | undefined
                >
            ) => {
                if (!callbackRan) {
                    if (resource.action === "communicationGetStatusByNotificationId") {
                        callbackRan = true;

                        options.onSuccess?.(data);
                    }
                }

                return {
                    refetch: refetchNotificationStatus,
                };
            }
    );
}

describe("<NotificationTable call onClickNotificationRowTitle", () => {
    const historyPush = jest.fn();
    const std = mockWarner();

    beforeEach(() => {
        (useHistory as jest.Mock).mockImplementation(() => ({
            push: historyPush,
        }));

        mockInferQuery({ status: undefined });

        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });
    });

    it("should call history.push to detail page when click notification row title with actualStatus is Sent", () => {
        const wrapper: RenderResult = render(
            <NotificationTableContainerTest
                notificationListHookData={notificationListHookData}
                notificationCategoriesHookData={notificationCategoriesHookData}
            />
        );

        expect(wrapper.getAllByTestId("NotificationTable__title")).toHaveLength(
            notificationListHookData.notificationMsgTitles!.length
        );

        mockInferQuery({ status: notificationListHookData.notificationInfoList[1].status }); // Sent

        userEvent.click(wrapper.getAllByTestId("NotificationTable__title")[2]); // status Schedule

        // With condition actualStatus (Sent) not match currentStatus (Schedule)
        expect(historyPush).toBeCalledWith(
            `/communication/notifications/${notificationListHookData.notificationInfoList[2].notification_id}/show`
        );
    });

    it("should call onOpenCompose when click notification row title status Schedule", () => {
        const wrapper: RenderResult = render(
            <NotificationTableContainerTest
                notificationListHookData={notificationListHookData}
                notificationCategoriesHookData={notificationCategoriesHookData}
            />
        );

        expect(wrapper.queryAllByTestId("NotificationTable__title")).toHaveLength(
            notificationListHookData.notificationInfoList.length
        );

        mockInferQuery({ status: notificationListHookData.notificationInfoList[0].status }); // Draft

        userEvent.click(wrapper.getAllByTestId("NotificationTable__title")[2]); // status Schedule

        // With condition actualStatus (Schedule) match currentStatus (Schedule)
        expect(wrapper.getByTestId("NotificationUpsertDialog__dialog")).toBeInTheDocument();
    });

    it("should call onError of onClickNotificationRowTitle", async () => {
        const showSnackbar = jest.fn();
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const notificationListHookErrorId = notificationListHookData;
        notificationListHookErrorId.notificationInfoList[0].notification_id = "notificationErrorId";

        render(
            <NotificationTableContainerTest
                notificationListHookData={notificationListHookErrorId}
                notificationCategoriesHookData={notificationCategoriesHookData}
            />
        );

        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "infoNotifications";
                    action: keyof typeof infoNotificationsService["query"];
                }) =>
                (
                    _params: InfoNotificationsGetStatusByIdQueryVariables,
                    options: UseQueryBaseOptions<
                        | ArrayElement<InfoNotificationsGetStatusByIdQuery["info_notifications"]>
                        | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "communicationGetStatusByNotificationId") {
                            callbackRan = true;

                            options.onError?.(
                                Error("ERROR communicationGetStatusByNotificationId")
                            );
                        }
                    }

                    return {
                        refetch: refetchNotificationStatus,
                    };
                }
        );

        expect(screen.queryAllByTestId("NotificationTable__title")).toHaveLength(3);

        userEvent.click(screen.queryAllByTestId("NotificationTable__title")[0]); // wrong notification_id

        expect(showSnackbar).toBeCalledWith(
            "ERROR communicationGetStatusByNotificationId",
            "error"
        );

        //log function
        expect(std.warn).toBeCalledWith(
            "NotificationTable component ERROR communicationGetStatusByNotificationId",
            Error("ERROR communicationGetStatusByNotificationId")
        );
    });

    it("should call showSnackbar when get status notification return undefined", () => {
        const showSnackbar = jest.fn();

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const notificationListHookErrorStatus = notificationListHookData;
        notificationListHookErrorStatus.notificationInfoList[0].status = undefined;

        render(
            <NotificationTableContainerTest
                notificationListHookData={notificationListHookErrorStatus}
                notificationCategoriesHookData={notificationCategoriesHookData}
            />
        );

        mockInferQuery({ status: undefined });

        userEvent.click(screen.queryAllByTestId("NotificationTable__title")[0]); // wrong notification_id

        expect(showSnackbar).toBeCalledWith(
            "Notification items have been updated. Please reload the page.",
            "error"
        );
    });

    it("should not call refetchNotificationStatus to get notification status when click notification row title status Sent", () => {
        const wrapper: RenderResult = render(
            <NotificationTableContainerTest
                notificationListHookData={notificationListHookData}
                notificationCategoriesHookData={notificationCategoriesHookData}
            />
        );

        mockInferQuery({ status: notificationListHookData.notificationInfoList[1].status }); // Sent

        expect(wrapper.queryAllByTestId("NotificationTable__title")).toHaveLength(
            notificationListHookData.notificationInfoList.length
        );

        userEvent.click(wrapper.queryAllByTestId("NotificationTable__title")[1]); // status Sent

        expect(refetchNotificationStatus).not.toBeCalled();
    });
});
