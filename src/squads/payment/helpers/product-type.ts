import { AppError } from "src/internals/errors";
import {
    KeyProductFeeTypes,
    KeyProductMaterialTypes,
    KeyProductPackageTypes,
    KeyProductTypes,
} from "src/squads/payment/constants/const";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";
import {
    ProductTypeQuery,
    ProductExtensionType,
    ProductEntityType,
    ProductAndProductExtensionType,
    ProductExtensions,
} from "src/squads/payment/types/service/product-types";

import { FeeType, MaterialType, PackageType } from "manabuf/payment/v1/enums_pb";

export const getEntityBasedOnProductType = (
    productType: ProductTypeQuery["product_type"] | undefined
): ProductEntityType => {
    switch (productType) {
        case KeyProductTypes.PRODUCT_TYPE_FEE:
            return "fee";
        case KeyProductTypes.PRODUCT_TYPE_MATERIAL:
            return "material";
        default:
            return "packageEntity";
    }
};

interface ProductWithExtensionTypeReturn {
    productType?: string;
    feeType?: keyof typeof FeeType;
    materialType?: keyof typeof MaterialType;
    packageType?: keyof typeof PackageType;
}

export const getProductAndProductExtensionByType = ({
    productType,
    materialType,
    feeType,
    packageType,
}: ProductWithExtensionTypeReturn): ProductAndProductExtensionType => {
    switch (productType) {
        case KeyProductTypes.PRODUCT_TYPE_FEE:
            return {
                productEntityType: "fee",
                productExtensionType: feeType ?? KeyProductFeeTypes.FEE_TYPE_NONE,
            };
        case KeyProductTypes.PRODUCT_TYPE_MATERIAL:
            return {
                productEntityType: "material",
                productExtensionType: materialType ?? KeyProductMaterialTypes.MATERIAL_TYPE_NONE,
            };
        case KeyProductTypes.PRODUCT_TYPE_PACKAGE:
            return {
                productEntityType: "packageEntity",
                productExtensionType: packageType ?? KeyProductPackageTypes.PACKAGE_TYPE_NONE,
            };
        default:
            throw new AppError("ra.message.manabie-error.invalid_product_type");
    }
};

interface ProductWithExtension extends ProductExtensions {
    product: ProductTypeQuery;
}

const pickProductAndProductExtensionType = (
    productWithExtension: ProductsFormValues | ProductWithExtension
): ProductWithExtensionTypeReturn => {
    const productType = productWithExtension.product?.product_type;
    const feeType = productWithExtension.fee?.fee_type;
    const materialType = productWithExtension.material?.material_type;
    const packageType = productWithExtension.packageEntity?.package_type;

    return { productType, feeType, materialType, packageType };
};

export const getProductAndProductExtensionType = (productsFormValues: ProductsFormValues) => {
    const { productType, feeType, materialType, packageType } =
        pickProductAndProductExtensionType(productsFormValues);

    return getProductAndProductExtensionByType({ productType, materialType, feeType, packageType });
};

export const isRecurringProductMaterial = (
    productExtension: ProductExtensionType | undefined
): boolean => {
    if (!productExtension) return false;
    return (
        "material_type" in productExtension &&
        productExtension.material_type === KeyProductMaterialTypes.MATERIAL_TYPE_RECURRING
    );
};

export const isScheduleBasedPackageProduct = (
    productExtension: ProductExtensionType | undefined
): boolean => {
    if (!productExtension) return false;
    return (
        "package_type" in productExtension &&
        productExtension.package_type === KeyProductPackageTypes.PACKAGE_TYPE_SCHEDULED
    );
};

export const isFrequencyBasedPackageProduct = (
    productExtension: ProductExtensionType | undefined
): boolean => {
    if (!productExtension) return false;
    return (
        "package_type" in productExtension &&
        productExtension.package_type === KeyProductPackageTypes.PACKAGE_TYPE_FREQUENCY
    );
};
