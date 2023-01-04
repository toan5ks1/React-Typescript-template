import SnackbarItem, { SnackbarItemProps } from "../SnackbarItem";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.useFakeTimers("modern");

describe("<SnackbarItem/>", () => {
    const onClose = jest.fn();
    const onExited = jest.fn();
    const renderComponent = (props?: Partial<SnackbarItemProps>) => {
        return render(
            <SnackbarItem
                message="Test message"
                onClose={onClose}
                onExited={onExited}
                open={true}
                snackKey="id"
                variant="success"
                autoHideDuration={5000}
                {...props}
            />
        );
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should render text message and icons correctly on success", () => {
        renderComponent();
        expect(screen.getByText("Test message")).toBeInTheDocument();
        expect(screen.getByTestId("CloseIcon")).toBeInTheDocument();
        expect(screen.getByTestId("SuccessOutlinedIcon")).toBeInTheDocument();
    });

    it("should render text message and icons correctly on error", () => {
        renderComponent({ variant: "error" });
        expect(screen.getByText("Test message")).toBeInTheDocument();
        expect(screen.getByTestId("CloseIcon")).toBeInTheDocument();
        expect(screen.getByTestId("ErrorOutlineIcon")).toBeInTheDocument();
    });

    it("should render text message and icons correctly on info", () => {
        renderComponent({ variant: "info" });
        expect(screen.getByText("Test message")).toBeInTheDocument();
        expect(screen.getByTestId("CloseIcon")).toBeInTheDocument();
        expect(screen.getByTestId("InfoOutlinedIcon")).toBeInTheDocument();
    });

    it("should render text message and icons correctly on warning", () => {
        renderComponent({ variant: "warning" });
        expect(screen.getByText("Test message")).toBeInTheDocument();
        expect(screen.getByTestId("CloseIcon")).toBeInTheDocument();
        expect(screen.getByTestId("ReportProblemOutlinedIcon")).toBeInTheDocument();
    });

    it("should be call onClose", () => {
        renderComponent();
        userEvent.click(screen.getByTestId("CloseIcon"));
        expect(onClose).toBeCalledTimes(1);
    });
});
