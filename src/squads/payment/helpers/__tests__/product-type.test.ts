import {
    KeyProductFeeTypes,
    KeyProductMaterialTypes,
    KeyProductPackageTypes,
    KeyProductTypes,
} from "src/squads/payment/constants/const";
import {
    getEntityBasedOnProductType,
    getProductAndProductExtensionByType,
} from "src/squads/payment/helpers/product-type";

describe("getProductAndProductExtensionByType", () => {
    const productTypeCase = [
        {
            productType: KeyProductTypes.PRODUCT_TYPE_FEE,
            feeType: KeyProductFeeTypes.FEE_TYPE_ONE_TIME,
            result: {
                productEntityType: "fee",
                productExtensionType: KeyProductFeeTypes.FEE_TYPE_ONE_TIME,
            },
        },
        {
            productType: KeyProductTypes.PRODUCT_TYPE_MATERIAL,
            materialType: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
            result: {
                productEntityType: "material",
                productExtensionType: KeyProductMaterialTypes.MATERIAL_TYPE_ONE_TIME,
            },
        },
        {
            productType: KeyProductTypes.PRODUCT_TYPE_PACKAGE,
            packageType: KeyProductPackageTypes.PACKAGE_TYPE_ONE_TIME,
            result: {
                productEntityType: "packageEntity",
                productExtensionType: KeyProductPackageTypes.PACKAGE_TYPE_ONE_TIME,
            },
        },
    ];

    test.each(productTypeCase)(
        "it should return correctly product extension based on product type",
        ({ productType, feeType, materialType, packageType, result }) => {
            expect(
                getProductAndProductExtensionByType({
                    productType,
                    feeType,
                    materialType,
                    packageType,
                })
            ).toEqual(result);
        }
    );
});

describe("getEntityBasedOnProductType", () => {
    it("should return entity based on product type", () => {
        expect(getEntityBasedOnProductType(KeyProductTypes.PRODUCT_TYPE_PACKAGE)).toBe(
            "packageEntity"
        );
        expect(getEntityBasedOnProductType(KeyProductTypes.PRODUCT_TYPE_MATERIAL)).toBe("material");
        expect(getEntityBasedOnProductType(KeyProductTypes.PRODUCT_TYPE_FEE)).toBe("fee");
    });
});
