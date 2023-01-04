import inferMutation from "src/squads/syllabus/services/infer-mutation";

import logger from "../../internals/logger";
import useShowSnackbar from "../useShowSnackbar";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const useSwapQuizOrder = () => {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { mutate, isLoading } = inferMutation({
        entity: "quiz",
        action: "syllabusQuizSwapDisplayOrder",
    })({
        onSuccess: () => {
            showSnackbar(t("ra.message.moveSuccess"));
        },
        onError: (error) => {
            logger.warn("[useSwapQuizOrder]", error);

            showSnackbar(t("ra.message.moveFail"), "error");
        },
    });

    return { updateOrder: mutate, isLoading };
};

export default useSwapQuizOrder;
