import { useForm } from "react-hook-form";
import { Entities } from "src/common/constants/enum";
import { ChapterAttrsFragment } from "src/squads/syllabus/services/eureka/eureka-types";

import DialogWithHeaderFooterHF from "src/components/Dialogs/DialogWithHeaderFooterHF";

import useCreateTopic from "../../hooks/useCreateTopic";
import TopicForm, { TopicFormData } from "../TopicForm";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

interface DialogCreateTopicProps {
    chapter: ChapterAttrsFragment;
    refetch: () => {};
    open: boolean;
    onClose: () => void;
}

const DialogCreateTopic = ({ chapter, refetch, open, onClose }: DialogCreateTopicProps) => {
    const tTopic = useResourceTranslate(Entities.TOPICS);
    const methodHF = useForm<TopicFormData>();
    const { handleSubmit, reset } = methodHF;

    const { createTopic, isLoading } = useCreateTopic();

    const _onClose = () => {
        reset({ name: "", files: undefined });
        onClose();
    };

    const onSubmit = (formData: TopicFormData) => {
        createTopic(
            { formData, chapter },
            {
                onSuccess: () => {
                    refetch();
                    _onClose();
                },
            }
        );
    };
    return (
        <DialogWithHeaderFooterHF<TopicFormData>
            open={open}
            methods={methodHF}
            title={tTopic("AddTopicDialogHeader")}
            data-testid="DialogCreateTopic__root"
            onClose={onClose}
            onSave={handleSubmit(onSubmit)}
            shouldPressKey={true}
            footerConfirmButtonProps={{
                disabled: isLoading,
            }}
        >
            <TopicForm />
        </DialogWithHeaderFooterHF>
    );
};

export default DialogCreateTopic;
