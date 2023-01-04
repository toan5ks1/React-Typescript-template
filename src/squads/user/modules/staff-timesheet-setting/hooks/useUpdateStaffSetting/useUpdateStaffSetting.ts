import { useCallback } from "react";

import { Entities, NotifyTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { inferMutation } from "src/squads/user/service/infer-service";
import type { UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtStaffService } from "src/squads/user/service/usermgmt/staff-service-usermgmt/types";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export type UpdateMutationOptions = UseMutationOptions<
    NsUsermgmtStaffService.UpdateStaffSettingReq,
    NsUsermgmtStaffService.UpdateStaffSettingResp
>;

export interface UpdateStaffSettingProps {
    payload: NsUsermgmtStaffService.UpdateStaffSettingReq;
    options: UpdateMutationOptions;
}

export interface UseUpdateStaffSettingReturn {
    updateStaffSetting: (params: UpdateStaffSettingProps) => Promise<void>;
}

const useUpdateStaffSetting = () => {
    const t = useTranslate();
    const tStaff = useResourceTranslate(Entities.STAFF);
    const showSnackbar = useShowSnackbar();

    const { mutateAsync, isLoading } = inferMutation({
        entity: "staff",
        action: "userUpdateStaffSetting",
    })({
        onSuccess: () => {
            showSnackbar(
                `${t(
                    `ra.common.updatedSuccess`,
                    {
                        smart_count: tStaff("name"),
                    },
                    { lowercase: true }
                )}`,
                NotifyTypes.SUCCESS
            );
        },
    });

    const updateStaffSetting: UseUpdateStaffSettingReturn["updateStaffSetting"] = useCallback(
        async ({ payload, options }) => {
            try {
                await mutateAsync(payload, options);
            } catch (err) {
                window.warner?.error(`user UpdateStaffSetting failed`, err);
                const error = handleUnknownError(err);
                showSnackbar(
                    `${t("ra.common.updatedFail")} ${t(error.message || "")}`,
                    NotifyTypes.ERROR
                );
            }
        },
        [mutateAsync, showSnackbar, t]
    );

    return {
        updateStaffSetting,
        isLoading,
    };
};

export default useUpdateStaffSetting;
