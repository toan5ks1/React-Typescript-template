import { useCallback, useState } from "react";

import { arrayHasItem } from "src/common/utils/other";
import { inferQueryWithGRPCPagination } from "src/squads/payment/service/infer-query";

import { OrderStatus, OrderType } from "manabuf/payment/v1/enums_pb";
import {
    RetrieveListOfOrdersResponse,
    RetrieveListOfOrdersRequest,
    RetrieveListOfOrdersFilter,
} from "manabuf/payment/v1/order_pb";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import { FormFilterOrderManagementValues } from "src/squads/payment/domains/OrderManagement/common/types";
import { convertToFilterDateValue } from "src/squads/payment/hooks/useFormFilterAdvanced";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseOrderListReturn {
    onFilter: (data: FormFilterOrderManagementValues) => void;
    onSearch: (keyword: string) => void;
    onCategorize: (orderStatus: OrderStatus) => void;
    pagination: PaginationWithTotal;
    refreshPage: () => void;
    keyword: string;
    isLoadingOrder: boolean;
    orders?: RetrieveListOfOrdersResponse.AsObject;
}

const defaultRetrieveOrdersParams: RetrieveListOfOrdersRequest.AsObject = {
    keyword: "",
    currentTime: new Date(),
    orderStatus: OrderStatus.ORDER_STATUS_ALL,
};

const useOrderList = (): UseOrderListReturn => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const [retrieveOrdersParams, setRetrieveOrdersParams] =
        useState<RetrieveListOfOrdersRequest.AsObject>(defaultRetrieveOrdersParams);

    const {
        results: { data: orders, isFetching: isLoadingOrder, refetch: refreshPage },
        goToFirstPage,
        pagination,
    } = inferQueryWithGRPCPagination({
        entity: "orderPayment",
        action: "paymentGetListWithFilter",
    })(retrieveOrdersParams, {
        enabled: Boolean(retrieveOrdersParams),
        onError: (error) => {
            window.warner?.warn("useOrderList", error);
            showSnackbar(
                `${t("ra.message.unableToLoadData")} order - paymentGetListWithFilter`,
                "error"
            );
        },
    });

    const handleStatus = useCallback(
        (orderStatus: OrderStatus) => {
            if (!retrieveOrdersParams.orderStatus && !orderStatus) return;

            setRetrieveOrdersParams({ ...retrieveOrdersParams, orderStatus });
            goToFirstPage();
        },
        [retrieveOrdersParams, goToFirstPage]
    );

    const handleSearch = useCallback(
        (keyword: string) => {
            if (!retrieveOrdersParams.keyword && !keyword) return;

            setRetrieveOrdersParams({ ...retrieveOrdersParams, keyword });
            goToFirstPage();
        },
        [retrieveOrdersParams, goToFirstPage]
    );

    const handleFilter = useCallback(
        (data: FormFilterOrderManagementValues) => {
            const { createdFrom, createdTo, orderTypeList: orderType, productsList } = data;

            const productIdsList = arrayHasItem(productsList)
                ? productsList.map((product) => product.product_id)
                : [];

            const orderTypesList = arrayHasItem(orderType)
                ? orderType.map((orderType) => OrderType[orderType.id])
                : [];

            const filter: RetrieveListOfOrdersFilter.AsObject = {
                createdFrom: convertToFilterDateValue(createdFrom),
                createdTo: convertToFilterDateValue(createdTo),
                orderTypesList,
                productIdsList,
            };

            goToFirstPage();
            setRetrieveOrdersParams({ ...retrieveOrdersParams, filter });
        },
        [retrieveOrdersParams, goToFirstPage]
    );

    return {
        onSearch: handleSearch,
        onFilter: handleFilter,
        onCategorize: handleStatus,
        pagination,
        keyword: retrieveOrdersParams.keyword,
        refreshPage,
        isLoadingOrder,
        orders,
    };
};

export default useOrderList;
