import { inferQueryWithGRPCPagination } from "src/squads/payment/service/infer-query";
import { NsFatimaOrderService } from "src/squads/payment/service/payment/order-payment-service/types";

import { PaginationWithTotal } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseStudentBillingBillingItemsReturn {
    studentBillingBillingItemsData?: NsFatimaOrderService.RetrieveListOfBillItemsResponse;
    isLoadingStudentBillingBillingItems: boolean;
    pagination: PaginationWithTotal;
}

const useStudentBillingBillingItems = ({
    studentId,
}: NsFatimaOrderService.RetrieveListOfBillItemsRequest): UseStudentBillingBillingItemsReturn => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const {
        results: {
            data: studentBillingBillingItemsData,
            isFetching: isLoadingStudentBillingBillingItems,
        },
        pagination,
    } = inferQueryWithGRPCPagination({
        entity: "orderPayment",
        action: "paymentGetRetrieveListOfBillItems",
    })(
        { studentId },
        {
            enabled: Boolean(studentId),
            onError: (error) => {
                window.warner?.warn("useStudentBillingBillingItems", error);
                showSnackbar(
                    `${t("ra.message.unableToLoadData")} order - paymentGetRetrieveListOfBillItems`,
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
        studentBillingBillingItemsData,
        isLoadingStudentBillingBillingItems,
        pagination,
    };
};

export default useStudentBillingBillingItems;
