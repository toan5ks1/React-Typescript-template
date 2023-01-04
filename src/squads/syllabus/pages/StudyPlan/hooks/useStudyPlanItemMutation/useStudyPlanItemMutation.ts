import { Entities } from "src/common/constants/enum";
import logger from "src/squads/syllabus/internals/logger";
import inferMutation from "src/squads/syllabus/services/infer-mutation";

import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const useStudyPlanItemMutation = () => {
    const t = useTranslate();
    const tCourse = useResourceTranslate(Entities.COURSES);
    const showSnackbar = useShowSnackbar();

    const { mutate: updateStudyPlanItems, isLoading: isUpdatingStudyPlanItems } = inferMutation({
        entity: "studyPlanItem",
        action: "syllabusStudyPlanItemUpsert",
    })({
        onError: (err) => {
            logger.error(updateStudyPlanItems.name, err);

            showSnackbar(t("ra.common.updatedFail"), "error");
        },
        onSuccess: () => {
            const message = t(
                "ra.common.updatedSuccess",
                { smart_count: tCourse("studyPlan.studyPlanContent") },
                { lowercase: true }
            );

            showSnackbar(message, "success");
        },
    });

    return { isUpdatingStudyPlanItems, updateStudyPlanItems };
};

export default useStudyPlanItemMutation;
