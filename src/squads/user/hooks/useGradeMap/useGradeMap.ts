import { useMemo } from "react";

import { Grade } from "src/squads/user/models/grade";

import useTranslate from "../useTranslate";

export interface UseGradeMapReturns {
    choiceGrades: Grade[];
}

const gradesNumber = Array.from(Array(17).keys());

const useGradeMap = (): UseGradeMapReturns => {
    const t = useTranslate();

    const grades = useMemo(
        (): Grade[] =>
            gradesNumber.map((gradeNumber) => ({
                id: gradeNumber,
                name: t(`resources.choices.grades.${gradeNumber}`),
            })),
        [t]
    );
    const orderChoices = useMemo(() => {
        const cloneGrades = [...grades];
        const optionOthers = cloneGrades.shift(); // Get option "Others"
        if (optionOthers) cloneGrades.push(optionOthers); // Move option "Others" to last
        return cloneGrades;
    }, [grades]);

    return { choiceGrades: orderChoices };
};

export default useGradeMap;
