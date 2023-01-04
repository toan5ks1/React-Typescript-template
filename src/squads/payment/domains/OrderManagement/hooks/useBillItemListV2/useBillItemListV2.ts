import { inferQueryWithGRPCPagination } from "src/squads/payment/service/infer-query";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface useBillItemListV2Return {
    data?: NsFatimaOrderService.RetrieveBillingOfOrderDetailsResponse;
    isFetching: boolean;
    pagination: PaginationWithTotal;
}

const useBillItemListV2 = ({
    orderId,
}: NsFatimaOrderService.RetrieveBillingOfOrderDetailsRequest): useBillItemListV2Return => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const {
        results: { data, isFetching },
        pagination,
    } = inferQueryWithGRPCPagination({
        entity: "orderPayment",
        action: "paymentGetRetrieveBillingOfProductsDetail",
    })(
        { orderId },
        {
            enabled: Boolean(orderId),
            defaultPaging: {
                limit: 5,
                offsetInteger: 0,
                offsetString: "",
            },
            onError: (error) => {
                window.warner?.warn("useBillItemListV2", error);
                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} order - paymentGetRetrieveBillingOfProductsDetail`,
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

export default useBillItemListV2;
