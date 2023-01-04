import { mockColumnsTable, mockDataTable, ItemTableBase } from "src/squads/lesson/test-utils/table";

import { Table } from "@mui/material";
import { TableBaseBodyProps } from "src/components/Table/table-types";

import TableBaseBodyObserveVisible from "../TableBaseBodyObserveVisible";

import { render, screen } from "@testing-library/react";

jest.mock("src/squads/lesson/hooks/useObserveVisibleElement", () => ({
    __esModule: true,
    default: () => ({ isVisible: true }),
}));

describe("<TableBaseBodyObserveVisible />", () => {
    const props: TableBaseBodyProps<ItemTableBase> = {
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
    };
    const renderComponents = (
        propsOverride?: Partial<
            Omit<TableBaseBodyProps<ItemTableBase>, "columns" | "rowKey" | "border">
        >
    ) => {
        return render(
            <Table>
                <TableBaseBodyObserveVisible {...props} {...propsOverride} />
            </Table>
        );
    };

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
