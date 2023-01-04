import { useForm } from "react-hook-form";
import { Entities, ModeOpenDialog, NotifyTypes } from "src/common/constants/enum";
import { convertString } from "src/common/constants/helper";
import { MicroFrontendTypes } from "src/routing/type";
import { UpsertStaffFormProps } from "src/squads/user/common/types";
import { Teacher, Staff } from "src/squads/user/service/bob/user-service-bob/types";

import { StaffForm } from "./components/StaffForm";
import DialogFullScreenHF from "src/components/Dialogs/DialogFullScreenHF";
import PaperSectionWrapper from "src/components/Papers/PaperSectionWrapper";

import useUpsertStaff from "./hooks/useUpsertStaff";

import useRedirect from "src/squads/user/hooks/useRedirect";
import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface StaffUpsertProps {
    mode: ModeOpenDialog;
    open: boolean;
    onClose: () => void;
    onSave: () => void;
    defaultValues?: Teacher | Staff;
}

const StaffUpsert = ({ open, onClose, onSave, defaultValues, mode }: StaffUpsertProps) => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    let staffId, name, email: string | undefined;
    let userGroupsList: UpsertStaffFormProps["userGroupsList"] = [];
    if (defaultValues && "teacher_id" in defaultValues) {
        staffId = convertString(defaultValues?.teacher_id);
        name = convertString(defaultValues?.users?.name);
        email = convertString(defaultValues?.users?.email);
    } else if (defaultValues && "staff_id" in defaultValues) {
        staffId = convertString(defaultValues?.staff_id);
        name = convertString(defaultValues?.user?.name);
        email = convertString(defaultValues?.user?.email);
        userGroupsList =
            mode === ModeOpenDialog.EDIT
                ? defaultValues.user?.user_group_members?.map((userGroup) => userGroup.user_group)
                : [];
    }
    const methods = useForm<UpsertStaffFormProps>({
        defaultValues: { staffId, name, email, userGroupsList },
    });
    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;
    const tStaff = useResourceTranslate(Entities.STAFF);

    const { createStaff, updateStaff } = useUpsertStaff({ mode });
    const history = useRedirect();

    const onSubmit = async (formDataUpsert: UpsertStaffFormProps) => {
        if (mode === ModeOpenDialog.ADD) {
            await createStaff(
                { formDataUpsert },
                {
                    onSuccess: (resp) => {
                        onSave();
                        onClose();
                        if ("staff" in resp && resp.staff?.staffId) {
                            history.push(
                                `/${MicroFrontendTypes.USER}/${Entities.STAFF}/${resp.staff?.staffId}/show`
                            );
                        }
                    },
                }
            );
        } else {
            await updateStaff(
                { formDataUpsert },
                {
                    onSuccess: (resp) => {
                        if ("successful" in resp && resp.successful) {
                            onSave();
                            onClose();
                        } else showSnackbar(t("ra.common.updatedFail"), NotifyTypes.ERROR);
                    },
                }
            );
        }
    };

    return (
        <DialogFullScreenHF
            title={tStaff(mode === ModeOpenDialog.EDIT ? "titles.editStaff" : "titles.addStaff")}
            onClose={onClose}
            onSave={handleSubmit(onSubmit)}
            methods={methods}
            open={open}
            dialogCancelConfirmProps={{
                textSave: t("ra.action.leave"),
            }}
            footerConfirmButtonProps={{
                disabled: isSubmitting,
            }}
        >
            <PaperSectionWrapper>
                <StaffForm staffId={staffId} />
            </PaperSectionWrapper>
        </DialogFullScreenHF>
    );
};

export default StaffUpsert;
