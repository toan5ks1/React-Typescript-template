import BaseDialogAction, { BaseDialogActionProps } from "../BaseDialogAction";

import { render, screen, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

const cancelBtnTestId: string = "BaseDialogAction__cancel";
const okBtnTestId: string = "BaseDialogAction__ok";

describe("<BaseDialogAction />", () => {
    const props: BaseDialogActionProps<HTMLButtonElement> = {
        onOK: jest.fn(),
        onCancel: jest.fn(),
        disabled: false,
    };
    let wrapper: RenderResult;
    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <BaseDialogAction {...props} />
            </TestThemeProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correct actions button", () => {
        expect(screen.getByTestId(cancelBtnTestId)).toBeInTheDocument();
        expect(screen.getByTestId(okBtnTestId)).toBeInTheDocument();
    });

    it("should call the onCancel callback", () => {
        userEvent.click(screen.getByTestId(cancelBtnTestId));
        expect(props.onCancel).toBeCalled();
    });

    it("should call the onOK callback", () => {
        userEvent.click(screen.getByTestId(okBtnTestId));
        expect(props.onOK).toBeCalled();
    });
});

describe("<BaseDialogAction /> loading", () => {
    const props: BaseDialogActionProps<HTMLButtonElement> = {
        onOK: jest.fn(),
        onCancel: jest.fn(),
        disabled: false,
        loading: true,
    };

    beforeEach(() => {
        render(
            <TestThemeProvider>
                <BaseDialogAction {...props} />
            </TestThemeProvider>
        );
    });

    it("should render correct actions button", () => {
        expect(screen.getByTestId(cancelBtnTestId)).toBeDisabled();
    });
});
