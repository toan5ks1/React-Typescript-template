import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { Features } from "src/squads/communication/common/constants/feature-keys";
import {
    Communication_UsersInfoNotificationsListQuery,
    UserNameByIdsQuery,
    UsersInfoNotificationsListQuery,
} from "src/squads/communication/service/bob/bob-types";
import { inferQuery, inferQueryPagination } from "src/squads/communication/service/infer-query";

import { DataWithTotal, PaginationWithTotal } from "@manabie-com/react-utils";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";

interface NotificationReceiptProps {
    id: string;
}

export interface UseNotificationReceiptReturn {
    notificationReceipt:
        | UsersInfoNotificationsListQuery["users_info_notifications"]
        | Communication_UsersInfoNotificationsListQuery["users_info_notifications"];
    studentNames?: UserNameByIdsQuery["users"];
    parentNames?: UserNameByIdsQuery["users"];
    loading: boolean;
    pagination: PaginationWithTotal;
}

export interface MappedUseNotificationReceiptIDsReturn {
    notificationReceipt:
        | Communication_UsersInfoNotificationsListQuery["users_info_notifications"]
        | UsersInfoNotificationsListQuery["users_info_notifications"];
    studentIds: string[];
    parentIds: string[];
}

const defaultMappedUseNotificationReceiptIdsDataReturn: DataWithTotal<MappedUseNotificationReceiptIDsReturn> =
    {
        data: {
            notificationReceipt: [],
            studentIds: [],
            parentIds: [],
        },
        total: 0,
    };

export const mappedUseNotificationReceipt = ({
    data,
    total,
}: DataWithTotal<
    | Communication_UsersInfoNotificationsListQuery["users_info_notifications"]
    | UsersInfoNotificationsListQuery["users_info_notifications"]
>): DataWithTotal<MappedUseNotificationReceiptIDsReturn> => {
    const studentIds = new Set<ArrayElement<MappedUseNotificationReceiptIDsReturn["studentIds"]>>();
    const parentIds = new Set<ArrayElement<MappedUseNotificationReceiptIDsReturn["parentIds"]>>();

    if (!data) return defaultMappedUseNotificationReceiptIdsDataReturn;

    data.forEach((receipt) => {
        if (receipt.parent_id) parentIds.add(receipt.parent_id);

        if (receipt.student_id) studentIds.add(receipt.student_id);
    });

    return {
        data: {
            notificationReceipt: data,
            studentIds: [...studentIds],
            parentIds: [...parentIds],
        },
        total,
    };
};

const useNotificationReceipt = ({ id }: NotificationReceiptProps): UseNotificationReceiptReturn => {
    const { isEnabled: isShowQuestionnaireColumn } = useFeatureToggle(
        Features.NOTIFICATION_QUESTIONNAIRE
    );

    const {
        result: { isLoading: isLoadingWithQuestionnaireStatus },
        data: useNotificationReceiptDataWithQuestionnaireStatus = defaultMappedUseNotificationReceiptIdsDataReturn,
        pagination: paginationWithQuestionnaireStatus,
    } = inferQueryPagination({
        entity: "usersInfoNotifications",
        action: "communicationGetRecipientListWithQuestionnaireStatus",
    })(
        { notification_id: id },
        {
            enabled: Boolean(id) && isShowQuestionnaireColumn,
            selector: mappedUseNotificationReceipt,
        }
    );

    const {
        result: { isLoading },
        data: useNotificationReceiptData = defaultMappedUseNotificationReceiptIdsDataReturn,
        pagination,
    } = inferQueryPagination({
        entity: "usersInfoNotifications",
        action: "communicationGetRecipientList",
    })(
        { notification_id: id },
        {
            enabled: Boolean(id) && !isShowQuestionnaireColumn,
            selector: mappedUseNotificationReceipt,
        }
    );

    const { notificationReceipt, studentIds, parentIds } = isShowQuestionnaireColumn
        ? useNotificationReceiptDataWithQuestionnaireStatus.data
        : useNotificationReceiptData.data;

    const { data: studentNames } = inferQuery({
        entity: "users",
        action: "communicationGetUsernames",
    })(
        {
            user_id: studentIds,
        },
        {
            enabled: arrayHasItem(studentIds),
            onError: (error) => {
                window.warner?.warn(`useNotificationReceipt notification studentNames`, error);
            },
        }
    );

    const { data: parentNames } = inferQuery({
        entity: "users",
        action: "communicationGetUsernames",
    })(
        {
            user_id: parentIds,
        },
        {
            enabled: arrayHasItem(parentIds),
            onError: (error) => {
                window.warner?.warn(`useNotificationReceipt notification parentNames`, error);
            },
        }
    );

    return {
        notificationReceipt,
        studentNames,
        parentNames,
        loading: isShowQuestionnaireColumn ? isLoadingWithQuestionnaireStatus : isLoading,
        pagination: isShowQuestionnaireColumn ? paginationWithQuestionnaireStatus : pagination,
    };
};

export default useNotificationReceipt;
