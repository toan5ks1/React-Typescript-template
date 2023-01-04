import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import LocaleSwitcher from "../LocaleSwitcher";

import { render, fireEvent } from "@testing-library/react";

const mockFn = jest.fn();

jest.mock("src/squads/user/hooks/useSetLocale", () => () => mockFn);

describe("<LocaleSwitcher />", () => {
    it("should match snapshot", () => {
        const wrapper = render(
            <TestCommonAppProvider>
                <LocaleSwitcher />
            </TestCommonAppProvider>
        );
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render correctly when click on language item", () => {
        const wrapper = render(
            <TestCommonAppProvider>
                <LocaleSwitcher />
            </TestCommonAppProvider>
        );
        expect(wrapper.getByText("English")).toBeInTheDocument();

        fireEvent.click(wrapper.getByTestId("LocaleSwitcher"));
        expect(wrapper.getByRole("menu").children.length).toEqual(3);
        expect(wrapper.getByText("日本語")).toBeInTheDocument();

        fireEvent.click(wrapper.getByText("日本語"));
        expect(mockFn).toBeCalledWith("ja");
    });

    it("should not call setLocale when choosing same locale", () => {
        const wrapper = render(
            <TestCommonAppProvider>
                <LocaleSwitcher />
            </TestCommonAppProvider>
        );
        expect(wrapper.getByText("English")).toBeInTheDocument();

        fireEvent.click(wrapper.getByTestId("LocaleSwitcher"));
        const enButton = wrapper.getByTestId("LocaleButton-en");

        fireEvent.click(enButton);
        expect(mockFn).not.toBeCalled();
    });
});
