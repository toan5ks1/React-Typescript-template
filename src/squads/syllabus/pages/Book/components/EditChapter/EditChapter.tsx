import { useForm } from "react-hook-form";
import { Entities, MutationMenus, NotifyActions } from "src/common/constants/enum";
import { ChapterAttrsFragment } from "src/squads/syllabus/services/eureka/eureka-types";

import HookForm from "src/components/Forms/HookForm";

import useUpsertChapter from "../../hooks/useUpsertChapter";
import ChapterForm, { ChapterFormData } from "../ChapterForm";

import useNotifyForm from "src/squads/syllabus/hooks/useNotifyForm";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";

interface EditChapterProps {
    bookId: string;
    chapter: ChapterAttrsFragment;
    onClose: () => void;
    refetch: () => void;
}

const EditChapter = (props: EditChapterProps) => {
    const { bookId, chapter, onClose, refetch } = props;
    const tChapter = useResourceTranslate(Entities.CHAPTERS);
    const notifyForm = useNotifyForm({
        action: MutationMenus.EDIT,
        entityName: tChapter("chapter"),
    });

    const { upsertChapter, isLoading } = useUpsertChapter({ bookId });

    const methods = useForm({ defaultValues: { ...chapter } });

    const { handleSubmit } = methods;

    const onSubmit = (formData: ChapterFormData) => {
        upsertChapter(
            { formData, chapter },
            {
                onSuccess: () => {
                    notifyForm(NotifyActions.SUCCESS, {});
                    refetch();
                },
                onError: () => {
                    notifyForm(NotifyActions.FAILURE, {});
                },
            }
        );
    };
    return (
        <HookForm
            methods={methods}
            formProps={{
                onSubmit: handleSubmit(onSubmit),
                role: "EditChapter__form",
                style: { width: "100%" },
            }}
        >
            <ChapterForm disableSubmit={isLoading} open onClose={onClose} />
        </HookForm>
    );
};

export default EditChapter;
