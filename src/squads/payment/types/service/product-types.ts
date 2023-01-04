import { ProductEntities } from "src/squads/payment/constants/const";
import { OrderCurrency } from "src/squads/payment/constants/enum";
import { Payment_GetManyProductsByProductIdsAndAvailableDateQuery } from "src/squads/payment/service/fatima/fatima-types";
import { ArrayElement } from "src/squads/payment/types/common/array";
import { ProductDiscountType } from "src/squads/payment/types/service/discount-types";
import { ProductFeeType } from "src/squads/payment/types/service/product-fee-types";
import { ProductMaterialType } from "src/squads/payment/types/service/product-material-types";
import { ProductPackageType } from "src/squads/payment/types/service/product-package-types";

export type ProductTypeQuery = ArrayElement<
    Payment_GetManyProductsByProductIdsAndAvailableDateQuery["product"]
>;

export type ProductExtensionType = ProductMaterialType | ProductPackageType | ProductFeeType;

export type ProductEntityType = typeof ProductEntities[number];

export type ProductAndProductExtensionType =
    | {
          productEntityType: "material";
          productExtensionType: ProductMaterialType["material_type"];
      }
    | {
          productEntityType: "packageEntity";
          productExtensionType: ProductPackageType["package_type"];
      }
    | {
          productEntityType: "fee";
          productExtensionType: ProductFeeType["fee_type"];
      };

export interface ProductExtensions {
    packageEntity?: ProductPackageType;
    material?: ProductMaterialType;
    fee?: ProductFeeType;
}

export interface BillingItemBaseProductType {
    productName: ProductTypeQuery["name"];
    productPrice: number;
    discountName?: ProductDiscountType["name"];
    discountPrice: number;
    currency: OrderCurrency;
    productAndProductExtension: ProductAndProductExtensionType;
}
