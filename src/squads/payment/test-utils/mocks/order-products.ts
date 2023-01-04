import {
    ProductType,
    PackageType,
    QuantityType,
    MaterialType,
    FeeType,
    StudentProductStatus,
    StudentProductLabel,
} from "manabuf/payment/v1/enums_pb";
import { RetrieveListOfOrderProductsResponse } from "manabuf/payment/v1/order_pb";

export const createMockOrderProducts =
    (): RetrieveListOfOrderProductsResponse.OrderProduct.AsObject[] => {
        return [
            {
                locationInfo: {
                    locationName: "location 1",
                    locationId: "location_id_1",
                },
                productName: "one time material 1",
                productType: ProductType.PRODUCT_TYPE_MATERIAL,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_ONE_TIME,
                feeType: FeeType.FEE_TYPE_NONE,
                courseItemsList: [],
                status: StudentProductStatus.ORDERED,
                discountInfo: {
                    discountName: "Discount 1",
                    discountId: "discount_id_1",
                },
                amount: 1000,
                upcomingBillingDate: {
                    seconds: 1653082844,
                    nanos: 222943000,
                },
                index: 1,
                productId: "product_id_1",
                studentProductId: "student_product_id_1",
                studentProductLabel: StudentProductLabel.CREATED,
            },
            {
                locationInfo: {
                    locationName: "location 2",
                    locationId: "location_id_2",
                },
                productName: "one time material 2",
                productType: ProductType.PRODUCT_TYPE_MATERIAL,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_ONE_TIME,
                feeType: FeeType.FEE_TYPE_NONE,
                courseItemsList: [],
                status: StudentProductStatus.ORDERED,
                discountInfo: {
                    discountName: "Discount 2",
                    discountId: "discount_id_2",
                },
                amount: 1000,
                upcomingBillingDate: {
                    seconds: 1653082844,
                    nanos: 222943000,
                },
                index: 2,
                productId: "product_id_2",
                studentProductId: "student_product_id_2",
                studentProductLabel: StudentProductLabel.WITHDRAWAL_SCHEDULED,
            },
            {
                locationInfo: {
                    locationName: "location 3",
                    locationId: "location_id_3",
                },
                productName: "one time material 3",
                productType: ProductType.PRODUCT_TYPE_MATERIAL,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_ONE_TIME,
                feeType: FeeType.FEE_TYPE_NONE,
                courseItemsList: [],
                status: StudentProductStatus.ORDERED,
                discountInfo: {
                    discountName: "Discount 3",
                    discountId: "discount_id_3",
                },
                amount: 1000,
                upcomingBillingDate: {
                    seconds: 1653082844,
                    nanos: 222943000,
                },
                index: 3,
                productId: "product_id_3",
                studentProductId: "student_product_id_3",
                studentProductLabel: StudentProductLabel.GRADUATION_SCHEDULED,
            },
            {
                locationInfo: {
                    locationName: "location 4",
                    locationId: "location_id_4",
                },
                productName: "one time material 4",
                productType: ProductType.PRODUCT_TYPE_MATERIAL,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_ONE_TIME,
                feeType: FeeType.FEE_TYPE_NONE,
                courseItemsList: [],
                status: StudentProductStatus.PENDING,
                discountInfo: {
                    discountName: "Discount 4",
                    discountId: "discount_id_4",
                },
                amount: 1000,
                upcomingBillingDate: {
                    seconds: 1653082844,
                    nanos: 222943000,
                },
                index: 4,
                productId: "product_id_4",
                studentProductId: "student_product_id_4",
                studentProductLabel: StudentProductLabel.CREATED,
            },
            {
                locationInfo: {
                    locationName: "location 5",
                    locationId: "location_id_5",
                },
                productName: "one time material 5",
                productType: ProductType.PRODUCT_TYPE_MATERIAL,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_ONE_TIME,
                feeType: FeeType.FEE_TYPE_NONE,
                courseItemsList: [],
                status: StudentProductStatus.CANCELLED,
                discountInfo: {
                    discountName: "Discount 5",
                    discountId: "discount_id_5",
                },
                amount: 1000,
                upcomingBillingDate: {
                    seconds: 1653082844,
                    nanos: 222943000,
                },
                index: 5,
                productId: "product_id_5",
                studentProductId: "student_product_id_5",
                studentProductLabel: StudentProductLabel.CREATED,
            },
            {
                locationInfo: {
                    locationName: "location 6",
                    locationId: "location_id_6",
                },
                productName: "one time material 6",
                productType: ProductType.PRODUCT_TYPE_MATERIAL,
                packageType: PackageType.PACKAGE_TYPE_NONE,
                quantityType: QuantityType.QUANTITY_TYPE_NONE,
                materialType: MaterialType.MATERIAL_TYPE_ONE_TIME,
                feeType: FeeType.FEE_TYPE_NONE,
                courseItemsList: [],
                status: StudentProductStatus.ORDERED,
                discountInfo: {
                    discountName: "Discount 6",
                    discountId: "discount_id_6",
                },
                amount: 1000,
                upcomingBillingDate: {
                    seconds: 1653082844,
                    nanos: 222943000,
                },
                index: 6,
                productId: "product_id_6",
                studentProductId: "student_product_id_6",
                studentProductLabel: StudentProductLabel.UPDATE_SCHEDULED,
            },
        ];
    };

export const createRetrieveListOfOrderProducts =
    (): RetrieveListOfOrderProductsResponse.AsObject => {
        return {
            itemsList: createMockOrderProducts(),
            nextPage: undefined,
            previousPage: undefined,
            totalItems: 5,
        };
    };
