import {
    NotifyUnreadUser,
    DiscardNotification,
    SendNotification,
    UpsertNotificationProps,
} from "src/squads/communication/common/constants/types";
import inferMutation from "src/squads/communication/service/infer-mutation";
import { infoNotificationsMgmtService } from "src/squads/communication/service/notificationmgmt/info-notifications-notificationmgmt-service/info-notifications-notificationmgmt-service";
import { createMockNotificationDraftCreated } from "src/squads/communication/test-utils/notification";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import {
    DiscardNotificationResponse,
    NotifyUnreadUserResponse,
    SendNotificationResponse,
    UpsertNotificationResponse,
} from "manabuf/yasuo/v1/notifications_pb";

import { MutationParams, UseMutationOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";
import useNotificationMutation from "src/squads/communication/pages/Notification/hooks/useNotificationMutation";

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/service/infer-mutation", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const notificationDraftCreated = createMockNotificationDraftCreated();

describe("useNotificationMutation call onSuccess", () => {
    const showSnackbar = jest.fn();

    it("should call snackbar with success message of onResend, onDiscard and onSend", async () => {
        (inferMutation as jest.Mock).mockImplementation(
            (resource: {
                    entity: "infoNotification";
                    action: keyof typeof infoNotificationsMgmtService["mutation"];
                }) =>
                (
                    options?: UseMutationOptions<
                        | MutationParams<NotifyUnreadUser>
                        | MutationParams<DiscardNotification>
                        | MutationParams<SendNotification>
                        | MutationParams<UpsertNotificationProps>,
                        | NotifyUnreadUserResponse.AsObject
                        | UpsertNotificationResponse.AsObject
                        | DiscardNotificationResponse.AsObject
                        | SendNotificationResponse.AsObject
                    >
                ) => {
                    switch (resource.action) {
                        case "communicationResendNotification":
                            return {
                                mutate: jest.fn(
                                    async (params: MutationParams<NotifyUnreadUser>) => {
                                        await options?.onSuccess?.(params, {}, undefined);
                                    }
                                ),
                            };

                        case "communicationDeleteNotification":
                            return {
                                mutateAsync: jest.fn(
                                    async (params: MutationParams<DiscardNotification>) => {
                                        await options?.onSuccess?.(params, {}, undefined);
                                    }
                                ),
                            };

                        case "communicationSendNotification":
                            return {
                                mutateAsync: jest.fn(
                                    async (params: MutationParams<SendNotification>) => {
                                        await options?.onSuccess?.(params, {}, undefined);
                                    }
                                ),
                            };

                        case "communicationUpsertNotification":
                            return {
                                mutateAsync: jest.fn(
                                    async (
                                        params: MutationParams<UpsertNotificationProps>,
                                        opt?: UseMutationOptions<
                                            MutationParams<UpsertNotificationProps>,
                                            UpsertNotificationResponse.AsObject
                                        >
                                    ) => {
                                        await opt?.onSuccess?.(
                                            { notificationId: "notification_id_1" },
                                            params,
                                            undefined
                                        );
                                    }
                                ),
                            };

                        default:
                            break;
                    }

                    return { mutateAsync: jest.fn() };
                }
        );

        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);

        const {
            result: {
                current: { onResend, onDiscard, onSend, onUpsert },
            },
        } = renderHook(() => useNotificationMutation());

        // Resend
        onResend({ data: { notificationId: "notification_id_1" } });
        expect(showSnackbar).toBeCalledWith("ra.common.resendSuccess");

        // Discard
        await onDiscard({ data: { notificationId: "notification_id_1" } });
        expect(showSnackbar).toBeCalledWith("ra.common.deleteSuccess!");

        // Send
        await onSend({ data: { notificationId: "notification_id_1" } });
        expect(showSnackbar).toBeCalledWith("ra.common.sendSuccess!");

        const onClose = jest.fn();

        // CREATE without show message
        await onUpsert({
            data: { ...notificationDraftCreated, notificationId: "notification_id1" },
            shouldShowCreateNotificationNotify: false,
            shouldShowEditSuccess: false,
            onClose,
        });

        expect(showSnackbar).not.toBeCalledWith(`ra.common.createdSuccess!`);
        expect(onClose).toBeCalled();

        // CREATE

        await onUpsert({
            data: notificationDraftCreated,
            shouldShowEditSuccess: false,
            onClose,
        });

        expect(showSnackbar).toBeCalledWith(`ra.common.createdSuccess!`);
        expect(onClose).toBeCalled();

        // EDIT
        await onUpsert({
            data: { ...notificationDraftCreated, notificationId: "notification_id1" },
            shouldShowEditSuccess: true,
            onClose,
        });

        expect(showSnackbar).toBeCalledWith(`ra.common.editedSuccess!`);
        expect(onClose).toBeCalled();
    });
});

describe("useNotificationMutation call onError", () => {
    const showSnackbar = jest.fn();
    const std = mockWarner();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should call snackbar with error message of onResend and onSend", async () => {
        (inferMutation as jest.Mock).mockImplementation(
            (resource: {
                    entity: "infoNotification";
                    action: keyof typeof infoNotificationsMgmtService["mutation"];
                }) =>
                (
                    options: UseMutationOptions<
                        | MutationParams<NotifyUnreadUser>
                        | MutationParams<DiscardNotification>
                        | MutationParams<SendNotification>,
                        | NotifyUnreadUserResponse.AsObject
                        | DiscardNotificationResponse.AsObject
                        | SendNotificationResponse.AsObject
                    >
                ) => {
                    switch (resource.action) {
                        case "communicationResendNotification":
                            return {
                                mutate: jest.fn(
                                    async (params: MutationParams<NotifyUnreadUser>) => {
                                        await options?.onError?.(
                                            Error("ERROR communicationResendNotification"),
                                            params,
                                            undefined
                                        );
                                    }
                                ),
                            };

                        case "communicationDeleteNotification":
                            return {
                                mutateAsync: jest.fn(
                                    async (params: MutationParams<DiscardNotification>) => {
                                        await options?.onError?.(
                                            Error("ERROR DISCARD_NOTIFICATION"),
                                            params,
                                            undefined
                                        );
                                    }
                                ),
                            };

                        case "communicationSendNotification":
                            return {
                                mutateAsync: jest.fn(
                                    async (params: MutationParams<SendNotification>) => {
                                        await options?.onError?.(
                                            Error("ERROR communicationSendNotification"),
                                            params,
                                            undefined
                                        );
                                    }
                                ),
                            };

                        default:
                            break;
                    }

                    return { mutateAsync: jest.fn() };
                }
        );

        const {
            result: {
                current: { onResend, onDiscard, onSend },
            },
        } = renderHook(() => useNotificationMutation());

        // Resend
        onResend({ data: { notificationId: "" } });
        expect(showSnackbar).toBeCalledWith("ra.common.resendFail", "error");
        expect(std.warn).toBeCalledWith(
            "useNotificationMutation Resend action failed",
            Error("ERROR communicationResendNotification")
        );

        // Discard
        await onDiscard({ data: { notificationId: "" } });
        expect(showSnackbar).toBeCalledWith("ERROR DISCARD_NOTIFICATION", "error");
        expect(std.warn).toBeCalledWith(
            "useNotificationMutation Discard action failed",
            "ERROR DISCARD_NOTIFICATION"
        );

        // Send
        await onSend({ data: { notificationId: "" } });
        expect(showSnackbar).toBeCalledWith("ERROR communicationSendNotification", "error");
        expect(std.warn).toBeCalledWith(
            "useNotificationMutation Send action failed",
            "ERROR communicationSendNotification"
        );
    });

    it("should not call onClose when the message is cantSchedulePastTimeNotification of onUpsert", async () => {
        const onClose = jest.fn();
        (inferMutation as jest.Mock).mockImplementation(
            (resource: {
                    entity: "infoNotification";
                    action: keyof typeof infoNotificationsMgmtService["mutation"];
                }) =>
                (
                    options: UseMutationOptions<
                        MutationParams<NotifyUnreadUser> | MutationParams<UpsertNotificationProps>,
                        NotifyUnreadUserResponse.AsObject | UpsertNotificationResponse.AsObject
                    >
                ) => {
                    switch (resource.action) {
                        case "communicationResendNotification":
                            return {
                                mutate: jest.fn(
                                    async (params: MutationParams<NotifyUnreadUser>) => {
                                        await options?.onError?.(
                                            Error("ERROR communicationResendNotification"),
                                            params,
                                            undefined
                                        );
                                    }
                                ),
                            };

                        case "communicationUpsertNotification":
                            return {
                                mutateAsync: () => {
                                    throw Error(
                                        "ra.manabie-error.specified.cantSchedulePastTimeNotification"
                                    );
                                },
                            };

                        default:
                            break;
                    }

                    return { mutateAsync: jest.fn() };
                }
        );

        const {
            result: {
                current: { onUpsert },
            },
        } = renderHook(() => useNotificationMutation());

        await onUpsert({
            data: notificationDraftCreated,
            onClose,
        });

        expect(showSnackbar).toBeCalledWith(
            "ra.manabie-error.specified.cantSchedulePastTimeNotification",
            "error"
        );

        expect(std.warn).toBeCalledWith(
            "useNotificationMutation Upsert action failed",
            "ra.manabie-error.specified.cantSchedulePastTimeNotification"
        );

        expect(onClose).not.toBeCalled();
    });

    it("should handle show error with shouldShowCreateNotificationNotify error message of onUpsert", async () => {
        const onClose = jest.fn();
        (inferMutation as jest.Mock).mockImplementation(
            (resource: {
                    entity: "infoNotification";
                    action: keyof typeof infoNotificationsMgmtService["mutation"];
                }) =>
                (
                    options: UseMutationOptions<
                        MutationParams<NotifyUnreadUser> | MutationParams<UpsertNotificationProps>,
                        NotifyUnreadUserResponse.AsObject | UpsertNotificationResponse.AsObject
                    >
                ) => {
                    switch (resource.action) {
                        case "communicationResendNotification":
                            return {
                                mutate: jest.fn(
                                    async (params: MutationParams<NotifyUnreadUser>) => {
                                        await options?.onError?.(
                                            Error("ERROR communicationResendNotification"),
                                            params,
                                            undefined
                                        );
                                    }
                                ),
                            };

                        case "communicationUpsertNotification":
                            return {
                                mutateAsync: () => {
                                    throw Error("ERROR communicationUpsertNotification");
                                },
                            };

                        default:
                            break;
                    }

                    return { mutateAsync: jest.fn() };
                }
        );

        const {
            result: {
                current: { onUpsert },
            },
        } = renderHook(() => useNotificationMutation());

        // call warner
        await onUpsert({
            data: notificationDraftCreated,
            shouldShowCreateNotificationNotify: false,
            onClose,
        });

        expect(showSnackbar).not.toBeCalledWith("ERROR communicationUpsertNotification", "error");

        expect(std.warn).toBeCalledWith(
            "useNotificationMutation Upsert action failed",
            "ERROR communicationUpsertNotification"
        );

        expect(onClose).toBeCalled();

        // call warner and snackbar
        await onUpsert({
            data: notificationDraftCreated,
            onClose,
        });

        expect(showSnackbar).toBeCalledWith("ERROR communicationUpsertNotification", "error");

        expect(std.warn).toBeCalledWith(
            "useNotificationMutation Upsert action failed",
            "ERROR communicationUpsertNotification"
        );

        expect(onClose).toBeCalled();
    });
});
