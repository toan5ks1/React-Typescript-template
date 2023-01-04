import { useForm } from "react-hook-form";
import { ERPModules, ModeOpenDialog } from "src/common/constants/enum";
import type { UserGroupInfo } from "src/squads/user/common/types/user-group";

import { FormUserGroupInfo } from "./components/FormUserGroupInfo";
import { Box } from "@mui/material";
import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";

import useUpsertUserGroup from "./hooks/useUpsertUserGroup";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface UserGroupUpsertProps {
    open: boolean;
    mode: ModeOpenDialog;
    userGroup?: UserGroupInfo;
    onClose: () => void;
    onSuccess: () => void;
}

export const UserGroupUpsert = (props: UserGroupUpsertProps) => {
    const { open, mode, userGroup, onSuccess, onClose } = props;

    const t = useTranslate();

    const tUserGroup = useResourceTranslate(ERPModules.USER_GROUP);

    const methods = useForm<UserGroupInfo>({
        defaultValues:
            mode === ModeOpenDialog.EDIT
                ? {
                      id: userGroup?.id,
                      name: userGroup?.name,
                      grantedPermissionPackage: userGroup?.grantedPermissionPackage,
                  }
                : {},
        mode: "onSubmit",
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;

    const { upsertUserGroup } = useUpsertUserGroup({ mode });
    const onSubmit = async (data: UserGroupInfo) => {
        await upsertUserGroup(data, {
            onSuccess: () => {
                onSuccess();
                onClose();
            },
        });
    };

    return (
        <DialogFullScreenHF
            title={tUserGroup(
                mode === ModeOpenDialog.ADD ? "titles.addUserGroup" : "titles.editUserGroup"
            )}
            open={open}
            onClose={onClose}
            onSave={handleSubmit(onSubmit)}
            methods={methods}
            isShowingBackdrop={isSubmitting}
            footerConfirmButtonProps={{ disabled: isSubmitting }}
            dialogCancelConfirmProps={{
                textSave: t("ra.action.leave"),
            }}
        >
            <PaperSectionWrapper>
                <FormUserGroupInfo />
            </PaperSectionWrapper>
            <Box pb={2} />
        </DialogFullScreenHF>
    );
};
