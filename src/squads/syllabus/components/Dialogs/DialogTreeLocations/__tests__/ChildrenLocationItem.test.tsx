import { mockLowestNodeLocation } from "src/squads/syllabus/test-utils/locations";

import ChildrenLocationItem from "src/squads/syllabus/components/Dialogs/DialogTreeLocations/ChildrenLocationItem";

import { render, screen, within } from "@testing-library/react";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

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
