import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { convertString, getEnumString } from "src/common/constants/helper";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import {
    KeyProductFeeTypes,
    KeyProductMaterialTypes,
    KeyProductPackageTypes,
} from "src/squads/payment/constants/const";
import { getBillItemNameByBillingType } from "src/squads/payment/helpers/bill-items";
import { getBillingItemNumberPrefix } from "src/squads/payment/helpers/order-details";
import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { getProductAndProductExtensionByType } from "src/squads/payment/helpers/product-type";

import { TableBase, TableColumn } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ChipBillingStatus from "src/squads/payment/components/ChipBillingStatus";

import {
    BillingStatus,
    BillingType,
    FeeType,
    MaterialType,
    PackageType,
    ProductType,
} from "manabuf/payment/v1/enums_pb";
import { RetrieveListOfBillItemsResponse } from "manabuf/payment/v1/order_pb";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import { useStudentBillingPluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/student-billing";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

const useColumns = () => {
    const tOrder = useResourceTranslate(Entities.ORDERS);
    const { currentCurrency } = getCurrentCurrency();

    const { getProductPluginsMap } = useStudentBillingPluginsContext();

    const columns: TableColumn<RetrieveListOfBillItemsResponse.BillItems.AsObject>[] = useMemo(
        () => [
            {
                key: "location",
                title: tOrder("column.location"),
                render: ({ locationInfo }) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="StudentBillingBillingItemsTable__location"
                        >
                            {convertString(locationInfo?.locationName)}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        width: "10%",
                        verticalAlign: "top",
                    },
                },
            },
            {
                key: "billingNumber",
                title: `${tOrder("column.billingNumber")}.`,
                render: ({ billingNo }) => {
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="StudentBillingBillingItemsTable__billingNumber"
                        >
                            {getBillingItemNumberPrefix(billingNo)}
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
                key: "billingItem",
                title: tOrder("column.billingItem"),
                render: ({ billItemDescription, billingType }) => {
                    const productAndProductExtensionType = getProductAndProductExtensionByType({
                        productType: getEnumString(ProductType, billItemDescription?.productType),
                        materialType:
                            KeyProductMaterialTypes[
                                getEnumString(MaterialType, billItemDescription?.materialType)
                            ],
                        feeType:
                            KeyProductFeeTypes[
                                getEnumString(FeeType, billItemDescription?.feeType)
                            ],
                        packageType:
                            KeyProductPackageTypes[
                                getEnumString(PackageType, billItemDescription?.packageType)
                            ],
                    });

                    const { BillItemDescriptionBillingItemsCell } = getProductPluginsMap(
                        productAndProductExtensionType
                    );

                    const formattedProductName = getBillItemNameByBillingType({
                        productName: convertString(billItemDescription?.productName),
                        billingType,
                        tOrder,
                    });

                    return (
                        <BillItemDescriptionBillingItemsCell
                            productName={formattedProductName}
                            courseItemsList={billItemDescription?.courseItemsList}
                            billingPeriodName={billItemDescription?.billingPeriodName}
                            billingRatioNumerator={billItemDescription?.billingRatioNumerator}
                            billingRatioDenominator={billItemDescription?.billingRatioDenominator}
                        />
                    );
                },
                cellProps: {
                    style: {
                        width: "41%",
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
                            data-testid="StudentBillingBillingItemsTable__status"
                            status={getEnumString(BillingStatus, billingStatus)}
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
                            data-testid="StudentBillingBillingItemsTable__billingDate"
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
                render: ({ amount, billingType, adjustmentPrice }) => {
                    const finalAmount =
                        billingType === BillingType.BILLING_TYPE_ADJUSTMENT_BILLING
                            ? adjustmentPrice.value
                            : amount;
                    return (
                        <TypographyBase
                            variant="body2"
                            data-testid="StudentBillingBillingItemsTable__amount"
                        >
                            {getFormattedItemPrice(currentCurrency, false, finalAmount)}
                        </TypographyBase>
                    );
                },
                cellProps: {
                    style: {
                        width: "11%",
                        textAlign: "right",
                        verticalAlign: "top",
                    },
                },
            },
        ],
        [tOrder, currentCurrency, getProductPluginsMap]
    );

    return columns;
};

export interface StudentBillingBillingItemsTableProps {
    dataSource?: RetrieveListOfBillItemsResponse.BillItems.AsObject[];
    loading: boolean;
    pagination: PaginationWithTotal;
}

export const StudentBillingBillingItemsTable = ({
    dataSource,
    loading,
    pagination,
}: StudentBillingBillingItemsTableProps) => {
    const columns = useColumns();

    return (
        <TableBase
            tableProps={{
                "data-testid": "StudentBillingBillingItemsTable__root",
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

export default StudentBillingBillingItemsTable;
