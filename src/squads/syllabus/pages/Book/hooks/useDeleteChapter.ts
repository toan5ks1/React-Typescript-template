import { Entities } from "src/common/constants/enum";
import inferMutation from "src/squads/syllabus/services/infer-mutation";

import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

interface UseDeleteChapter {
    onSuccess: () => void;
}

const useDeleteChapter = (params: UseDeleteChapter) => {
    const { onSuccess } = params;
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    return inferMutation({
        entity: "chapter",
        action: "syllabusChapterDelete",
    })({
        onSuccess: () => {
            showSnackbar(
                t(
                    "ra.common.deleteSuccess",
                    {
                        smart_count: t(`resources.${Entities.CHAPTERS}.chapter`),
                    },
                    { lowercase: true }
                )
            );
            onSuccess();
        },
    });
};

export default useDeleteChapter;
