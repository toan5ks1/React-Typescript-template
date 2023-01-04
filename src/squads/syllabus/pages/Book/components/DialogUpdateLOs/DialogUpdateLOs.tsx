import { useCallback } from "react";

import { useForm } from "react-hook-form";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";

import { Box } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import HookForm from "src/components/Forms/HookForm";
import TextFieldHF from "src/components/TextFields/TextFieldHF";

import { LOByTopicIdQuery } from "../LOAndAssignment/models";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import useUpdateLOs from "src/squads/syllabus/pages/Book/hooks/useUpdateLOs";
import { UpdateLOFormData } from "src/squads/syllabus/pages/LO/common/type";

export interface DialogUpdateLOsProps
    extends Pick<DialogWithHeaderFooterProps, "open" | "onClose"> {
    data: LOByTopicIdQuery;
    topicId: string;
    onSuccess: () => void;
}

const DialogUpdateLOs = (props: DialogUpdateLOsProps) => {
    const { open, onClose, data, topicId, onSuccess } = props;

    const t = useTranslate();
    const { updateLOs, isLoading } = useUpdateLOs();
    const methods = useForm<UpdateLOFormData>({ defaultValues: { name: data.name } });

    const entityKeyTranslate = KeyLOTypes[data.type as keyof typeof KeyLOTypes];

    const { handleSubmit } = methods;

    const onSubmit = useCallback(
        (formData: UpdateLOFormData) => {
            updateLOs(
                { formData, topicId, LOData: data },
                {
                    onSuccess: () => {
                        onSuccess();
                        onClose();
                    },
                }
            );
        },
        [updateLOs, topicId, data, onSuccess, onClose]
    );

    const entityName = t(
        `resources.learning_objectives.choices.LearningObjectiveType.${entityKeyTranslate}`
    );

    const title = `${t("ra.common.action.rename")} ${entityName}`;

    return (
        <DialogWithHeaderFooter
            title={title}
            open={open}
            onClose={onClose}
            onSave={handleSubmit(onSubmit)}
            footerConfirmButtonProps={{
                disabled: isLoading,
            }}
        >
            <HookForm methods={methods} formProps={{ onSubmit: handleSubmit(onSubmit) }}>
                <>
                    <TextFieldHF
                        name="name"
                        size="small"
                        label={entityName}
                        required
                        rules={{ required: t("resources.input.error.required") }}
                    />
                    <Box display="none">
                        <input type="submit" />
                    </Box>
                </>
            </HookForm>
        </DialogWithHeaderFooter>
    );
};

export default DialogUpdateLOs;
