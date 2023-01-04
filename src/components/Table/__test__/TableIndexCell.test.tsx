import TableIndexCell, { TableIndexCellProps } from "../TableIndexCell";

import { render } from "@testing-library/react";

const renderWithTable = (props: TableIndexCellProps) => {
    return render(
        <table>
            <tbody>
                <tr>
                    <TableIndexCell {...props} />
                </tr>
            </tbody>
        </table>
    );
};

describe("<TableIndexCell />", () => {
    it("should render with boolean withIndex", () => {
        const { getByText } = renderWithTable({ withIndex: true, children: "Index" });

        expect(getByText("Index")).toBeInTheDocument();
    });

    it("should render with object withIndex", () => {
        const { getByText } = renderWithTable({ withIndex: { width: "1%" }, children: "Index" });

        expect(getByText("Index")).toBeInTheDocument();
    });
});
