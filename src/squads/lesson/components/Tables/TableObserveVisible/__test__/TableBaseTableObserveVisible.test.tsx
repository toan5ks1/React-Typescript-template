import { createFakePagination } from "src/squads/lesson/test-utils/pagination";
import { ItemTableBase, mockColumnsTable, mockDataTable } from "src/squads/lesson/test-utils/table";

import { TableBaseProps } from "src/components/Table/table-types";

import TableBaseTableObserveVisible from "../TableBaseTableObserveVisible";

import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/lesson/hooks/useObserveVisibleElement", () => ({
    __esModule: true,
    default: () => ({ isVisible: true }),
}));

describe("<TableBaseTableObserveVisible />", () => {
    const isSelected = jest.fn();
    const pagination = createFakePagination({ rowsPerPage: 100 });
    const props: TableBaseProps<ItemTableBase> = {
        columns: mockColumnsTable,
        data: mockDataTable,
        border: "all",
        showHeader: true,
        body: {
            rowKey: "id",
            loading: false,
        },
        component: "div",
        isSelected,
        footer: {
            pagination,
        },
    };

    const renderComponent = (
        propsOverride?: Partial<Omit<TableBaseProps<ItemTableBase>, "columns" | "rowKey">>
    ) => {
        return render(<TableBaseTableObserveVisible {...props} {...propsOverride} />);
    };

    it("should be call isSelected", () => {
        renderComponent();
        userEvent.click(screen.getAllByTestId("TableBase__row")[0]);
        // TODO: need define why we call 2 times
        expect(isSelected).toBeCalledTimes(2);
    });

    it("should render body, header, footer table", () => {
        renderComponent();
        expect(screen.getByTestId("TableBase__header"));
        expect(screen.getByTestId("TableBaseBody__root"));
        expect(screen.getByTestId("TableBaseFooter"));
    });
});
