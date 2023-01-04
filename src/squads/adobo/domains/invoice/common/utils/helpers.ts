import { merge } from "lodash";
import { MutationMenus } from "src/squads/adobo/domains/invoice/common/constants/enum";

import { Action, GetActionPropsReturn } from "src/components/Menus/ActionPanel/types";

const AllowedActions: { [x: string]: GetActionPropsReturn<MutationMenus> } = {
    [MutationMenus.INVOICE_DETAIL_VOID_INVOICE]: {
        actionType: MutationMenus.INVOICE_DETAIL_VOID_INVOICE,
    },
    [MutationMenus.INVOICE_DETAIL_ISSUE_INVOICE]: {
        actionType: MutationMenus.INVOICE_DETAIL_ISSUE_INVOICE,
    },
    [MutationMenus.INVOICE_DETAIL_EDIT_CREDIT_NOTE]: {
        actionType: MutationMenus.INVOICE_DETAIL_EDIT_CREDIT_NOTE,
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
