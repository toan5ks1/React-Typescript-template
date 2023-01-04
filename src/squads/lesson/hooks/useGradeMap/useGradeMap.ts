import { useMemo } from "react";

import { Grade } from "src/squads/lesson/models/grade";

export interface UseGradeMapReturns {
    choiceGrades: Grade[];
}

const gradesNumber = Array.from(Array(17).keys());

const useGradeMap = (): UseGradeMapReturns => {
    const grades: Grade[] = gradesNumber.map((gradeNumber) => ({
        id: gradeNumber,
        name: `resources.choices.grades.${gradeNumber}`,
    }));
    const orderChoices = useMemo(() => {
        const cloneGrades = [...grades];
        const optionOthers = cloneGrades.shift(); // Get option "Others"
        if (optionOthers) cloneGrades.push(optionOthers); // Move option "Others" to last
        return cloneGrades;
    }, [grades]);

    return { choiceGrades: orderChoices };
};

export default useGradeMap;
