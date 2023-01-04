import { pick1stElement } from "src/common/utils/other";

import { TableBorderStyle, TableColumn, TableWithCheckboxProps } from "../../table-types";
import TableWithCheckbox from "../TableWithCheckbox";

import { fireEvent, render } from "@testing-library/react";

jest.mock("src/hooks/useTranslate", () => {
    return () => jest.fn();
});

const columns: TableColumn[] = [
    {
        key: "colName",
        title: "title 1",
        cellProps: {
            style: {
                width: "60%",
            },
        },
    },
    {
        key: "colEmail",
        title: "title 2",
        cellProps: {
            style: {
                width: "40%",
            },
        },
    },
];
export interface ItemTableBase {
    id: number;
    name: string;
    email: string;
}

const data: ItemTableBase[] = [
    {
        id: 1,
        name: "Nam",
        email: "thanhnam@manabie.com",
    },
    {
        id: 2,
        name: "Nam 2",
        email: "thanhnam2@manabie.com",
    },
];

describe("<TableWithCheckbox />", () => {
    const firstElement = pick1stElement(data);
    const props: TableWithCheckboxProps<ItemTableBase> = {
        columns: columns,
        data: data,
        border: "all",
        onSelect: () => {},
        showHeader: true,
        body: {
            rowKey: "id",
            loading: false,
        },
        component: "div",
        listSelectedItems: firstElement ? [firstElement] : [],
    };

    it("should match snapshot", () => {
        Object.keys(TableBorderStyle).forEach((item) => {
            const { container } = render(
                <TableWithCheckbox {...props} border={item as keyof typeof TableBorderStyle} />
            );
            expect(container).toMatchSnapshot();
        });
    });

    it("should be clickable", async () => {
        const { getAllByTestId, getByTestId } = render(<TableWithCheckbox {...props} />);

        fireEvent.click(getAllByTestId("TableBase__row")[0]);
        fireEvent.click(getByTestId("TableHeaderWithCheckbox__checkboxHeader"));
    });

    it("should check all when clicking header checkbox", async () => {
        const { getAllByRole, getByTestId } = render(<TableWithCheckbox {...props} />);
        const checkboxes = getAllByRole("checkbox") as HTMLInputElement[];
        const checkboxPredicate = (checkbox: HTMLInputElement) => checkbox.checked;
        const headerCheckbox = getByTestId("TableHeaderWithCheckbox__checkboxHeader").querySelector(
            "input"
        );

        if (headerCheckbox) {
            expect(checkboxes.every(checkboxPredicate)).toBe(false);
            fireEvent.click(headerCheckbox); // Check to active all
            expect(checkboxes.every(checkboxPredicate)).toBe(true);
            fireEvent.click(headerCheckbox); // Check again to deactivate all
        }
    });

    it("should be render correct with list selected items", () => {
        const wrapper = render(<TableWithCheckbox {...props} />);

        expect(wrapper.queryAllByRole("checkbox", { checked: true })).toHaveLength(
            props.listSelectedItems!.length
        );
    });
});
