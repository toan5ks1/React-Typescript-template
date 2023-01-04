import { shallow } from "enzyme";

import TableBaseRow from "../TableBaseRow";
import { TableBaseRowProps, TableColumn } from "../table-types";
import { ItemTableBase } from "./TableBase.test";

const record: ItemTableBase = {
    id: 1,
    name: "Nam",
    email: "thanhnam@manabie.com",
};

describe("<TableBaseRow />", () => {
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

    let props: TableBaseRowProps<ItemTableBase> = {
        columns,
        record,
        selected: true,
        dataIndex: 1,
        border: {
            borderRight: `1px`,
            borderBottom: `1px`,
        },
        rowKey: "id",
    };

    it("should match snapshot", () => {
        const wrapper = shallow(<TableBaseRow {...props} />);
        expect(wrapper).toMatchSnapshot();
    });
});

describe("<TableBaseRow /> with render column", () => {
    const columns: TableColumn[] = [
        {
            key: "colName",
            title: "title 1",
            cellProps: {
                style: {
                    width: "60%",
                },
            },
            render: jest.fn(),
        },
        {
            key: "colEmail",
            title: "title 2",
            cellProps: {
                "data-testid": "Testing__iWantToTestAnotherAttr",
                style: {
                    width: "40%",
                },
            },
            render: jest.fn(),
        },
    ];
    let props: TableBaseRowProps<ItemTableBase> = {
        columns,
        record,
        selected: true,
        dataIndex: 1,
        border: {
            borderRight: `1px`,
            borderBottom: `1px`,
        },
        rowKey: "id",
    };

    it("should render correct cell props", () => {
        const wrapper = shallow(<TableBaseRow {...props} />);
        expect(props.columns[0].render).toBeCalled();

        expect(wrapper).toMatchSnapshot();

        expect(wrapper.find('[data-testid="Testing__iWantToTestAnotherAttr"]')).toHaveLength(1);
    });
});
