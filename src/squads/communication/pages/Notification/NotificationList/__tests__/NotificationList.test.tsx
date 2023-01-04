import { useHistory } from "react-router";
import { KeyNotificationStatus } from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { TestApp } from "src/squads/communication/test-utils";
import {
    createMockNotificationCategories,
    createMockNotificationInfoList,
    createMockNotificationPagination,
    createMockNotificationsComposerList,
    createMockReadCountOfNotifications,
    notificationMsgTitles,
} from "src/squads/communication/test-utils/notification";
import { TestQueryWrapper } from "src/squads/communication/test-utils/react-hooks";

import TranslationProvider from "src/providers/TranslationProvider";
import MuiPickersUtilsProvider from "src/squads/communication/providers/MuiPickersUtilsProvider";

import useNotificationList from "../../hooks/useNotificationList";

import { render, RenderResult, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import NotificationList from "src/squads/communication/pages/Notification/NotificationList/NotificationList";
import useNotificationCategories, {
    UseNotificationCategoriesReturn,
} from "src/squads/communication/pages/Notification/hooks/useNotificationCategories";

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...originalModule,
        useParams: () => ({}),
        useHistory: jest.fn(() => ({
            push: jest.fn(),
        })),
    };
});

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationList", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationCategories", () => ({
    __esModule: true,
    default: jest.fn(),
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

const notificationCategories = createMockNotificationCategories();
const showSnackbar = jest.fn();
const historyPush = jest.fn();
const notificationCategoriesRefetch = jest.fn();
const resetPaginationOffset = jest.fn();
const readCountOfNotificationsRefetch = jest.fn();
const notificationListRefetch = jest.fn();

const mockNotificationListModules = () => {
    (useHistory as jest.Mock).mockImplementation(() => ({
        push: historyPush,
    }));

    (useNotificationCategories as jest.Mock).mockImplementation(
        (): UseNotificationCategoriesReturn => ({
            notificationCategories,
            notificationCategoriesLoading: false,
            notificationCategoriesRefetch,
        })
    );

    (useNotificationList as jest.Mock).mockImplementation(() => ({
        notificationInfoList: createMockNotificationInfoList(),
        composerList: createMockNotificationsComposerList(),
        readCountOfNotifications: createMockReadCountOfNotifications(),
        readCountOfNotificationsLoading: false,
        notificationListLoading: false,
        pagination: createMockNotificationPagination(),
        isFetchingComposerList: false,
        notificationMsgTitles: notificationMsgTitles,
        notificationMsgTitlesFetched: true,
        readCountOfNotificationsRefetch,
        notificationListRefetch,
        resetPaginationOffset,
    }));

    (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
};

const renderNotificationList = (isEnabled: boolean = true) => {
    (useFeatureToggle as jest.Mock).mockImplementation(() => {
        return {
            isEnabled,
        };
    });

    // TODO: remove TranslationProvider when we clone or share TableBaseFooter component
    return render(
        <TranslationProvider>
            <TestApp>
                <MuiPickersUtilsProvider>
                    <TestQueryWrapper>
                        <NotificationList />
                    </TestQueryWrapper>
                </MuiPickersUtilsProvider>
            </TestApp>
        </TranslationProvider>
    );
};

describe("<NotificationList />", () => {
    it("should render snapshot", () => {
        mockNotificationListModules();

        const wrapper: RenderResult = renderNotificationList();

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        mockNotificationListModules();

        renderNotificationList();

        expect(screen.getByTestId("NotificationList__buttonGroupCategory")).toBeInTheDocument();
        expect(screen.getByTestId("NotificationList__buttonCompose")).toBeInTheDocument();
    });

    it("should have correct category order, label and count", () => {
        const categoryOrder = [
            {
                label: "All",
                count: notificationCategories.all,
                testid: "NotificationCategory__ALL",
            },
            {
                label: "Sent",
                count: notificationCategories.sent,
                testid: `NotificationCategory__NOTIFICATION_STATUS_SENT`,
            },
            {
                label: "Scheduled",
                count: notificationCategories.schedule,
                testid: `NotificationCategory__NOTIFICATION_STATUS_SCHEDULED`,
            },
            {
                label: "Draft",
                count: notificationCategories.draft,
                testid: `NotificationCategory__NOTIFICATION_STATUS_DRAFT`,
            },
        ];

        mockNotificationListModules();

        renderNotificationList();

        categoryOrder.forEach((category) => {
            expect(screen.getByTestId(category.testid)).toBeInTheDocument();
            expect(screen.getByTestId(category.testid).textContent).toEqual(
                `${category.label} (${category.count})`
            );
        });
    });

    it("should display schedule category filter on UI with production mode is OFF", () => {
        mockNotificationListModules();

        const wrapper = renderNotificationList();

        expect(
            wrapper.getByTestId("NotificationCategory__NOTIFICATION_STATUS_SCHEDULED")
        ).toBeInTheDocument();
    });
});

// TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
describe("<NotificationList /> with schedule permission config production mode OFF", () => {
    it("should not display schedule category filter on UI with production mode is OFF", () => {
        mockNotificationListModules();

        const wrapper = renderNotificationList(false);

        expect(
            wrapper.queryByTestId("NotificationCategory__NOTIFICATION_STATUS_SCHEDULED")
        ).toBeNull();
    });
});

describe("<NotificationList /> render compose dialog in Create mode", () => {
    it("should render <NotificationUpsertDialog /> when openCompose is true", () => {
        mockNotificationListModules();

        renderNotificationList();

        userEvent.click(screen.getByTestId("NotificationList__buttonCompose"));

        expect(screen.getByTestId("NotificationUpsertDialog__dialog")).toBeInTheDocument();
    });
});

describe("<NotificationList /> action", () => {
    it("should call onClickNotificationStatus when click notification category", () => {
        mockNotificationListModules();

        const wrapper: RenderResult = renderNotificationList();

        const notificationCategoryDraft = wrapper.getByTestId(
            `NotificationCategory__${KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT}`
        );

        const notificationCategoryAll = wrapper.getByTestId(`NotificationCategory__ALL`);

        expect(notificationCategoryDraft).toBeInTheDocument();
        expect(notificationCategoryAll).toBeInTheDocument();

        userEvent.click(notificationCategoryDraft);

        expect(historyPush).toBeCalledWith({
            pathname: `/${MicroFrontendTypes.COMMUNICATION}/${ERPModules.NOTIFICATIONS}`,
            search: "?status=NOTIFICATION_STATUS_DRAFT",
        });
        expect(notificationCategoriesRefetch).toBeCalled();
        expect(resetPaginationOffset).toBeCalled();
        expect(readCountOfNotificationsRefetch).toBeCalled();
        expect(notificationListRefetch).toBeCalled();

        userEvent.click(notificationCategoryAll);

        // undefined search param for All status
        expect(historyPush).toBeCalledWith({
            pathname: `/${MicroFrontendTypes.COMMUNICATION}/${ERPModules.NOTIFICATIONS}`,
            search: undefined,
        });
        expect(notificationCategoriesRefetch).toBeCalled();
        expect(resetPaginationOffset).toBeCalled();
        expect(readCountOfNotificationsRefetch).toBeCalled();
        expect(notificationListRefetch).toBeCalled();
    });
});

describe("<NotificationList /> skeleton loading", () => {
    it("should render notification skeleton loading", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: false,
            };
        });

        mockNotificationListModules();

        (useNotificationCategories as jest.Mock).mockImplementation(
            (): UseNotificationCategoriesReturn => {
                return {
                    notificationCategories,
                    notificationCategoriesLoading: true,
                    notificationCategoriesRefetch: jest.fn(),
                };
            }
        );

        const wrapper: RenderResult = render(
            <TestApp>
                <MuiPickersUtilsProvider>
                    <TestQueryWrapper>
                        <NotificationList />
                    </TestQueryWrapper>
                </MuiPickersUtilsProvider>
            </TestApp>
        );

        expect(wrapper.getAllByTestId("NotificationList__categorySkeleton")).toHaveLength(3);
    });
});
