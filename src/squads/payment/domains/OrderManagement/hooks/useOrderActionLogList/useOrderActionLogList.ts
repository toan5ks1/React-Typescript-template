import { arrayHasItem } from "src/common/utils/other";
import { UserNameByIdsQuery } from "src/squads/payment/service/bob/bob-types";
import {
    Payment_GetManyActionLogsByOrderIdQuery,
    Payment_GetManyActionLogsByOrderIdQueryVariables,
} from "src/squads/payment/service/fatima/fatima-types";
import { inferQuery, inferQueryPagination } from "src/squads/payment/service/infer-query";

import { DataWithTotal, PaginationWithTotal } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/payment/hooks/useShowSnackbar";
import useTranslate from "src/squads/payment/hooks/useTranslate";

export interface UseOrderActionLogListProps {
    orderId: Payment_GetManyActionLogsByOrderIdQueryVariables["order_id"];
}

export interface MappedUseOrderActionLogListReturn {
    orderActionLogListData?: Payment_GetManyActionLogsByOrderIdQuery["order_action_log"];
    userIds?: string[];
}

export interface UseOrderActionLogListReturn {
    mappedUseOrderActionLogListData?: DataWithTotal<MappedUseOrderActionLogListReturn>;
    usersList?: UserNameByIdsQuery["users"];
    isOrderActionLogListLoadingAll: boolean;
    pagination: PaginationWithTotal;
}

const useOrderActionLogList = ({
    orderId,
}: UseOrderActionLogListProps): UseOrderActionLogListReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const {
        data: mappedUseOrderActionLogListData,
        result: { isLoading: isOrderActionLogListLoading },
        pagination,
    } = inferQueryPagination({
        entity: "orderActionLog",
        action: "paymentGetOrderActionLogListByOrderId",
    })<
        Payment_GetManyActionLogsByOrderIdQuery["order_action_log"],
        MappedUseOrderActionLogListReturn
    >(
        {
            order_id: orderId,
        },
        {
            enabled: Boolean(orderId),
            selector: ({ data, total }) => {
                const userIds = data?.map((orderActionLog) => orderActionLog.user_id);

                return {
                    data: {
                        orderActionLogListData: data,
                        userIds,
                    },
                    total,
                };
            },
            onError: (error) => {
                window.warner?.warn("useOrderActionLogList", error);
                showSnackbar(
                    `${t(
                        "ra.message.unableToLoadData"
                    )} orderActionLog - paymentGetOrderActionLogListByOrderId`,
                    "error"
                );
            },
            defaultLimit: 5,
        }
    );

    const { data: usersList, isLoading: isUserNameListLoading } = inferQuery({
        entity: "users",
        action: "paymentGetTitleListByUserId",
    })(
        {
            user_id: mappedUseOrderActionLogListData?.data.userIds,
        },
        {
            enabled: arrayHasItem(mappedUseOrderActionLogListData?.data.userIds),
            onError: (error) => {
                window.warner?.warn("useOrderActionLogList", error);
                showSnackbar(
                    `${t("ra.message.unableToLoadData")} users - paymentGetTitleListByUserId`,
                    "error"
                );
            },
        }
    );

    return {
        mappedUseOrderActionLogListData,
        usersList,
        isOrderActionLogListLoadingAll: isOrderActionLogListLoading || isUserNameListLoading,
        pagination,
    };
};

export default useOrderActionLogList;
