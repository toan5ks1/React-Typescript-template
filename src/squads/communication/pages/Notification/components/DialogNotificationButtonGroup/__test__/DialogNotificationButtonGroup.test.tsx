import { TestThemeProvider } from "src/squads/communication/test-utils";

import DialogNotificationButtonGroup, {
    DialogNotificationButtonGroupProps,
} from "../DialogNotificationButtonGroup";

import { render, RenderResult } from "@testing-library/react";

export const dialogNotificationButtonGroupProps: DialogNotificationButtonGroupProps = {
    isCreatingNotification: false,
    isSendingNotification: false,
    shouldFooterDisabled: false,
    isSavingScheduleNotification: false,
    shouldEnableScheduleMode: false,
    onSave: jest.fn(),
    onSaveDraft: jest.fn(),
    onSaveSchedule: jest.fn(),
};

describe("<DialogNotificationButtonGroup/> with non scheduled mode", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <DialogNotificationButtonGroup {...dialogNotificationButtonGroupProps} />
            </TestThemeProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(
            wrapper.queryByTestId("DialogNotificationButtonGroup__buttonSaveDraft")
        ).toBeInTheDocument();

        expect(
            wrapper.queryByTestId("DialogNotificationButtonGroup__buttonSend")
        ).toBeInTheDocument();
    });
});

describe("<DialogNotificationButtonGroup/> with scheduled mode", () => {
    let wrapper: RenderResult;

    const propsWithScheduleMode: DialogNotificationButtonGroupProps = {
        ...dialogNotificationButtonGroupProps,
        shouldEnableScheduleMode: true,
    };

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <DialogNotificationButtonGroup {...propsWithScheduleMode} />
            </TestThemeProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(
            wrapper.queryByTestId("DialogNotificationButtonGroup__buttonSaveDraft")
        ).not.toBeInTheDocument();

        expect(
            wrapper.queryByTestId("DialogNotificationButtonGroup__buttonSend")
        ).not.toBeInTheDocument();

        expect(
            wrapper.queryByTestId("DialogNotificationButtonGroup__buttonSaveSchedule")
        ).toBeInTheDocument();
    });
});
