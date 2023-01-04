import { shallow } from "enzyme";

import { TableRow } from "@mui/material";

import TableBaseBody from "../TableBaseBody";
import TableBaseRow from "../TableBaseRow";
import { TableBaseBodyProps, TableColumn } from "../table-types";

export interface ItemTableBase {
    id: number;
    name: string;
    email: string;
}

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

describe("<TableBaseBody />", () => {
    const props: TableBaseBodyProps<ItemTableBase> = {
        columns,
        loading: false,
        data,
        noDataMessage: "NO_DATA",
        isSelected: jest.fn(),
        border: {
            borderBottom: `1px solid #E0E0E0`,
            borderRight: `1px solid #E0E0E0`,
        },
        rowKey: "id",
    };

    it("should match snapshot", () => {
        const wrapper = shallow(<TableBaseBody {...props} loading={true} />);
        expect(wrapper).toMatchSnapshot();
    });

    it("should render with no data message", () => {
        const wrapper = shallow(<TableBaseBody {...props} data={[]} />);
        expect(wrapper.html().includes(props.noDataMessage as string));
    });

    it("should render with default empty data", () => {
        const wrapper = shallow(<TableBaseBody {...props} data={[]} />);
        expect(wrapper.find(TableRow)).toHaveLength(1);
    });

    it("should render customBody prop", () => {
        const text: string = "CUSTOM_BODY";
        const CustomBody = (
            <tr>
                <td>{text}</td>
            </tr>
        );
        const wrapper = shallow(<TableBaseBody {...props} customBody={CustomBody} />);

        expect(wrapper).toMatchSnapshot();
        expect(wrapper.html().includes(text)).toEqual(true);
    });

    it("should render body by user", () => {
        const wrapper = shallow(<TableBaseBody {...props} loading={false} />);
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find(TableBaseRow)).toHaveLength(props.data.length);
    });
});
