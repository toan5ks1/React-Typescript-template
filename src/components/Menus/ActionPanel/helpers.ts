import { merge } from "lodash";
import { MutationMenus } from "src/common/constants/enum";

import { Action, GetActionPropsReturn } from "./types";

//Action options
export const AllowedActions: { [x: string]: GetActionPropsReturn<MutationMenus> } = {
    [MutationMenus.DUPLICATE]: {
        actionType: MutationMenus.DUPLICATE,
        label: "ra.common.action.duplicate",
    },
    [MutationMenus.MOVE_UP]: {
        actionType: MutationMenus.MOVE_UP,
        label: "ra.common.action.moveUp",
    },
    [MutationMenus.MOVE_DOWN]: {
        actionType: MutationMenus.MOVE_DOWN,
        label: "ra.common.action.moveDown",
    },
    [MutationMenus.EDIT]: {
        actionType: MutationMenus.EDIT, //should be same as the object key
        label: "ra.common.action.edit",
    },
    [MutationMenus.DELETE]: {
        actionType: MutationMenus.DELETE,
        label: "ra.common.action.delete",
        withConfirm: true,
    },
    [MutationMenus.DETAIL]: {
        actionType: MutationMenus.DETAIL,
        label: "ra.common.action.detail",
    },
    [MutationMenus.DOWNLOAD]: {
        actionType: MutationMenus.DOWNLOAD,
        label: "ra.common.action.download",
        labelOptions: { smart_count: 2, extension: "CSV" },
    },
    [MutationMenus.UPLOAD_FILE]: {
        actionType: MutationMenus.UPLOAD_FILE,
        label: "ra.common.action.uploadFile",
    },
    [MutationMenus.RENAME]: {
        actionType: MutationMenus.RENAME,
        label: "ra.common.action.rename",
    },
    [MutationMenus.UPDATE]: {
        actionType: MutationMenus.UPDATE,
        label: "ra.common.action.update",
    },
    [MutationMenus.ARCHIVE]: {
        actionType: MutationMenus.ARCHIVE,
        label: "ra.common.action.archive",
    },
    [MutationMenus.UNARCHIVE]: {
        actionType: MutationMenus.UNARCHIVE,
        label: "ra.common.action.unarchive",
    },
    [MutationMenus.RE_ISSUE_PASSWORD]: {
        actionType: MutationMenus.RE_ISSUE_PASSWORD,
        label: "ra.common.action.reIssuePassword",
    },
    [MutationMenus.REMOVE]: {
        actionType: MutationMenus.REMOVE,
        label: "ra.common.action.remove",
    },
    [MutationMenus.PRINT_AS_STUDENT_CARD]: {
        actionType: MutationMenus.PRINT_AS_STUDENT_CARD,
        label: "ra.common.action.printAsStudentCard",
    },
    [MutationMenus.PRINT_AS_QR_CODE_SHEET]: {
        actionType: MutationMenus.PRINT_AS_QR_CODE_SHEET,
        label: "ra.common.action.printAsQrCodeSheet",
    },
    [MutationMenus.DOWNLOAD_STUDENT_QR_URLS]: {
        actionType: MutationMenus.DOWNLOAD_STUDENT_QR_URLS,
        label: "ra.common.action.downloadStudentQrUrls",
    },
    [MutationMenus.IMPORT_PARENTS]: {
        actionType: MutationMenus.IMPORT_PARENTS,
        label: "ra.common.action.importParents",
    },
    [MutationMenus.PAYMENT_CREATE_NEW_ORDER]: {
        actionType: MutationMenus.PAYMENT_CREATE_NEW_ORDER,
        label: "ra.common.action.createNewOrder",
    },
    [MutationMenus.PAYMENT_CREATE_ENROLLMENT_ORDER]: {
        actionType: MutationMenus.PAYMENT_CREATE_ENROLLMENT_ORDER,
        label: "ra.common.action.createEnrollmentOrder",
    },
    [MutationMenus.PAYMENT_CREATE_BULK_ORDER]: {
        actionType: MutationMenus.IMPORT_PARENTS,
        label: "ra.common.action.createBulkOrder",
    },
    [MutationMenus.PAYMENT_CREATE_CUSTOM_BILLING_ORDER]: {
        actionType: MutationMenus.PAYMENT_CREATE_CUSTOM_BILLING_ORDER,
        label: "ra.common.action.createCustomBillingOrder",
    },
};

export function getActionProps<T = MutationMenus>(action: Action<T>): GetActionPropsReturn<T> {
    const actionType = typeof action === "string" ? action : action.action;
    const fallback: GetActionPropsReturn<T> = {
        actionType: actionType as T,
        ...(typeof action === "string" ? {} : action),
    };
    const predefined = AllowedActions[actionType as string];

    if (predefined) {
        return merge({}, predefined, fallback); //If we don't use shadow object, it will be changed all allowedActions object
    }

    return merge(fallback, action);
}
