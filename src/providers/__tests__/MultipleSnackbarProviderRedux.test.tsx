import { useSelector } from "react-redux";
import { TestApp } from "src/test-utils";

import MultipleSnackbarProviderRedux from "../MultipleSnackbarProvider/MultipleSnackbarProviderRedux";

import { render, screen } from "@testing-library/react";
import { SnackbarOptions } from "src/contexts/MultipleSnackbarContext";

jest.mock("react-redux", () => {
    const actual = jest.requireActual("react-redux");
    return {
        ...actual,
        useSelector: jest.fn(),
    };
});

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    useInitializeUnleashWithoutIdentification: () => true,
    default: () => true,
}));

describe("<MultipleSnackbarProviderRedux/>", () => {
    const renderComponent = () => {
        return render(
            <TestApp>
                <MultipleSnackbarProviderRedux>this is an app</MultipleSnackbarProviderRedux>
            </TestApp>
        );
    };

    it("should match snapshot", () => {
        const options: SnackbarOptions = { message: "", persist: false, variant: "success" };

        (useSelector as jest.Mock).mockReturnValue(options);

        const { container } = renderComponent();

        expect(container).toMatchSnapshot();
    });

    it("should show snackbar", async () => {
        const options: SnackbarOptions = {
            message: "test message",
            persist: false,
            variant: "success",
        };

        (useSelector as jest.Mock).mockReturnValue(options);

        const { container } = renderComponent();

        expect(await screen.findByText("test message")).toBeInTheDocument();

        expect(container).toMatchSnapshot();
    });
});
