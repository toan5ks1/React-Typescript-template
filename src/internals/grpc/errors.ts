import { convertString } from "src/common/constants/helper";
import { safeStringify } from "src/common/utils/other";

import { AppError, IErrorBoundary } from "../errors";
import { manabieWindowEvent } from "../manabie-event";

export const grpcErrorsMap = {
    INVALID_PARAMS: "ra.manabie-error.invalid_params",
    UNKNOWN: "ra.manabie-error.unknown",
    NOT_FOUND: "ra.manabie-error.not_found",
    DEADLINE_EXCEEDED: "ra.manabie-error.deadline_exceeded",
    ALREADY_EXISTS: "ra.manabie-error.already_exists",
    PERMISSION_DENIED: "ra.manabie-error.permission_denied",
    FAILED_PRECONDITION: "ra.manabie-error.failed_precondition",
    INTERNAL: "ra.manabie-error.internals",
    DISCONNECT: "ra.manabie-error.disconnect",
    NOT_AUTHENTICATED: "ra.manabie-error.not_authenticated",
    INVALID_JWT: "ra.manabie-error.jwt_invalid",
    CONNECTION: "ra.manabie-error.connection",
    NO_INTERNET: "ra.manabie-error.connection",
    RESOURCE_EXHAUSTED: "ra.manabie-error.receivedMessageLargerThanMax",
};

export const errorCodesMapExt: Record<string, string> = {
    "already joined this class": "already_join_this_class",
    "is exist in Firebase": "email_is_exist_in_db",
    "can not create user with emails exist in db": "email_is_exist_in_db",
    "can not create user with phone number exist in db": "phone_is_exist_in_db",
    "cannot find users": "can_not_find_users",
    "owner must be teacher": "owner_must_be_teachers",
    "cannot find class": "can_not_find_class",
    "invalid classCode": "can_not_find_class",
    "cannot handle class of other school": "can_not_handle_class_other_school",
    "user does not exist": "user_not_found",
    "teacher ids cannot be empty": "teacher_is_missing",
    "chunk size over limited": "fileIsTooLarge",
    "no data in csv file": "csvFileIsEmpty",
    "The policy key provided does not permit this account or video, or the requested resource is inactive.":
        "brightcoveVideoIsBeingProcessed",
    // Notification squad error messages
    "the notification has been sent, you can no longer edit this notification":
        "cantEditSentNotification",
    "the notification has been sent, you can no longer discard this notification":
        "cantDiscardSentNotification",
    "the notification has been sent": "cantSendSentNotification",
    "the notification has been deleted, you can no longer edit this notification":
        "cantEditDiscardedNotification",
    "the notification has been deleted, you can no longer send this notification":
        "cantSendDiscardedNotification",
    "the notification has been deleted": "cantDiscardDeletedNotification",
    "you cannot schedule at a time in the past": "cantSchedulePastTimeNotification",
    "validateUpsertNotificationRequest: you cannot set expiration date of questionnaire at a time in the past":
        "cantScheduleInvalidTimeNotification",
    "validateUpsertNotificationRequest: you cannot set the expiration date of a questionnaire at a time before notification's schedule time":
        "cantScheduleInvalidTimeNotification",
    "ExecInTxWithRetry: send notification for users: s.NotificationService.SendToken multi-tenant: The registration token is not a valid FCM":
        "cantSentNotificationWithInvalidToken",
    "TagName is exist": "tagNameIsExist",
    "TagName is empty": "tagNameIsEmpty",
    // entry & exit
    "please wait after 1 min to scan again": "scan_again_later",
    "err FindByID StudentQR: no rows in result set": "invalid_student_qr",
    // Payment squad error messages
    "the discount is not available": "orderMismatch",
    "This tax category isn't support in this order version": "orderMismatch",
};

export const errorRegexMapExt: Record<string, string> = {
    // Payment squad error messages
    "These products with id \\S+ not yet support in payment": "orderMismatch",
    "Price of product with id \\S+ is not existed in system": "orderMismatch",
    "Product with id \\S+ change discount type from \\S+ to \\S+": "orderMismatch",
    "Product with id \\S+ change discount amount type from \\S+ to \\S+": "orderMismatch",
    "Product with id \\S+ change discount amount value from \\S+ to \\S+": "orderMismatch",
    "Discount amount is wrong actual = \\S+ vs desire = \\S+": "orderMismatch",
    "Product with id \\S+ change tax category from \\S+ to \\S+": "orderMismatch",
    "Product with id %v change tax percentage from \\S+ to \\S+": "orderMismatch",
    "Tax amount is wrong actual = \\S+ vs desire = \\S+": "orderMismatch",
    "Wrong to calculate final price actual = \\S+ vs expect = \\S+": "orderMismatch",
};

export function getGrpcErrorMsg(code?: number) {
    switch (code) {
        case 3:
            return grpcErrorsMap.INVALID_PARAMS;
        case 4:
            return grpcErrorsMap.DEADLINE_EXCEEDED;
        case 5:
            return grpcErrorsMap.NOT_FOUND;
        case 6:
            return grpcErrorsMap.ALREADY_EXISTS;
        case 7:
            return grpcErrorsMap.PERMISSION_DENIED;
        case 8: //received message larger than max
            return grpcErrorsMap.RESOURCE_EXHAUSTED;
        case 2:
        case 13:
            return grpcErrorsMap.INTERNAL;
        case 14:
            return grpcErrorsMap.NO_INTERNET;
        case 16:
            //token expired
            return grpcErrorsMap.NOT_AUTHENTICATED;
        default:
            return grpcErrorsMap.UNKNOWN;
    }
}

export const isNetworkError = (message: string, code: number): boolean => {
    return message === "Http response at 400 or 500 level" && code === 2;
};

const networkErrorKey = (message: string, code: number): string => {
    return isNetworkError(message, code) ? "ra.common.cannotLoadPage" : "";
};

export interface GrpcErrorOptions {
    onCritical?: (err: GrpcErrorParams) => void;
}

export type GrpcErrorParams = {
    message: string;
    code: number;
};

export class GrpcError extends AppError {
    originMessage: string;
    code?: number;
    name = "Grpc";

    toString() {
        const errorObj = {
            originMessage: this.originMessage,
            code: this.code,
            name: this.name,
        };

        return safeStringify(errorObj);
    }

    constructor({ message, code }: GrpcErrorParams, options?: GrpcErrorOptions) {
        super(getGrpcErrorMsg(code));
        this.originMessage = message;
        this.code = code;

        if (typeof Error.captureStackTrace === "function") {
            Error.captureStackTrace(this, this.constructor);
        }

        if (isNetworkError(message, code)) {
            const props: IErrorBoundary = {
                error: {
                    name: networkErrorKey(message, code),
                    message,
                },
                errorInfo: {
                    componentStack: convertString(this.originMessage),
                },
            };

            manabieWindowEvent.dispatchEvent("manabie/network-error", {
                detail: {
                    code,
                    props,
                },
            });
        }

        this.message = getGrpcErrorMsg(code);

        const isCriticalErr =
            this.message === grpcErrorsMap.NOT_AUTHENTICATED ||
            this.message === grpcErrorsMap.ALREADY_EXISTS ||
            this.message === grpcErrorsMap.PERMISSION_DENIED;

        if (isCriticalErr && options && options.onCritical) {
            options.onCritical({ message, code });
        }

        // extended errors return from backend
        const msg = Object.keys(errorCodesMapExt).find((e) => this.originMessage!.includes(e));
        if (msg) {
            this.message = `ra.manabie-error.specified.${errorCodesMapExt[msg]}`;
        }

        // extended errors regex return from backend
        const regexMsg = Object.keys(errorRegexMapExt).find((e) => {
            const regex = new RegExp(e);
            return regex.test(message);
        });

        if (regexMsg) {
            this.message = `ra.manabie-error.specified.${errorRegexMapExt[regexMsg]}`;
        }
    }
}
