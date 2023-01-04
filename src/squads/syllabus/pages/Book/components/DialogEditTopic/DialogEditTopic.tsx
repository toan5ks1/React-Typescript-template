import { useEffect } from "react";

import { useForm } from "react-hook-form";
import { Entities, NotifyTypes } from "src/common/constants/enum";
import { TopicsManyQuery } from "src/squads/syllabus/services/eureka/eureka-types";

import DialogWithHeaderFooterHF from "src/components/Dialogs/DialogWithHeaderFooterHF";

import useUpdateTopic from "../../hooks/useUpdateTopic";
import TopicForm, { TopicFormData } from "../TopicForm";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

interface DialogEditTopic {
    open: boolean;
    topic: TopicsManyQuery["topics"][0];
    onClose: () => void;
    onSuccess: () => void;
}

const DialogEditTopic = ({ open, topic, onClose, onSuccess }: DialogEditTopic) => {
    const tTopic = useResourceTranslate(Entities.TOPICS);
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const methods = useForm<TopicFormData>({
        defaultValues: { ...topic },
    });
    const { handleSubmit, reset } = methods;
    const { updateTopic, isLoading } = useUpdateTopic();
    const onSubmit = (formData: TopicFormData) => {
        updateTopic(
            { formData, topic },
            {
                onSuccess: () => {
                    showSnackbar(
                        t(
                            "ra.common.updatedSuccess",
                            {
                                smart_count: tTopic("name"),
                            },
                            { lowercase: true }
                        )
                    );
                    onSuccess();
                    onClose();
                },
                onError: () => {
                    showSnackbar(`${t("ra.common.updatedFail")}}`, NotifyTypes.ERROR);
                },
            }
        );
    };

    useEffect(() => {
        // Update default data
        if (open) reset({ ...topic });
    }, [open, reset, topic]);

    return (
        <DialogWithHeaderFooterHF<TopicFormData>
            methods={methods}
            title={tTopic("editTitle")}
            open={open}
            onClose={onClose}
            onSave={handleSubmit(onSubmit)}
            footerConfirmButtonProps={{
                disabled: isLoading,
            }}
        >
            <TopicForm />
        </DialogWithHeaderFooterHF>
    );
};

export default DialogEditTopic;
