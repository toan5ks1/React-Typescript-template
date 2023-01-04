import {
    OrderActionLogDataSourceType,
    OrderActionLogType,
} from "src/squads/payment/types/service/order-detail-types";

import { RecurringDetailsProps } from "src/squads/payment/domains/OrderManagement/plugins/order-details/components/types";

import { BillItemDescription } from "manabuf/payment/v1/order_pb";

export const getOrderSequenceNumberPrefix = (orderSequenceNumber: number) =>
    `OD-${orderSequenceNumber}`;

export const getBillingItemNumberPrefix = (billingItemNumber: number) => `BL-${billingItemNumber}`;

export const orderActionLogDataSource = ({
    mappedUseOrderActionLogListData,
    usersList,
}: OrderActionLogDataSourceType): OrderActionLogType[] => {
    if (mappedUseOrderActionLogListData?.data.orderActionLogListData) {
        const { orderActionLogListData } = mappedUseOrderActionLogListData.data;

        return orderActionLogListData.map(({ user_id: orderUserId, ...actionLogs }) => {
            const users = usersList?.find((user) => user.user_id === orderUserId);

            return {
                users,
                actionLogs,
            };
        });
    }
    return [];
};

export const getBillItemRecurringDetails = ({
    billingPeriodName,
    billingRatioNumerator,
    billingRatioDenominator,
}: Pick<
    BillItemDescription.AsObject,
    "billingPeriodName" | "billingRatioDenominator" | "billingRatioNumerator"
>): RecurringDetailsProps | undefined => {
    if (
        !billingPeriodName ||
        !billingRatioNumerator ||
        !billingRatioDenominator ||
        !billingPeriodName.value ||
        billingRatioNumerator.value === undefined ||
        billingRatioDenominator.value === undefined
    ) {
        return undefined;
    }

    const recurringDetails: RecurringDetailsProps = {
        billingPeriodName: billingPeriodName.value,
        billingRatioNumerator: billingRatioNumerator.value,
        billingRatioDenominator: billingRatioDenominator.value,
    };

    return recurringDetails;
};
