import {
    Payment_GetManyOrderItemsByStudentProductIdsQuery,
    Payment_GetOrderItemsByOrderIdQuery,
} from "src/squads/payment/service/fatima/fatima-types";

import {
    ProductType,
    PackageType,
    MaterialType,
    FeeType,
    QuantityType,
    OrderStatus,
    OrderType,
    StudentProductLabel,
} from "manabuf/payment/v1/enums_pb";
import {
    RetrieveListOfOrderDetailProductsResponse,
    RetrieveListOfOrderItemsResponse,
} from "manabuf/payment/v1/order_pb";

export const createMockRetrieveOrderItems =
    (): RetrieveListOfOrderDetailProductsResponse.OrderProduct.AsObject[] => [
        {
            index: 1,
            productId: "product_id_1",
            productName: "Product material",
            productType: ProductType.PRODUCT_TYPE_MATERIAL,
            packageType: PackageType.PACKAGE_TYPE_NONE,
            materialType: MaterialType.MATERIAL_TYPE_ONE_TIME,
            feeType: FeeType.FEE_TYPE_NONE,
            courseItemsList: [],
            discountInfo: {
                discountName: "Discount 1",
                discountId: "discount_id_1",
            },
            amount: 1000,
            startDate: {
                seconds: -62135596800,
                nanos: 0,
            },
            quantityType: QuantityType.QUANTITY_TYPE_NONE,
            studentProductLabel: StudentProductLabel.CREATED,
        },
        {
            index: 2,
            productId: "product_id_2",
            productName: "Product material",
            productType: ProductType.PRODUCT_TYPE_MATERIAL,
            packageType: PackageType.PACKAGE_TYPE_NONE,
            materialType: MaterialType.MATERIAL_TYPE_RECURRING,
            feeType: FeeType.FEE_TYPE_ONE_TIME,
            courseItemsList: [],
            discountInfo: {
                discountName: "Discount 2",
                discountId: "discount_id_2",
            },
            amount: 2000,
            startDate: {
                seconds: -62135596800,
                nanos: 0,
            },
            quantityType: QuantityType.QUANTITY_TYPE_NONE,
            studentProductLabel: StudentProductLabel.CREATED,
        },
        {
            index: 3,
            productId: "product_id_3",
            productName: "Product fee",
            productType: ProductType.PRODUCT_TYPE_FEE,
            packageType: PackageType.PACKAGE_TYPE_NONE,
            materialType: MaterialType.MATERIAL_TYPE_NONE,
            feeType: FeeType.FEE_TYPE_ONE_TIME,
            courseItemsList: [],
            discountInfo: undefined,
            amount: 2000,
            startDate: {
                seconds: -62135596800,
                nanos: 0,
            },
            quantityType: QuantityType.QUANTITY_TYPE_NONE,
            studentProductLabel: StudentProductLabel.CREATED,
        },
        {
            index: 4,
            productId: "product_id_4",
            productName: "Schedule based package product",
            productType: ProductType.PRODUCT_TYPE_PACKAGE,
            packageType: PackageType.PACKAGE_TYPE_SCHEDULED,
            materialType: MaterialType.MATERIAL_TYPE_NONE,
            feeType: FeeType.FEE_TYPE_NONE,
            courseItemsList: [],
            discountInfo: undefined,
            amount: 2000,
            startDate: {
                seconds: 1659841394,
                nanos: 955858000,
            },
            quantityType: QuantityType.QUANTITY_TYPE_NONE,
            studentProductLabel: StudentProductLabel.CREATED,
        },
        {
            index: 5,
            productId: "product_id_5",
            productName: "Material Recurring Product",
            productType: ProductType.PRODUCT_TYPE_MATERIAL,
            packageType: PackageType.PACKAGE_TYPE_NONE,
            materialType: MaterialType.MATERIAL_TYPE_RECURRING,
            feeType: FeeType.FEE_TYPE_NONE,
            courseItemsList: [],
            discountInfo: {
                discountName: "Discount 1",
                discountId: "discount_id_1",
            },
            amount: 2000,
            startDate: {
                seconds: 1659841394,
                nanos: 955858000,
            },
            quantityType: QuantityType.QUANTITY_TYPE_NONE,
            studentProductLabel: StudentProductLabel.CREATED,
        },
        {
            index: 6,
            productId: "product_id_6",
            productName: "One Time Package Product",
            productType: ProductType.PRODUCT_TYPE_PACKAGE,
            packageType: PackageType.PACKAGE_TYPE_ONE_TIME,
            materialType: MaterialType.MATERIAL_TYPE_NONE,
            feeType: FeeType.FEE_TYPE_NONE,
            courseItemsList: [
                {
                    courseId: "Course_1",
                    courseName: "English",
                    slot: undefined,
                },
                {
                    courseId: "Course2",
                    courseName: "Math",
                    slot: undefined,
                },
            ],
            discountInfo: {
                discountName: "Discount 1",
                discountId: "discount_id_1",
            },
            amount: 2000,
            quantityType: QuantityType.QUANTITY_TYPE_COURSE_WEIGHT,
            studentProductLabel: StudentProductLabel.CREATED,
        },
        {
            index: 7,
            productId: "product_id_7",
            productName: "Slot based Package Product",
            productType: ProductType.PRODUCT_TYPE_PACKAGE,
            packageType: PackageType.PACKAGE_TYPE_SLOT_BASED,
            materialType: MaterialType.MATERIAL_TYPE_NONE,
            feeType: FeeType.FEE_TYPE_NONE,
            courseItemsList: [
                {
                    courseId: "Course_1",
                    courseName: "English",
                    slot: 1,
                },
                {
                    courseId: "Course2",
                    courseName: "Math",
                    slot: 2,
                },
            ],
            discountInfo: {
                discountName: "Discount 1",
                discountId: "discount_id_1",
            },
            amount: 2000,
            quantityType: QuantityType.QUANTITY_TYPE_SLOT_PER_WEEK,
            studentProductLabel: StudentProductLabel.CREATED,
        },
    ];

export const createMockOrderItemsList = (): Payment_GetOrderItemsByOrderIdQuery["order_item"] => [
    { product_id: "product_id_1", discount_id: "discount_id_1", start_date: null },
    { product_id: "product_id_2", discount_id: "discount_id_2", start_date: null },
    { product_id: "product_id_3", discount_id: "discount_id_3", start_date: null },
];

export const createMockOrderItemsListByStudentProductIds =
    (): Payment_GetManyOrderItemsByStudentProductIdsQuery["order_item"] => [
        {
            product_id: "product_id_1",
            discount_id: "discount_id_1",
            student_product_id: "student_product_id_1",
            order_id: "order_id_1",
        },
        {
            product_id: "product_id_2",
            discount_id: "discount_id_2",
            student_product_id: "student_product_id_2",
            order_id: "order_id_2",
        },
        {
            product_id: "product_id_3",
            discount_id: "discount_id_3",
            student_product_id: "student_product_id_3",
            order_id: "order_id_3",
        },
    ];

export const createMockOrders = (): RetrieveListOfOrderItemsResponse.OrderItems.AsObject[] => {
    return [
        {
            index: 1,
            locationInfo: {
                locationId: "location_id_1",
                locationName: "location 1",
            },
            orderNo: 1,
            orderId: "",
            orderType: OrderType.ORDER_TYPE_NEW,
            orderStatus: OrderStatus.ORDER_STATUS_SUBMITTED,
            productDetailsList: [
                {
                    productId: "product_id_1",
                    productName: "Product 1",
                    productType: ProductType.PRODUCT_TYPE_NONE,
                    packageType: PackageType.PACKAGE_TYPE_NONE,
                    materialType: MaterialType.MATERIAL_TYPE_NONE,
                    feeType: FeeType.FEE_TYPE_NONE,
                    quantityType: QuantityType.QUANTITY_TYPE_NONE,
                },
                {
                    productId: "product_id_2",
                    productName: "Product 2",
                    productType: ProductType.PRODUCT_TYPE_NONE,
                    packageType: PackageType.PACKAGE_TYPE_NONE,
                    materialType: MaterialType.MATERIAL_TYPE_NONE,
                    feeType: FeeType.FEE_TYPE_NONE,
                    quantityType: QuantityType.QUANTITY_TYPE_NONE,
                },
            ],
            createDate: {
                seconds: 1653082844,
                nanos: 222943000,
            },
        },
        {
            index: 2,
            locationInfo: {
                locationId: "location_id_2",
                locationName: "location 2",
            },
            orderNo: 2,
            orderId: "",
            orderType: OrderType.ORDER_TYPE_NEW,
            orderStatus: OrderStatus.ORDER_STATUS_SUBMITTED,
            productDetailsList: [
                {
                    productId: "product_id_1",
                    productName: "Product 1",
                    productType: ProductType.PRODUCT_TYPE_NONE,
                    packageType: PackageType.PACKAGE_TYPE_NONE,
                    materialType: MaterialType.MATERIAL_TYPE_NONE,
                    feeType: FeeType.FEE_TYPE_NONE,
                    quantityType: QuantityType.QUANTITY_TYPE_NONE,
                },
            ],
            createDate: {
                seconds: 1653082844,
                nanos: 222943000,
            },
        },
        {
            index: 3,
            locationInfo: {
                locationId: "location_id_3",
                locationName: "location 3",
            },
            orderNo: 3,
            orderId: "",
            orderType: OrderType.ORDER_TYPE_NEW,
            orderStatus: OrderStatus.ORDER_STATUS_SUBMITTED,
            productDetailsList: [
                {
                    productId: "product_id_1",
                    productName: "Product 1",
                    productType: ProductType.PRODUCT_TYPE_NONE,
                    packageType: PackageType.PACKAGE_TYPE_NONE,
                    materialType: MaterialType.MATERIAL_TYPE_NONE,
                    feeType: FeeType.FEE_TYPE_NONE,
                    quantityType: QuantityType.QUANTITY_TYPE_NONE,
                },
            ],
            createDate: {
                seconds: 1653082844,
                nanos: 222943000,
            },
        },
        {
            index: 4,
            locationInfo: {
                locationId: "location_id_4",
                locationName: "location 4",
            },
            orderNo: 4,
            orderId: "",
            orderType: OrderType.ORDER_TYPE_NEW,
            orderStatus: OrderStatus.ORDER_STATUS_SUBMITTED,
            productDetailsList: [
                {
                    productId: "product_id_1",
                    productName: "Product 1",
                    productType: ProductType.PRODUCT_TYPE_NONE,
                    packageType: PackageType.PACKAGE_TYPE_NONE,
                    materialType: MaterialType.MATERIAL_TYPE_NONE,
                    feeType: FeeType.FEE_TYPE_NONE,
                    quantityType: QuantityType.QUANTITY_TYPE_NONE,
                },
            ],
            createDate: {
                seconds: 1653082844,
                nanos: 222943000,
            },
        },
        {
            index: 5,
            locationInfo: {
                locationId: "location_id_5",
                locationName: "location 5",
            },
            orderNo: 5,
            orderId: "",
            orderType: OrderType.ORDER_TYPE_NEW,
            orderStatus: OrderStatus.ORDER_STATUS_SUBMITTED,
            productDetailsList: [
                {
                    productId: "product_id_1",
                    productName: "Product 1",
                    productType: ProductType.PRODUCT_TYPE_NONE,
                    packageType: PackageType.PACKAGE_TYPE_NONE,
                    materialType: MaterialType.MATERIAL_TYPE_NONE,
                    feeType: FeeType.FEE_TYPE_NONE,
                    quantityType: QuantityType.QUANTITY_TYPE_NONE,
                },
            ],
            createDate: {
                seconds: 1653082844,
                nanos: 222943000,
            },
        },
        {
            index: 6,
            locationInfo: {
                locationId: "location_id_5",
                locationName: "location 5",
            },
            orderNo: 6,
            orderId: "",
            orderType: OrderType.ORDER_TYPE_NEW,
            orderStatus: OrderStatus.ORDER_STATUS_SUBMITTED,
            productDetailsList: [
                {
                    productId: "product_id_1",
                    productName: "Product 1",
                    productType: ProductType.PRODUCT_TYPE_MATERIAL,
                    packageType: PackageType.PACKAGE_TYPE_NONE,
                    materialType: MaterialType.MATERIAL_TYPE_RECURRING,
                    feeType: FeeType.FEE_TYPE_NONE,
                    quantityType: QuantityType.QUANTITY_TYPE_NONE,
                },
            ],
            createDate: {
                seconds: 1653082844,
                nanos: 222943000,
            },
        },
        {
            index: 7,
            locationInfo: {
                locationId: "location_id_5",
                locationName: "location 5",
            },
            orderNo: 7,
            orderId: "",
            orderType: OrderType.ORDER_TYPE_NEW,
            orderStatus: OrderStatus.ORDER_STATUS_SUBMITTED,
            productDetailsList: [
                {
                    productId: "product_id_1",
                    productName: "Product 1",
                    productType: ProductType.PRODUCT_TYPE_MATERIAL,
                    packageType: PackageType.PACKAGE_TYPE_NONE,
                    materialType: MaterialType.MATERIAL_TYPE_RECURRING,
                    feeType: FeeType.FEE_TYPE_NONE,
                    quantityType: QuantityType.QUANTITY_TYPE_NONE,
                },
                {
                    productId: "product_id_2",
                    productName: "Product 2",
                    productType: ProductType.PRODUCT_TYPE_MATERIAL,
                    packageType: PackageType.PACKAGE_TYPE_NONE,
                    materialType: MaterialType.MATERIAL_TYPE_RECURRING,
                    feeType: FeeType.FEE_TYPE_NONE,
                    quantityType: QuantityType.QUANTITY_TYPE_NONE,
                },
            ],
            createDate: {
                seconds: 1653082844,
                nanos: 222943000,
            },
        },
    ];
};

export const createRetrieveListOfOrders = (): RetrieveListOfOrderItemsResponse.AsObject => {
    return {
        itemsList: createMockOrders(),
        nextPage: undefined,
        previousPage: undefined,
        totalItems: 5,
    };
};

export const createRetrieveListOfOrderDetail =
    (): RetrieveListOfOrderDetailProductsResponse.AsObject => {
        return {
            itemsList: createMockRetrieveOrderItems(),
            nextPage: undefined,
            previousPage: undefined,
            totalItems: 5,
        };
    };
