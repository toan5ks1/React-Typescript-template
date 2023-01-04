import { TestThemeProvider, TestApp } from "src/test-utils";

import NotificationTaskbarItem, { NotificationTaskbarItemProps } from "../NotificationTaskbarItem";

import { render, cleanup, RenderResult, screen } from "@testing-library/react";

afterAll(() => {
    cleanup();
});

describe("<NotificationTaskbarItem />", () => {
    const root = "NotificationTaskbarItem__root";
    const name = "NotificationTaskbarItem__name";

    let wrapper: RenderResult;

    const onClickFn = jest.fn();

    const defaultProps: NotificationTaskbarItemProps = {
        content: "lesson 01",
        onClick: onClickFn,
    };

    beforeEach(() => {
        wrapper = render(
            <TestApp>
                <TestThemeProvider>
                    <NotificationTaskbarItem {...defaultProps} />
                </TestThemeProvider>
            </TestApp>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should match UI", () => {
        expect(screen.getByTestId(name).textContent).toMatch(/lesson 01/);
    });

    it("should call the onClick callback func", () => {
        screen.getByTestId(root).click();
        expect(onClickFn).toBeCalled();
    });
});
