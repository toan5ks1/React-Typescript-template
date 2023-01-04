import { inferQueryWithGRPCPagination } from "src/squads/payment/service/infer-query";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseStudentBillingOrdersReturn {
    studentBillingOrdersData?: NsFatimaOrderService.RetrieveListOfOrderItemsResponse;
    isLoadingStudentBillingOrders: boolean;
    pagination: PaginationWithTotal;
}

const useStudentBillingOrders = ({
    studentId,
}: NsFatimaOrderService.RetrieveListOfOrderItemsRequest): UseStudentBillingOrdersReturn => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const {
        results: { data: studentBillingOrdersData, isFetching: isLoadingStudentBillingOrders },
        pagination,
    } = inferQueryWithGRPCPagination({
        entity: "orderPayment",
        action: "paymentGetRetrieveListOfOrderItems",
    })(
        { studentId },
        {
            enabled: Boolean(studentId),
            onError: (error) => {
                window.warner?.warn("useStudentBillingOrders", error);
                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} order - paymentGetRetrieveListOfOrderItems`,
                    "error"
                );
            },
            defaultPaging: {
                limit: 5,
                offsetInteger: 0,
                offsetString: "",
            },
        }
    );

    return {
        studentBillingOrdersData,
        isLoadingStudentBillingOrders,
        pagination,
    };
};

export default useStudentBillingOrders;
