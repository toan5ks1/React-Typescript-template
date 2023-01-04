import { useMemo } from "react";

import { Entities, ERPModules } from "src/common/constants/enum";
import { getEnumString } from "src/common/constants/helper";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { MicroFrontendTypes } from "src/routing/type";
import { KeyOrderTypes } from "src/squads/payment/constants/const";
import { getOrderSequenceNumberPrefix } from "src/squads/payment/helpers/order-details";

import StyledLink from "src/components/StyledLink";
import { TableBase, TableColumn } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ChipOrderStatus from "src/squads/payment/components/ChipOrderStatus";

import { OrderType } from "manabuf/payment/v1/enums_pb";
import { RetrieveListOfOrdersResponse } from "manabuf/payment/v1/order_pb";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

const useColumns = () => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const columns: TableColumn<RetrieveListOfOrdersResponse.Order.AsObject>[] = useMemo(
        () => [
            {
                key: "orderNumber",
                title: `${tOrder("column.orderNumber")}.`,
                render: ({ orderSequenceNumber, orderId }) => {
                    return (
                        <StyledLink
                            to={`/${MicroFrontendTypes.PAYMENT}/${Entities.ORDERS}/${orderId}/show`}
                        >
                            <TypographyBase
                                variant="body2"
                                data-testid="OrderManagementTable__orderNumber"
                            >
                                {getOrderSequenceNumberPrefix(orderSequenceNumber)}
                            </TypographyBase>
                        </StyledLink>
                    );
                },
                cellProps: {
                    style: {
                        width: "11%",
                    },
                },
            },
            {
                key: "studentName",
                title: tOrder("column.studentName"),
                render: ({ studentId, studentName }) => {
                    return (
                        <StyledLink
                            to={`/${MicroFrontendTypes.USER}/${ERPModules.STUDENTS}/${studentId}/show`}
                        >
                            <TypographyBase
                                variant="body2"
                                data-testid="OrderManagementTable__studentName"
                            >
                                {studentName}
                            </TypographyBase>
                        </StyledLink>
                    );
                },
                cellProps: {
                    style: {
                        width: "17%",
                    },
                },
            },
            {
                key: "orderStatus",
                title: tOrder("column.orderStatus"),
                render: ({ orderStatus }) => {
                    return (
                        <ChipOrderStatus
                            data-testid="OrderManagementTable__orderStatus"
                            status={orderStatus}
                        />
                    );
                },
                cellProps: {
                    style: {
                        width: "12%",
                    },
                },
            },
            {
                key: "orderType",
                title: tOrder("column.orderType"),
                render: ({ orderType }) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="OrderManagementTable__orderType"
                        >
                            {tOrder(
                                `choices.orderType.${
                                    KeyOrderTypes[getEnumString(OrderType, orderType)]
                                }`
                            )}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        width: "12%",
                    },
                },
            },
            {
                key: "productDetails",
                title: tOrder("column.productDetails"),
                render: ({ productDetails }) => {
                    return (
                        <TypographyBase variant="body2" data-testid="OrderManagementTable__product">
                            {productDetails}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        width: "32%",
                    },
                },
            },
            {
                key: "createdDate",
                title: tOrder("column.createdDate"),
                render: ({ createDate }) => {
                    const createdDate = formatDate(
                        convertTimestampToDate(createDate),
                        "yyyy/LL/dd"
                    );
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="OrderManagementTable__createdDate"
                        >
                            {createdDate}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        width: "11%",
                    },
                },
            },
        ],
        [tOrder]
    );

    return columns;
};

export interface OrderManagementTableProps {
    dataSource: RetrieveListOfOrdersResponse.Order.AsObject[] | undefined;
    loading: boolean;
    pagination: PaginationWithTotal;
}

export const OrderManagementTable = ({
    dataSource,
    loading,
    pagination,
}: OrderManagementTableProps) => {
    const columns = useColumns();

    return (
        <TableBase
            tableProps={{
                "data-testid": "OrderManagementTable__root",
            }}
            data={dataSource ?? []}
            columns={columns}
            withIndex
            body={{
                loading,
                rowKey: "id",
                pagination,
            }}
            footer={{ pagination }}
        />
    );
};

export default OrderManagementTable;
