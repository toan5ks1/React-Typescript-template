import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { convertString, getEnumString } from "src/common/constants/helper";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import {
    KeyBillingStatus,
    KeyProductFeeTypes,
    KeyProductMaterialTypes,
    KeyProductPackageTypes,
} from "src/squads/payment/constants/const";
import { getBillItemNameByBillingType } from "src/squads/payment/helpers/bill-items";
import {
    getBillingItemNumberPrefix,
    getBillItemRecurringDetails,
} from "src/squads/payment/helpers/order-details";
import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { getProductAndProductExtensionByType } from "src/squads/payment/helpers/product-type";

import { TableBase, TableColumn } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ChipBillingStatus from "src/squads/payment/components/ChipBillingStatus";

import {
    BillingStatus,
    FeeType,
    MaterialType,
    PackageType,
    ProductType,
} from "manabuf/payment/v1/enums_pb";
import { RetrieveBillingOfOrderDetailsResponse } from "manabuf/payment/v1/order_pb";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import { useProductTypePluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/order-details/OrderDetailsPluginsProvider";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

const useColumns = () => {
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const { currentCurrency } = getCurrentCurrency();
    const { getProductPluginsMap } = useProductTypePluginsContext();

    const columns: TableColumn<RetrieveBillingOfOrderDetailsResponse.OrderDetails.AsObject>[] =
        useMemo(
            () => [
                {
                    key: "billingNumber",
                    title: `${tOrder("column.billingNumber")}.`,
                    render: ({ billItemSequenceNumber }) => {
                        return (
                            <TypographyBase
                                variant="body2"
                                data-testid="OrderDetailBillingItemTable__billingNumber"
                            >
                                {getBillingItemNumberPrefix(billItemSequenceNumber)}
                            </TypographyBase>
                        );
                    },
                    cellProps: {
                        style: {
                            width: "9%",
                            verticalAlign: "top",
                        },
                    },
                },
                {
                    key: "content",
                    title: tOrder("column.content"),
                    render: ({ billItemDescription, billingType }) => {
                        if (!billItemDescription)
                            return (
                                <TypographyBase
                                    variant="body2"
                                    data-testid="BillingItemCell__noData"
                                ></TypographyBase>
                            );
                        const {
                            productType,
                            materialType,
                            feeType,
                            packageType,
                            productName,
                            courseItemsList,
                            billingPeriodName,
                            billingRatioDenominator,
                            billingRatioNumerator,
                        } = billItemDescription;

                        if (productType === ProductType["PRODUCT_TYPE_NONE"]) {
                            return (
                                <TypographyBase variant="body2">
                                    {convertString(productName)}
                                </TypographyBase>
                            );
                        }

                        const productAndProductExtensionType = getProductAndProductExtensionByType({
                            productType: getEnumString(ProductType, productType),
                            materialType:
                                KeyProductMaterialTypes[getEnumString(MaterialType, materialType)],
                            feeType: KeyProductFeeTypes[getEnumString(FeeType, feeType)],
                            packageType:
                                KeyProductPackageTypes[getEnumString(PackageType, packageType)],
                        });

                        const { BillingItemsCell } = getProductPluginsMap(
                            productAndProductExtensionType
                        );

                        const recurringDetails = getBillItemRecurringDetails({
                            billingPeriodName,
                            billingRatioNumerator,
                            billingRatioDenominator,
                        });

                        const formattedProductName = getBillItemNameByBillingType({
                            productName,
                            billingType,
                            tOrder,
                        });

                        return (
                            <BillingItemsCell
                                productName={formattedProductName}
                                courseItemsList={courseItemsList}
                                recurringDetails={recurringDetails}
                            />
                        );
                    },
                    cellProps: {
                        style: {
                            width: "38%",
                            verticalAlign: "top",
                        },
                    },
                },
                {
                    key: "status",
                    title: tOrder("column.status"),
                    render: ({ billingStatus }) => {
                        return (
                            <ChipBillingStatus
                                data-testid="OrderDetailBillingItemTable__status"
                                status={
                                    KeyBillingStatus[getEnumString(BillingStatus, billingStatus)]
                                }
                            />
                        );
                    },
                    cellProps: {
                        style: {
                            width: "13%",
                            verticalAlign: "top",
                        },
                    },
                },
                {
                    key: "billingDate",
                    title: tOrder("column.billingDate"),
                    render: ({ billingDate }) => {
                        return (
                            <TypographyBase
                                variant="body2"
                                data-testid="OrderDetailBillingItemTable__billingDate"
                            >
                                {formatDate(convertTimestampToDate(billingDate), "yyyy/LL/dd")}
                            </TypographyBase>
                        );
                    },
                    cellProps: {
                        style: {
                            width: "11%",
                            verticalAlign: "top",
                        },
                    },
                },
                {
                    key: "amount",
                    title: tOrder("column.amount"),
                    render: ({ amount }) => {
                        return (
                            <TypographyBase
                                variant="body2"
                                data-testid="OrderDetailBillingItemTable__amount"
                            >
                                {getFormattedItemPrice(currentCurrency, false, amount)}
                            </TypographyBase>
                        );
                    },
                    cellProps: {
                        style: {
                            width: "24%",
                            textAlign: "right",
                            verticalAlign: "top",
                        },
                    },
                },
            ],
            [currentCurrency, getProductPluginsMap, tOrder]
        );

    return columns;
};

export interface OrderDetailBillingItemTableProps {
    dataSource: RetrieveBillingOfOrderDetailsResponse.OrderDetails.AsObject[];
    loading: boolean;
    pagination: PaginationWithTotal;
}

export const OrderDetailBillingItemTable = ({
    dataSource,
    loading,
    pagination,
}: OrderDetailBillingItemTableProps) => {
    const columns = useColumns();

    return (
        <TableBase
            tableProps={{
                "data-testid": "OrderDetailBillingItemTable__root",
            }}
            data={dataSource}
            columns={columns}
            withIndex={{ width: "5%" }}
            styleIndexCol={{ verticalAlign: "top" }}
            body={{
                loading,
                rowKey: "billingNumber",
                pagination,
            }}
            footer={{ pagination }}
        />
    );
};

export default OrderDetailBillingItemTable;
