import {
    Payment_GetManyProductPricesByProductIdsQuery,
    Payment_GetManyProductsByProductIdsQuery,
    Payment_GetManyTaxesByTaxIdsQuery,
    Payment_GetManyPackageCourseByPackageIdQuery,
    Payment_GetPackagesByProductIdsQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { ProductsFormValues } from "src/squads/payment/types/form/order-form-types";
import { OrderDetailProductListFeeType } from "src/squads/payment/types/service/product-fee-types";
import { OrderDetailProductListMaterialType } from "src/squads/payment/types/service/product-material-types";

import { PackageType } from "manabuf/payment/v1/enums_pb";

interface GroupProductsInfoArguments {
    products?: Payment_GetManyProductsByProductIdsQuery["product"];
    productPricesList?: Payment_GetManyProductPricesByProductIdsQuery["product_price"];
    productTaxes?: Payment_GetManyTaxesByTaxIdsQuery["tax"];
    materials?: OrderDetailProductListMaterialType[];
    fees?: OrderDetailProductListFeeType[];
    packageCourses?: Payment_GetManyPackageCourseByPackageIdQuery["package_course"];
    packages?: Payment_GetPackagesByProductIdsQuery["package"];
}

const isPackageType = (type: string): type is keyof typeof PackageType => {
    return Object.keys(PackageType).includes(type);
};

export const groupProductsInfo = ({
    products,
    productPricesList,
    productTaxes,
    materials,
    fees,
    packages,
}: GroupProductsInfoArguments): ProductsFormValues[] => {
    if (!products) return [];

    const productsWithDetails = products.reduce<ProductsFormValues[]>((productArray, product) => {
        const productMaterial = materials?.find(
            (material) => material.material_id === product.product_id
        );
        const productFee = fees?.find((fee) => fee.fee_id === product.product_id);
        const productPackage = packages?.find(
            (productPackage) => productPackage.package_id === product.product_id
        );
        const productPrices = productPricesList?.filter(
            (prices) => prices.product_id === product.product_id
        );
        const productTax = productTaxes?.find((tax) => tax.tax_id === product.tax_id);

        const newProduct: ProductsFormValues = {
            product,
            material: productMaterial
                ? {
                      material_type: productMaterial.material_type,
                  }
                : undefined,
            fee: productFee
                ? {
                      fee_type: productFee.fee_type,
                  }
                : undefined,
            productTax: productTax
                ? {
                      tax_percentage: productTax.tax_percentage,
                      tax_category: productTax.tax_category,
                  }
                : undefined,
            productPrices,
            packageEntity: productPackage
                ? {
                      //TODO: [LT-16863] Make Hasura generate type of enum to remove isPackageType checking function
                      //TODO: [LT-16908] Add error boundary when package is not in PackageType values
                      package_type: isPackageType(productPackage.package_type)
                          ? productPackage.package_type
                          : "PACKAGE_TYPE_NONE",
                      max_slot: productPackage.max_slot,
                      package_end_date: productPackage.package_end_date,
                      package_start_date: productPackage.package_start_date,
                  }
                : undefined,
        };

        return productArray.concat(newProduct);
    }, []);

    return productsWithDetails;
};

export const getProductNameWithTag = (tag: string, productName: string): string => {
    return `[${tag}] ${productName}`;
};
