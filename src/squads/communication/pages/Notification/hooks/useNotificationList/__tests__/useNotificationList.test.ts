import { KeyNotificationStatus } from "src/common/constants/const";
import { InfoNotification } from "src/squads/communication/common/constants/types";
import {
    InfoNotificationMsgsTitlesQuery,
    InfoNotificationMsgsTitlesQueryVariables,
    StudentsManyQuery,
    StudentsManyQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { infoNotificationMgsService } from "src/squads/communication/service/bob/info-notification-msgs-service/info-notification-msgs-service";
import { infoNotificationsService } from "src/squads/communication/service/bob/info-notifications-service/info-notifications-service";
import { usersService } from "src/squads/communication/service/bob/users-service/users-service";
import { inferQuery, inferQueryPagination } from "src/squads/communication/service/infer-query";
import {
    createMockNotificationInfoList,
    createMockNotificationListData,
    createMockNotificationPagination,
    createMockNotificationsComposerList,
    createMockReadCountOfNotifications,
    notificationMsgTitles,
} from "src/squads/communication/test-utils/notification";
import { TestQueryWrapper } from "src/squads/communication/test-utils/react-hooks";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import useNotificationList, {
    MappedUseNotificationListIDsReturn,
    UseNotificationListReturn,
} from "../useNotificationList";

import {
    UseQueryBaseOptions,
    DataWithTotal,
    UseQueryPaginationOptions,
} from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useNotificationUserRead from "src/squads/communication/pages/Notification/hooks/useNotificationUserRead";

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationUserRead", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferQueryPagination: jest.fn(),
    inferQuery: jest.fn(),
}));

const notificationInfoList = createMockNotificationInfoList();
const notificationPaginationMapped = createMockNotificationListData();
const readCountOfNotifications = createMockReadCountOfNotifications();
const composerList = createMockNotificationsComposerList();
const pagination = createMockNotificationPagination();

function mockInferQueryPagination(
    selector: DataWithTotal<InfoNotification[] | undefined>,
    data: DataWithTotal<MappedUseNotificationListIDsReturn> | undefined
) {
    let callbackRan = false;

    (inferQueryPagination as jest.Mock).mockImplementation(
        (resource: {
                entity: "infoNotifications";
                action: keyof typeof infoNotificationsService["query"];
            }) =>
            (
                options: UseQueryPaginationOptions<
                    DataWithTotal<InfoNotification[] | undefined>,
                    DataWithTotal<MappedUseNotificationListIDsReturn>
                >
            ) => {
                if (!callbackRan) {
                    if (resource.action === "communicationGetListOfInfoNotifications") {
                        callbackRan = true;

                        options.selector?.(selector);

                        return {
                            result: {
                                isLoading: false,
                                refetch: jest.fn(),
                            },
                            data: data,
                            pagination,
                        };
                    }
                }
            }
    );
}

function mockInferQuery(
    notificationMsgTitles?: UseNotificationListReturn["notificationMsgTitles"],
    composerList?: UseNotificationListReturn["composerList"]
) {
    let callbackNotificationMsgTitlesRan = false;
    let callbackComposerListRan = false;

    (inferQuery as jest.Mock).mockImplementation(
        (resource: {
                entity: "infoNotificationMgs" | "users";
                action:
                    | keyof typeof infoNotificationMgsService["query"]
                    | keyof typeof usersService["query"];
            }) =>
            () => {
                switch (resource.entity) {
                    case "infoNotificationMgs":
                        if (!callbackNotificationMsgTitlesRan) {
                            callbackNotificationMsgTitlesRan = true;

                            return {
                                data: notificationMsgTitles,
                                isFetched: true,
                            };
                        }

                        break;

                    case "users":
                        if (!callbackComposerListRan) {
                            callbackComposerListRan = true;

                            return {
                                data: composerList,
                                isLoading: false,
                            };
                        }

                        break;

                    default:
                        break;
                }

                return {
                    data: null,
                    isFetched: true,
                };
            }
    );
}

describe("useNotificationList with default value", () => {
    it("should show default value", () => {
        mockInferQueryPagination({ data: undefined, total: 0 }, undefined);
        mockInferQuery([]);

        (useNotificationUserRead as jest.Mock).mockImplementation(() => ({
            readCountOfNotifications: undefined,
            readCountOfNotificationsLoading: false,
            readCountOfNotificationsRefetch: jest.fn(),
        }));

        const { result } = renderHook(() => useNotificationList());

        expect(result.current.notificationInfoList).toEqual([]);
        expect(result.current.readCountOfNotifications).toBeUndefined();
        expect(result.current.composerList).toBeUndefined();
        expect(result.current.notificationMsgTitles).toEqual([]);
    });
});

describe("useNotificationList handle error", () => {
    const std = mockWarner();

    beforeEach(() => {
        mockInferQueryPagination(
            {
                data: notificationInfoList,
                total: 3,
            },
            { data: notificationPaginationMapped, total: 3 }
        );

        (useNotificationUserRead as jest.Mock).mockImplementation(() => ({
            readCountOfNotifications,
            readCountOfNotificationsLoading: false,
            readCountOfNotificationsRefetch: jest.fn(),
        }));
    });

    it("should get notification list data", () => {
        mockInferQuery(notificationMsgTitles!, composerList);

        const { result } = renderHook(
            () => useNotificationList(KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT),
            { wrapper: TestQueryWrapper }
        );

        expect(result.current.notificationInfoList).toMatchObject(notificationInfoList!);
        expect(result.current.composerList).toMatchObject(composerList!);
        expect(result.current.notificationMsgTitles).toMatchObject(notificationMsgTitles!);
        expect(result.current.readCountOfNotifications).toMatchObject(readCountOfNotifications);
    });

    it("should call onError when fetching composerList", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "users"; action: keyof typeof usersService["query"] }) =>
                (
                    _params: StudentsManyQueryVariables,
                    options: UseQueryBaseOptions<StudentsManyQuery["users"] | undefined>
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "users") {
                            callbackRan = true;

                            options.onError?.(Error("ERROR USERS"));
                        }
                    }

                    return {
                        data: null,
                        isFetched: true,
                    };
                }
        );

        renderHook(() => useNotificationList(), { wrapper: TestQueryWrapper });

        //log function
        expect(std.warn).toBeCalledWith(
            `useNotificationList notification composerList`,
            Error("ERROR USERS")
        );
    });

    it("should call onError when fetching notificationMsgTitles", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "infoNotificationMgs";
                    action: keyof typeof infoNotificationMgsService["query"];
                }) =>
                (
                    _params: InfoNotificationMsgsTitlesQueryVariables,
                    options: UseQueryBaseOptions<
                        InfoNotificationMsgsTitlesQuery["info_notification_msgs"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (
                            resource.action ===
                            "communicationGetTitlesOfNotificationByNotificationMsgId"
                        ) {
                            callbackRan = true;

                            options.onError?.(Error("ERROR INFO_NOTIFICATION_MSGS"));
                        }
                    }

                    return {
                        data: null,
                        isFetched: true,
                    };
                }
        );

        renderHook(() => useNotificationList());

        expect(std.warn).toBeCalledWith(
            `useNotificationList notification notificationMsgTitles`,
            Error("ERROR INFO_NOTIFICATION_MSGS")
        );
    });

    it("should show readCountOfNotifications with status SENT", () => {
        mockInferQuery(notificationMsgTitles!, composerList);

        (useNotificationUserRead as jest.Mock).mockImplementation(() => ({
            readCountOfNotifications,
            readCountOfNotificationsLoading: false,
            readCountOfNotificationsRefetch: jest.fn(),
        }));

        const { result } = renderHook(
            () => useNotificationList(KeyNotificationStatus.NOTIFICATION_STATUS_SENT),
            { wrapper: TestQueryWrapper }
        );

        expect(result.current.notificationInfoList).toMatchObject(notificationInfoList);
        expect(result.current.readCountOfNotifications).toMatchObject(readCountOfNotifications);

        const mock = jest.fn().mockImplementation(() => false);
        expect(mock("checkDraftStatus")).toEqual(false);
        expect(mock).toHaveBeenCalledWith("checkDraftStatus");
    });
});
