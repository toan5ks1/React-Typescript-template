import { inferQueryWithGRPCPagination } from "src/squads/payment/service/infer-query";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseOrderItemsInfoListV2Props {
    orderId: NsFatimaOrderService.RetrieveListOfOrderDetailProductsRequest["orderId"];
    enabled?: boolean;
}

export interface useOrderItemsInfoListV2Return {
    data?: NsFatimaOrderService.RetrieveListOfOrderDetailProductsResponse;
    isFetching: boolean;
    pagination: PaginationWithTotal;
}

const useOrderItemsInfoListV2 = ({
    orderId,
    enabled = true,
}: UseOrderItemsInfoListV2Props): useOrderItemsInfoListV2Return => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const {
        results: { data, isFetching },
        pagination,
    } = inferQueryWithGRPCPagination({
        entity: "orderPayment",
        action: "paymentGetRetrieveListOfProductsDetail",
    })(
        { orderId },
        {
            enabled: Boolean(orderId) && enabled,
            defaultPaging: {
                limit: 5,
                offsetInteger: 0,
                offsetString: "",
            },
            onError: (error) => {
                window.warner?.warn("useOrderItemsInfoListV2", error);
                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} order - paymentGetRetrieveListOfProductsDetail`,
                    "error"
                );
            },
        }
    );

    return {
        data,
        isFetching,
        pagination,
    };
};

export default useOrderItemsInfoListV2;
