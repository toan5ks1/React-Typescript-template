import { ERPModules } from "src/common/constants/enum";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { MicroFrontendTypes } from "src/routing/type";
import { InfoNotificationsByFilter } from "src/squads/communication/common/constants/types";
import { TestApp } from "src/squads/communication/test-utils";
import {
    createMockNotificationInfoListV2,
    createMockNotificationPagination,
    createMockNotificationsComposerList,
    createMockNotificationsTagList,
    createMockReadCountOfNotifications,
} from "src/squads/communication/test-utils/notification";
import { TestQueryWrapper } from "src/squads/communication/test-utils/react-hooks";

import NotificationTableV2, {
    NotificationTableV2Props,
} from "src/squads/communication/pages/NotificationV2/components/NotificationTableV2";

import { NotificationStatus } from "manabuf/common/v1/notifications_pb";

import { toShortenStr } from "@manabie-com/mana-utils";
import { render, RenderResult, screen } from "@testing-library/react";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";

// TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

export const NotificationTableV2ContainerTest = (
    notificationListFilterHookData: NotificationTableV2Props
) => {
    return (
        <TestApp>
            <TestQueryWrapper>
                <NotificationTableV2 {...notificationListFilterHookData} />
            </TestQueryWrapper>
        </TestApp>
    );
};

const mockUseFeatureToggle = (isEnableScheduled: boolean = true) =>
    (useFeatureToggle as jest.Mock).mockReturnValue({ isEnabled: isEnableScheduled });

export const notificationListFilterHookData: NotificationTableV2Props = {
    notifications: createMockNotificationInfoListV2(),
    isLoadingNotification: false,
    readCountOfNotifications: createMockReadCountOfNotifications(),
    readCountOfNotificationsLoading: false,
    composerList: createMockNotificationsComposerList(),
    isFetchingComposerList: false,
    tags: createMockNotificationsTagList(),
    isFetchingTags: false,
    pagination: createMockNotificationPagination(),
    refreshPage: jest.fn(),
    readCountOfNotificationsRefetch: jest.fn(),
};

describe("<NotificationTableV2 />", () => {
    beforeEach(() => {
        mockUseFeatureToggle();
        render(<NotificationTableV2ContainerTest {...notificationListFilterHookData} />);
    });

    it("should render snapshot", () => {
        const { container } = render(
            <NotificationTableV2ContainerTest {...notificationListFilterHookData} />
        );
        expect(container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(screen.getByTestId("Notification__tableV2")).toBeInTheDocument();
        expect(screen.getAllByTestId("NotificationTableV2__title")).toHaveLength(3);
        expect(screen.getAllByTestId("NotificationTableV2__typographyComposer")).toHaveLength(3);
        expect(screen.getAllByTestId("NotificationTableV2__recipient")).toHaveLength(3);
        expect(screen.getAllByTestId("NotificationTableV2__status")).toHaveLength(3);
        expect(screen.getAllByTestId("NotificationTableV2__sentDate")).toHaveLength(3);
        expect(screen.getAllByTestId("NotificationTableV2__tag")).toHaveLength(3);
    });

    it("should render correct date format", () => {
        const sendDate = screen.getAllByTestId("NotificationTableV2__sentDate");

        notificationListFilterHookData.notifications?.forEach((notification, index) => {
            if (notification.status === NotificationStatus.NOTIFICATION_STATUS_DRAFT) {
                expect(sendDate[index]).toHaveTextContent("--");
            }

            if (notification.status === NotificationStatus.NOTIFICATION_STATUS_SENT) {
                expect(sendDate[index]).toHaveTextContent(
                    formatDate(convertTimestampToDate(notification.sentAt), "yyyy/LL/dd, HH:mm")
                );
            }

            if (notification.status === NotificationStatus.NOTIFICATION_STATUS_SCHEDULED) {
                expect(sendDate[index]).toHaveTextContent("Scheduled");
            }
        });
    });

    it("should render 24 characters of column composer and title href attr", () => {
        const titles = screen.getAllByTestId("NotificationTableV2__title");

        const composers = screen.getAllByTestId("NotificationTableV2__typographyComposer");

        notificationListFilterHookData.composerList?.forEach((composer, index) => {
            if (composer.name.length > 24) {
                expect(composers[index]).toHaveTextContent(
                    toShortenStr(notificationListFilterHookData.composerList![index].name, 24)
                );
            }
        });

        notificationListFilterHookData.notifications?.forEach((notification, index) => {
            if (notification.title.length > 24) {
                expect(titles[index]).toHaveTextContent(
                    toShortenStr(
                        "I want notification's title to have > 24 characters, so I write more",
                        24
                    )
                );
            }
        });

        notificationListFilterHookData.notifications?.forEach((notification, index) => {
            expect(titles[index].getAttribute("href")).toEqual(
                `/${MicroFrontendTypes.COMMUNICATION}/${ERPModules.NOTIFICATIONS}/${notification.notificationId}/show`
            );
        });
    });
});

describe("<NotificationTableV2 /> missing data", () => {
    beforeEach(() => {
        mockUseFeatureToggle(false);
    });

    it("should render table when missing data", () => {
        const notificationListProps: NotificationTableV2Props = {
            ...notificationListFilterHookData,
            notifications: undefined,
        };

        const wrapper: RenderResult = render(
            <NotificationTableV2ContainerTest {...notificationListProps} />
        );

        expect(wrapper.container).toMatchSnapshot();

        expect(screen.getByTestId("Notification__tableV2")).toBeInTheDocument();

        const columns = screen.getByTestId("TableBase__header").getElementsByTagName("th");
        expect(columns).toHaveLength(8);

        expect(screen.getByTestId("TableBase__noDataMessage")).toBeInTheDocument();
    });

    it("should render loading Skeleton when isFetchingComposerList, readCountOfNotificationsLoading, isFetchingTags", () => {
        const notificationListProps: NotificationTableV2Props = {
            ...notificationListFilterHookData,
            isFetchingComposerList: true,
            readCountOfNotificationsLoading: true,
            isFetchingTags: true,
        };

        const wrapper: RenderResult = render(
            <NotificationTableV2ContainerTest {...notificationListProps} />
        );

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render null without tagList, composerList", () => {
        const notificationListProps: NotificationTableV2Props = {
            ...notificationListFilterHookData,
            tags: undefined,
            composerList: undefined,
        };

        render(<NotificationTableV2ContainerTest {...notificationListProps} />);

        expect(screen.queryByTestId("NotificationTableV2__tag")).not.toBeInTheDocument();
        expect(
            screen.queryByTestId("NotificationTableV2__typographyComposer")
        ).not.toBeInTheDocument();
    });

    it("should render null without composerName of composerList", () => {
        const notificationListProps: NotificationTableV2Props = {
            ...notificationListFilterHookData,
            composerList: [
                {
                    user_id: "editorErrorId",
                    name: "composerId not match with editorId",
                },
            ],
        };

        render(<NotificationTableV2ContainerTest {...notificationListProps} />);

        expect(
            screen.queryByTestId("NotificationTableV2__typographyComposer")
        ).not.toBeInTheDocument();
    });
});

describe("<NotificationTableV2 /> call getReadCountOfNotifications", () => {
    const notificationsWithSentStatus = [
        {
            composerId: "student3",
            notificationId: "notification_id3",
            notificationMgsId: "notification_msg_id3",
            sentAt: "",
            status: 3,
            tagIdsList: ["tagId2"],
            title: "Notification test 03",
            updatedAt: {
                seconds: 1642460430,
                nanos: 0,
            },
            userGroupFilter: {
                userGroupsList: [1, 7],
            },
        },
    ];
    beforeEach(() => {
        mockUseFeatureToggle(false);
    });

    it("should render default value without readCountOfNotifications", () => {
        const notificationListProps: NotificationTableV2Props = {
            ...notificationListFilterHookData,
            notifications: notificationsWithSentStatus,
            readCountOfNotifications: [],
        };

        render(<NotificationTableV2ContainerTest {...notificationListProps} />);
        expect(screen.getByTestId("ReadCountColumn__box")).toHaveTextContent("0/0");
    });

    it("should render default value when not match record and readCountOfNotifications", () => {
        const notificationListProps: NotificationTableV2Props = {
            ...notificationListFilterHookData,
            notifications: notificationsWithSentStatus,
            readCountOfNotifications: [
                {
                    notification_id: "notificationErrorId",
                    all_receiver_aggregate: {
                        aggregate: {
                            count: 0,
                        },
                    },
                    read_aggregate: {
                        aggregate: {
                            count: 0,
                        },
                    },
                },
            ],
        };

        render(<NotificationTableV2ContainerTest {...notificationListProps} />);
        expect(screen.getByTestId("ReadCountColumn__box")).toHaveTextContent("0/0");
    });
});

// TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
describe("<NotificationTableV2 /> permission scheduled notification link", () => {
    const mockScheduledNotificationList: InfoNotificationsByFilter = {
        composerId: "student1",
        notificationId: "notification_id1",
        notificationMgsId: "notification_mgs_id1",
        sentAt: {
            seconds: 1642460400,
            nanos: 0,
        },
        status: 2,
        tagIdsList: ["tagId1", "tagId2"],
        title: "I want notification's title to have > 24 characters, so I write more",
        updatedAt: {
            seconds: 1642460410,
            nanos: 0,
        },
        userGroupFilter: {
            userGroupsList: [1, 7],
        },
    };

    it("should render 24 characters of column title and don't have href attr with notification status SCHEDULED", () => {
        mockUseFeatureToggle(false);

        const notificationListProps: NotificationTableV2Props = {
            ...notificationListFilterHookData,
            notifications: [mockScheduledNotificationList],
            readCountOfNotifications: [
                {
                    notification_id: "notification_id1",
                    all_receiver_aggregate: {
                        aggregate: {
                            count: 0,
                        },
                    },
                    read_aggregate: {
                        aggregate: {
                            count: 0,
                        },
                    },
                },
            ],
        };

        const wrapper: RenderResult = render(
            <NotificationTableV2ContainerTest {...notificationListProps} />
        );

        expect(wrapper.container).toMatchSnapshot();

        expect(screen.queryAllByTestId("NotificationTableV2__title")).toHaveLength(0);

        expect(screen.queryAllByTestId("NotificationTableV2__titleTypo")).toHaveLength(1);

        const title = screen.queryAllByTestId("NotificationTableV2__titleTypo")[0];

        expect(title).toHaveTextContent(
            toShortenStr("I want notification's title to have > 24 characters, so I write more", 24)
        );

        expect(title.getAttribute("href")).toBeNull();
    });
});
