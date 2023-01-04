import { arrayHasItem } from "src/common/utils/other";

import { Grade } from "../../models/grade";
import useTranslate from "../useTranslate";

interface UseConvertGradeListProps {
    translate?: (key: number) => string;
}

interface UseConvertGradeListValues {
    convertGradeToArrayString: (grades: number[]) => string[];
    convertGradeToString: (grades: number[], separator?: string) => string;
    convertGradesToArrayGradeObject: (grades: number[]) => Grade[] | [];
    convertGradeObjectsToArrayNumber: (grades: Grade[]) => number[] | [];
}

const useConvertGrade = (props: UseConvertGradeListProps = {}): UseConvertGradeListValues => {
    const { translate } = props;
    const tDefault = useTranslate();

    const t = (gradeNumber: number) => {
        if (translate) return translate(gradeNumber);
        return tDefault(`resources.choices.grades.${gradeNumber}`);
    };

    const convertGradeToArrayString = (grades: number[]) => {
        return grades.map((grade) => t(grade));
    };

    const convertGradeToString = (grades: number[], separator: string = ", ") => {
        const arr = convertGradeToArrayString(grades);
        return arr.join(separator);
    };

    const convertGradesToArrayGradeObject = (grades: number[]) => {
        if (!arrayHasItem(grades)) return [];

        return grades.map((grade: number) => ({
            id: grade,
            name: t(grade),
        }));
    };

    const convertGradeObjectsToArrayNumber = (grades: Grade[]) => {
        if (!arrayHasItem(grades)) return [];

        return grades.map((grade) => grade.id);
    };

    return {
        convertGradeToArrayString,
        convertGradeToString,
        convertGradesToArrayGradeObject,
        convertGradeObjectsToArrayNumber,
    };
};

export default useConvertGrade;
