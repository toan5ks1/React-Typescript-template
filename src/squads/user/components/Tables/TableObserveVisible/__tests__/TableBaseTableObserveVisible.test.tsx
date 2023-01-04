import { createFakePagination } from "src/squads/user/test-utils/mocks/pagination";
import {
    ItemTableBase,
    mockColumnsTable,
    mockDataTable,
} from "src/squads/user/test-utils/mocks/table";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { TableBaseProps } from "src/components/Table/table-types";

import TableBaseTableObserveVisible from "../TableBaseTableObserveVisible";

import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/user/hooks/useObserveVisibleElement", () => ({
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
        return render(
            <TestCommonAppProvider>
                <TableBaseTableObserveVisible {...props} {...propsOverride} />
            </TestCommonAppProvider>
        );
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
