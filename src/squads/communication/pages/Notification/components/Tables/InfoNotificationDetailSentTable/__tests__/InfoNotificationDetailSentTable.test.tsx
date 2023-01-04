import {
    KeyNotificationStatus,
    KeyNotificationTargetGroupSelect,
    KeyNotificationType,
} from "src/common/constants/const";
import {
    createMockNotificationCourses,
    createMockNotificationInfo,
    createMockNotificationReceivers,
} from "src/squads/communication/test-utils/notification";

import InfoNotificationDetailSentTable from "../InfoNotificationDetailSentTable";

import { render, RenderResult, screen } from "@testing-library/react";
import { UseNotificationDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationDetail";

jest.mock("src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail");

const courses = createMockNotificationCourses();
const receivers = createMockNotificationReceivers();
const notificationInfo = createMockNotificationInfo();

describe("<InfoNotificationDetailSentTable />", () => {
    let wrapper: RenderResult;
    beforeEach(() => {
        wrapper = render(
            <InfoNotificationDetailSentTable
                courses={courses}
                receivers={receivers}
                notificationInfo={notificationInfo!}
            />
        );
    });
    it("should render snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });
    it("should exist InfoNotificationDetailSentTable__container", () => {
        expect(
            screen.getByTestId("InfoNotificationDetailSentTable__container")
        ).toBeInTheDocument();
    });
});

describe("<InfoNotificationDetailSentTable /> other cases", () => {
    let wrapper: RenderResult;
    it("should render snapshot for invalid data", () => {
        const mockNotificationData: UseNotificationDetailReturn["notificationInfo"] = {
            notification_id: "notification_id1",
            notification_msg_id: "info_notification_msgs1",
            receiver_ids: ["student1", "student2"],
            status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
            target_groups: {
                grade_filter: {},
                course_filter: {},
                user_group_filter: {},
            },
            type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
            updated_at: new Date("2021/05/12, 07:15"),
            created_at: new Date("2021/05/12, 07:15"),
        };
        wrapper = render(
            <InfoNotificationDetailSentTable
                courses={[]}
                receivers={[]}
                notificationInfo={mockNotificationData}
            />
        );

        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render snapshot for with all courseList and list gradeList ", () => {
        const mockNotificationData: UseNotificationDetailReturn["notificationInfo"] = {
            notification_id: "notification_id1",
            notification_msg_id: "info_notification_msgs1",
            receiver_ids: ["student1", "student2"],
            status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
            target_groups: {
                grade_filter: {
                    type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_LIST,
                    grades: [9],
                },
                course_filter: {
                    type: KeyNotificationTargetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL,
                    course_ids: [],
                },
                user_group_filter: {},
            },
            type: KeyNotificationType.NOTIFICATION_TYPE_COMPOSED,
            updated_at: new Date("2021/05/12, 07:15"),
            created_at: new Date("2021/05/12, 07:15"),
        };
        wrapper = render(
            <InfoNotificationDetailSentTable
                courses={[]}
                receivers={[]}
                notificationInfo={mockNotificationData}
            />
        );

        const table = wrapper.getByTestId("InfoNotificationDetailSentTable__container");
        expect(wrapper.container).toMatchSnapshot();
        expect(table).toHaveTextContent("resources.choices.grades.9");
        expect(table).toHaveTextContent("targetGroupSelect.NOTIFICATION_TARGET_GROUP_SELECT_ALL");
    });
});
