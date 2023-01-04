import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { GradesOfStudentsListQuery } from "src/squads/user/service/bob/bob-types";
import { inferQuery } from "src/squads/user/service/infer-service";
import type { UseQueryBaseV2Return } from "src/squads/user/service/service-creator";

import useShowSnackbar from "src/squads/user/hooks/useShowSnackbar";
import useTranslate from "src/squads/user/hooks/useTranslate";

export interface GradeStudent extends ArrayElement<GradesOfStudentsListQuery["students"]> {}

export interface UseGetGradeAndStatusOfStudentsReturn {
    mapGradeOfStudents: Map<GradeStudent["student_id"], GradeStudent>;
    isLoading: boolean;
    refetch: UseQueryBaseV2Return<Map<GradeStudent["student_id"], GradeStudent>>["refetch"];
}

const emptyMap = new Map<GradeStudent["student_id"], GradeStudent>();

function useGetGradeAndStatusOfStudents(
    studentIds: string[]
): UseGetGradeAndStatusOfStudentsReturn {
    const showSnackbar = useShowSnackbar();
    const t = useTranslate();
    const {
        data = emptyMap,
        isFetching,
        refetch,
    } = inferQuery({
        action: "userGetGradesOfStudentsByStudentIds",
        entity: "student",
    })(
        {
            filter: {
                student_ids: studentIds,
            },
        },
        {
            enabled: arrayHasItem(studentIds),
            onError: (error) => {
                window.warner?.warn(`useGetGradeOfStudents get student`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
            selector: (students) => {
                const mapGradeOfStudents = new Map<GradeStudent["student_id"], GradeStudent>();

                (students || []).forEach((student) => {
                    mapGradeOfStudents.set(student.student_id, student);
                });

                return mapGradeOfStudents;
            },
        }
    );

    return { mapGradeOfStudents: data, isLoading: isFetching, refetch };
}

export default useGetGradeAndStatusOfStudents;
