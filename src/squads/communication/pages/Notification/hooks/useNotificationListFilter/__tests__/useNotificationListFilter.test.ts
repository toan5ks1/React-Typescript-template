import {
    FormFilterNotificationListValues,
    StudentsMany,
} from "src/squads/communication/common/constants/types";
import {
    getCurrentDateWithSpecificHour,
    getDateAfterDuration,
} from "src/squads/communication/common/utils/utils";
import { StudentsManyQueryVariables } from "src/squads/communication/service/bob/bob-types";
import { usersService } from "src/squads/communication/service/bob/users-service/users-service";
import {
    inferQuery,
    inferQueryWithGRPCPagination,
} from "src/squads/communication/service/infer-query";
import { infoNotificationsMgmtService } from "src/squads/communication/service/notificationmgmt/info-notifications-notificationmgmt-service/info-notifications-notificationmgmt-service";
import {
    createMockNotificationsComposerList,
    createMockNotificationsTagList,
    createMockReadCountOfNotifications,
} from "src/squads/communication/test-utils/notification";
import { createMockPaginationWithTotalObject } from "src/squads/communication/test-utils/pagination";
import { createMockInfoNotificationByFilterResponse } from "src/squads/communication/test-utils/query-data";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import { NotificationStatus } from "manabuf/common/v1/notifications_pb";
import {
    GetNotificationsByFilterRequest,
    GetNotificationsByFilterResponse,
} from "manabuf/notificationmgmt/v1/notifications_pb";

import useNotificationListFilter, {
    UseNotificationListFilterReturn,
} from "../useNotificationListFilter";

import { UseQueryBaseOptions, UseQueryWithGRPCPaginationOptions } from "@manabie-com/react-utils";
import { act, renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useNotificationUserRead from "src/squads/communication/pages/Notification/hooks/useNotificationUserRead";
import useTagsByTagIds from "src/squads/communication/pages/Notification/hooks/useTagsByTagIds";

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferQueryWithGRPCPagination: jest.fn(),
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationUserRead", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/pages/Notification/hooks/useTagsByTagIds", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockInfoNotificationByFilter = createMockInfoNotificationByFilterResponse();
const mockPagination = createMockPaginationWithTotalObject();
const mockReadCountOfNotifications = createMockReadCountOfNotifications();
const mockComposerList = createMockNotificationsComposerList();
const mockTags = createMockNotificationsTagList();

const showSnackbar = jest.fn();
const goToFirstPage = jest.fn();

const mockInferQueryWithGRPCPagination = (isError: boolean = false) => {
    let callbackRan = false;
    (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
        (request: {
                entity: "infoNotificationsMgmt";
                action: keyof typeof infoNotificationsMgmtService["query"];
            }) =>
            (
                _params: GetNotificationsByFilterRequest.AsObject,
                options: UseQueryWithGRPCPaginationOptions<GetNotificationsByFilterResponse.AsObject>
            ) => {
                if (request.action === "communicationGetNotificationsByFilter") {
                    if (!callbackRan) {
                        if (isError) {
                            options.onError?.(Error("Notification list error"));

                            return {
                                results: { data: undefined, isFetching: false },
                                goToFirstPage,
                            };
                        }

                        options.onSuccess?.(mockInfoNotificationByFilter);
                        callbackRan = true;
                    }
                }

                return {
                    results: {
                        data: mockInfoNotificationByFilter,
                        isFetching: false,
                        refetch: jest.fn(),
                    },
                    goToFirstPage,
                    mockPagination,
                };
            }
    );
};

const mockUseNotificationListFilterModule = () => {
    mockInferQueryWithGRPCPagination();

    (useNotificationUserRead as jest.Mock).mockReturnValue({
        readCountOfNotifications: mockReadCountOfNotifications,
        readCountOfNotificationsLoading: false,
        readCountOfNotificationsRefetch: jest.fn(),
    });

    (useTagsByTagIds as jest.Mock).mockReturnValue({
        data: mockTags,
        isLoading: false,
    });

    (useShowSnackbar as jest.Mock).mockReturnValue(showSnackbar);
};

function mockInferQuery(composerList: UseNotificationListFilterReturn["composerList"]) {
    (inferQuery as jest.Mock).mockImplementation(
        (resource: { entity: "users"; action: keyof typeof usersService["query"] }) => () => {
            if (resource.action === "communicationGetUsernames") {
                return {
                    data: composerList,
                    isLoading: false,
                };
            }

            return {
                data: undefined,
                isLoading: true,
            };
        }
    );
}

describe("useNotificationListFilter with default value", () => {
    it("should show default value", () => {
        mockUseNotificationListFilterModule();

        (useNotificationUserRead as jest.Mock).mockReturnValue({
            readCountOfNotifications: undefined,
        });

        (useTagsByTagIds as jest.Mock).mockReturnValue({
            data: undefined,
            isLoading: false,
        });

        mockInferQuery([]);

        const { result } = renderHook(() => useNotificationListFilter());

        expect(result.current.composerList).toEqual([]);
        expect(result.current.readCountOfNotifications).toBeUndefined();
        expect(result.current.tags).toBeUndefined();
    });
});

describe("useNotificationListFilter filter, search list, and notification status category", () => {
    it("should return notification list successfully", () => {
        mockUseNotificationListFilterModule();

        mockInferQuery(mockComposerList);

        const { result } = renderHook(() => useNotificationListFilter());

        expect(result.current.notifications).toEqual(mockInfoNotificationByFilter);
        expect(result.current.composerList).toEqual(mockComposerList);
        expect(result.current.readCountOfNotifications).toEqual(mockReadCountOfNotifications);
        expect(result.current.tags).toEqual(mockTags);
    });

    it("should execute goToFirstPage correctly when onCategorize", () => {
        mockUseNotificationListFilterModule();

        mockInferQuery(mockComposerList);

        const {
            result: {
                current: { onCategorize },
            },
        } = renderHook(() => useNotificationListFilter());

        act(() => {
            onCategorize(NotificationStatus.NOTIFICATION_STATUS_NONE);
        });

        expect(goToFirstPage).toBeCalledTimes(0);

        act(() => {
            onCategorize(NotificationStatus.NOTIFICATION_STATUS_SENT);
        });

        expect(goToFirstPage).toBeCalledTimes(1);
    });

    it("should execute goToFirstPage correctly when onSearch", () => {
        mockUseNotificationListFilterModule();

        mockInferQuery(mockComposerList);

        const {
            result: {
                current: { onSearch },
            },
        } = renderHook(() => useNotificationListFilter());

        act(() => {
            onSearch("");
        });

        expect(goToFirstPage).toBeCalledTimes(0);

        act(() => {
            onSearch("keyword");
        });

        expect(goToFirstPage).toBeCalledTimes(1);
    });

    it("should execute goToFirstPage correctly when onFilter", () => {
        mockUseNotificationListFilterModule();

        mockInferQuery(mockComposerList);

        const formFilterValues: FormFilterNotificationListValues = {
            fromDate: getDateAfterDuration(0),
            fromTime: {
                label: "00:00",
                value: getCurrentDateWithSpecificHour("00:00"),
            },
            toDate: getDateAfterDuration(5),
            toTime: {
                label: "23:59",
                value: getCurrentDateWithSpecificHour("23:59"),
            },
            tags: [],
        };

        const {
            result: {
                current: { onFilter },
            },
        } = renderHook(() => useNotificationListFilter());

        act(() => {
            onFilter(formFilterValues);
        });

        expect(goToFirstPage).toBeCalledTimes(1);

        const formFilterDefaultValues: FormFilterNotificationListValues = {
            fromDate: null,
            fromTime: {
                label: "",
                value: null,
            },
            toDate: null,
            toTime: {
                label: "",
                value: null,
            },
            tags: [],
        };

        act(() => {
            onFilter(formFilterDefaultValues);
        });

        expect(goToFirstPage).toBeCalledTimes(2);
    });
});

describe("useNotificationListFilter handle error", () => {
    const std = mockWarner();

    it("should call onError when fail fetching getUserNameList", () => {
        mockUseNotificationListFilterModule();

        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: { entity: "users"; action: keyof typeof usersService["query"] }) =>
                (
                    _params: StudentsManyQueryVariables,
                    options: UseQueryBaseOptions<StudentsMany | undefined>
                ) => {
                    if (!callbackRan) {
                        if (resource.entity === "users") {
                            callbackRan = true;

                            options.onError?.(Error("ERROR USERS getUserNameList"));
                        }
                    }

                    return {
                        data: undefined,
                        isFetched: true,
                    };
                }
        );

        renderHook(() => useNotificationListFilter());

        expect(std.warn).toBeCalledWith(
            `useNotificationListFilter notification getUserNameList`,
            Error("ERROR USERS getUserNameList")
        );
    });

    it("should log warning and show snackbar when GetNotificationsByFilter fails", () => {
        mockInferQueryWithGRPCPagination(true);

        (useShowSnackbar as jest.Mock).mockReturnValue(showSnackbar);

        renderHook(() => useNotificationListFilter());

        expect(std.warn).toBeCalledWith(
            "useNotificationListFilter",
            Error("Notification list error")
        );
        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData Notification list error",
            "error"
        );
    });
});
