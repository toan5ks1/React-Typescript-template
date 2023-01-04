import { useMemo } from "react";

import { useForm } from "react-hook-form";
import { ERPModules, ModeOpenDialog } from "src/common/constants/enum";
import {
    CreateParentFormProps,
    ParentUpdateInfo,
    StudentParentDataType,
} from "src/squads/user/common/types";

import { Box } from "@mui/material";
import BackdropLoading from "src/components/Backdrops/BackdropLoading";
import DialogWithHeaderFooterHF from "src/components/Dialogs/DialogWithHeaderFooterHF";
import FormUpsertParent from "src/squads/user/modules/student-family/components/FormUpsertParent";

import { Country } from "manabie-bob/enum_pb";

import useResourceTranslate from "src/squads/user/hooks/useResourceTranslate";
import useTranslate from "src/squads/user/hooks/useTranslate";
import useUpsertParent from "src/squads/user/modules/student-family/hooks/useUpsertParent";

export interface DialogUpsertParentProp {
    studentId: string;
    parentUpdate?: ParentUpdateInfo;
    open: boolean;
    mode: ModeOpenDialog;
    onClose: () => void;
    onSuccess: (...args: any[]) => void;
    parents: StudentParentDataType[];
}

const DialogUpsertParent = (props: DialogUpsertParentProp) => {
    const { mode, studentId, parents, open, parentUpdate, onClose, onSuccess } = props;
    const tStudents = useResourceTranslate(ERPModules.STUDENTS);
    const t = useTranslate();
    const { isLoading, upsertParent } = useUpsertParent({ mode });

    const isAddMode = useMemo(() => mode === ModeOpenDialog.ADD, [mode]);

    const methods = useForm<CreateParentFormProps>({
        defaultValues: parentUpdate?.parent
            ? parentUpdate?.parent
            : {
                  countryCode: Country.COUNTRY_JP,
                  name: "",
                  email: "",
                  phoneNumber: "",
              },
        mode: "onChange",
    });

    const { handleSubmit } = methods;

    const onSubmit = (formData: CreateParentFormProps) => {
        upsertParent(
            { formData, studentId },
            {
                onSuccess,
            }
        );
    };

    return (
        <DialogWithHeaderFooterHF
            onClose={onClose}
            open={open}
            title={`${tStudents(
                `titles.${isAddMode ? "dialogAddNewParent" : "dialogEditParent"}`
            )}`}
            onSave={handleSubmit(onSubmit)}
            methods={methods}
            data-testid="DialogUpsertParent"
            textSave={`${t(`ra.common.action.save`)}`}
            footerConfirmButtonProps={{
                disabled: isLoading,
            }}
        >
            {isLoading ? <BackdropLoading open /> : null}
            <Box mt={1}>
                <FormUpsertParent parents={parents} parentUpdate={parentUpdate} />
            </Box>
        </DialogWithHeaderFooterHF>
    );
};

export default DialogUpsertParent;
