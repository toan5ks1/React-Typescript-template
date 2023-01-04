import { mockLowestNodeLocation } from "src/squads/user/test-utils/mocks/locations";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import ChildrenLocationItem from "../ChildrenLocationItem";

import { render, screen, within } from "@testing-library/react";

describe("<ChildrenLocationItem/>", () => {
    const renderComponent = (checked: boolean = true) => {
        return render(
            <TestCommonAppProvider>
                <ChildrenLocationItem
                    option={mockLowestNodeLocation}
                    keyShowValue="name"
                    checked={checked}
                />
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot on checked", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });
    it("should be checked checkbox", () => {
        renderComponent();

        const containerCheckbox = screen.getByTestId("ItemLocation__checkbox");

        const inputCheckbox = within(containerCheckbox).getByRole("checkbox");

        expect(inputCheckbox).toBeChecked();
    });
    it("should not be checked checkbox", () => {
        renderComponent(false);

        const containerCheckbox = screen.getByTestId("ItemLocation__checkbox");

        const inputCheckbox = within(containerCheckbox).getByRole("checkbox");

        expect(inputCheckbox).not.toBeChecked();
    });
});
