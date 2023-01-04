import { PropsWithChildren } from "react";

import {
    TableHeaderWithCheckboxProps,
    TableCheckboxSelectType,
    TableColumn,
} from "src/components/Table/table-types";

import TableHeaderWithCheckbox from "../TableHeaderWithCheckbox";

import { render } from "@testing-library/react";

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

const Wrapper = ({ children }: PropsWithChildren<{}>) => {
    return <table>{children}</table>;
};

const renderWithWrapper = (props: TableHeaderWithCheckboxProps) => {
    return render(<TableHeaderWithCheckbox {...props} />, {
        wrapper: Wrapper,
    });
};

describe("<TableHeaderWithCheckbox />", () => {
    const props: TableHeaderWithCheckboxProps = {
        columns: columns,
        visible: true,
        border: {
            borderBottom: `1px solid #E0E0E0`,
            borderRight: `1px solid #E0E0E0`,
        },
    };

    const selectProps: TableCheckboxSelectType = {
        onSelectAllClick: jest.fn(),
        isCheckedAll: false,
        hasChecked: true,
        hasData: true,
    };

    it("should match snapshot", () => {
        const { container } = renderWithWrapper(props);
        expect(container).toMatchSnapshot();
    });

    it("should be hidden", () => {
        const { container } = renderWithWrapper({
            columns,
            visible: false,
            border: props.border,
        });
        expect(container.querySelector("th")).toBeNull();
    });

    it("should render correct title", () => {
        const { container } = renderWithWrapper(props);
        const texts = container.querySelectorAll(".MuiTypography-root");

        expect(texts).toHaveLength(columns.length);

        texts.forEach((item, index) => {
            expect(item.textContent).toEqual(columns[index].title);
        });
    });

    it("should render with checkbox", () => {
        const wrapper = renderWithWrapper({ ...props, select: selectProps });
        expect(wrapper.getByRole("checkbox")).toBeInTheDocument();
    });
});
