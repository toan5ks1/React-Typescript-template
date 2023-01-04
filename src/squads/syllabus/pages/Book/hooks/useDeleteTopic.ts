import logger from "src/squads/syllabus/internals/logger";
import inferMutation from "src/squads/syllabus/services/infer-mutation";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

interface UseDeleteTopic {
    onSuccess?: () => void;
}

const useDeleteTopic = ({ onSuccess }: UseDeleteTopic) => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();

    const { mutate, isLoading } = inferMutation({ entity: "topic", action: "syllabusTopicDelete" })(
        {
            onSuccess: () => {
                showSnackbar(
                    t(
                        "ra.common.deleteSuccess",
                        { smart_count: t("resources.topics.name") },
                        { lowercase: true }
                    )
                );
                onSuccess && onSuccess();
            },
            onError: (error) => {
                logger.warn("[useDeleteTopic] TOPIC delete", error);

                showSnackbar(t("ra.common.deleteFail"), "error");
            },
        }
    );

    return { deleteTopic: mutate, isLoading };
};

export default useDeleteTopic;
