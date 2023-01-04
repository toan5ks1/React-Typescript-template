import { inferMutation } from "src/squads/user/service/infer-service";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { ForgotPage } from "../Forgot";

import { render, RenderResult, fireEvent, waitFor } from "@testing-library/react";
import useLocale from "src/squads/user/hooks/useLocale";
import useUserFeatureToggle from "src/squads/user/hooks/useUserFeatureFlag";

jest.mock("src/squads/user/service/infer-service", () => ({
    __esModule: true,
    inferMutation: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useLocale", () => ({
    __esModule: true,
    default: jest.fn(),
}));
jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: jest.fn(),
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

describe("<Forgot /> page", () => {
    const mockLocale = "en";

    let wrapper: RenderResult;
    let mutateAsync = jest.fn();
    beforeEach(() => {
        (useLocale as jest.Mock).mockReturnValue(mockLocale);
        (inferMutation as jest.Mock).mockImplementation(() => () => {
            return {
                mutateAsync,
            };
        });
        (useUserFeatureToggle as jest.Mock).mockReturnValue(true);

        wrapper = render(
            <TestCommonAppProvider>
                <ForgotPage />
            </TestCommonAppProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("shouldn't display Error Message when user doesn't do anything", () => {
        expect(
            wrapper.queryByText("Sorry, we can't find this email, please check again")
        ).not.toBeInTheDocument();
    });

    it("should call the handleSubmit and show resend page when user presses Enter", async () => {
        const testEmail = "test_email@manabie.com";

        const input = wrapper.getByTestId("TextFieldHF__input");
        fireEvent.focus(input);
        fireEvent.change(input, {
            target: { value: testEmail },
        });

        fireEvent.submit(input);

        await waitFor(() => {
            expect(mutateAsync).toBeCalledWith({
                email: testEmail,
                locale: mockLocale,
            });
        });

        const resendText = wrapper.getByText("Resend");

        expect(resendText).toBeInTheDocument();
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should redirect to login page when the back to login button is clicked", () => {
        const button = wrapper.getByText("Back to Sign In");
        expect(button).toBeInTheDocument();
        fireEvent.click(button);

        expect(mockPushHistory).toBeCalledWith("/login");
    });
});
