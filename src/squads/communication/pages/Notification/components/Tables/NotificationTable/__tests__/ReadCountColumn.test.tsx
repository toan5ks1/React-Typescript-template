import { KeyNotificationStatus } from "src/common/constants/const";

import ReadCountColumn, { ReadCountColumnProps } from "../ReadCountColumn";

import { render, RenderResult } from "@testing-library/react";
import TestThemeProvider from "src/squads/communication/test-utils/TestThemeProvider";

describe("<ReadCountColumn />", () => {
    it("should render snapshot", () => {
        let wrapper: RenderResult;
        wrapper = render(<ReadCountColumn />);
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should match snapshot and text default value when notification status draft", () => {
        let wrapper: RenderResult;
        const props: ReadCountColumnProps = {
            readUsers: 0,
            allReceiverUsers: 2,
            status: KeyNotificationStatus.NOTIFICATION_STATUS_DRAFT,
        };
        wrapper = render(
            <TestThemeProvider>
                <ReadCountColumn {...props} />
            </TestThemeProvider>
        );
        expect(wrapper.container).toMatchSnapshot();
        expect(wrapper.container.textContent).toEqual("--");
        expect(wrapper.getByTestId("ReadCountColumn__box")).toHaveStyle("color: #212121;");
        expect(wrapper.getByTestId("ReadCountColumn__box").firstChild).toHaveClass(
            "MuiTypography-body2"
        );
    });

    it("should match snapshot, text value and correct style, when readUsers < allReceivers with notification sent", () => {
        let wrapper: RenderResult;
        const props: ReadCountColumnProps = {
            readUsers: 0,
            allReceiverUsers: 2,
            status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
        };
        wrapper = render(
            <TestThemeProvider>
                <ReadCountColumn {...props} />
            </TestThemeProvider>
        );
        expect(wrapper.container).toMatchSnapshot();
        expect(wrapper.container.textContent).toEqual("0/2");
        expect(wrapper.getByTestId("ReadCountColumn__box")).toHaveStyle("color: #ff9800;");
    });

    it("should match snapshot, text value and correct style, when readUsers = allReceivers with notification sent", () => {
        let wrapper: RenderResult;
        const props: ReadCountColumnProps = {
            readUsers: 2,
            allReceiverUsers: 2,
            status: KeyNotificationStatus.NOTIFICATION_STATUS_SENT,
        };
        wrapper = render(
            <TestThemeProvider>
                <ReadCountColumn {...props} />
            </TestThemeProvider>
        );
        expect(wrapper.container).toMatchSnapshot();
        expect(wrapper.container.textContent).toEqual("2/2");
        expect(wrapper.getByTestId("ReadCountColumn__box")).toHaveStyle("color: #212121;");
        expect(wrapper.getByTestId("ReadCountColumn__box").firstChild).toHaveClass(
            "MuiTypography-body2"
        );
    });

    it("should match snapshot and text default value when notification status scheduled", () => {
        let wrapper: RenderResult;
        const props: ReadCountColumnProps = {
            readUsers: 1,
            allReceiverUsers: 2,
            status: KeyNotificationStatus.NOTIFICATION_STATUS_SCHEDULED,
        };
        wrapper = render(
            <TestThemeProvider>
                <ReadCountColumn {...props} />
            </TestThemeProvider>
        );
        expect(wrapper.container).toMatchSnapshot();
        expect(wrapper.getByTestId("ReadCountColumn__box").textContent).toEqual("--");
        expect(wrapper.getByTestId("ReadCountColumn__box")).toHaveStyle("color: #212121;");
        expect(wrapper.getByTestId("ReadCountColumn__box").firstChild).toHaveClass(
            "MuiTypography-body2"
        );
    });

    it("should match snapshot and text default value without notification status", () => {
        let wrapper: RenderResult;
        const props: ReadCountColumnProps = {
            readUsers: 2,
            allReceiverUsers: 2,
        };
        wrapper = render(
            <TestThemeProvider>
                <ReadCountColumn {...props} />
            </TestThemeProvider>
        );
        expect(wrapper.container).toMatchSnapshot();
        expect(wrapper.getByTestId("ReadCountColumn__box").textContent).toEqual("--");
        expect(wrapper.getByTestId("ReadCountColumn__box")).toHaveStyle("color: #212121;");
        expect(wrapper.getByTestId("ReadCountColumn__box").firstChild).toHaveClass(
            "MuiTypography-body2"
        );
    });
});
