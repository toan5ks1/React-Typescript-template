import MenuItemButtonList, {
    MenuItemButtonListProps,
} from "src/squads/payment/domains/OrderManagement/components/Lists/MenuItemButtonList/MenuItemButtonList";

import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";

const menuItemButtonListTitle: string = "Title";
const selectedIndex: number = 0;
const numberOfItems: number = 2;

const mockItemList: Record<string, any>[] = Array(numberOfItems)
    .fill("item")
    .map((item, index) => {
        return { ...item, id: `id_${index}` };
    });

const defaultMenuItemButtonListProps: MenuItemButtonListProps<Record<string, any>> = {
    keyName: "id",
    title: menuItemButtonListTitle,
    itemList: mockItemList,
    selectedIndex: selectedIndex,
    onSelected: jest.fn(),
    renderComponent: jest.fn(),
    errors: {},
    renderError: jest.fn(),
};

const renderMenuItemButtonList = (
    menuItemButtonListProps: MenuItemButtonListProps<
        Record<string, any>
    > = defaultMenuItemButtonListProps
) => {
    return render(
        <TestApp>
            <MenuItemButtonList {...menuItemButtonListProps} />
        </TestApp>
    );
};

describe("<MenuItemButtonList />", () => {
    it("should render correctly menu item button list with fields data", () => {
        const { getByTestId, getAllByTestId, getByText } = renderMenuItemButtonList();

        expect(getByTestId("MenuItemButtonList__root")).toBeInTheDocument();
        expect(getByText("Title")).toBeInTheDocument();

        const listItemButton = getAllByTestId("MenuItemButtonList__listItemButton");

        expect(listItemButton).toHaveLength(mockItemList.length);
    });

    it("should call onSlected function when user click on menu item button list", () => {
        const { getAllByTestId } = renderMenuItemButtonList();

        const listItemButton = getAllByTestId("MenuItemButtonList__listItemButton");
        userEvent.click(listItemButton[0]);

        expect(defaultMenuItemButtonListProps.onSelected).toBeCalledWith(selectedIndex);
    });

    it("should call renderError function when item list has error", () => {
        const errors: object = {
            type: "custom",
            message: "custom message",
        };
        renderMenuItemButtonList({ ...defaultMenuItemButtonListProps, errors });

        expect(defaultMenuItemButtonListProps.renderError).toBeCalled();
    });
});
