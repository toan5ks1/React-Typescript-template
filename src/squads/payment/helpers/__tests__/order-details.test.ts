import {
    getBillingItemNumberPrefix,
    getBillItemRecurringDetails,
    getOrderSequenceNumberPrefix,
    orderActionLogDataSource,
} from "src/squads/payment/helpers/order-details";
import {
    createMockMappedUseOrderActionLogListData,
    createMockOrderActionLog,
} from "src/squads/payment/test-utils/mocks/order-action-log";
import { createMockUsersList } from "src/squads/payment/test-utils/mocks/student";

import { BillItemDescription } from "manabuf/payment/v1/order_pb";

describe("getSequencePrefix", () => {
    it("should return prefix of order sequence number", () => {
        const orderSequenceNumber = 1;

        expect(getOrderSequenceNumberPrefix(orderSequenceNumber)).toEqual(
            `OD-${orderSequenceNumber}`
        );
    });
});

describe("getBillingItemNumberPrefix", () => {
    it("should return prefix of billing item number", () => {
        const billingItemNumber = 1;

        expect(getBillingItemNumberPrefix(billingItemNumber)).toEqual(`BL-${billingItemNumber}`);
    });
});

describe("orderActionLogDataSource", () => {
    const mockMappedUseOrderActionLogListData = createMockMappedUseOrderActionLogListData();
    const mockUsersList = createMockUsersList();
    const mockDataSource = createMockOrderActionLog();

    it("should mapped correct dataSource with data", () => {
        expect(
            orderActionLogDataSource({
                mappedUseOrderActionLogListData: mockMappedUseOrderActionLogListData,
                usersList: mockUsersList,
            })
        ).toEqual(mockDataSource);
    });

    it("should mapped correct dataSource without data", () => {
        expect(
            orderActionLogDataSource({
                mappedUseOrderActionLogListData: undefined,
                usersList: undefined,
            })
        ).toEqual([]);
    });
});

describe("getBillItemRecurringDetails", () => {
    const mockRecurringDetailFalsy: Pick<
        BillItemDescription.AsObject,
        "billingPeriodName" | "billingRatioDenominator" | "billingRatioNumerator"
    >[] = [
        {
            billingPeriodName: undefined,
            billingRatioNumerator: { value: 1 },
            billingRatioDenominator: { value: 4 },
        },
        {
            billingPeriodName: { value: "Period name" },
            billingRatioNumerator: undefined,
            billingRatioDenominator: { value: 4 },
        },
        {
            billingPeriodName: { value: "Period name" },
            billingRatioNumerator: { value: 1 },
            billingRatioDenominator: undefined,
        },
        {
            billingPeriodName: undefined,
            billingRatioNumerator: undefined,
            billingRatioDenominator: undefined,
        },
        {
            billingPeriodName: undefined,
            billingRatioNumerator: undefined,
            billingRatioDenominator: { value: 4 },
        },
        {
            billingPeriodName: undefined,
            billingRatioNumerator: { value: 1 },
            billingRatioDenominator: undefined,
        },
        {
            billingPeriodName: { value: "Period name" },
            billingRatioNumerator: undefined,
            billingRatioDenominator: undefined,
        },
        {
            billingPeriodName: { value: undefined },
            billingRatioNumerator: { value: 1 },
            billingRatioDenominator: { value: 4 },
        },
    ];

    it.each(mockRecurringDetailFalsy)(
        "Should return recurringDetails is undefined",
        (recurringDetailItem) => {
            expect(getBillItemRecurringDetails(recurringDetailItem)).toEqual(undefined);
        }
    );

    const mockRecurringDetailTruthy: Pick<
        BillItemDescription.AsObject,
        "billingPeriodName" | "billingRatioDenominator" | "billingRatioNumerator"
    >[] = [
        {
            billingPeriodName: { value: "Period name" },
            billingRatioNumerator: { value: 1 },
            billingRatioDenominator: { value: 4 },
        },
        {
            billingPeriodName: { value: "Period name" },
            billingRatioNumerator: { value: 0 },
            billingRatioDenominator: { value: 4 },
        },
        {
            billingPeriodName: { value: "Period name" },
            billingRatioNumerator: { value: 0 },
            billingRatioDenominator: { value: 0 },
        },
        {
            billingPeriodName: { value: "Period name" },
            billingRatioNumerator: { value: 4 },
            billingRatioDenominator: { value: 0 },
        },
    ];

    it.each(mockRecurringDetailTruthy)(
        "Should return recurringDetails object have value of billingPeriodName, billingRatioNumerator, billingRatioDenominator",
        (recurringDetailItem) => {
            expect(getBillItemRecurringDetails(recurringDetailItem)?.billingPeriodName).toEqual(
                recurringDetailItem.billingPeriodName.value
            );

            expect(getBillItemRecurringDetails(recurringDetailItem)?.billingRatioNumerator).toEqual(
                recurringDetailItem.billingRatioNumerator.value
            );

            expect(
                getBillItemRecurringDetails(recurringDetailItem)?.billingRatioDenominator
            ).toEqual(recurringDetailItem.billingRatioDenominator.value);
        }
    );
});
