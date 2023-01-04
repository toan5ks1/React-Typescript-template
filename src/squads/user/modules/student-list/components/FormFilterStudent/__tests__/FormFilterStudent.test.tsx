import { TestCommonAppProvider, TestHookFormProvider } from "src/squads/user/test-utils/providers";

import FormFilterStudent from "../FormFilterStudent";

import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<FormFilterStudent/>", () => {
    const onEnterSearchBar = jest.fn();
    const onApplySubmit = jest.fn();

    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <TestHookFormProvider>
                    <FormFilterStudent
                        onEnterSearchBar={onEnterSearchBar}
                        onApplySubmit={onApplySubmit}
                    />
                </TestHookFormProvider>
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot", () => {
        const { container } = renderComponent();

        expect(container).toMatchSnapshot();
    });

    it("should render placeholder text and call fun onEnterSearchBar", () => {
        renderComponent();

        const mockTextInput = "test";

        const input = screen.getByPlaceholderText("Enter your keyword");
        userEvent.type(input, mockTextInput);
        userEvent.keyboard("{enter}");

        expect(onEnterSearchBar).toBeCalledTimes(1);
        expect(onEnterSearchBar).toBeCalledWith(mockTextInput);
    });

    it("should render form filter student", async () => {
        renderComponent();

        userEvent.click(screen.getByTestId("ButtonDropdownWithPopover__button"));

        expect(await screen.findByText("Never logged in")).toBeInTheDocument();
        expect(screen.getByText("Student")).toBeInTheDocument();
        expect(screen.getByText("Search all school in school history")).toBeInTheDocument();
        expect(screen.getByText("Study Item")).toBeInTheDocument();
        expect(screen.getByText("School")).toBeInTheDocument();
    });

    it("should call fun onApplySubmit", async () => {
        renderComponent();

        userEvent.click(screen.getByTestId("ButtonDropdownWithPopover__button"));

        const checkBoxNeverLoggedIn = await screen.findByText("Never logged in");

        expect(checkBoxNeverLoggedIn).toBeInTheDocument();

        userEvent.click(checkBoxNeverLoggedIn);

        userEvent.click(screen.getByTestId("ButtonDropdownWithPopover__buttonApply"));

        await waitFor(() => {
            expect(onApplySubmit).toBeCalledTimes(1);
        });

        expect(onApplySubmit).toBeCalledWith({
            courses: [],
            grades: [],
            isNotLogged: true,
            isSearchAllSchool: undefined,
            schoolLevel: undefined,
            schoolName: undefined,
        });
    });
});
