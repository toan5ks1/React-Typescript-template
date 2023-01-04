import { inferQueryWithGRPCPagination } from "src/squads/payment/service/infer-query";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseStudentBillingProductListReturn {
    studentBillingProductListData?: NsFatimaOrderService.RetrieveListOfOrderProductsResponse;
    isLoadingStudentBillingProductList: boolean;
    pagination: PaginationWithTotal;
}

const useStudentBillingProductList = ({
    studentId,
}: NsFatimaOrderService.RetrieveListOfOrderProductsRequest): UseStudentBillingProductListReturn => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const {
        results: {
            data: studentBillingProductListData,
            isFetching: isLoadingStudentBillingProductList,
        },
        pagination,
    } = inferQueryWithGRPCPagination({
        entity: "orderPayment",
        action: "paymentGetRetrieveListOfOrderProducts",
    })(
        { studentId },
        {
            enabled: Boolean(studentId),
            onError: (error) => {
                window.warner?.warn("useStudentBillingProductList", error);
                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} order - paymentGetRetrieveListOfOrderProducts`,
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
        studentBillingProductListData,
        isLoadingStudentBillingProductList,
        pagination,
    };
};

export default useStudentBillingProductList;
