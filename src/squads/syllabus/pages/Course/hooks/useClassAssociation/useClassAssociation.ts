import { useCallback, useState } from "react";

import { handleUnknownError } from "src/common/utils/error";
import logger from "src/squads/syllabus/internals/logger";

import useStandaloneQuery from "src/squads/syllabus/hooks/data/useStandaloneQuery";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface ClassAssociation {
    lesson: boolean;
    student: boolean;
    isQuerySucceed?: boolean;
}

const defaultClassAssociation: ClassAssociation = {
    lesson: false,
    student: false,
};

const useClassAssociation = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const t = useTranslate();
    const showSnackbar = useShowSnackbar();
    const { classService } = useStandaloneQuery();

    const getClassAssociation = useCallback(
        async (classId: string): Promise<ClassAssociation> => {
            try {
                setIsLoading(true);

                const resp = await classService.classGetClassAssociationByCourseId({
                    class_id: classId,
                });

                if (!resp) return defaultClassAssociation;

                return {
                    lesson: Boolean(resp?.lessons_aggregate.aggregate?.count),
                    student: Boolean(resp?.class_member_aggregate.aggregate?.count),
                    isQuerySucceed: true,
                };
            } catch (err) {
                const error = handleUnknownError(err);

                logger.error("[useClassAssociation]", error);
                showSnackbar(t("ra.manabie-error.unknown"), "error");
            } finally {
                setIsLoading(false);
            }

            return defaultClassAssociation;
        },
        [classService, showSnackbar, t]
    );

    return { getClassAssociation, isLoading };
};

export default useClassAssociation;
