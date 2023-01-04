import { useState } from "react";

import MultipleSnackbarProvider from "../MultipleSnackbarProvider/MultipleSnackbarProvider";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useMultipleSnackbar, SnackbarOptions } from "src/contexts/MultipleSnackbarContext";

describe("<MultipleSnackbarProvider/>", () => {
    const App = (options?: SnackbarOptions) => {
        const { closeSnackbar, enqueueSnackbar, closeAllSnackbarPersist } = useMultipleSnackbar();
        const [id, setId] = useState("");

        const handleEnqueue = () => {
            const id = enqueueSnackbar("enqueue message", options);
            setId(id);
        };

        const handleClose = () => {
            closeSnackbar(id);
        };
        const handleCloseAllSnackbarPersist = () => {
            closeAllSnackbarPersist();
        };

        return (
            <div>
                <span>This App</span>
                <button data-testid="test__enqueue" onClick={handleEnqueue}>
                    enqueue
                </button>
                <button data-testid="test__close" onClick={handleClose}>
                    close
                </button>
                <button data-testid="test__close_all" onClick={handleCloseAllSnackbarPersist}>
                    close all
                </button>
            </div>
        );
    };

    const TestComponent = (options?: SnackbarOptions) => {
        return (
            <MultipleSnackbarProvider maxSnack={2}>
                <App {...options} />
            </MultipleSnackbarProvider>
        );
    };

    const renderComponent = (options?: SnackbarOptions) => {
        return render(<TestComponent {...options} />);
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should show message when enqueue and hide when close by closeSnackbar", async () => {
        renderComponent();

        userEvent.click(screen.getByTestId("test__enqueue"));
        expect(screen.getByText("enqueue message")).toBeInTheDocument();

        userEvent.click(screen.getByTestId("test__close"));

        await waitFor(() => {
            expect(screen.queryByText("enqueue message")).not.toBeInTheDocument();
        });
    });

    it("should show message when enqueue and hide when close by icon", async () => {
        renderComponent();

        userEvent.click(screen.getByTestId("test__enqueue"));
        expect(screen.getByText("enqueue message")).toBeInTheDocument();

        userEvent.click(screen.getByTestId("CloseIcon"));

        await waitFor(() => {
            expect(screen.queryByText("enqueue message")).not.toBeInTheDocument();
        });
    });

    it("should show multiple snackbar", () => {
        renderComponent();

        userEvent.dblClick(screen.getByTestId("test__enqueue"));
        expect(screen.getAllByText("enqueue message")).toHaveLength(2);
    });

    it("should close all persist", async () => {
        renderComponent({ persist: true });

        userEvent.click(screen.getByTestId("test__close_all"));
        await waitFor(() => {
            expect(screen.queryByText("enqueue message")).not.toBeInTheDocument();
        });
    });

    it("should auto close snackbar", async () => {
        renderComponent({ autoHideDuration: 100 });

        userEvent.click(screen.getByTestId("test__enqueue"));

        await waitFor(() => {
            expect(screen.queryByText("enqueue message")).not.toBeInTheDocument();
        });
    });
});
