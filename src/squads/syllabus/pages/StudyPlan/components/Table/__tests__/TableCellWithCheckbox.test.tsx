import TableCellWithCheckbox, { TableCellWithCheckboxProps } from "../TableCellWithCheckbox";

import { fireEvent, render, screen } from "@testing-library/react";

const renderFunction = (props: TableCellWithCheckboxProps) => {
    return render(
        <table>
            <tbody>
                <tr>
                    <TableCellWithCheckbox {...props} />
                </tr>
            </tbody>
        </table>
    );
};

describe(TableCellWithCheckbox.name, () => {
    it("should render correctly", () => {
        renderFunction({ children: "Test", checkboxProps: {} });

        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it("should render correctly with checkbox", () => {
        const { getByRole } = renderFunction({
            children: "Test",
            checkboxProps: { checked: true },
        });

        expect(getByRole("checkbox")).toBeInTheDocument();
    });

    it("should selectable checkbox", () => {
        const changeFn = jest.fn();
        const { getByRole } = renderFunction({
            children: "Test",
            checkboxProps: { onChange: changeFn },
        });

        fireEvent.click(getByRole("checkbox"));

        expect(changeFn).toBeCalled();
    });
});
