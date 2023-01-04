import { ArrayElement } from "src/common/constants/types";
import { arrayHasItem } from "src/common/utils/other";
import { UseQueryBaseV2Return } from "src/squads/lesson/hooks/data/data-types";
import { GradesOfStudentsListQuery } from "src/squads/lesson/service/bob/bob-types";
import { inferQuery } from "src/squads/lesson/service/infer-query";

import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import useTranslate from "src/squads/lesson/hooks/useTranslate";

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
        entity: "students",
        action: "studentsGetGradesOfStudent",
    })(
        { student_ids: studentIds },
        {
            enabled: arrayHasItem(studentIds),
            selector(students) {
                const mapGradeOfStudents = new Map<GradeStudent["student_id"], GradeStudent>();

                (students || []).forEach((student) => {
                    mapGradeOfStudents.set(student.student_id, student);
                });

                return mapGradeOfStudents;
            },
            onError: (error) => {
                window.warner?.warn(`useGetGradeOfStudents get student`, error);
                showSnackbar(t("ra.message.unableToLoadData"), "error");
            },
        }
    );

    return { mapGradeOfStudents: data, isLoading: isFetching, refetch };
}

export default useGetGradeAndStatusOfStudents;
