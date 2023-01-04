import reactiveStorage from "src/squads/user/internals/reactive-storage";
import { inferMutation } from "src/squads/user/service/infer-service";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { ForgotTenantPage } from "../ForgotTenant";

import { render, RenderResult, fireEvent, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useGetTenantId from "src/squads/user/hooks/useGetTenantId";
import useLocale from "src/squads/user/hooks/useLocale";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferMutation: jest.fn(),
}));

const mockPushHistory = jest.fn();

jest.mock("react-router", () => {
    const originalModule = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...originalModule,
        useHistory: () => ({ push: mockPushHistory }),
    };
});

jest.mock("src/squads/user/hooks/useLocale", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useGetTenantId", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<Forgot /> page", () => {
    const testEmail = "test_email@manabie.com";
    const testOrginization = "manabie";
    let wrapper: RenderResult;
    let mutateAsync = jest.fn();
    const mockLocale = "en";

    const testIdOrganizationsInput: string = "ForgotPasswordTenant__textFieldOrganizations";
    const testIdUsernameInput: string = "ForgotPasswordTenant__textFieldUsername";
    const testIdResetButton: string = "ForgotPasswordTenant__buttonReset";

    beforeEach(() => {
        reactiveStorage.set("ORGANIZATION_INFO", {
            saved_organization: "manabie",
            active_organization: "manabie",
        });

        (useLocale as jest.Mock).mockReturnValue(mockLocale);

        (inferMutation as jest.Mock).mockImplementation(() => () => {
            return {
                mutateAsync,
            };
        });

        (useGetTenantId as jest.Mock).mockReturnValue({
            getTenantIdByTenantName: jest.fn(() => Promise.resolve(testOrginization)),
        });

        (useUserFeatureToggle as jest.Mock).mockReturnValue(true);

        wrapper = render(
            <TestCommonAppProvider>
                <ForgotTenantPage />
            </TestCommonAppProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should auto field Org Id", () => {
        expect(screen.getByTestId(testIdOrganizationsInput)).toHaveValue("manabie");
    });

    it("shouldn't display Error Message when user doesn't do anything", () => {
        expect(
            screen.queryByText("Sorry, we can't find this email, please check again")
        ).not.toBeInTheDocument();
    });

    it("should call the handleSubmit and show resend page when user presses Enter", async () => {
        const inputUsername = screen.getByTestId(testIdUsernameInput);
        const inputOrganization = screen.getByTestId(testIdOrganizationsInput);

        userEvent.type(inputUsername, testEmail);
        userEvent.type(inputOrganization, testOrginization);

        const resetButton = screen.getByTestId(testIdResetButton);

        await waitFor(() => {
            expect(screen.getByTestId(testIdResetButton)).not.toBeDisabled();
        });

        userEvent.click(resetButton);

        await waitFor(() => {
            expect(mutateAsync).toBeCalledWith({
                email: testEmail,
                tenantId: testOrginization,
                locale: mockLocale,
            });
        });

        const resendText = screen.getByText("Resend");

        expect(resendText).toBeInTheDocument();
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should redirect to login page when the back to login button is clicked", () => {
        const button = screen.getByText("Back to Sign In");
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        expect(mockPushHistory).toBeCalledWith("/login-tenant");
    });
});
