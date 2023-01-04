import { createFakePagination } from "src/squads/user/test-utils/mocks/pagination";
import {
    ItemTableBase,
    mockColumnsTable,
    mockDataTable,
} from "src/squads/user/test-utils/mocks/table";
import { TestCommonAppProvider } from "src/squads/user/test-utils/providers";

import { TableWithCheckboxProps } from "src/components/Table/table-types";

import TableObserveVisibleCheckbox from "../TableObserveVisibleCheckbox";

import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("src/squads/user/hooks/useObserveVisibleElement", () => ({
    __esModule: true,
    default: () => ({ isVisible: true }),
}));

describe("<TableObserveVisibleCheckbox />", () => {
    const onSelect = jest.fn();
    const pagination = createFakePagination({ rowsPerPage: 100 });
    const props: TableWithCheckboxProps<ItemTableBase> = {
        columns: mockColumnsTable,
        data: mockDataTable,
        border: "all",
        showHeader: true,
        body: {
            rowKey: "id",
            loading: false,
        },
        component: "div",
        footer: {
            pagination,
        },
        onSelect,
    };

    const renderComponent = (
        propsOverride?: Partial<Omit<TableWithCheckboxProps<ItemTableBase>, "columns" | "rowKey">>
    ) => {
        return render(
            <TestCommonAppProvider>
                <TableObserveVisibleCheckbox {...props} {...propsOverride} />
            </TestCommonAppProvider>
        );
    };

    it("should render body, header, footer table", () => {
        renderComponent();
        expect(screen.getByTestId("TableBase__header"));
        expect(screen.getByTestId("TableBaseBody__root"));
        expect(screen.getByTestId("TableBaseFooter"));
    });

    it("should call onSelect", () => {
        renderComponent();
        const allCheckbox = screen.getAllByTestId("TableRowWithCheckbox__checkboxRow");

        userEvent.click(allCheckbox[0]);
        expect(onSelect).toBeCalledWith([mockDataTable[0]]);
    });
});
