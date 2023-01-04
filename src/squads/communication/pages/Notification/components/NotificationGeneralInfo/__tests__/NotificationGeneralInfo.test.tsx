import { Features } from "src/squads/communication/common/constants/feature-keys";
import { joinArrayObjectString } from "src/squads/communication/common/utils/utils";
import { TestApp } from "src/squads/communication/test-utils";
import { createMockTagsSelectedByNotificationIdQueryReturn } from "src/squads/communication/test-utils/query-data";
import { TestQueryWrapper } from "src/squads/communication/test-utils/react-hooks";

import NotificationGeneralInfo, {
    NotificationGeneralInfoProps,
} from "src/squads/communication/pages/Notification/components/NotificationGeneralInfo";

import { render } from "@testing-library/react";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";
import { mockUseNotificationDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationDetail/__mocks__";
import { mockUseNotificationMsgDetailReturn } from "src/squads/communication/pages/Notification/hooks/useNotificationMsgDetail/__mocks__/";

const notificationGeneralInfoDefaultProps: NotificationGeneralInfoProps = {
    courses: mockUseNotificationDetailReturn.courses,
    receivers: mockUseNotificationDetailReturn.receivers,
    notificationInfo: mockUseNotificationDetailReturn.notificationInfo!,
    notificationMsgDetail: mockUseNotificationMsgDetailReturn.notificationMsgDetail!,
    mediaList: mockUseNotificationMsgDetailReturn.mediaList,
    tags: createMockTagsSelectedByNotificationIdQueryReturn(),
};

const renderNotificationGeneralInfo = (
    props: NotificationGeneralInfoProps = notificationGeneralInfoDefaultProps
) => {
    return render(
        <TestApp>
            <TestQueryWrapper>
                <NotificationGeneralInfo {...props} />
            </TestQueryWrapper>
        </TestApp>
    );
};

jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<NotificationGeneralInfo />", () => {
    beforeEach(() => {
        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_TAGS) {
                return { isEnabled: false };
            }
        });
    });
    it("should render media chip with target attribute", () => {
        const wrapper = renderNotificationGeneralInfo();

        expect(
            wrapper.getAllByTestId("ChipFileDescription").forEach((el) => {
                expect(el.querySelector("a")).toHaveAttribute("target", "_blank");
            })
        );
    });

    it("should render content link with target attribute", () => {
        const wrapper = renderNotificationGeneralInfo();

        const contentEditor = wrapper.getByTestId("Editor__content");

        expect(contentEditor.querySelector("a")).toHaveAttribute("target", "_blank");
    });

    it("should render styled content", () => {
        const wrapper = renderNotificationGeneralInfo();

        const contentEditor = wrapper.getByTestId("Editor__content");

        expect(contentEditor.querySelector('span[style="font-weight: bold;"]')).toBeInTheDocument();
        expect(
            contentEditor.querySelector('span[style="font-style: italic;"]')
        ).toBeInTheDocument();
        expect(
            contentEditor.querySelector('span[style="text-decoration: underline;"]')
        ).toBeInTheDocument();
        expect(
            contentEditor.querySelector('span[style="color: rgb(76, 175, 80);"]')
        ).toBeInTheDocument();
    });

    it("should render empty editor without contentRaw", () => {
        const wrapper = renderNotificationGeneralInfo({
            ...notificationGeneralInfoDefaultProps,
            notificationMsgDetail: {
                ...mockUseNotificationMsgDetailReturn.notificationMsgDetail!,
                content: undefined,
            },
        });

        const editor = wrapper.getByTestId("Editor__draftEditor");

        expect(editor).toHaveTextContent("");
    });

    it("should render double dash attachment without mediaList", () => {
        const wrapper = renderNotificationGeneralInfo({
            ...notificationGeneralInfoDefaultProps,
            mediaList: [],
        });

        expect(wrapper.getAllByText("--")).toHaveLength(1);
    });

    it("should render Editor with read only", () => {
        const wrapper = renderNotificationGeneralInfo({
            ...notificationGeneralInfoDefaultProps,
            mediaList: [],
        });

        expect(wrapper.getByTestId("Editor__draftEditor")).toHaveAttribute(
            "contenteditable",
            "false"
        );
    });
});

describe("<NotificationGeneralInfo /> with feature flag NOTIFICATION_TAGS on", () => {
    it("should render tag name", () => {
        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_TAGS) {
                return { isEnabled: true };
            }
        });

        const wrapper = renderNotificationGeneralInfo();

        const tagNames = joinArrayObjectString(
            notificationGeneralInfoDefaultProps.tags!,
            "tag_name"
        );

        expect(wrapper.getByTestId("NotificationGeneralInfo__tags")).toHaveTextContent(tagNames);
    });

    it("should render double dash tag with empty tag data", () => {
        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_TAGS) {
                return { isEnabled: true };
            }
        });

        const wrapper = renderNotificationGeneralInfo({
            ...notificationGeneralInfoDefaultProps,
            tags: [],
        });

        expect(wrapper.getByTestId("NotificationGeneralInfo__tags")).toHaveTextContent("--");
    });

    it("should render double dash tag without tag data", () => {
        (useFeatureToggle as jest.Mock).mockImplementation((toggleName) => {
            if (toggleName === Features.NOTIFICATION_TAGS) {
                return { isEnabled: true };
            }
        });

        const wrapper = renderNotificationGeneralInfo({
            ...notificationGeneralInfoDefaultProps,
            tags: undefined,
        });

        expect(wrapper.getByTestId("NotificationGeneralInfo__tags")).toHaveTextContent("--");
    });
});
