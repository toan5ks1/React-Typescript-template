import { useCallback } from "react";

import { Students } from "src/squads/lesson/__generated__/bob/root-types";
import useGradeMap from "src/squads/lesson/hooks/useGradeMap";

function useGetStudentGradeNameByCountry() {
    const { choiceGrades } = useGradeMap();

    const getStudentGradeName = useCallback(
        (currentGrade: Students["current_grade"]) => {
            return choiceGrades.find((grade) => grade.id === currentGrade)?.name;
        },
        [choiceGrades]
    );
    return { getStudentGradeName };
}

export default useGetStudentGradeNameByCountry;
