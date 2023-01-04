import { PropsWithChildren } from "react";

import { TableColumn, TableRowWithCheckboxProps } from "../../table-types";
import TableRowWithCheckbox from "../TableRowWithCheckbox";
import { ItemTableBase } from "./TableWithCheckbox.test";

import { fireEvent, render } from "@testing-library/react";

const record: ItemTableBase = {
    id: 1,
    name: "Nam",
    email: "thanhnam@manabie.com",
};

const Wrapper = ({ children }: PropsWithChildren<{}>) => {
    return (
        <table>
            <tbody>{children}</tbody>
        </table>
    );
};

const renderWithWrapper = (props: TableRowWithCheckboxProps<any>) => {
    return render(<TableRowWithCheckbox {...props} />, {
        wrapper: Wrapper,
    });
};

describe("<TableRowWithCheckbox />", () => {
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

    let props: TableRowWithCheckboxProps<ItemTableBase> = {
        columns,
        record,
        selected: true,
        dataIndex: 1,
        handleClickCheckbox: jest.fn(),
        border: {
            borderRight: `1px`,
            borderBottom: `1px`,
        },
        rowKey: "id",
    };

    it("should match snapshot", () => {
        const { container } = renderWithWrapper(props);
        expect(container).toMatchSnapshot();
    });

    it("should render with checkbox", () => {
        const { getByRole } = renderWithWrapper({ ...props, onSelect: () => {} });
        expect(getByRole("checkbox")).toBeInTheDocument();
    });

    it("should clickable on row", () => {
        const wrapper = renderWithWrapper({ ...props, onSelect: () => {} });
        fireEvent.click(wrapper.getByRole("checkbox"));
        expect(props.handleClickCheckbox).toBeCalled();
    });
});

describe("<TableRowWithCheckbox /> with render column", () => {
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
    let props: TableRowWithCheckboxProps<ItemTableBase> = {
        columns,
        record,
        selected: true,
        dataIndex: 1,
        handleClickCheckbox: jest.fn(),
        border: {
            borderRight: `1px`,
            borderBottom: `1px`,
        },
        rowKey: "id",
    };

    it("should render correct cell props", () => {
        const { container, getAllByTestId } = renderWithWrapper(props);
        expect(props.columns[0].render).toBeCalled();

        expect(container).toMatchSnapshot();

        expect(getAllByTestId("Testing__iWantToTestAnotherAttr")).toHaveLength(1);
    });
});
