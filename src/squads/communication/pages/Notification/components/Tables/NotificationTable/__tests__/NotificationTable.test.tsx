import { MemoryRouter } from "react-router-dom";
import {
    KeyNotificationStatus,
    KeyNotificationTargetGroupSelect,
    KeyNotificationType,
    UserRoles,
} from "src/common/constants/const";
import { ERPModules } from "src/common/constants/enum";
import { toShortenStr } from "src/common/utils/other";
import { formatDate } from "src/common/utils/time";
import { MicroFrontendTypes } from "src/routing/type";
import { inferQuery } from "src/squads/communication/service/infer-query";
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

import { getCountOfNotifications } from "src/squads/communication/pages/Notification/components/Tables/NotificationTable";
import NotificationTable, {
    NotificationTableProps,
} from "src/squads/communication/pages/Notification/components/Tables/NotificationTable/NotificationTable";

import { render, RenderResult, screen } from "@testing-library/react";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import { UseNotificationListReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationList";

// Fix auto generation id in table pagination
jest.mock("@mui/material//utils/useId", () => ({
    __esModule: true,
    default: () => "mui-test-id",
}));

// TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferQuery: jest.fn(),
}));

export const NotificationTableContainerTest = ({
    notificationCategoriesHookData,
    notificationListHookData,
    notificationCategory,
}: NotificationTableProps) => {
    (inferQuery as jest.Mock).mockImplementation(() => () => {
        return {
            refetch: jest.fn(),
        };
    });

    return (
        <TestApp>
            <TestQueryWrapper>
                <MemoryRouter>
                    <NotificationTable
                        notificationCategory={notificationCategory}
                        notificationCategoriesHookData={notificationCategoriesHookData}
                        notificationListHookData={notificationListHookData}
                    />
                </MemoryRouter>
            </TestQueryWrapper>
        </TestApp>
    );
};

export const notificationCategoriesHookData: NotificationTableProps["notificationCategoriesHookData"] =
    {
        notificationCategoriesRefetch: jest.fn(),
        notificationCategories: createMockNotificationCategories(),
        notificationCategoriesLoading: false,
    };

export const notificationListHookData: NotificationTableProps["notificationListHookData"] = {
    notificationInfoList: createMockNotificationInfoList(),
    composerList: createMockNotificationsComposerList(),
    readCountOfNotifications: createMockReadCountOfNotifications(),
    readCountOfNotificationsLoading: false,
    notificationListLoading: false,
    pagination: createMockNotificationPagination(),
    isFetchingComposerList: false,
    notificationMsgTitles: notificationMsgTitles,
    notificationMsgTitlesFetched: true,
    notificationListRefetch: jest.fn(),
    readCountOfNotificationsRefetch: jest.fn(),
    resetPaginationOffset: jest.fn(),
};

const notificationInfoWithoutStatus: UseNotificationListReturn["notificationInfoList"][0] = {
    editor_id: "student_id1",
    notification_id: "notification_id1",
    notification_msg_id: "notification_msg_id1",
    status: undefined,
    type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
    updated_at: new Date("2021/05/12, 07:15"),
    created_at: new Date("2021/05/12, 07:15"),
    scheduled_at: "",
    sent_at: "",
    target_groups: {
        grade_filter: {
            type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL,
            grades: [9, 3],
        },
        course_filter: {
            type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST,
            course_ids: ["course1", "course2"],
        },
        user_group_filter: {
            user_group: [UserRoles.USER_GROUP_STUDENT],
        },
    },
};

describe("<NotificationTable />", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });

        wrapper = render(
            <NotificationTableContainerTest
                notificationListHookData={notificationListHookData}
                notificationCategoriesHookData={notificationCategoriesHookData}
            />
        );
    });

    it("should render snapshot and correct UI", () => {
        expect(wrapper.container).toMatchSnapshot();

        expect(screen.getByTestId("Notification__table")).toBeInTheDocument();
        expect(screen.getAllByTestId("NotificationTable__title")).toHaveLength(3);
        expect(screen.getAllByTestId("NotificationList__typographyComposer")).toHaveLength(3);
        expect(screen.getAllByTestId("NotificationTable__recipient")).toHaveLength(3);
        expect(screen.getAllByTestId("NotificationTable__status")).toHaveLength(3);
        expect(screen.getAllByTestId("NotificationTable__sentDate")).toHaveLength(3);
        expect(screen.getAllByTestId("NotificationTable__lastUpdated")).toHaveLength(3);
    });

    it("should render correct date format", () => {
        const sendDate = wrapper.getAllByTestId("NotificationTable__sentDate");
        const lastUpdated = wrapper.getAllByTestId("NotificationTable__lastUpdated");

        notificationListHookData.notificationInfoList.forEach((notification, index) => {
            if (notification.status === "NOTIFICATION_STATUS_DRAFT") {
                expect(sendDate[index]).toHaveTextContent("--");
            }

            if (notification.status === "NOTIFICATION_STATUS_SENT") {
                expect(sendDate[index]).toHaveTextContent(
                    formatDate(notification.sent_at, "yyyy/LL/dd, HH:mm")
                );
            }

            if (notification.status === "NOTIFICATION_STATUS_SCHEDULED") {
                expect(sendDate[index]).toHaveTextContent("Scheduled");
            }

            expect(lastUpdated[index]).toHaveTextContent(
                formatDate(notification.updated_at, "yyyy/LL/dd, HH:mm")
            );
        });
    });

    it("should render 24 characters of column composer and title href attr", () => {
        const titles = wrapper.getAllByTestId("NotificationTable__title");

        const composers = wrapper.getAllByTestId("NotificationList__typographyComposer");

        notificationListHookData.composerList?.forEach((composer, index) => {
            if (composer.name.length > 24) {
                expect(composers[index]).toHaveTextContent(
                    toShortenStr(notificationListHookData.composerList![index].name, 24)
                );
            }
        });

        notificationListHookData.notificationMsgTitles?.forEach((notificationMsg, index) => {
            if (notificationMsg.title.length > 24) {
                expect(titles[index]).toHaveTextContent(
                    toShortenStr(
                        "I want notification's title to have > 24 characters, so I write more",
                        24
                    )
                );
            }
        });

        notificationListHookData.notificationInfoList.forEach((notification, index) => {
            expect(titles[index].getAttribute("href")).toEqual(
                `/${MicroFrontendTypes.COMMUNICATION}/${ERPModules.NOTIFICATIONS}/${notification.notification_id}/show`
            );
        });
    });
});

describe("<NotificationTable /> missing data", () => {
    beforeEach(() => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });
    });

    it("should render loading Skeleton when isFetchingComposerList, readCountOfNotificationsLoading, notificationMsgTitlesFetched", () => {
        const notificationListProps: NotificationTableProps["notificationListHookData"] = {
            ...notificationListHookData,
            isFetchingComposerList: true,
            readCountOfNotificationsLoading: true,
            notificationMsgTitlesFetched: false,
        };

        const { container } = render(
            <NotificationTableContainerTest
                notificationListHookData={notificationListProps}
                notificationCategoriesHookData={notificationCategoriesHookData}
            />
        );

        expect(container).toMatchSnapshot();
    });

    it("should render null without notificationMsgTitles, composerList", () => {
        const notificationListProps: NotificationTableProps["notificationListHookData"] = {
            ...notificationListHookData,
            notificationMsgTitles: undefined,
            composerList: undefined,
        };

        const wrapper: RenderResult = render(
            <NotificationTableContainerTest
                notificationListHookData={notificationListProps}
                notificationCategoriesHookData={notificationCategoriesHookData}
            />
        );

        expect(wrapper.queryByTestId("NotificationTable__title")).not.toBeInTheDocument();
        expect(
            wrapper.queryByTestId("NotificationList__typographyComposer")
        ).not.toBeInTheDocument();
    });

    it("should render null without status, composerName of composerList and title of notificationMsgTitles", () => {
        const notificationListProps: NotificationTableProps["notificationListHookData"] = {
            ...notificationListHookData,
            notificationInfoList: [notificationInfoWithoutStatus],
            notificationMsgTitles: [
                {
                    notification_msg_id: "errorId",
                    title: "notificationMsg not match with notificationInfo",
                },
            ],
            composerList: [
                {
                    user_id: "editorErrorId",
                    name: "composerId not match with editorId",
                },
            ],
        };

        const wrapper: RenderResult = render(
            <NotificationTableContainerTest
                notificationListHookData={notificationListProps}
                notificationCategoriesHookData={notificationCategoriesHookData}
            />
        );

        expect(wrapper.queryByTestId("NotificationTable__title")).not.toBeInTheDocument();

        expect(
            wrapper.queryByTestId("NotificationList__typographyComposer")
        ).not.toBeInTheDocument();

        expect(wrapper.queryByTestId("NotificationTable__sentDate")).not.toBeInTheDocument();
    });
});

describe("<NotificationTable /> call getCountOfNotifications", () => {
    const cases = [
        KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT,
        KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
        KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED,
    ];

    test.each(cases)("it should call getReadCountOfNotifications with status %p", (status) => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });

        const countOfNotification = getCountOfNotifications(
            notificationCategoriesHookData.notificationCategories,
            status
        );
        switch (status) {
            case "NOTIFICATION_STATUS_DRAFT":
                expect(notificationCategoriesHookData.notificationCategories.draft).toEqual(
                    countOfNotification
                );
                break;

            case "NOTIFICATION_STATUS_SCHEDULED":
                expect(notificationCategoriesHookData.notificationCategories.schedule).toEqual(
                    countOfNotification
                );
                break;

            case "NOTIFICATION_STATUS_SENT":
                expect(notificationCategoriesHookData.notificationCategories.sent).toEqual(
                    countOfNotification
                );
                break;

            default:
                expect(notificationCategoriesHookData.notificationCategories.all).toEqual(
                    countOfNotification
                );
                break;
        }
    });
});

describe("<NotificationTable /> call getReadCountOfNotifications", () => {
    beforeEach(() => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: true,
            };
        });
    });

    it("should render default value without readCountOfNotifications", () => {
        const notificationListProps: NotificationTableProps["notificationListHookData"] = {
            ...notificationListHookData,
            notificationInfoList: [
                {
                    ...notificationInfoWithoutStatus,
                    status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
                },
            ],
            readCountOfNotifications: [],
        };

        const wrapper: RenderResult = render(
            <NotificationTableContainerTest
                notificationListHookData={notificationListProps}
                notificationCategoriesHookData={notificationCategoriesHookData}
            />
        );
        expect(wrapper.getByTestId("ReadCountColumn__box")).toHaveTextContent("0/0");
    });

    it("should render default value when not match record and readCountOfNotifications", () => {
        const notificationListProps: NotificationTableProps["notificationListHookData"] = {
            ...notificationListHookData,
            notificationInfoList: [
                {
                    editor_id: "student_id1",
                    notification_id: "notification_id1",
                    notification_msg_id: "notification_msg_id1",
                    status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
                    type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
                    updated_at: new Date("2021/05/12, 07:15"),
                    created_at: new Date("2021/05/12, 07:15"),
                    scheduled_at: "",
                    sent_at: "",
                    target_groups: {
                        grade_filter: {
                            type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL,
                            grades: [9, 3],
                        },
                        course_filter: {
                            type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST,
                            course_ids: ["course1", "course2"],
                        },
                        user_group_filter: {
                            user_group: [UserRoles.USER_GROUP_STUDENT],
                        },
                    },
                },
            ],
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

        const wrapper: RenderResult = render(
            <NotificationTableContainerTest
                notificationListHookData={notificationListProps}
                notificationCategoriesHookData={notificationCategoriesHookData}
            />
        );
        expect(wrapper.getByTestId("ReadCountColumn__box")).toHaveTextContent("0/0");
    });
});

// TODO: Remove permission of NOTIFICATION_SCHEDULE_MANAGEMENT
describe("<NotificationTable /> permission scheduled notification link", () => {
    const mockScheduledNotificationList: UseNotificationListReturn["notificationInfoList"] = [
        {
            editor_id: "student1",
            notification_id: "notification_id1",
            notification_msg_id: "notification_msg_id1",
            status: KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED,
            type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
            updated_at: new Date("2021/05/12, 07:15"),
            created_at: new Date("2021/05/12, 07:15"),
            scheduled_at: new Date("2021/05/12, 08:15"),
            sent_at: "",
            target_groups: "",
        },
    ];

    it("should render 24 characters of column title and don't have href attr with notification status SCHEDULED", () => {
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: false,
            };
        });

        const notificationListProps: NotificationTableProps["notificationListHookData"] = {
            ...notificationListHookData,
            notificationInfoList: mockScheduledNotificationList,
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
            <NotificationTableContainerTest
                notificationListHookData={notificationListProps}
                notificationCategoriesHookData={notificationCategoriesHookData}
            />
        );

        expect(wrapper.container).toBeInTheDocument();

        expect(wrapper.queryAllByTestId("NotificationTable__title").length).toEqual(0);

        expect(wrapper.queryAllByTestId("NotificationTable__titleTypo").length).toEqual(1);

        const title = wrapper.queryAllByTestId("NotificationTable__titleTypo")[0];

        expect(title).toHaveTextContent(
            toShortenStr("I want notification's title to have > 24 characters, so I write more", 24)
        );

        expect(title.getAttribute("href")).toBeNull();
    });
});
