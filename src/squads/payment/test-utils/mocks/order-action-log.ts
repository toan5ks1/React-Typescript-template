import { KeyOrderActionStatus } from "src/squads/payment/constants/const";
import { Payment_GetManyActionLogsByOrderIdQuery } from "src/squads/payment/service/fatima/fatima-types";
import { OrderActionLogType } from "src/squads/payment/types/service/order-detail-types";

import { DataWithTotal } from "@manabie-com/react-utils";
import { MappedUseOrderActionLogListReturn } from "src/squads/payment/domains/OrderManagement/hooks/useOrderActionLogList";

export const createMockOrderActionLog = (): OrderActionLogType[] => {
    return [
        {
            users: {
                user_id: "user_id_1",
                name: "user 1",
            },
            actionLogs: {
                action: KeyOrderActionStatus.ORDER_ACTION_SUBMITTED,
                comment: "comment 1",
                created_at: "2022-03-09T02:53:47.325755+00:00",
            },
        },
        {
            users: {
                user_id: "user_id_2",
                name: "user 2",
            },
            actionLogs: {
                action: KeyOrderActionStatus.ORDER_ACTION_SUBMITTED,
                comment: "comment 2",
                created_at: "2022-03-09T02:53:47.325755+00:00",
            },
        },
        {
            users: {
                user_id: "user_id_3",
                name: "user 3",
            },
            actionLogs: {
                action: KeyOrderActionStatus.ORDER_ACTION_SUBMITTED,
                comment: "comment 3",
                created_at: "2022-03-09T02:53:47.325755+00:00",
            },
        },
        {
            users: {
                user_id: "user_id_4",
                name: "user 4",
            },
            actionLogs: {
                action: KeyOrderActionStatus.ORDER_ACTION_SUBMITTED,
                comment: "comment 4",
                created_at: "2022-03-09T02:53:47.325755+00:00",
            },
        },
        {
            users: {
                user_id: "user_id_5",
                name: "user 5",
            },
            actionLogs: {
                action: KeyOrderActionStatus.ORDER_ACTION_SUBMITTED,
                comment: "comment 5",
                created_at: "2022-03-09T02:53:47.325755+00:00",
            },
        },
    ];
};

export const createMockOrderActionLogList =
    (): Payment_GetManyActionLogsByOrderIdQuery["order_action_log"] => {
        return [
            {
                user_id: "user_id_1",
                action: KeyOrderActionStatus.ORDER_ACTION_SUBMITTED,
                comment: "comment 1",
                created_at: "2022-03-09T02:53:47.325755+00:00",
            },
            {
                user_id: "user_id_2",
                action: KeyOrderActionStatus.ORDER_ACTION_SUBMITTED,
                comment: "comment 2",
                created_at: "2022-03-09T02:53:47.325755+00:00",
            },
            {
                user_id: "user_id_3",
                action: KeyOrderActionStatus.ORDER_ACTION_SUBMITTED,
                comment: "comment 3",
                created_at: "2022-03-09T02:53:47.325755+00:00",
            },
            {
                user_id: "user_id_4",
                action: KeyOrderActionStatus.ORDER_ACTION_SUBMITTED,
                comment: "comment 4",
                created_at: "2022-03-09T02:53:47.325755+00:00",
            },
            {
                user_id: "user_id_5",
                action: KeyOrderActionStatus.ORDER_ACTION_SUBMITTED,
                comment: "comment 5",
                created_at: "2022-03-09T02:53:47.325755+00:00",
            },
        ];
    };

export const createMockMappedUseOrderActionLogListData =
    (): DataWithTotal<MappedUseOrderActionLogListReturn> => {
        return {
            data: {
                orderActionLogListData: createMockOrderActionLogList(),
                userIds: ["user_id_1", "user_id_2", "user_id_3", "user_id_4", "user_id_5"],
            },
            total: 5,
        };
    };
