import {
    mockColumnsTable,
    ItemTableBase,
    mockRecordTable,
} from "src/squads/user/test-utils/mocks/table";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { Table, TableBody } from "@mui/material";
import { TableRowWithCheckboxProps } from "src/components/Table/table-types";

import TableRowObserveVisibleCheckbox from "../TableRowObserveVisibleCheckbox";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useObserveVisibleElement, {
    UseObserveVisibleElementReturn,
} from "src/squads/user/hooks/useObserveVisibleElement";

jest.mock("src/squads/user/hooks/useObserveVisibleElement", () => ({
    __esModule: true,
    default: jest.fn(),
}));
describe("<TableRowObserveVisibleCheckbox />", () => {
    const handleClickCheckbox = jest.fn();
    const onSelect = jest.fn();
    const props: TableRowWithCheckboxProps<ItemTableBase> = {
        columns: mockColumnsTable,
        record: mockRecordTable,
        selected: true,
        dataIndex: 1,
        border: {
            borderRight: `1px`,
            borderBottom: `1px`,
        },
        rowKey: "id",
        handleClickCheckbox,
        onSelect,
    };
    beforeEach(() => {
        (
            useObserveVisibleElement as jest.Mock<
                UseObserveVisibleElementReturn<HTMLTableRowElement>
            >
        ).mockReturnValue({
            isVisible: true,
            intersectionRef: { current: null },
            placeholderHeight: { current: 110 },
            rendered: true,
            resetRendered: jest.fn(),
        });
    });
    const renderComponent = () => {
        return render(
            <TestCommonAppProvider>
                <Table>
                    <TableBody>
                        <TableRowObserveVisibleCheckbox {...props} />
                    </TableBody>
                </Table>
            </TestCommonAppProvider>
        );
    };

    it("should match snapshot", () => {
        const wrapper = renderComponent();
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render row table correct data record", () => {
        renderComponent();
        expect(screen.getByText(mockRecordTable.email)).toBeInTheDocument();
        expect(screen.getByText(mockRecordTable.name)).toBeInTheDocument();
    });
    it("should call handleClickCheckbox", () => {
        renderComponent();
        const checkbox = screen.getByTestId("TableRowWithCheckbox__checkboxRow");
        userEvent.click(checkbox);
        expect(handleClickCheckbox).toBeCalledWith(mockRecordTable);
    });
    it("should not render data record", () => {
        expect(screen.queryByTestId("TableIndexCell__index")).not.toBeInTheDocument();
    });
});
