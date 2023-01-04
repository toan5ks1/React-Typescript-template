import { useCallback } from "react";

import { MutationMenus, NotifyActions, NotifyTypes } from "src/common/constants/enum";

import useShowSnackbar from "../useShowSnackbar";
import useTranslate from "../useTranslate";

interface NotifyFormProps {
    entityName: string;
    action: MutationMenus;
    shouldLowercase?: boolean;
}
export interface NotifyFormReturn {
    (type: NotifyActions, record: object, reason?: string): void;
}

export type MessageCommonType = {
    [x in MutationMenus]?: string;
};

export const SuccessMessageCommon: MessageCommonType = {
    [MutationMenus.CREATE]: "ra.common.createdSuccess",
    [MutationMenus.EDIT]: "ra.common.updatedSuccess",
};

export const FailMessageCommon: MessageCommonType = {
    [MutationMenus.CREATE]: "ra.common.createdFail",
    [MutationMenus.EDIT]: "ra.common.updatedFail",
};

const useNotifyForm = ({ shouldLowercase = true, ...props }: NotifyFormProps): NotifyFormReturn => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return useCallback(
        (type: NotifyActions, _record: object, reason: string = "") => {
            switch (type) {
                case NotifyActions.SUCCESS: {
                    return showSnackbar(
                        t(
                            SuccessMessageCommon[props.action!]!,
                            {
                                smart_count: props.entityName,
                            },
                            { lowercase: shouldLowercase }
                        )
                    );
                }

                case NotifyActions.FAILURE:
                    return showSnackbar(
                        `${t(FailMessageCommon[props.action!]!)} ${t(reason)}`,
                        NotifyTypes.ERROR
                    );
                default: {
                    return;
                }
            }
        },
        [props.entityName, showSnackbar, props.action, shouldLowercase, t]
    );
};
export default useNotifyForm;
