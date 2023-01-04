import { TestContext } from "ra-test";
import { Form } from "react-final-form";
import reactiveStorage from "src/squads/user/internals/reactive-storage";

import TestThemeProvider from "src/squads/user/test-utils/providers/TestThemeProvider";

import LoginForm from "../LoginTenantForm";

import { render, screen, fireEvent, RenderResult, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

beforeAll(() => {
    // we're using fake timers because we don't want to
    // wait a full second for this test to run.
    jest.useFakeTimers("modern");
});
afterAll(() => {
    jest.useRealTimers();
});
describe("<LoginTenantForm/>", () => {
    const testIdOrganizationsInput: string = "LoginTenantForm__textFieldOrganizations";
    const testIdUsernameInput: string = "LoginTenantForm__textFieldUsername";
    const testIdPasswordInput: string = "LoginTenantForm__textFieldPassword";
    const testIdPasswordToggle: string = "LoginTenantForm__buttonShowPass";
    const testIdForgotButton: string = "LoginTenantForm__buttonForgot";
    const testIdLoginButton: string = "LoginTenantForm__buttonLogin";

    let wrapper: RenderResult;
    const onLogin = jest.fn();

    beforeEach(() => {
        reactiveStorage.set("ORGANIZATION_INFO", {
            saved_organization: "manabie",
            active_organization: "manabie",
        });

        wrapper = render(
            <TestContext>
                <TestThemeProvider>
                    <Form
                        onSubmit={() => {}}
                        render={() => {
                            return <LoginForm loading={false} onLogin={onLogin} />;
                        }}
                    />
                </TestThemeProvider>
            </TestContext>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should toggle on password text", () => {
        const passwordToggle = screen.getByTestId(testIdPasswordToggle);
        const passwordInput = screen.getByTestId(testIdPasswordInput);

        expect(passwordInput).toHaveAttribute("type", "password");
        expect(within(passwordToggle).getByTestId("HidePassIcon__svg")).toBeInTheDocument();

        fireEvent.click(passwordToggle);

        expect(passwordInput).toHaveAttribute("type", "text");
        expect(within(passwordToggle).getByTestId("ShowPassIcon__svg")).toBeInTheDocument();
    });

    it("should render correctly form", () => {
        expect(screen.getByTestId(testIdOrganizationsInput)).toBeInTheDocument();
        expect(screen.getByTestId(testIdOrganizationsInput)).toHaveValue("manabie");

        expect(screen.getByTestId(testIdUsernameInput)).toBeInTheDocument();
        expect(screen.getByTestId(testIdPasswordInput)).toBeInTheDocument();
        expect(screen.getByTestId(testIdPasswordToggle)).toBeInTheDocument();
        expect(screen.getByTestId(testIdLoginButton)).toBeInTheDocument();
        expect(screen.getByTestId(testIdForgotButton)).toHaveAttribute("href", "/forgot-tenant");
    });

    it("should call onLogin", async () => {
        const inputUsername = screen.getByTestId(testIdUsernameInput);
        const inputPassword = screen.getByTestId(testIdPasswordInput);
        const inputOrganization = screen.getByTestId(testIdOrganizationsInput);

        userEvent.type(inputUsername, "username");
        userEvent.type(inputPassword, "password");
        userEvent.type(inputOrganization, "manabie");

        const saveButton = screen.getByTestId(testIdLoginButton);

        await waitFor(() => {
            expect(screen.getByTestId(testIdLoginButton)).not.toBeDisabled();
        });

        userEvent.click(saveButton);

        await waitFor(() => {
            expect(onLogin).toHaveBeenCalled();
        });
    });
});
