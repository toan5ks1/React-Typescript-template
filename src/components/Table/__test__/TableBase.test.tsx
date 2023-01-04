import { shallow } from "enzyme";

import TableBase, { TableBaseProps } from "../TableBase";
import { TableBorderStyle, TableColumn } from "../table-types";

import { fireEvent, render } from "@testing-library/react";

jest.mock("src/hooks/useTranslate", () => {
    return () => jest.fn();
});

export interface ItemTableBase {
    id: number;
    name: string;
    email: string;
}

describe("<TableBase />", () => {
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

    const props: TableBaseProps<ItemTableBase> = {
        columns: columns,
        data: data,
        border: "all",
        showHeader: true,
        body: {
            rowKey: "id",
            loading: false,
        },
        component: "div",
    };

    it("should match snapshot", () => {
        Object.keys(TableBorderStyle).forEach((item) => {
            const wrapper = shallow(
                <TableBase {...props} border={item as keyof typeof TableBorderStyle} />
            );
            expect(wrapper).toMatchSnapshot();
        });
    });

    it("should clickable", async () => {
        const { getAllByTestId } = render(<TableBase {...props} />);

        fireEvent.click(getAllByTestId("TableBase__row")[0]);
    });
});
