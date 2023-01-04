import { TestApp } from "src/squads/communication/test-utils";
import {
    createMockNotificationPagination,
    createMockNotificationsComposerList,
    createMockNotificationsTagList,
    createMockReadCountOfNotifications,
} from "src/squads/communication/test-utils/notification";
import {
    createMockInfoNotificationByFilter,
    createMockInfoNotificationByFilterResponse,
} from "src/squads/communication/test-utils/query-data";
import { TestQueryWrapper } from "src/squads/communication/test-utils/react-hooks";

import { NotificationStatus } from "manabuf/common/v1/notifications_pb";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useNotificationListFilter from "src/squads/communication/pages/Notification/hooks/useNotificationListFilter";
import NotificationListV2 from "src/squads/communication/pages/NotificationV2/NotificationListV2";

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

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationListFilter", () => ({
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

const totalItemsForStatusList =
    createMockInfoNotificationByFilterResponse().totalItemsForStatusList;
const showSnackbar = jest.fn();
const onCategorize = jest.fn();
const refreshPage = jest.fn();

const mockNotificationListV2Modules = () => {
    (useNotificationListFilter as jest.Mock).mockImplementation(() => ({
        notifications: createMockInfoNotificationByFilterResponse(),
        isLoadingNotification: false,
        readCountOfNotifications: createMockReadCountOfNotifications(),
        readCountOfNotificationsLoading: false,
        composerList: createMockNotificationsComposerList(),
        isFetchingComposerList: false,
        listTag: createMockNotificationsTagList(),
        isLoadingListTag: false,
        pagination: createMockNotificationPagination(),
        refreshPage,
        onCategorize,
        readCountOfNotificationsRefetch: jest.fn(),
    }));

    (useShowSnackbar as jest.Mock).mockReturnValue(showSnackbar);
};

const renderNotificationListV2 = (isEnabled: boolean = true) => {
    (useFeatureToggle as jest.Mock).mockReturnValue({ isEnabled: isEnabled });

    // TODO: remove TranslationProvider when we clone or share TableBaseFooter component
    return render(
        <TestApp>
            <TestQueryWrapper>
                <NotificationListV2 />
            </TestQueryWrapper>
        </TestApp>
    );
};

const categoryOrder = [
    {
        label: "All",
        count: totalItemsForStatusList[0].totalItems,
        testid: "NotificationCategoryV2__NOTIFICATION_STATUS_NONE",
        status: NotificationStatus.NOTIFICATION_STATUS_NONE,
    },
    {
        label: "Sent",
        count: totalItemsForStatusList[1].totalItems,
        testid: `NotificationCategoryV2__NOTIFICATION_STATUS_SENT`,
        status: NotificationStatus.NOTIFICATION_STATUS_SENT,
    },
    {
        label: "Scheduled",
        count: totalItemsForStatusList[2].totalItems,
        testid: `NotificationCategoryV2__NOTIFICATION_STATUS_SCHEDULED`,
        status: NotificationStatus.NOTIFICATION_STATUS_SCHEDULED,
    },
    {
        label: "Draft",
        count: totalItemsForStatusList[3].totalItems,
        testid: `NotificationCategoryV2__NOTIFICATION_STATUS_DRAFT`,
        status: NotificationStatus.NOTIFICATION_STATUS_DRAFT,
    },
];

describe("<NotificationListV2 />", () => {
    it("should render snapshot", () => {
        mockNotificationListV2Modules();

        const { container } = renderNotificationListV2();

        expect(container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        mockNotificationListV2Modules();

        renderNotificationListV2();

        expect(screen.getByTestId("NotificationListV2__buttonGroupCategory")).toBeInTheDocument();
        expect(screen.getByTestId("NotificationListV2__buttonCompose")).toBeInTheDocument();
        expect(screen.getByTestId("Notification__tableV2")).toBeInTheDocument();

        categoryOrder.forEach((category) => {
            expect(screen.getByTestId(category.testid)).toBeInTheDocument();
            expect(screen.getByTestId(category.testid)).toHaveTextContent(
                `${category.label} (${category.count})`
            );
        });
    });
});

// TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
describe("<NotificationListV2 /> with schedule permission config production mode OFF", () => {
    it("should not display schedule category filter on UI with production mode is OFF", () => {
        mockNotificationListV2Modules();

        renderNotificationListV2(false);

        expect(
            screen.queryByTestId("NotificationCategoryV2__NOTIFICATION_STATUS_SCHEDULED")
        ).not.toBeInTheDocument();
    });
});

describe("<NotificationListV2 /> render compose dialog in Create mode", () => {
    it("should render <NotificationUpsertDialog /> when openCompose is true", () => {
        mockNotificationListV2Modules();

        renderNotificationListV2();

        userEvent.click(screen.getByTestId("NotificationListV2__buttonCompose"));

        expect(screen.getByTestId("NotificationUpsertDialogV2__dialog")).toBeInTheDocument();
    });
});

describe("<NotificationListV2 /> action", () => {
    it("should not call onCategorize when click current notification category", () => {
        mockNotificationListV2Modules();

        renderNotificationListV2();

        const notificationCategoryButton = screen.getByTestId(categoryOrder[0].testid);

        expect(notificationCategoryButton).toBeInTheDocument();

        userEvent.click(notificationCategoryButton);

        expect(onCategorize).not.toBeCalled();
    });
});

it("should call onCategorize when click notification category", () => {
    mockNotificationListV2Modules();

    renderNotificationListV2();

    categoryOrder.slice(1).forEach((category) => {
        const notificationCategoryButton = screen.getByTestId(category.testid);

        expect(notificationCategoryButton).toBeInTheDocument();

        userEvent.click(notificationCategoryButton);

        expect(onCategorize).toBeCalledWith(category.status);
    });
});

describe("<NotificationListV2 /> skeleton loading", () => {
    it("should render notification skeleton loading", () => {
        (useNotificationListFilter as jest.Mock).mockReturnValue({
            notifications: {
                notificationsList: createMockInfoNotificationByFilter(),
                totalItems: 0,
                totalItemsForStatusList: [
                    { status: undefined, totalItems: 0 },
                    { status: undefined, totalItems: 0 },
                    { status: undefined, totalItems: 0 },
                    { status: undefined, totalItems: 0 },
                ],
            },
            isLoadingNotification: true,
            readCountOfNotifications: createMockReadCountOfNotifications(),
            readCountOfNotificationsLoading: false,
            composerList: createMockNotificationsComposerList(),
            isFetchingComposerList: false,
            listTag: createMockNotificationsTagList(),
            isLoadingListTag: false,
            pagination: createMockNotificationPagination(),
            refreshPage,
            onCategorize,
            readCountOfNotificationsRefetch: jest.fn(),
        });

        renderNotificationListV2(false);

        expect(screen.getAllByTestId("NotificationListV2__categorySkeleton")).toHaveLength(3);
    });
});
