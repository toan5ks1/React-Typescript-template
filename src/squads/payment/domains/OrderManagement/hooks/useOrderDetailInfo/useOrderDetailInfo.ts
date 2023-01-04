import { Payment_GetStudentsManyV3Query } from "src/squads/payment/service/bob/bob-types";
import {
    Payment_GetOrderByOrderIdQuery,
    Payment_GetOrderByOrderIdQueryVariables,
    Payment_GetLocationNameByLocationIdQuery,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery } from "src/squads/payment/service/infer-query";
import { ArrayElement } from "src/squads/payment/types/common/array";

import useFetchStudentInfo from "src/squads/payment/hooks/useFetchStudentInfo";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface OrderDetailInfoProps {
    orderId: Payment_GetOrderByOrderIdQueryVariables["order_id"];
}
export interface OrderDetailInfoReturn {
    order?: ArrayElement<Payment_GetOrderByOrderIdQuery["order"]>;
    locations?: ArrayElement<Payment_GetLocationNameByLocationIdQuery["locations"]>;
    student?: ArrayElement<Payment_GetStudentsManyV3Query["students"]>;
    isFetchingAll: boolean;
    refetch: () => void;
}

function useOrderDetailInfo({ orderId }: OrderDetailInfoProps): OrderDetailInfoReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const {
        data: order,
        isFetching: isFetchingOrder,
        refetch,
    } = inferQuery({
        entity: "order",
        action: "paymentGetOneOrderByOrderId",
    })(
        {
            order_id: orderId,
        },
        {
            enabled: Boolean(orderId),
            onError: (error) => {
                window.warner?.warn("useOrderDetailInfo", error);
                showSnackbar(
                    `${t("ra.message.unableToLoadData")} order - paymentGetOneOrderByOrderId`,
                    "error"
                );
            },
        }
    );

    const { data: locations, isFetching: isFetchingLocation } = inferQuery({
        entity: "locations",
        action: "paymentGetLocationTitleByLocationId",
    })(
        {
            location_id: order?.location_id || "",
        },
        {
            enabled: Boolean(order?.location_id),
            onError: (error) => {
                window.warner?.warn("useOrderDetailInfo", error);
                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} locations - paymentGetLocationTitleByLocationId`,
                    "error"
                );
            },
        }
    );

    const { data: student, isFetching: isFetchingStudent } = useFetchStudentInfo({
        studentIds: order?.student_id ? [order?.student_id] : [],
    });

    return {
        order,
        locations,
        student,
        isFetchingAll: isFetchingOrder || isFetchingLocation || isFetchingStudent,
        refetch,
    };
}

export default useOrderDetailInfo;
