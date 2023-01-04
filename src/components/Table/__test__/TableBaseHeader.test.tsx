import { shallow } from "enzyme";

import TypographyBase from "src/components/Typographys/TypographyBase";

import TableBaseHeader from "../TableBaseHeader";
import { TableBaseHeaderProps, TableColumn } from "../table-types";

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

describe("<TableBaseHeader />", () => {
    const props: TableBaseHeaderProps = {
        columns: columns,
        visible: true,
        border: {
            borderBottom: `1px solid #E0E0E0`,
            borderRight: `1px solid #E0E0E0`,
        },
    };

    it("should match snapshot", () => {
        const wrapper = shallow(<TableBaseHeader {...props} />);
        expect(wrapper).toMatchSnapshot();
    });

    it("should hidden", () => {
        const wrapper = shallow(
            <TableBaseHeader columns={columns} visible={false} border={props.border} />
        );
        expect(wrapper.isEmptyRender()).toEqual(true);
    });

    it("should render correct title", () => {
        const wrapper = shallow(<TableBaseHeader {...props} />);
        const texts = wrapper.find(TypographyBase);

        expect(texts).toHaveLength(columns.length);

        texts.forEach((item, index) => {
            expect(item.children().text()).toEqual(columns[index].title);
        });
    });
});
