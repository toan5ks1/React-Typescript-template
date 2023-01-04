import { NotificationCategories } from "src/squads/communication/common/constants/types";
import {
    InfoNotificationCountsByStatusV2Query,
    InfoNotificationCountsByStatusV2QueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { infoNotificationsService } from "src/squads/communication/service/bob/info-notifications-service/info-notifications-service";
import { inferQuery } from "src/squads/communication/service/infer-query";
import {
    createMockNotificationCategories,
    mockNotificationCategoriesQuery,
} from "src/squads/communication/test-utils/notification";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import useNotificationCategories from "../useNotificationCategories";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

// TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

function mockInferQuery(
    selector?: InfoNotificationCountsByStatusV2Query,
    data?: NotificationCategories
) {
    let callbackRan = false;

    (inferQuery as jest.Mock).mockImplementation(
        (resource: {
                entity: "infoNotifications";
                action: keyof typeof infoNotificationsService["query"];
            }) =>
            (
                _params: InfoNotificationCountsByStatusV2QueryVariables,
                options: UseQueryBaseOptions<
                    InfoNotificationCountsByStatusV2Query | undefined,
                    NotificationCategories | undefined
                >
            ) => {
                if (!callbackRan) {
                    if (resource.action === "communicationCountNotificationStatus") {
                        callbackRan = true;

                        options.selector?.(selector);

                        return {
                            data,
                            refetch: jest.fn(),
                            isLoading: false,
                        };
                    }
                }

                return {
                    data: {
                        all: 0,
                        draft: 0,
                        sent: 0,
                        schedule: 0,
                    },
                    refetch: jest.fn(),
                    isLoading: false,
                };
            }
    );
}

describe("useNotificationCategories", () => {
    const std = mockWarner();
    const notificationCategories = createMockNotificationCategories();

    it("should return defaultValue when selector don't have data", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });

        mockInferQuery(undefined, undefined);

        const { result } = renderHook(() => useNotificationCategories());

        expect(result.current.notificationCategories).toMatchObject({
            all: 0,
            draft: 0,
            sent: 0,
            schedule: 0,
        });
    });

    it("should return correct data with production mode OFF", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });

        mockInferQuery(mockNotificationCategoriesQuery, notificationCategories);

        const { result } = renderHook(() => useNotificationCategories());

        expect(result.current.notificationCategories).toMatchObject(notificationCategories);
    });

    it("should show error message", () => {
        const showSnackbar = jest.fn();

        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });

        (useShowSnackbar as jest.Mock).mockReturnValue(showSnackbar);

        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "infoNotifications";
                    action: keyof typeof infoNotificationsService["query"];
                }) =>
                (
                    _params: InfoNotificationCountsByStatusV2QueryVariables,
                    options: UseQueryBaseOptions<
                        InfoNotificationCountsByStatusV2Query | undefined,
                        NotificationCategories | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "communicationCountNotificationStatus") {
                            callbackRan = true;

                            options.onError?.(Error("ERROR communicationCountNotificationStatus"));
                        }
                    }

                    return {
                        data: {
                            all: 0,
                            draft: 0,
                            sent: 0,
                            schedule: 0,
                        },
                        refetch: jest.fn(),
                        isLoading: false,
                    };
                }
        );

        renderHook(() => useNotificationCategories());

        expect(showSnackbar).toBeCalledWith(
            `ra.notification.item_doesnt_exist ${"ERROR communicationCountNotificationStatus"}`,
            "error"
        );
        expect(std.warn).toBeCalledWith(
            "useNotificationCategories",
            Error("ERROR communicationCountNotificationStatus")
        );
    });

    // TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
    it("should return correct data when Production Mode is ON", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: false,
            };
        });

        mockInferQuery(mockNotificationCategoriesQuery, {
            all: 10,
            draft: 4,
            sent: 6,
            schedule: 0,
        });

        const { result } = renderHook(() => useNotificationCategories());

        expect(result.current.notificationCategories).toMatchObject({
            all: notificationCategories.draft + notificationCategories.sent,
            draft: notificationCategories.draft,
            sent: notificationCategories.sent,
            schedule: 0,
        });
    });
});
