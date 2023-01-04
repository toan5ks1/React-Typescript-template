import WrapperSnackbar, { WrapperSnackbarProps } from "../WrapperSnackbar";

import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.useFakeTimers("modern");

describe("<SnackbarItem/>", () => {
    const onClose = jest.fn();

    const TestComponent = (props?: Partial<WrapperSnackbarProps>) => {
        return (
            <WrapperSnackbar
                onClose={onClose}
                open={true}
                snackKey="id"
                autoHideDuration={5000}
                {...props}
            >
                Test
            </WrapperSnackbar>
        );
    };

    const renderComponent = (props?: Partial<WrapperSnackbarProps>) => {
        return render(<TestComponent {...props} />);
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should be call onClose", async () => {
        renderComponent();
        jest.runAllTimers();
        await waitFor(() => {
            expect(onClose).toBeCalledTimes(1);
        });
    });
    it("should not be call onClose onMouseLeave", async () => {
        renderComponent();

        userEvent.hover(screen.getByTestId("WrapperSnackbar__container"));
        userEvent.unhover(screen.getByTestId("WrapperSnackbar__container"));

        jest.runAllTimers();
        await waitFor(() => {
            expect(onClose).toBeCalledTimes(1);
        });
    });
    it("should not be call onClose", async () => {
        renderComponent({ autoHideDuration: null });
        jest.runAllTimers();
        await waitFor(() => {
            expect(onClose).not.toBeCalledTimes(1);
        });
    });
});
