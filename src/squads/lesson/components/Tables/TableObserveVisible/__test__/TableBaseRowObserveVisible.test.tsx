import {
    mockColumnsTable,
    ItemTableBase,
    mockRecordTable,
} from "src/squads/lesson/test-utils/table";

import { Table, TableBody } from "@mui/material";
import { TableBaseRowProps } from "src/components/Table/table-types";

import TableBaseRowObserveVisible from "../TableBaseRowObserveVisible";

import { render, screen } from "@testing-library/react";
import useObserveVisibleElement from "src/squads/lesson/hooks/useObserveVisibleElement";

jest.mock("src/squads/lesson/hooks/useObserveVisibleElement", () => ({
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
        (useObserveVisibleElement as jest.Mock).mockReturnValue({
            isVisible: true,
            intersectionRef: { current: null },
            placeholderHeight: { current: 110 },
        });
    });
    const renderComponent = () => {
        return render(
            <Table>
                <TableBody>
                    <TableBaseRowObserveVisible {...props} />
                </TableBody>
            </Table>
        );
    };

    it("should render row table correct data record", () => {
        renderComponent();
        expect(screen.getByText(mockRecordTable.email)).toBeInTheDocument();
        expect(screen.getByText(mockRecordTable.name)).toBeInTheDocument();
    });
    it("should not render data record", () => {
        (useObserveVisibleElement as jest.Mock).mockReturnValue({
            isVisible: true,
            intersectionRef: { current: null },
            placeholderHeight: { current: 110 },
        });
        expect(screen.queryByTestId("TableIndexCell__index")).not.toBeInTheDocument();
    });
});
