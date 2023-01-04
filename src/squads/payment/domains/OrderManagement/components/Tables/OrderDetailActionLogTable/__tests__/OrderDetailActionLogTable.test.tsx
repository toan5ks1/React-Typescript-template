import { formatDate } from "src/common/utils/time";
import { KeyOrderActionStatus } from "src/squads/payment/constants/const";
import { createMockOrderActionLog } from "src/squads/payment/test-utils/mocks/order-action-log";
import { createMockPaginationWithTotalObject } from "src/squads/payment/test-utils/pagination";

import TranslationProvider from "src/providers/TranslationProvider";
import OrderDetailActionLogTable, {
    OrderDetailActionLogTableProps,
} from "src/squads/payment/domains/OrderManagement/components/Tables/OrderDetailActionLogTable";

import { render, RenderResult, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TestApp from "src/squads/payment/test-utils/TestApp";

const mockOrderActionLog = createMockOrderActionLog();
const mockPagination = createMockPaginationWithTotalObject(5);

const numberOfColumns = 5;
const numberOfMockData = mockOrderActionLog.length;
const defaultNumberOfRowsPerPage = "5";

const defaultOrderDetailActionLogTableProps: OrderDetailActionLogTableProps = {
    dataSource: mockOrderActionLog,
    loading: false,
    pagination: mockPagination,
};

const renderOrderDetailActionLogTable = (
    orderDetailActionLogTableProps: OrderDetailActionLogTableProps = defaultOrderDetailActionLogTableProps
) => {
    return render(
        <TranslationProvider>
            <TestApp>
                <OrderDetailActionLogTable {...orderDetailActionLogTableProps} />
            </TestApp>
        </TranslationProvider>
    );
};

const orderActionStatus = {
    [KeyOrderActionStatus.ORDER_ACTION_SUBMITTED]: "Submitted",
    [KeyOrderActionStatus.ORDER_ACTION_VOIDED]: "Voided",
};

describe("<OrderDetailActionLogTable />", () => {
    it("should render header table action log with User Name, Action, Comment, Updated Time ", () => {
        const wrapper: RenderResult = renderOrderDetailActionLogTable();

        expect(wrapper.getByTestId("OrderDetailActionLogTable__root")).toBeInTheDocument();

        const columns = wrapper.getByTestId("TableBase__header").getElementsByTagName("th");
        expect(columns).toHaveLength(numberOfColumns);

        expect(wrapper.getAllByTestId("TableBase__row")).toHaveLength(numberOfMockData);

        expect(wrapper.getByText("User Name")).toBeInTheDocument();
        expect(wrapper.getByText("Action")).toBeInTheDocument();
        expect(wrapper.getByText("Comment")).toBeInTheDocument();
        expect(wrapper.getByText("Updated Time")).toBeInTheDocument();
    });

    it("should render action log item of table UI include username, action, button view comment, updatedTime, default number of rows per page", () => {
        const wrapper: RenderResult = renderOrderDetailActionLogTable();

        const footer = wrapper.getByTestId("TableBaseFooter");
        expect(footer.querySelector("input")).toHaveValue(defaultNumberOfRowsPerPage);

        const actionLogRowList = wrapper.getAllByTestId("TableBase__row");

        expect(actionLogRowList.length).toBeGreaterThan(0);
        expect(actionLogRowList).toHaveLength(mockOrderActionLog.length);

        actionLogRowList.forEach((actionLogRow, index) => {
            expect(
                within(actionLogRow).getByTestId("OrderDetailActionLogTable__username")
            ).toHaveTextContent(mockOrderActionLog[index].users?.name!);
            expect(
                within(actionLogRow).getByTestId("OrderDetailActionLogTable__action")
            ).toHaveTextContent(orderActionStatus[mockOrderActionLog[index].actionLogs.action!]);
            expect(
                within(actionLogRow).getByTestId("OrderDetailActionLogTable__viewCommentButton")
            ).toHaveAttribute("type", "button");
            expect(
                within(actionLogRow).getByTestId("OrderDetailActionLogTable__viewCommentButton")
            ).not.toHaveAttribute("disabled");
            expect(
                within(actionLogRow).getByTestId("OrderDetailActionLogTable__updatedTime")
            ).toHaveTextContent(
                formatDate(mockOrderActionLog[index].actionLogs.created_at, "yyyy/LL/dd, HH:mm")
            );
        });
    });

    it("should render no data message when there is no data", () => {
        const wrapper: RenderResult = renderOrderDetailActionLogTable({
            ...defaultOrderDetailActionLogTableProps,
            dataSource: [],
        });

        const table = wrapper.getByTestId("OrderDetailActionLogTable__root");

        expect(table).toBeInTheDocument();
        expect(within(table).getByText("No Information")).toBeInTheDocument();
    });

    it("should disable view comment button if there is no text comment", () => {
        const mockOrderActionLogWithoutComment = mockOrderActionLog.map(
            ({ actionLogs, users }) => ({
                actionLogs: { ...actionLogs, comment: undefined },
                users,
            })
        );
        const wrapper: RenderResult = renderOrderDetailActionLogTable({
            ...defaultOrderDetailActionLogTableProps,
            dataSource: mockOrderActionLogWithoutComment,
        });

        const commentColumns = wrapper.getAllByTestId(
            "OrderDetailActionLogTable__viewCommentButton"
        );
        commentColumns.forEach((comment) => {
            expect(comment).toHaveAttribute("type", "button");
            expect(comment).toHaveAttribute("disabled");
        });
    });

    it("should open dialog when click view comment button if there is had text comment ", () => {
        const wrapper: RenderResult = renderOrderDetailActionLogTable();

        const commentColumns = wrapper.getAllByTestId(
            "OrderDetailActionLogTable__viewCommentButton"
        )[0];
        userEvent.click(commentColumns);

        expect(wrapper.getByTestId("OrderDetailCommentDialog__dialog")).toBeInTheDocument();
        expect(wrapper.getByTestId("DialogWithHeaderFooter__dialogContent")).toBeInTheDocument();
        expect(wrapper.getByTestId("OrderDetailCommentDialog__comment")).toHaveTextContent(
            mockOrderActionLog[0].actionLogs.comment!
        );
    });

    it("should render skeleton when loading", () => {
        const wrapper: RenderResult = renderOrderDetailActionLogTable({
            dataSource: mockOrderActionLog,
            loading: true,
            pagination: mockPagination,
        });
        expect(wrapper.getAllByTestId("TableSke__item").length).toBeGreaterThan(0);
    });
});
