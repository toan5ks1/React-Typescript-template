import { useMemo } from "react";

import { Entities } from "src/common/constants/enum";
import { getEnumString } from "src/common/constants/helper";
import {
    KeyProductFeeTypes,
    KeyProductMaterialTypes,
    KeyProductPackageTypes,
} from "src/squads/payment/constants/const";
import { getCurrentCurrency, getFormattedItemPrice } from "src/squads/payment/helpers/price";
import { getProductAndProductExtensionByType } from "src/squads/payment/helpers/product-type";

import { TableBase, TableColumn } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";

import { FeeType, MaterialType, PackageType, ProductType } from "manabuf/payment/v1/enums_pb";
import { RetrieveListOfOrderDetailProductsResponse } from "manabuf/payment/v1/order_pb";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import { useProductTypePluginsContext } from "src/squads/payment/domains/OrderManagement/plugins/order-details/OrderDetailsPluginsProvider";
import useResourceTranslate from "src/squads/payment/hooks/useResourceTranslate";

export interface OrderDetailProductListTableProps {
    dataSource: RetrieveListOfOrderDetailProductsResponse.OrderProduct.AsObject[];
    loading: boolean;
    pagination: PaginationWithTotal;
}

const useColumns =
    (): TableColumn<RetrieveListOfOrderDetailProductsResponse.OrderProduct.AsObject>[] => {
        const tOrder = useResourceTranslate(Entities.ORDERS);
        const { currentCurrency } = getCurrentCurrency();
        const { getProductPluginsMap } = useProductTypePluginsContext();

        const columns =
            useMemo((): TableColumn<RetrieveListOfOrderDetailProductsResponse.OrderProduct.AsObject>[] => {
                return [
                    {
                        key: "productsName",
                        title: tOrder("column.name"),
                        cellProps: { style: { width: "80%", verticalAlign: "top" } },
                        render: ({
                            productName,
                            productType,
                            materialType,
                            feeType,
                            packageType,
                            discountInfo,
                            courseItemsList,
                            startDate,
                        }) => {
                            const productAndProductExtensionType =
                                getProductAndProductExtensionByType({
                                    productType: getEnumString(ProductType, productType),
                                    materialType:
                                        KeyProductMaterialTypes[
                                            getEnumString(MaterialType, materialType)
                                        ],
                                    feeType: KeyProductFeeTypes[getEnumString(FeeType, feeType)],
                                    packageType:
                                        KeyProductPackageTypes[
                                            getEnumString(PackageType, packageType)
                                        ],
                                });

                            const { ProductsListItemCell } = getProductPluginsMap(
                                productAndProductExtensionType
                            );

                            return (
                                <ProductsListItemCell
                                    productName={productName}
                                    discountName={discountInfo?.discountName}
                                    courseItemsList={courseItemsList}
                                    startDate={startDate}
                                />
                            );
                        },
                    },
                    {
                        key: "amount",
                        title: tOrder("column.amount"),
                        cellProps: {
                            style: { width: "15%", textAlign: "right", verticalAlign: "top" },
                        },
                        render: ({ amount }) => {
                            return (
                                <TypographyBase data-testid="OrderDetailProductListTable__amount">
                                    {getFormattedItemPrice(currentCurrency, false, amount)}
                                </TypographyBase>
                            );
                        },
                    },
                ];
            }, [currentCurrency, tOrder, getProductPluginsMap]);

        return columns;
    };

const OrderDetailProductListTable = ({
    loading,
    dataSource,
    pagination,
}: OrderDetailProductListTableProps) => {
    const columns = useColumns();

    return (
        <TableBase
            tableProps={{
                "data-testid": "OrderDetailProductListTable__root",
            }}
            columns={columns}
            data={dataSource}
            withIndex={{ width: "5%" }}
            styleIndexCol={{ verticalAlign: "top" }}
            body={{
                loading,
                rowKey: "productId",
                pagination,
                skeCount: 5,
            }}
            footer={{
                pagination,
            }}
        />
    );
};

export default OrderDetailProductListTable;
