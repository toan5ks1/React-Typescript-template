import { useCallback } from "react";

import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useToggle } from "react-use";
import logger from "src/squads/syllabus/internals/logger";

import HookForm from "src/components/Forms/HookForm";

import useUpsertChapter from "../../hooks/useUpsertChapter";
import ChapterForm, { ChapterFormData } from "../ChapterForm";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

interface CreateChapterProps {
    onSuccess: () => {};
}

const CreateChapter = ({ onSuccess }: CreateChapterProps) => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();
    const methods = useForm();

    const { id: bookId } = useParams<{ id: string }>();
    const [visible, toggleVisible] = useToggle(false);

    const { upsertChapter, isLoading } = useUpsertChapter({
        bookId,
    });

    const { handleSubmit, reset } = methods;

    const onSubmit = async (formData: ChapterFormData) => {
        upsertChapter(
            { formData },
            {
                onError: (e) => {
                    logger.warn("[CreateChapter]", e);

                    showSnackbar(t("ra.common.addedFail"), "error");
                },
                onSuccess: () => {
                    showSnackbar(
                        t(
                            "ra.common.addedSuccess",
                            {
                                smart_count: t("resources.chapters.chapter"),
                            },
                            { lowercase: true }
                        )
                    );
                    onSuccess();
                    onClose();
                },
            }
        );
    };

    const onClose = useCallback(() => {
        toggleVisible(false);
        reset({});
    }, [reset, toggleVisible]);

    return (
        <HookForm
            formProps={{
                onSubmit: handleSubmit(onSubmit),
            }}
            methods={methods}
        >
            <ChapterForm
                disableSubmit={isLoading}
                open={visible}
                onOpen={toggleVisible}
                onClose={onClose}
            />
        </HookForm>
    );
};

export default CreateChapter;
