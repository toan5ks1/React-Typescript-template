import { FieldValues } from "react-hook-form";
import { TestThemeProvider } from "src/squads/communication/test-utils";

import NotificationDialogFooter, {
    NotificationDialogFooterProps,
} from "../NotificationDialogFooter";

import { render, RenderResult, screen } from "@testing-library/react";
import TestHookFormProvider from "src/squads/communication/test-utils/TestHookFormProvider";

const props: NotificationDialogFooterProps<FieldValues> = {
    onSave: jest.fn(),
    onSaveDraft: jest.fn(),
    onDiscard: jest.fn(),
    onSaveSchedule: jest.fn(),
};

describe("<NotificationDialogFooter/>", () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <TestHookFormProvider>
                    <NotificationDialogFooter {...props} />
                </TestHookFormProvider>
            </TestThemeProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct UI", () => {
        expect(
            screen.queryByTestId("DialogNotificationButtonGroup__buttonSaveDraft")
        ).toBeInTheDocument();
        expect(
            screen.queryByTestId("DialogNotificationButtonGroup__buttonSend")
        ).toBeInTheDocument();
        expect(screen.queryByTestId("NotificationDialogFooter__buttonDiscard")).toBeInTheDocument();
    });
});
