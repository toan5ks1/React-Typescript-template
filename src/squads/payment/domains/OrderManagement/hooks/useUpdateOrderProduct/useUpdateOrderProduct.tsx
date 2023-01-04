import { useEffect } from "react";

import { arrayHasItem } from "src/common/utils/other";
import { groupProductsInfo } from "src/squads/payment/helpers/product";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";

import useBillItemsByStudentProductIds from "src/squads/payment/domains/OrderManagement/hooks/useBillItemsByStudentProductIds";
import useBillingSchedulePeriodsByBillingScheduleIds from "src/squads/payment/domains/OrderManagement/hooks/useBillingSchedulePeriodsByBillingScheduleIds";
import useDiscounts from "src/squads/payment/domains/OrderManagement/hooks/useDiscounts";
import useOrderItemsByStudentProductIds from "src/squads/payment/domains/OrderManagement/hooks/useOrderItemsByStudentProductIds";
import useProductMaterials from "src/squads/payment/domains/OrderManagement/hooks/useProductMaterials";
import useProductPrices from "src/squads/payment/domains/OrderManagement/hooks/useProductPrices";
import useProducts from "src/squads/payment/domains/OrderManagement/hooks/useProducts";
import useStudentProducts from "src/squads/payment/domains/OrderManagement/hooks/useStudentProducts";
import useTaxes from "src/squads/payment/domains/OrderManagement/hooks/useTaxes";
import {
    getUniqueDiscountIds,
    getUniqueBillItemProductIds,
    getUniqueBillingScheduleIds,
    mapUpdateOrderProductsByStudentProductIds,
    getUniqueTaxIds,
} from "src/squads/payment/domains/OrderManagement/hooks/useUpdateOrderProduct/helpers";

export interface useUpdateOrderProductProps {
    studentProductIds: string[];
    onFinishFetchingData?: (updateOrderProducts: ProductsFormValues[]) => void;
}

interface useUpdateOrderProductReturn {
    updateOrderProducts: ProductsFormValues[];
    isFetching: boolean;
}

const useUpdateOrderProduct = ({
    studentProductIds,
    onFinishFetchingData,
}: useUpdateOrderProductProps): useUpdateOrderProductReturn => {
    const { data: billItems, isFetching: isBillItemsFetching } = useBillItemsByStudentProductIds({
        studentProductIds,
        enabled: arrayHasItem(studentProductIds),
    });

    const {
        data: orderItems,
        isFetching: isOrderItemFetching,
        isFetched: isOrderItemsFetched,
    } = useOrderItemsByStudentProductIds({
        studentProductIds,
        enabled: arrayHasItem(studentProductIds),
    });

    const discountIds = getUniqueDiscountIds(orderItems);
    const billItemProductIds = getUniqueBillItemProductIds(billItems);
    const isProductDetailsFetchingEnabled = arrayHasItem(studentProductIds) && !isBillItemsFetching;

    const {
        data: products,
        isFetched: isProductsFetched,
        isFetching: isProductsFetching,
    } = useProducts({
        productIds: billItemProductIds,
        options: { enabled: isProductDetailsFetchingEnabled },
    });

    const { data: productMaterials, isFetching: isProductMaterialsFetching } = useProductMaterials({
        productIds: billItemProductIds,
        enabled: isProductDetailsFetchingEnabled,
    });

    //TODO add fetching for fees and packages

    const { data: productPrices, isFetching: isProductPricesFetching } = useProductPrices({
        productIds: billItemProductIds,
        enabled: isProductDetailsFetchingEnabled,
    });

    const taxIds = getUniqueTaxIds(products);
    const billingScheduleIds = getUniqueBillingScheduleIds(products);

    const { data: productTaxes, isFetching: isProductTaxesFetching } = useTaxes({
        taxIds,
        enabled: isProductsFetched && arrayHasItem(taxIds),
    });

    const { data: productDiscounts, isFetching: isProductDiscountsFetching } = useDiscounts({
        discountIds: discountIds,
        enabled: isOrderItemsFetched && arrayHasItem(discountIds),
    });

    const { data: billingSchedulePeriods, isFetching: isBillingSchedulePeriodsFetching } =
        useBillingSchedulePeriodsByBillingScheduleIds({
            billingScheduleIds,
            enabled: isProductsFetched && arrayHasItem(billingScheduleIds),
        });

    const { data: studentProducts, isFetching: isFetchingStudentProduct } = useStudentProducts({
        studentProductIds,
        enabled: arrayHasItem(studentProductIds),
    });

    const productsWithDetails = arrayHasItem(billItemProductIds)
        ? groupProductsInfo({
              products,
              productPricesList: productPrices,
              productTaxes,
              materials: productMaterials,
          })
        : [];

    const updateOrderProducts = mapUpdateOrderProductsByStudentProductIds({
        studentProductIds,
        billItems,
        orderItems,
        productDiscounts,
        productsWithDetails,
        billingSchedulePeriods,
        studentProducts,
    });

    const isFetching =
        isBillItemsFetching ||
        isOrderItemFetching ||
        isProductsFetching ||
        isProductMaterialsFetching ||
        isProductPricesFetching ||
        isProductTaxesFetching ||
        isFetchingStudentProduct ||
        isBillingSchedulePeriodsFetching ||
        isProductDiscountsFetching;

    useEffect(() => {
        if (isFetching) return;
        onFinishFetchingData?.(updateOrderProducts || []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching]);

    return {
        updateOrderProducts,
        isFetching,
    };
};

export default useUpdateOrderProduct;
