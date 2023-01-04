import {
    mockColumnsTable,
    mockDataTable,
    ItemTableBase,
} from "src/squads/user/test-utils/mocks/table";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { Table } from "@mui/material";
import { TableBodyWithCheckboxProps } from "src/components/Table/table-types";

import TableBodyObserveVisibleCheckbox from "../TableBodyObserveVisibleCheckbox";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/user/hooks/useObserveVisibleElement", () => ({
    __esModule: true,
    default: () => ({ isVisible: true }),
}));
describe("<TableBodyObserveVisibleCheckbox />", () => {
    const onSelect = jest.fn();
    const handleClickCheckbox = jest.fn();
    const props: TableBodyWithCheckboxProps<ItemTableBase> = {
        columns: mockColumnsTable,
        loading: false,
        data: mockDataTable,
        noDataMessage: "NO_DATA",
        isSelected: jest.fn(),
        border: {
            borderBottom: `1px solid #E0E0E0`,
            borderRight: `1px solid #E0E0E0`,
        },
        rowKey: "id",
        onSelect,
        handleClickCheckbox,
    };
    const renderComponents = (
        propsOverride?: Partial<
            Omit<TableBodyWithCheckboxProps<ItemTableBase>, "columns" | "rowKey" | "border">
        >
    ) => {
        return render(
            <TestCommonAppProvider>
                <Table>
                    <TableBodyObserveVisibleCheckbox {...props} {...propsOverride} />
                </Table>
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot", () => {
        const wrapper = renderComponents();
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should call handleClickCheckbox", () => {
        renderComponents();
        const allCheckbox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        userEvent.click(allCheckbox[0]);
        expect(handleClickCheckbox).toBeCalledWith(mockDataTable[0]);
    });

    it("should render with empty data", () => {
        renderComponents({ data: [] });
        expect(screen.getByTestId("TableBase__noDataMessage")).toBeInTheDocument();
    });

    it("should render customBody prop", () => {
        const text: string = "CUSTOM_BODY";
        const CustomBody = (
            <tr>
                <td>{text}</td>
            </tr>
        );
        renderComponents({ customBody: CustomBody });

        expect(screen.getByText(text)).toBeInTheDocument();
    });

    it("should render body correct rows", () => {
        renderComponents();
        expect(screen.getAllByTestId("TableBase__row")).toHaveLength(props.data.length);
    });

    it("should render loading correctly", () => {
        renderComponents({ loading: true, data: [] });
        expect(screen.getAllByTestId("TableSke__item")).toHaveLength(props.data.length * 5);
    });
});
