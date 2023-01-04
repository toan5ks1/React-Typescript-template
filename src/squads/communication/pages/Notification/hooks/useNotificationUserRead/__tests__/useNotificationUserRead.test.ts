import {
    InfoNotificationsCountReadQuery,
    InfoNotificationsCountReadQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { infoNotificationsService } from "src/squads/communication/service/bob/info-notifications-service/info-notifications-service";
import { inferQuery } from "src/squads/communication/service/infer-query";
import { createMockReadCountOfNotifications } from "src/squads/communication/test-utils/notification";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import useNotificationUserRead, { UseNotificationUserReadReturn } from "../useNotificationUserRead";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

const readCountOfNotifications = createMockReadCountOfNotifications();

function mockHookInferQuery(result?: UseNotificationUserReadReturn["readCountOfNotifications"]) {
    let callbackRan = false;

    (inferQuery as jest.Mock).mockImplementation(
        (resource: {
                entity: "infoNotifications";
                action: keyof typeof infoNotificationsService["query"];
            }) =>
            () => {
                if (!callbackRan) {
                    if (resource.action === "communicationCountReadRecipientsByNotificationId") {
                        callbackRan = true;
                        return {
                            data: result,
                            refetch: jest.fn(),
                            isLoading: false,
                        };
                    }
                }

                return {
                    data: [],
                    refetch: jest.fn(),
                    isLoading: false,
                };
            }
    );
}

describe("useNotificationUserRead", () => {
    const showSnackbar = jest.fn();
    const std = mockWarner();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should return correct data", () => {
        mockHookInferQuery(readCountOfNotifications);

        const {
            result: { current },
        } = renderHook(() =>
            useNotificationUserRead({
                notification_id: "notificationId1",
            })
        );

        expect(current.readCountOfNotifications).toEqual(readCountOfNotifications);
    });

    it("should show default value", () => {
        mockHookInferQuery(undefined);

        const {
            result: { current },
        } = renderHook(() =>
            useNotificationUserRead({
                notification_id: "notificationId1",
            })
        );

        expect(current.readCountOfNotifications).toEqual([]);
    });

    it("should return empty array when request fail", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "infoNotifications";
                    action: keyof typeof infoNotificationsService["query"];
                }) =>
                (
                    _params: InfoNotificationsCountReadQueryVariables,
                    options: UseQueryBaseOptions<
                        InfoNotificationsCountReadQuery["info_notifications"] | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (
                            resource.action === "communicationCountReadRecipientsByNotificationId"
                        ) {
                            callbackRan = true;
                            options.onError?.(
                                Error("ERROR communicationCountReadRecipientsByNotificationId")
                            );
                        }
                    }

                    return {
                        data: [],
                        refetch: jest.fn(),
                        isLoading: false,
                    };
                }
        );

        const {
            result: { current },
        } = renderHook(() => useNotificationUserRead({ notification_id: "errorId" }));

        expect(current.readCountOfNotifications).toEqual([]);
        expect(std.warn).toBeCalledWith(
            "useNotificationUserRead notification readList",
            Error("ERROR communicationCountReadRecipientsByNotificationId")
        );
        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
    });
});
