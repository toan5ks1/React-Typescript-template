import { useCallback } from "react";

import { ERPModules, ModeOpenDialog, NotifyTypes } from "src/common/constants/enum";
import { handleUnknownError } from "src/common/utils/error";
import { UserGroupInfo } from "src/squads/user/common/types/user-group";
import { inferMutation } from "src/squads/user/service/infer-service";
import type { UseMutationOptions } from "src/squads/user/service/service-creator";
import { NsUsermgmtUserGroupService } from "src/squads/user/service/usermgmt/user-group-service-user-mgmt/types";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface UseUpsertUserGroupProps {
    mode: ModeOpenDialog;
}
export interface UseUpsertUserGroupReturn {
    upsertUserGroup: (
        data: UserGroupInfo,
        option: UseMutationOptions<
            | NsUsermgmtUserGroupService.CreateUserGroupReq
            | NsUsermgmtUserGroupService.UpdateUserGroupReq,
            | NsUsermgmtUserGroupService.CreateUserGroupResp
            | NsUsermgmtUserGroupService.UpdateUserGroupResp
        >
    ) => Promise<void>;
}
const useUpsertUserGroup = ({ mode }: UseUpsertUserGroupProps) => {
    const t = useTranslate();
    const tUserGroup = useResourceTranslate(ERPModules.USER_GROUP);
    const showSnackbar = useShowSnackbar();

    const isAddMode = mode === ModeOpenDialog.ADD;

    const { mutateAsync } = inferMutation({
        entity: "userGroup",
        action: isAddMode ? "userCreateUserGroup" : "userUpdateUserGroup",
    })({
        onSuccess: (resp) => {
            if ("successful" in resp && !resp.successful)
                showSnackbar(t("ra.common.updatedFail"), NotifyTypes.ERROR);
            showSnackbar(
                `${
                    isAddMode
                        ? tUserGroup("messages.success.addUserGroup")
                        : tUserGroup("messages.success.updateUserGroup")
                }`,
                NotifyTypes.SUCCESS
            );
        },
    });

    const upsertUserGroup: UseUpsertUserGroupReturn["upsertUserGroup"] = useCallback(
        async (data, options) => {
            try {
                const { id, name, grantedPermissionPackage } = data;
                const roleWithLocationsList = grantedPermissionPackage.map((p) => {
                    return {
                        roleId: p.role.role_id,
                        locationIdsList: p.locations.map((l) => l.locationId),
                    };
                });
                const payload:
                    | NsUsermgmtUserGroupService.CreateUserGroupReq
                    | NsUsermgmtUserGroupService.UpdateUserGroupReq = isAddMode
                    ? {
                          userGroupName: name.trim(),
                          roleWithLocationsList,
                      }
                    : {
                          userGroupId: id,
                          userGroupName: name.trim(),
                          roleWithLocationsList,
                      };

                await mutateAsync(payload, options);
            } catch (err) {
                const message =
                    mode === ModeOpenDialog.ADD ? "ra.common.createdFail" : "ra.common.updatedFail";
                const error = handleUnknownError(err);
                showSnackbar(`${t(message)}.${t(error.message || "")}`, NotifyTypes.ERROR);
                window.warner?.error(`user group failed`, err);
            }
        },
        [isAddMode, mode, mutateAsync, showSnackbar, t]
    );
    return {
        upsertUserGroup,
    };
};
export default useUpsertUserGroup;
