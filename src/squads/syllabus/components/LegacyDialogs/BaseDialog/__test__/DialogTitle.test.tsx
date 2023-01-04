import DialogTitle from "../DialogTitle";

import { render, screen, RenderResult } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

const titleTestId: string = "DialogTitle__title";
const closeIconTestId: string = "DialogTitle__close";

describe("<DialogTitle />", () => {
    let wrapper: RenderResult;
    const onCloseFn = jest.fn();
    const dialogTitle: string = "DIALOG_TITLE";
    beforeEach(() => {
        wrapper = render(
            <TestThemeProvider>
                <DialogTitle onClose={onCloseFn}>{dialogTitle}</DialogTitle>
            </TestThemeProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render the close icon", () => {
        expect(screen.getByTestId(closeIconTestId)).toBeInTheDocument();
    });

    it("should render correct the title", () => {
        const regexp = new RegExp(dialogTitle, "gi");
        expect(screen.getByTestId(titleTestId).textContent).toMatch(regexp);
    });

    it("should call the onClose callback", () => {
        userEvent.click(screen.getByTestId(closeIconTestId));
        expect(onCloseFn).toBeCalled();
    });
});
