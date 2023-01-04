import { KeyNotificationStatus } from "src/common/constants/const";
import { formatDate } from "src/common/utils/time";

import TypographyNotificationDate from "../TypographyNotificationDate";

import { render, RenderResult, screen } from "@testing-library/react";

jest.mock("src/squads/communication/hooks/useResourceTranslate", () => ({
    __esModule: true,
    default: () => (translateKey: string) => `resources.notifications.${translateKey}`,
}));

describe("<TypographyNotificationDate/> ", () => {
    let wrapper: RenderResult;

    const testDate = "2020-01-01T07:00:00.000Z";

    it("should render snapshot", () => {
        wrapper = render(<TypographyNotificationDate date={testDate} />);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should match value with default formatDate when date is valid", () => {
        wrapper = render(<TypographyNotificationDate date={testDate} />);
        expect(wrapper.getByTestId("TypographyNotificationDate__root")).toHaveTextContent(
            formatDate(testDate, "yyyy/LL/dd, HH:mm")
        );
    });

    it("should match value with formatDate when date is valid and status is sent", () => {
        wrapper = render(
            <TypographyNotificationDate
                date={testDate}
                format="yyyy/LL/dd"
                status={KeyNotificationStatus.NOTIFICATION_STATUS_SENT}
            />
        );
        expect(wrapper.getByTestId("TypographyNotificationDate__root")).toHaveTextContent(
            formatDate(testDate, "yyyy/LL/dd")
        );
    });

    it("should match value when status is draft", () => {
        wrapper = render(
            <TypographyNotificationDate
                date={null}
                status={KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT}
            />
        );
        expect(wrapper.container).toMatchSnapshot();
        expect(wrapper.getByTestId("TypographyNotificationDate__root")).toHaveTextContent("--");
    });

    it("should match value when status is scheduled and column is sentDate", () => {
        wrapper = render(
            <TypographyNotificationDate
                date={testDate}
                status={KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED}
            />
        );
        expect(wrapper.container).toMatchSnapshot();
        expect(screen.getByTestId("TypographyNotificationDate__root")).toHaveTextContent(
            "resources.notifications.notificationStatus.NOTIFICATION_STATUS_SCHEDULED"
        );
    });

    it("should display double dash when pass invalid date", () => {
        const invalidDate = "2020-13-31T07:00:00.000Z";
        wrapper = render(
            <TypographyNotificationDate
                date={invalidDate}
                status={KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT}
            />
        );

        expect(wrapper.getByTestId("TypographyNotificationDate__root")).toHaveTextContent("--");
    });
});
