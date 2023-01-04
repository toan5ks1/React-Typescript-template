import { TestApp } from "src/squads/communication/test-utils";

import ToggleViewButton, {
    ToggleViewButtonProps,
} from "src/squads/communication/pages/Notification/components/ToggleViewButton/";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockToggleViewMoreLess = jest.fn();

const defaultPropsToggleViewButton = {
    isExpandingAll: false,
    toggleViewMoreLess: mockToggleViewMoreLess,
};

const renderToggleViewButtonTest = (
    props: ToggleViewButtonProps = defaultPropsToggleViewButton
) => {
    return render(
        <TestApp>
            <ToggleViewButton {...props} />
        </TestApp>
    );
};

describe("<IconButtonDelete />", () => {
    it("should render correct View Less button", () => {
        renderToggleViewButtonTest({
            ...defaultPropsToggleViewButton,
            isExpandingAll: true,
        });

        expect(screen.getByTestId("ToggleViewButton__buttonViewMoreLess")).toBeInTheDocument();
        expect(screen.getByText("View Less")).toBeInTheDocument();
        expect(screen.queryByText("View More")).not.toBeInTheDocument();
    });

    it("should render correct View More button", () => {
        renderToggleViewButtonTest();

        expect(screen.getByTestId("ToggleViewButton__buttonViewMoreLess")).toBeInTheDocument();
        expect(screen.getByText("View More")).toBeInTheDocument();
        expect(screen.queryByText("View Less")).not.toBeInTheDocument();
    });

    it("should call toggleViewMoreLess when click ToggleViewButton", () => {
        renderToggleViewButtonTest();

        expect(screen.getByTestId("ToggleViewButton__buttonViewMoreLess")).toBeInTheDocument();
        expect(screen.getByText("View More")).toBeInTheDocument();
        expect(screen.queryByText("View Less")).not.toBeInTheDocument();

        userEvent.click(screen.getByText("View More"));

        expect(mockToggleViewMoreLess).toBeCalledTimes(1);
    });
});
