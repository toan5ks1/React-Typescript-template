import { useHistory } from "react-router";
import { ERPModules } from "src/common/constants/enum";
import {
    InfoNotificationMsgsOneQuery,
    InfoNotificationMsgsOneQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { infoNotificationMgsService } from "src/squads/communication/service/bob/info-notification-msgs-service/info-notification-msgs-service";
import { inferQuery } from "src/squads/communication/service/infer-query";
import {
    createMockNotificationMsgDetail,
    createMockNotificationMedia,
} from "src/squads/communication/test-utils/notification";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import useNotificationMsgDetail, {
    UseNotificationMsgDetailReturn,
} from "../useNotificationMsgDetail";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useMediaList from "src/squads/communication/hooks/useMediaList";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";

jest.mock("src/squads/communication/hooks/useTranslate", () => ({
    __esModule: true,
    default: () => (translateKey: string) => translateKey,
}));

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useMediaList/useMediaList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

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

const notificationMsgDetail = createMockNotificationMsgDetail();
const mediaList = createMockNotificationMedia();
const historyPush = jest.fn();

function mockInterQuery(data: UseNotificationMsgDetailReturn["notificationMsgDetail"]) {
    let callbackRan = false;

    (inferQuery as jest.Mock).mockImplementation(
        (resource: {
                entity: "infoNotificationMgs";
                action: keyof typeof infoNotificationMgsService["query"];
            }) =>
            () => {
                if (!callbackRan) {
                    if (
                        resource.action === "communicationGetInfoNotificationMsgByNotificationMsgId"
                    ) {
                        callbackRan = true;

                        return {
                            data: data,
                            isFetching: false,
                        };
                    }
                }

                return {
                    data: null,
                    isFetching: false,
                };
            }
    );
}

describe("useNotificationMsgDetail", () => {
    const showSnackbar = jest.fn();

    const std = mockWarner();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should get notification msg detail data", () => {
        mockInterQuery(notificationMsgDetail);

        (useMediaList as jest.Mock).mockImplementation(() => {
            return { mediaList, isFetchingMediaList: false };
        });

        const { result } = renderHook(() => useNotificationMsgDetail("info_notification_msg1"));

        expect(result.current.notificationMsgDetail).toMatchObject(notificationMsgDetail!);
        expect(result.current.mediaList).toMatchObject(mediaList);
    });

    it("should show default value", () => {
        mockInterQuery(undefined);

        (useMediaList as jest.Mock).mockImplementation(() => {
            return { mediaList: [], isFetchingMediaList: false };
        });

        const { result } = renderHook(() => useNotificationMsgDetail(""));

        expect(result.current.notificationMsgDetail).toBeUndefined();
        expect(result.current.mediaList).toEqual([]);
    });

    it("should call onError when fetching notificationMsgDetail", () => {
        (useHistory as jest.Mock).mockImplementation(() => ({
            push: historyPush,
        }));

        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "infoNotificationMgs";
                    action: keyof typeof infoNotificationMgsService["query"];
                }) =>
                (
                    _params: InfoNotificationMsgsOneQueryVariables,
                    options: UseQueryBaseOptions<
                        InfoNotificationMsgsOneQuery["info_notification_msgs"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (
                            resource.action ===
                            "communicationGetInfoNotificationMsgByNotificationMsgId"
                        ) {
                            callbackRan = true;
                            options.onError?.(Error("ERROR INFO_NOTIFICATION_MSGS"));
                        }
                    }

                    return {
                        data: null,
                        isFetching: false,
                    };
                }
        );

        (useMediaList as jest.Mock).mockImplementation(() => {
            return { mediaList: [], isFetchingMediaList: false };
        });

        renderHook(() => useNotificationMsgDetail("errorId"));

        expect(showSnackbar).toBeCalledWith("ra.notification.item_doesnt_exist", "error");

        expect(std.warn).toBeCalledWith(
            `useNotificationMsgDetail notification msg info`,
            Error("ERROR INFO_NOTIFICATION_MSGS")
        );

        // Redirect call
        expect(historyPush).toBeCalledWith(`/communication/${ERPModules.NOTIFICATIONS}`);
    });
});
