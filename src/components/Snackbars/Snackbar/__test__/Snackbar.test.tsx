import { useDispatch } from "react-redux";
import { RootState } from "src/store/store-types";

import Snackbar from "../Snackbar";

import { fireEvent, render } from "@testing-library/react";

jest.mock("react-redux", () => ({
    ...jest.requireActual("react-redux"),
    useSelector: () => {
        const snackbarState: RootState["snackbar"] = {
            message: "This is a message",
            options: {},
            severity: "success",
            open: true,
        };
        return snackbarState;
    },
    useDispatch: jest.fn(),
}));

describe("<Snackbar />", () => {
    it("should render message", () => {
        const { getByText } = render(<Snackbar />);

        expect(getByText("This is a message")).toBeInTheDocument();
    });

    it("should dispatch HIDE_SNACKBAR when the x button is clicked", async () => {
        const dispatchFunction = jest.fn();
        (useDispatch as jest.Mock).mockImplementation(() => {
            return dispatchFunction;
        });

        const { getByRole } = render(<Snackbar />);

        const closeButton = getByRole("button");
        fireEvent.click(closeButton);

        expect(dispatchFunction).toHaveBeenCalledWith({ type: "HIDE_SNACKBAR" });
    });
});
