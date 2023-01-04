import { createMockOrderList } from "src/squads/payment/test-utils/mocks/order";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import OrderManagementTable from "src/squads/payment/domains/OrderManagement/components/Tables/OrderManagementTable";

import { render, screen } from "@testing-library/react";
import TestApp from "src/squads/payment/test-utils/TestApp";
import TestThemeProvider from "src/squads/payment/test-utils/TestThemeProvider";

const mockOrders = createMockOrderList();
const mockPagination = createMockPaginationWithTotalObject();

describe("<OrderManagementTable />", () => {
    it("should render UI with data", () => {
        render(
            <TestApp>
                <TestThemeProvider>
                    <OrderManagementTable
                        dataSource={mockOrders}
                        loading={false}
                        pagination={mockPagination}
                    />
                </TestThemeProvider>
            </TestApp>
        );

        expect(screen.getByTestId("OrderManagementTable__root")).toBeInTheDocument();

        const columns = screen.getByTestId("TableBase__header").getElementsByTagName("th");
        const numberOfColumns = 7;
        expect(columns.length).toEqual(numberOfColumns);

        expect(screen.getAllByTestId("TableBase__row")).toHaveLength(mockOrders.length);
    });

    it("should render UI without data", () => {
        render(
            <TestApp>
                <TestThemeProvider>
                    <OrderManagementTable
                        dataSource={[]}
                        loading={false}
                        pagination={mockPagination}
                    />
                </TestThemeProvider>
            </TestApp>
        );

        expect(screen.getByTestId("OrderManagementTable__root")).toBeInTheDocument();

        const columns = screen.getByTestId("TableBase__header").getElementsByTagName("th");
        const numberOfColumns = 7;
        expect(columns.length).toEqual(numberOfColumns);

        expect(screen.getByTestId("TableBase__noDataMessage")).toBeInTheDocument();
    });
});
