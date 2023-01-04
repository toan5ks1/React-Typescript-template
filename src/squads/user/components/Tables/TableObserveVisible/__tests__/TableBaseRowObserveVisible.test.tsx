import {
    mockColumnsTable,
    ItemTableBase,
    mockRecordTable,
} from "src/squads/user/test-utils/mocks/table";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { Table, TableBody } from "@mui/material";
import { TableBaseRowProps } from "src/components/Table/table-types";

import TableBaseRowObserveVisible from "../TableBaseRowObserveVisible";

import { render, screen } from "@testing-library/react";
import useObserveVisibleElement, {
    UseObserveVisibleElementReturn,
} from "src/squads/user/hooks/useObserveVisibleElement";

jest.mock("src/squads/user/hooks/useObserveVisibleElement", () => ({
    __esModule: true,
    default: jest.fn(),
}));
describe("<TableBaseRowObserveVisible />", () => {
    const props: TableBaseRowProps<ItemTableBase> = {
        columns: mockColumnsTable,
        record: mockRecordTable,
        selected: true,
        dataIndex: 1,
        border: {
            borderRight: `1px`,
            borderBottom: `1px`,
        },
        rowKey: "id",
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
    const renderComponent = (overrideProps?: Partial<TableBaseRowProps<ItemTableBase>>) => {
        return render(
            <TestCommonAppProvider>
                <Table>
                    <TableBody>
                        <TableBaseRowObserveVisible {...props} {...overrideProps} />
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
    it("should not render data record when isVisible true", () => {
        (
            useObserveVisibleElement as jest.Mock<
                UseObserveVisibleElementReturn<HTMLTableRowElement>
            >
        ).mockReturnValue({
            isVisible: true,
            intersectionRef: { current: null },
            placeholderHeight: { current: 110 },
            rendered: false,
            resetRendered: jest.fn(),
        });
        renderComponent();
        expect(screen.queryAllByTestId("TableBaseRowObserveVisible__skeleton")).toHaveLength(0);
    });

    it("should not render data record when isVisible is true and rendered is true", () => {
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
        renderComponent();
        expect(screen.queryAllByTestId("TableBaseRowObserveVisible__skeleton")).toHaveLength(0);
    });

    it("should not render skeleton when isVisible is false and rendered is false", () => {
        (
            useObserveVisibleElement as jest.Mock<
                UseObserveVisibleElementReturn<HTMLTableRowElement>
            >
        ).mockReturnValue({
            isVisible: false,
            intersectionRef: { current: null },
            placeholderHeight: { current: 110 },
            rendered: false,
            resetRendered: jest.fn(),
        });
        renderComponent();
        expect(screen.queryAllByTestId("TableBaseRowObserveVisible__skeleton")).toHaveLength(2);
    });

    it("should not render skeleton when isVisible is false and rendered is false with props withIndex", () => {
        (
            useObserveVisibleElement as jest.Mock<
                UseObserveVisibleElementReturn<HTMLTableRowElement>
            >
        ).mockReturnValue({
            isVisible: false,
            intersectionRef: { current: null },
            placeholderHeight: { current: 110 },
            rendered: false,
            resetRendered: jest.fn(),
        });
        renderComponent({ withIndex: true });
        expect(screen.queryAllByTestId("TableBaseRowObserveVisible__skeleton")).toHaveLength(3);
    });
});
