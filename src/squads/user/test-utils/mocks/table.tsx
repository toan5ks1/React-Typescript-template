import { TableColumn } from "src/components/Table/table-types";

export interface ItemTableBase {
    id: number;
    name: string;
    email: string;
}

export const mockRecordTable: ItemTableBase = {
    id: 1,
    name: "Nam",
    email: "thanhnam@manabie.com",
};

export const mockColumnsTable: TableColumn[] = [
    {
        key: "name",
        title: "Name",
        cellProps: {
            style: {
                width: "60%",
            },
        },
        emptyValue: "empty",
        render: (record) => <div>{record.name}</div>,
    },
    {
        key: "email",
        title: "Email",
        cellProps: {
            style: {
                width: "40%",
            },
        },
        emptyValue: "empty",
        render: (record) => <div>{record.email}</div>,
    },
];

export const mockDataTable: ItemTableBase[] = [
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
