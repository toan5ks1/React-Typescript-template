import { TableColumn } from "../../table-types";
import TableWithRowSpan from "../TableWithRowSpan";

import { render } from "@testing-library/react";

const data = {
    "Group 1": [
        { id: 1, name: "Item 1", type: "Type 1" },
        { id: 2, name: "Item 2", type: "Type 1" },
    ],
    "Group 2": [{ id: 3, name: "Item 3", type: "Type 2" }],
};
const dataColumns: TableColumn[] = [
    {
        key: "colName",
        title: "Name",
    },
    {
        key: "colType",
        title: "Type",
    },
];
const headerColumns: TableColumn[] = [{ key: "colGroup", title: "Group" }, ...dataColumns];

describe("<TableWithRowSpan />", () => {
    const props = {
        data,
        headerColumns,
        dataColumns,
        body: { loading: false, rowKey: "id" },
    };

    it("should match snapshot", () => {
        const { container } = render(<TableWithRowSpan {...props} />);

        expect(container).toMatchSnapshot();
    });

    it("should render header cells and body cells correctly", () => {
        const { getByTestId } = render(<TableWithRowSpan {...props} />);

        expect(getByTestId("TableBase__header").querySelectorAll("th").length).toEqual(
            headerColumns.length
        );
        expect(
            getByTestId("TableBaseBody__root").querySelectorAll("tr:first-of-type td").length
        ).toEqual(headerColumns.length);
        expect(
            getByTestId("TableBaseBody__root").querySelectorAll("tr:nth-of-type(2) td").length
        ).toEqual(dataColumns.length);
    });

    it("should render spanned cell data correctly", () => {
        const { getByTestId } = render(<TableWithRowSpan {...props} />);
        const groups = Object.keys(data);
        const secondGroupRowSelector = `tr:nth-of-type(${data[groups[0]].length + 1})`;

        expect(getByTestId("TableBaseBody__root").querySelector("td")!.textContent).toEqual(
            groups[0]
        );
        expect(
            getByTestId("TableBaseBody__root").querySelector(`${secondGroupRowSelector} td`)!
                .textContent
        ).toEqual(groups[1]);
    });
});
