import { Form } from "react-final-form";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import LoginForm from "../LoginForm";

import { render, screen, RenderResult, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/user/hooks/useUserFeatureFlag", () => ({
    __esModule: true,
    default: () => true,
}));

beforeAll(() => {
    // we're using fake timers because we don't want to
    // wait a full second for this test to run.
    jest.useFakeTimers("modern");
});
afterAll(() => {
    jest.useRealTimers();
});
describe("<LoginForm/>", () => {
    const testIdPasswordInput: string = "LoginForm__textFieldPassword";
    const testIdPasswordToggle: string = "LoginForm__togglePassword";
    const testIdForgotButton: string = "LoginForm__buttonForgot";

    let wrapper: RenderResult;

    beforeEach(() => {
        wrapper = render(
            <TestCommonAppProvider>
                <Form
                    onSubmit={() => {}}
                    render={() => {
                        return <LoginForm loading={false} onLogin={() => {}} />;
                    }}
                />
            </TestCommonAppProvider>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should toggle on password text", () => {
        const passToggle = screen.getByTestId(testIdPasswordToggle);
        const passInputField = screen.getByTestId(testIdPasswordInput);

        expect(passInputField).toHaveAttribute("type", "password");
        expect(within(passToggle).getByTestId("HidePassIcon__svg")).toBeInTheDocument();

        userEvent.click(passToggle);

        expect(passInputField).toHaveAttribute("type", "text");
        expect(within(passToggle).getByTestId("ShowPassIcon__svg")).toBeInTheDocument();
    });

    it("should render correctly link forgot password", () => {
        expect(screen.getByTestId(testIdForgotButton)).toBeInTheDocument();
        expect(screen.getByTestId(testIdForgotButton)).toHaveAttribute("href", "/forgot");
    });
});
