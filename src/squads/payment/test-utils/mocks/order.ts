import { ArrayElement, OptionSelectType, PagingRequest } from "src/common/constants/types";
import { KeyOrderStatus, KeyOrderTypes } from "src/squads/payment/constants/const";
import { Payment_GetOrderByOrderIdQuery } from "src/squads/payment/service/fatima/fatima-types";

import { OrderStatus, OrderType } from "manabuf/payment/v1/enums_pb";
import { RetrieveListOfOrdersResponse } from "manabuf/payment/v1/order_pb";

import { createMockProductList } from "./products";

import { FormFilterOrderManagementValues } from "src/squads/payment/domains/OrderManagement/common/types";
import { OrderStatusOptions } from "src/squads/payment/domains/OrderManagement/pages/OrdersPage";

const orderType: OptionSelectType[] = [
    { id: KeyOrderTypes.ORDER_TYPE_NEW, value: KeyOrderTypes.ORDER_TYPE_NEW },
];

export const createMockPagingObject = (offsetString: string): PagingRequest => {
    return {
        limit: 10,
        offsetInteger: 0,
        offsetString: offsetString,
    };
};

export const createMockOrderList = (): RetrieveListOfOrdersResponse.Order.AsObject[] => {
    return [
        {
            orderSequenceNumber: 1,
            orderStatus: OrderStatus.ORDER_STATUS_ALL,
            orderType: OrderType.ORDER_TYPE_NEW,
            productDetails: "product detail 1",
            studentId: "student_id_1",
            studentName: "student_name_1",
            createDate: {
                nanos: 791672000,
                seconds: 1652954840,
            },
            orderId: "order_id_1",
        },
        {
            orderSequenceNumber: 2,
            orderStatus: OrderStatus.ORDER_STATUS_INVOICED,
            orderType: OrderType.ORDER_TYPE_CUSTOM_BILLING,
            productDetails: "product detail 2",
            studentId: "student_id_2",
            studentName: "student_name_2",
            createDate: {
                nanos: 791672000,
                seconds: 1652954840,
            },
            orderId: "order_id_2",
        },
        {
            orderSequenceNumber: 3,
            orderStatus: OrderStatus.ORDER_STATUS_PENDING,
            orderType: OrderType.ORDER_TYPE_ENROLLMENT,
            productDetails: "product detail 3",
            studentId: "student_id_3",
            studentName: "student_name_3",
            createDate: {
                nanos: 791672000,
                seconds: 1652954840,
            },
            orderId: "order_id_3",
        },
        {
            orderSequenceNumber: 4,
            orderStatus: OrderStatus.ORDER_STATUS_REJECTED,
            orderType: OrderType.ORDER_TYPE_GRADUATE,
            productDetails: "product detail 4",
            studentId: "student_id_4",
            studentName: "student_name_4",
            createDate: {
                nanos: 791672000,
                seconds: 1652954840,
            },
            orderId: "order_id_4",
        },
        {
            orderSequenceNumber: 5,
            orderStatus: OrderStatus.ORDER_STATUS_SUBMITTED,
            orderType: OrderType.ORDER_TYPE_LOA,
            productDetails: "product detail 5",
            studentId: "student_id_5",
            studentName: "student_name_5",
            createDate: {
                nanos: 791672000,
                seconds: 1652954840,
            },
            orderId: "order_id_5",
        },
    ];
};

export const createMockRetrieveOrder = (): RetrieveListOfOrdersResponse.AsObject => {
    return {
        itemsList: createMockOrderList(),
        totalItems: 10,
        nextPage: createMockPagingObject("Order_3"),
        previousPage: createMockPagingObject("Order_1"),
        totalOfSubmitted: 2,
        totalOfPending: 2,
        totalOfRejected: 2,
        totalOfVoided: 2,
        totalOfInvoiced: 2,
    };
};

export const createMockFillDataFilter = (): FormFilterOrderManagementValues => {
    return {
        createdFrom: new Date(),
        createdTo: new Date(),
        orderTypeList: orderType,
        productsList: createMockProductList(),
    };
};

export const createCategoryOptions = (): Omit<OrderStatusOptions, "children" | "onClick">[] => {
    return [
        {
            value: KeyOrderStatus.ORDER_STATUS_ALL,
            "data-testid": "OrderStatus__ORDER_STATUS_ALL",
        },
        {
            value: KeyOrderStatus.ORDER_STATUS_SUBMITTED,
            "data-testid": "OrderStatus__ORDER_STATUS_SUBMITTED",
        },
        {
            value: KeyOrderStatus.ORDER_STATUS_PENDING,
            "data-testid": "OrderStatus__ORDER_STATUS_PENDING",
        },
        {
            value: KeyOrderStatus.ORDER_STATUS_REJECTED,
            "data-testid": "OrderStatus__ORDER_STATUS_REJECTED",
        },
        {
            value: KeyOrderStatus.ORDER_STATUS_VOIDED,
            "data-testid": "OrderStatus__ORDER_STATUS_VOIDED",
        },
        {
            value: KeyOrderStatus.ORDER_STATUS_INVOICED,
            "data-testid": "OrderStatus__ORDER_STATUS_INVOICED",
        },
    ];
};

export const createMockOrderData = (): ArrayElement<Payment_GetOrderByOrderIdQuery["order"]> => {
    return {
        order_id: "order_id_1",
        order_sequence_number: 1,
        order_status: KeyOrderStatus.ORDER_STATUS_SUBMITTED,
        order_type: KeyOrderTypes.ORDER_TYPE_NEW,
        student_id: "student_id_1",
        location_id: "location_id_1",
        created_at: "2021-12-28T02:35:17.738471+00:00",
    };
};
