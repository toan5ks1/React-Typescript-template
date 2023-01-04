import { useCallback } from "react";

import { UseMutateFunction } from "react-query";
import { handleUnknownError } from "src/common/utils/error";
import {
    UpsertNotificationProps,
    DiscardNotification,
    SendNotification,
    NotifyUnreadUser,
} from "src/squads/communication/common/constants/types";
import { checkErrorIfShouldCloseComposeDialog } from "src/squads/communication/common/utils/utils";
import inferMutation from "src/squads/communication/service/infer-mutation";

import {
    DiscardNotificationResponse,
    NotifyUnreadUserResponse,
    SendNotificationResponse,
    UpsertNotificationResponse,
} from "manabuf/yasuo/v1/notifications_pb";

import { MutationParams } from "@manabie-com/react-utils";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useTranslate from "src/squads/communication/hooks/useTranslate";

export type UpsertNotificationParams = {
    data: UpsertNotificationProps;
    shouldShowCreateNotificationNotify?: boolean;
    shouldShowEditSuccess?: boolean;
    onClose?: () => void;
};

export type UseNotificationMutationReturn = {
    onResend: UseMutateFunction<
        NotifyUnreadUserResponse.AsObject,
        Error,
        MutationParams<NotifyUnreadUser>
    >;

    onDiscard: ({
        data,
    }: MutationParams<DiscardNotification>) => Promise<DiscardNotificationResponse.AsObject>;

    onSend: ({
        data,
    }: MutationParams<SendNotification>) => Promise<SendNotificationResponse.AsObject>;

    onUpsert: ({
        data,
        shouldShowCreateNotificationNotify,
        shouldShowEditSuccess,
        onClose,
    }: UpsertNotificationParams) => Promise<UpsertNotificationResponse.AsObject>;
};

const useNotificationMutation = (): UseNotificationMutationReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { mutate: onResend } = inferMutation({
        entity: "infoNotificationsMgmt",
        action: "communicationResendNotification",
    })({
        onSuccess: () => {
            showSnackbar(t("ra.common.resendSuccess"));
        },
        onError: (error) => {
            showSnackbar(t("ra.common.resendFail"), "error");
            window.warner?.warn("useNotificationMutation Resend action failed", error);
        },
    });

    const { mutateAsync: onDiscard } = inferMutation({
        entity: "infoNotificationsMgmt",
        action: "communicationDeleteNotification",
    })({
        onSuccess: () => {
            showSnackbar(
                `${t(
                    "ra.common.deleteSuccess",
                    {
                        smart_count: t("resources.notifications.name"),
                    },
                    { lowercase: true }
                )}!`
            );
        },
        onError: (error) => {
            showSnackbar(t(error.message), "error");
            window.warner?.warn("useNotificationMutation Discard action failed", error.message);
        },
    });

    const { mutateAsync: onSend } = inferMutation({
        entity: "infoNotificationsMgmt",
        action: "communicationSendNotification",
    })({
        onSuccess: () => {
            showSnackbar(
                `${t(
                    "ra.common.sendSuccess",
                    {
                        smart_count: t("resources.notifications.name"),
                    },
                    { lowercase: true }
                )}!`
            );
        },
        onError: (error) => {
            showSnackbar(t(error.message), "error");
            window.warner?.warn("useNotificationMutation Send action failed", error.message);
        },
    });

    const useUpsertNotification = inferMutation({
        entity: "infoNotificationsMgmt",
        action: "communicationUpsertNotification",
    });

    const { mutateAsync: upsertNotification } = useUpsertNotification();

    const onUpsert = useCallback(
        async ({
            data,
            shouldShowCreateNotificationNotify = true,
            shouldShowEditSuccess,
            onClose,
        }: UpsertNotificationParams) => {
            let result: UpsertNotificationResponse.AsObject = { notificationId: "" };

            try {
                result = await upsertNotification(
                    { data },
                    {
                        onSuccess: () => {
                            onClose && onClose();

                            if (shouldShowCreateNotificationNotify) {
                                const message = `ra.common.${
                                    shouldShowEditSuccess ? "editedSuccess" : "createdSuccess"
                                }`;

                                showSnackbar(
                                    `${t(
                                        message,
                                        {
                                            smart_count: t("resources.notifications.name"),
                                        },
                                        { lowercase: true }
                                    )}!`
                                );
                            }
                        },
                    }
                );
            } catch (err) {
                const error = handleUnknownError(err);
                window.warner?.warn("useNotificationMutation Upsert action failed", error.message);

                if (shouldShowCreateNotificationNotify) {
                    showSnackbar(t(error.message), "error");
                }

                if (checkErrorIfShouldCloseComposeDialog(error)) onClose && onClose();
            }

            return result;
        },
        [showSnackbar, t, upsertNotification]
    );

    return { onResend, onDiscard, onSend, onUpsert };
};

export default useNotificationMutation;
