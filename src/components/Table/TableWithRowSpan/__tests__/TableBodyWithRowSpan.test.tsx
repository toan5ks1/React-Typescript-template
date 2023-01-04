import { TableBodyWithRowSpanProps, TableColumn } from "../../table-types";
import TableBodyWithRowSpan from "../TableBodyWithRowSpan";

import { render } from "@testing-library/react";

const data = {
    "Group 1": [
        { id: 1, name: "Item 1", type: "Type 1" },
        { id: 2, name: "Item 2", type: "Type 1" },
    ],
    "Group 2": [{ id: 3, name: "Item 3", type: "Type 2" }],
};
const columns: TableColumn[] = [
    {
        key: "colName",
        title: "Name",
        dataIndex: "name",
    },
    {
        key: "colType",
        title: "Type",
        dataIndex: "type",
    },
];

function renderWithTable(props: TableBodyWithRowSpanProps<any>) {
    return render(
        <table>
            <TableBodyWithRowSpan {...props} />
        </table>
    );
}

describe("<TableBodyWithRowSpan />", () => {
    const props = {
        data,
        border: { borderRight: "1px solid #000", borderBottom: "1px solid #000" },
        columns,
        rowKey: "id",
        loading: false,
    };

    it("should match snapshot", () => {
        const { container } = renderWithTable(props);

        expect(container).toMatchSnapshot();
    });

    it("should render cells correctly", () => {
        const { container } = renderWithTable(props);

        // First row
        expect(container.querySelectorAll("tbody tr:first-of-type td").length).toEqual(
            columns.length + 1
        );
        expect(
            container.querySelectorAll("tbody tr:first-of-type td:first-of-type")[0].textContent
        ).toEqual(Object.keys(data)[0]);

        // Second row
        expect(container.querySelectorAll("tbody tr:nth-of-type(2) td").length).toEqual(
            columns.length
        );
        expect(
            container.querySelectorAll("tbody tr:nth-of-type(2) td:first-of-type")[0].textContent
        ).toEqual(data["Group 1"][1].name);
    });
});
