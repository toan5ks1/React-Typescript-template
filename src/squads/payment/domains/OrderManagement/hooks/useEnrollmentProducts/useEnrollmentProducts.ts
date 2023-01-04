import { useEffect } from "react";

import { arrayHasItem } from "src/common/utils/other";
import { groupProductsInfo } from "src/squads/payment/helpers/product";
import {
    Payment_GetProductIdsByGradeIdsQueryVariables,
    Payment_GetProductIdsByLocationIdsQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";
import { ProductTaxesType } from "src/squads/payment/types/service/tax-types";
import { isNotUndefinedOrNull } from "src/squads/payment/utils/types";

import useEnrollmentProductIds from "src/squads/payment/domains/OrderManagement/hooks/useEnrollmentProductIds";
import useProductFees from "src/squads/payment/domains/OrderManagement/hooks/useProductFees";
import useProductIdsByGradeAndLocation from "src/squads/payment/domains/OrderManagement/hooks/useProductIdsByGradeAndLocation";
import useProductMaterials from "src/squads/payment/domains/OrderManagement/hooks/useProductMaterials";
import useProductPackages from "src/squads/payment/domains/OrderManagement/hooks/useProductPackages";
import useProductPrices from "src/squads/payment/domains/OrderManagement/hooks/useProductPrices";
import useProducts from "src/squads/payment/domains/OrderManagement/hooks/useProducts";
import useTaxes from "src/squads/payment/domains/OrderManagement/hooks/useTaxes";

export interface UseEnrollmentProductsReturn {
    data: ProductsFormValues[];
    isFetching: boolean;
}

export interface UseEnrollmentProductsProps {
    gradeIds: Payment_GetProductIdsByGradeIdsQueryVariables["grade_ids"];
    locationIds: Payment_GetProductIdsByLocationIdsQueryVariables["location_ids"];
    onFinishFetchingData?: (enrollmentProducts: ProductsFormValues[]) => void;
}

function useEnrollmentProducts({
    gradeIds,
    locationIds,
    onFinishFetchingData,
}: UseEnrollmentProductsProps): UseEnrollmentProductsReturn {
    const { productIds, isFetching: isProductIdsFetching } = useProductIdsByGradeAndLocation({
        locationIds,
        gradeIds,
    });

    const { data: enrollmentProductIds, isFetching: isEnrollmentProductIdsFetching } =
        useEnrollmentProductIds({ productIds: productIds, enabled: !isProductIdsFetching });

    const isProductDetailsFetchingEnabled =
        arrayHasItem(enrollmentProductIds) &&
        !isEnrollmentProductIdsFetching &&
        !isProductIdsFetching;

    const {
        data: products,
        isFetched: isProductsFetched,
        isFetching: isProductsFetching,
    } = useProducts({
        productIds: enrollmentProductIds,
        options: { enabled: isProductDetailsFetchingEnabled },
    });

    const { data: productFees, isFetching: isProductFeesFetching } = useProductFees({
        productIds: enrollmentProductIds,
        enabled: isProductDetailsFetchingEnabled,
    });

    const { data: productMaterials, isFetching: isProductMaterialsFetching } = useProductMaterials({
        productIds: enrollmentProductIds,
        enabled: isProductDetailsFetchingEnabled,
    });

    const { data: productPackages, isFetching: isProductPackagesFetching } = useProductPackages({
        productIds,
        enabled: Boolean(enrollmentProductIds) && arrayHasItem(enrollmentProductIds),
    });

    const { data: productPrices, isFetching: isProductPricesFetching } = useProductPrices({
        productIds,
        enabled: isProductDetailsFetchingEnabled,
    });

    const taxIds = [
        ...new Set(
            products
                ?.map<ProductTaxesType["tax_id"] | undefined | null>((product) => product.tax_id)
                .filter<ProductTaxesType["tax_id"]>(isNotUndefinedOrNull)
        ),
    ];

    const { data: productTaxes, isFetching: isProductTaxesFetching } = useTaxes({
        taxIds,
        enabled: isProductsFetched && arrayHasItem(taxIds),
    });

    const enrollmentProducts = arrayHasItem(enrollmentProductIds)
        ? groupProductsInfo({
              products,
              productPricesList: productPrices,
              productTaxes,
              materials: productMaterials,
              fees: productFees,
              packages: productPackages,
          })
        : [];

    const isFetching =
        isEnrollmentProductIdsFetching ||
        isProductIdsFetching ||
        isProductsFetching ||
        isProductFeesFetching ||
        isProductMaterialsFetching ||
        isProductPricesFetching ||
        isProductTaxesFetching ||
        isProductPackagesFetching;

    useEffect(() => {
        if (isFetching) return;
        onFinishFetchingData?.(enrollmentProducts || []);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isFetching]);

    return {
        data: enrollmentProducts,
        isFetching,
    };
}

export default useEnrollmentProducts;
