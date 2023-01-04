import { ArrayElement } from "src/common/constants/types";
import { ParentsManyQuery } from "src/squads/user/service/bob/bob-types";
import { inferQuery } from "src/squads/user/service/infer-service";

import useTranslate from "../useTranslate";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";

export type StudentParentDataType = ArrayElement<ParentsManyQuery["student_parents"]>;

export interface UseParentMapStudentReturn {
    parents: StudentParentDataType[];
    isLoading: boolean;
    refetch: () => void;
}

function useParentMapStudent(studentId: string): UseParentMapStudentReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const {
        data: parents = [],
        isLoading,
        refetch,
    } = inferQuery({
        entity: "studentParent",
        action: "userGetManyParentsByStudentIds",
    })(
        {
            filter: {
                student_ids: [studentId],
            },
        },
        {
            enabled: true,
            onError: () => {
                showSnackbar(t("ra.manabie-error.cannotGetParentsListOfAStudent"));
            },
        }
    );

    return { parents, isLoading, refetch };
}

export default useParentMapStudent;
