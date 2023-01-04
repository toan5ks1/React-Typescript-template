import { KeyNotificationStatus } from "src/common/constants/const";

import ReadCountColumn, { ReadCountColumnProps } from "../ReadCountColumnV2";

import { render, screen } from "@testing-library/react";
import TestThemeProvider from "src/squads/communication/test-utils/TestThemeProvider";

describe("<ReadCountColumn />", () => {
    it("should render snapshot", () => {
        const { container } = render(<ReadCountColumn />);
        expect(container).toMatchSnapshot();
    });

    it("should match snapshot and text default value when notification status draft", () => {
        const props: ReadCountColumnProps = {
            readUsers: 0,
            allReceiverUsers: 2,
            status: KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT,
        };
        const { container } = render(
            <TestThemeProvider>
                <ReadCountColumn {...props} />
            </TestThemeProvider>
        );
        expect(container).toMatchSnapshot();
        expect(container).toHaveTextContent("--");
        expect(screen.getByTestId("ReadCountColumn__box")).toHaveStyle("color: #212121;");
        expect(screen.getByTestId("ReadCountColumn__box").firstChild).toHaveClass(
            "MuiTypography-body2"
        );
    });

    it("should match snapshot, text value and correct style, when readUsers < allReceivers with notification sent", () => {
        const props: ReadCountColumnProps = {
            readUsers: 0,
            allReceiverUsers: 2,
            status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
        };
        const { container } = render(
            <TestThemeProvider>
                <ReadCountColumn {...props} />
            </TestThemeProvider>
        );
        expect(container).toMatchSnapshot();
        expect(container).toHaveTextContent("0/2");
        expect(screen.getByTestId("ReadCountColumn__box")).toHaveStyle("color: #ff9800;");
    });

    it("should match snapshot, text value and correct style, when readUsers = allReceivers with notification sent", () => {
        const props: ReadCountColumnProps = {
            readUsers: 2,
            allReceiverUsers: 2,
            status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
        };
        const { container } = render(
            <TestThemeProvider>
                <ReadCountColumn {...props} />
            </TestThemeProvider>
        );
        expect(container).toMatchSnapshot();
        expect(container).toHaveTextContent("2/2");
        expect(screen.getByTestId("ReadCountColumn__box")).toHaveStyle("color: #212121;");
        expect(screen.getByTestId("ReadCountColumn__box").firstChild).toHaveClass(
            "MuiTypography-body2"
        );
    });

    it("should match snapshot and text default value when notification status scheduled", () => {
        const props: ReadCountColumnProps = {
            readUsers: 1,
            allReceiverUsers: 2,
            status: KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED,
        };
        const { container } = render(
            <TestThemeProvider>
                <ReadCountColumn {...props} />
            </TestThemeProvider>
        );
        expect(container).toMatchSnapshot();
        expect(screen.getByTestId("ReadCountColumn__box")).toHaveTextContent("--");
        expect(screen.getByTestId("ReadCountColumn__box")).toHaveStyle("color: #212121;");
        expect(screen.getByTestId("ReadCountColumn__box").firstChild).toHaveClass(
            "MuiTypography-body2"
        );
    });

    it("should match snapshot and text default value without notification status", () => {
        const props: ReadCountColumnProps = {
            readUsers: 2,
            allReceiverUsers: 2,
        };
        const { container } = render(
            <TestThemeProvider>
                <ReadCountColumn {...props} />
            </TestThemeProvider>
        );
        expect(container).toMatchSnapshot();
        expect(screen.getByTestId("ReadCountColumn__box")).toHaveTextContent("--");
        expect(screen.getByTestId("ReadCountColumn__box")).toHaveStyle("color: #212121;");
        expect(screen.getByTestId("ReadCountColumn__box").firstChild).toHaveClass(
            "MuiTypography-body2"
        );
    });
});
