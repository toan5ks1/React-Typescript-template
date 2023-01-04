import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { convertString, getEnumString } from "src/common/constants/helper";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import { MicroFrontendTypes } from "src/routing/type";
import { getOrderSequenceNumberPrefix } from "src/squads/payment/helpers/order-details";

import StyledLink from "src/components/StyledLink";
import { TableBase, TableColumn } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ChipOrderStatus from "src/squads/payment/components/ChipOrderStatus";

import { OrderType } from "manabuf/payment/v1/enums_pb";
import { ProductInfo, RetrieveListOfOrderItemsResponse } from "manabuf/payment/v1/order_pb";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export const getProductDetailsOrderList = (productDetailList: ProductInfo.AsObject[]): string => {
    const productNames = productDetailList.map((product) => product.productName);

    if (productNames.length <= 1) return productNames.toString();
    return productNames.join(", ");
};

const useColumns = () => {
    const tOrder = useResourceTranslate(Entities.ORDERS);

    const columns: TableColumn<RetrieveListOfOrderItemsResponse.OrderItems.AsObject>[] = useMemo(
        () => [
            {
                key: "location",
                title: tOrder("column.location"),
                render: ({ locationInfo }) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="StudentBillingOrdersTable__location"
                        >
                            {convertString(locationInfo?.locationName)}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        width: "11%",
                    },
                },
            },
            {
                key: "orderNumber",
                title: `${tOrder("column.orderNumber")}.`,
                render: ({ orderId, orderNo }) => {
                    return (
                        <StyledLink
                            to={`/${MicroFrontendTypes.PAYMENT}/${Entities.ORDERS}/${orderId}/show`}
                        >
                            <TypographyBase
                                variant="body2"
                                data-testid="StudentBillingOrdersTable__orderNumber"
                            >
                                {getOrderSequenceNumberPrefix(orderNo)}
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
                key: "orderType",
                title: tOrder("column.orderType"),
                render: ({ orderType }) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="StudentBillingOrdersTable__orderType"
                        >
                            {convertString(
                                tOrder(`choices.orderType.${getEnumString(OrderType, orderType)}`)
                            )}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        width: "11%",
                    },
                },
            },
            {
                key: "status",
                title: tOrder("column.status"),
                render: ({ orderStatus }) => {
                    return (
                        <ChipOrderStatus
                            data-testid="StudentBillingOrdersTable__status"
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
                key: "productDetails",
                title: tOrder("column.productDetails"),
                render: ({ productDetailsList }) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="StudentBillingOrdersTable__productDetails"
                        >
                            {getProductDetailsOrderList(productDetailsList)}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        width: "40%",
                    },
                },
            },
            {
                key: "createdDate",
                title: tOrder("column.createdDate"),
                render: ({ createDate }) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="StudentBillingOrdersTable__createdDate"
                        >
                            {formatDate(convertTimestampToDate(createDate), "yyyy/LL/dd")}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        width: "10%",
                    },
                },
            },
        ],
        [tOrder]
    );

    return columns;
};

export interface StudentBillingOrdersTableProps {
    dataSource?: RetrieveListOfOrderItemsResponse.OrderItems.AsObject[];
    loading: boolean;
    pagination: PaginationWithTotal;
}

export const StudentBillingOrdersTable = ({
    dataSource,
    loading,
    pagination,
}: StudentBillingOrdersTableProps) => {
    const columns = useColumns();

    return (
        <TableBase
            tableProps={{
                "data-testid": "StudentBillingOrdersTable__root",
            }}
            data={dataSource ?? []}
            columns={columns}
            withIndex={{ width: "5%" }}
            styleIndexCol={{ verticalAlign: "top" }}
            body={{
                loading,
                rowKey: "index",
                pagination,
            }}
            footer={{ pagination }}
        />
    );
};

export default StudentBillingOrdersTable;
