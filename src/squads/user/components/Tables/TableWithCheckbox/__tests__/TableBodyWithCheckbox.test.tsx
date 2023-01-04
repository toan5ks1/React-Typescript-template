import { PropsWithChildren } from "react";

import { TableBodyWithCheckboxProps, TableColumn } from "src/components/Table/table-types";

import TableBodyWithCheckbox from "../TableBodyWithCheckbox";

import { render } from "@testing-library/react";

export interface ItemTableBase {
    id: number;
    name: string;
    email: string;
}

const columns: TableColumn[] = [
    {
        key: "colName",
        title: "title 1",
        dataIndex: "name",
        cellProps: {
            style: {
                width: "60%",
            },
        },
    },
    {
        key: "colEmail",
        title: "title 2",
        dataIndex: "email",
        cellProps: {
            style: {
                width: "40%",
            },
        },
    },
];

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

function renderInTable(props: TableBodyWithCheckboxProps<ItemTableBase>) {
    return render(<TableBodyWithCheckbox {...props} />, {
        wrapper: ({ children }: PropsWithChildren<{}>) => <table>{children}</table>,
    });
}

describe("<TableBodyWithCheckbox />", () => {
    const props: TableBodyWithCheckboxProps<ItemTableBase> = {
        columns,
        loading: false,
        data,
        noDataMessage: "NO_DATA",
        isSelected: jest.fn(),
        onSelect: jest.fn(),
        border: {
            borderBottom: `1px solid #E0E0E0`,
            borderRight: `1px solid #E0E0E0`,
        },
        rowKey: "id",
    };

    it("should match snapshot when loading=TRUE", () => {
        const { container } = renderInTable({ ...props, loading: true });
        expect(container).toMatchSnapshot();
    });

    it("should match snapshot when loading=FALSE", () => {
        const { container } = renderInTable({ ...props, loading: false });
        expect(container).toMatchSnapshot();
    });

    it("should render body with correct rows/columns", () => {
        const { container } = renderInTable({ ...props, loading: false });

        expect(container.querySelectorAll("tr")).toHaveLength(props.data.length);
        expect(container.querySelectorAll("tr:first-child > td")).toHaveLength(
            props.columns.length
        );
    });
    it("should render checkbox in the table row", () => {
        const { container } = renderInTable({ ...props, loading: false });

        expect(
            container.querySelectorAll(
                "tr:first-child [data-testid='TableRowWithCheckbox__checkboxRow']"
            )
        ).toHaveLength(1);
    });
});
