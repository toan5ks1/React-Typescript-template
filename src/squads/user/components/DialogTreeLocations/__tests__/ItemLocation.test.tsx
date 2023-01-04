import { mockLowestNodeLocation } from "src/squads/user/test-utils/mocks/locations";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import ItemLocation from "../ItemLocation";

import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("<ItemLocation/>", () => {
    const onCheck = jest.fn();
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <ItemLocation
                    option={mockLowestNodeLocation}
                    keyShowValue="name"
                    checkedList={[mockLowestNodeLocation]}
                    onCheck={onCheck}
                    keyCompareEqual={"locationId"}
                />
            </TestCommonAppProvider>
        );
    };

    it("should match to snapshot", () => {
        const { container } = renderComponent();
        expect(container).toMatchSnapshot();
    });

    it("should call onCheck fn", () => {
        renderComponent();

        const containerCheckbox = screen.getByTestId("ItemLocation__checkbox");

        const inputCheckbox = within(containerCheckbox).getByRole("checkbox");

        userEvent.click(inputCheckbox);

        expect(onCheck).toBeCalledTimes(1);
    });

    it("should be checked checkbox", () => {
        renderComponent();

        const containerCheckbox = screen.getByTestId("ItemLocation__checkbox");

        const inputCheckbox = within(containerCheckbox).getByRole("checkbox");

        expect(inputCheckbox).toBeChecked();
    });
});
