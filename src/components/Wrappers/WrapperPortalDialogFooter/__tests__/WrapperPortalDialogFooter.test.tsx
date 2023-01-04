import { PORTAL_DIALOG_FOOTER } from "src/common/constants/other";

import { Box } from "@mui/material";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";

import WrapperPortalDialogFooter from "../WrapperPortalDialogFooter";

import { render, screen, fireEvent } from "@testing-library/react";

describe("<WrapperPortalDialogFooter />", () => {
    const submitForm = jest.fn();
    const TestComponent = () => (
        <div>
            <form
                onSubmit={(event) => {
                    event.preventDefault();
                    submitForm();
                }}
            >
                <Box component="span" id={PORTAL_DIALOG_FOOTER} data-testid="DialogFooter" />
            </form>
            <WrapperPortalDialogFooter>
                <ButtonPrimaryContained type="submit" data-testid="Button__submit">
                    Submit Form
                </ButtonPrimaryContained>
            </WrapperPortalDialogFooter>
        </div>
    );

    it("should render correct snapshot", () => {
        const { container } = render(<TestComponent />);

        expect(container).toMatchSnapshot();
    });
    it("should call form submission on click", () => {
        render(<TestComponent />);

        fireEvent.click(screen.getByTestId("Button__submit"));
        expect(submitForm).toHaveBeenCalled();
    });
});
