import { useCallback } from "react";

import inferMutation from "src/squads/lesson/service/infer-mutation";

import { DeleteLessonRequest } from "manabuf/bob/v1/lessons_pb";

import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

export type DeleteLessonProps = {
    lessonId: string;
    onSuccess?: () => void;
    onError?: () => void;
    savingOption?: DeleteLessonRequest.SavingOption.AsObject;
};

export type UseDeleteLessonOfLessonManagementReturn = {
    deleteLesson: (props: DeleteLessonProps) => Promise<void>;
    isDeleting: boolean;
};

const useDeleteLessonOfLessonManagement = (): UseDeleteLessonOfLessonManagementReturn => {
    const t = useTranslate();
    const showSnackBar = useShowSnackbar();

    const { mutate: mutateDeleteLesson, isLoading } = inferMutation({
        entity: "lessons",
        action: "lessonsDelete",
    })();

    const deleteLesson = useCallback(
        async (props: DeleteLessonProps) => {
            const { lessonId, onSuccess, onError, savingOption } = props;

            mutateDeleteLesson(
                { lessonId, savingOption },
                {
                    onSuccess,
                    onError: (error) => {
                        showSnackBar(t("ra.manabie-error.unknown"), "error");
                        window.warner?.warn(
                            `Error DeleteLessonOfLessonManagement: ${error.message}`
                        );

                        onError?.();
                    },
                }
            );
        },
        [mutateDeleteLesson, showSnackBar, t]
    );

    return {
        deleteLesson,
        isDeleting: isLoading,
    };
};

export default useDeleteLessonOfLessonManagement;
