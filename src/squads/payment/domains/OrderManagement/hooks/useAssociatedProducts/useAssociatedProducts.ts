import { useMemo } from "react";

import { arrayHasItem } from "src/common/utils/other";
import {
    Payment_GetManyFeesByProductIdsQuery,
    Payment_GetManyMaterialsByProductIdsV2Query,
    Payment_GetManyProductPricesByProductIdsQuery,
    Payment_GetManyProductsByProductIdsQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import {
    PackageCourseMaterial,
    PackageCourseFee,
} from "src/squads/payment/types/service/package-course-types";
import { ProductTypeQuery } from "src/squads/payment/types/service/product-types";
import { ProductTaxesType } from "src/squads/payment/types/service/tax-types";

import useProductFees from "src/squads/payment/domains/OrderManagement/hooks/useProductFees";
import useProductMaterials from "src/squads/payment/domains/OrderManagement/hooks/useProductMaterials";
import useProductPrices from "src/squads/payment/domains/OrderManagement/hooks/useProductPrices";
import useProducts from "src/squads/payment/domains/OrderManagement/hooks/useProducts";
import useTaxes from "src/squads/payment/domains/OrderManagement/hooks/useTaxes";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseAssociatedProductsProps {
    productId: ProductTypeQuery["product_id"] | undefined;
    onProductCourseMaterialSuccess?: (data: PackageCourseMaterial[] | undefined) => void;
    onProductCourseFeeSuccess?: (data: PackageCourseFee[] | undefined) => void;
}

export interface UseAssociatedProductsReturn {
    packageCourseMaterials: PackageCourseMaterial[] | undefined;
    packageCourseFees: PackageCourseFee[] | undefined;
    productDetails: Payment_GetManyProductsByProductIdsQuery["product"] | undefined;
    productFees: Payment_GetManyFeesByProductIdsQuery["fee"] | undefined;
    productMaterials: Payment_GetManyMaterialsByProductIdsV2Query["material"] | undefined;
    productPrices: Payment_GetManyProductPricesByProductIdsQuery["product_price"] | undefined;
    productTaxes: ProductTaxesType[] | undefined;
    isFetchedAll: boolean;
}

const useAssociatedProducts = ({
    productId,
    onProductCourseMaterialSuccess,
    onProductCourseFeeSuccess,
}: UseAssociatedProductsProps): UseAssociatedProductsReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const currentDate = useMemo(() => new Date().toISOString(), []);

    const { data: packageCourseMaterials, isFetched: isPackageCourseMaterialsFetched } = inferQuery(
        {
            entity: "packageCourseMaterial",
            action: "paymentGetManyPackageCourseMaterialByPackageId",
        }
    )(
        { package_id: productId, current_date: currentDate },
        {
            enabled: Boolean(productId),
            onSuccess: (data) => {
                onProductCourseMaterialSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useAssociatedProducts in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} packageCourseMaterial - paymentGetManyPackageCourseMaterialByPackageId`,
                    "error"
                );
            },
        }
    );

    const { data: packageCourseFees, isFetched: isPackageCourseFeesFetched } = inferQuery({
        entity: "packageCourseFee",
        action: "paymentGetManyPackageCourseFeesByPackageId",
    })(
        { package_id: productId, current_date: currentDate },
        {
            enabled: Boolean(productId),
            onSuccess: (data) => {
                onProductCourseFeeSuccess?.(data);
            },
            onError: (error) => {
                window.warner?.warn("useAssociatedProducts in Payment Order", error);

                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} packageCourseFee - paymentGetManyPackageCourseFeesByPackageId`,
                    "error"
                );
            },
        }
    );

    const materialProductIds: PackageCourseMaterial["package_id"][] | undefined =
        packageCourseMaterials?.map((packageCourseMaterials) => packageCourseMaterials.material_id);

    const feeProductIds: PackageCourseFee["package_id"][] | undefined = packageCourseFees?.map(
        (packageCourseFee) => packageCourseFee.fee_id
    );

    const productIds: PackageCourseFee["package_id"][] = [
        ...(materialProductIds ?? []),
        ...(feeProductIds ?? []),
    ];

    const { data: productDetails, isFetched: isProductDetailsFetched } = useProducts({
        productIds,
        options: {
            enabled:
                arrayHasItem(productIds) &&
                isPackageCourseMaterialsFetched &&
                isPackageCourseFeesFetched,
        },
    });

    const { data: productFees, isFetched: isProductFeesFetched } = useProductFees({
        productIds: feeProductIds,
        enabled: arrayHasItem(feeProductIds) && isPackageCourseFeesFetched,
    });

    const { data: productMaterials, isFetched: isProductMaterialsFetched } = useProductMaterials({
        productIds: materialProductIds,
        enabled: arrayHasItem(materialProductIds) && isPackageCourseMaterialsFetched,
    });

    const { data: productPrices, isFetched: isProductPricesFetched } = useProductPrices({
        productIds,
        enabled:
            arrayHasItem(productIds) &&
            isPackageCourseMaterialsFetched &&
            isPackageCourseFeesFetched,
    });

    const isTaxId = (
        taxId: ProductTaxesType["tax_id"] | undefined | null
    ): taxId is ProductTaxesType["tax_id"] => {
        return typeof taxId !== "undefined" && taxId !== null;
    };

    const taxIds = [
        ...new Set(productDetails?.map((productDetail) => productDetail.tax_id).filter(isTaxId)),
    ];

    const { data: productTaxes } = useTaxes({
        taxIds: taxIds,
        enabled: isProductDetailsFetched && arrayHasItem(productDetails) && arrayHasItem(taxIds),
    });

    return {
        packageCourseMaterials,
        packageCourseFees,
        productDetails,
        productFees,
        productMaterials,
        productPrices,
        productTaxes,
        isFetchedAll:
            isPackageCourseMaterialsFetched &&
            isPackageCourseFeesFetched &&
            isProductDetailsFetched &&
            (isProductMaterialsFetched || isProductFeesFetched) &&
            isProductPricesFetched,
    };
};

export default useAssociatedProducts;
