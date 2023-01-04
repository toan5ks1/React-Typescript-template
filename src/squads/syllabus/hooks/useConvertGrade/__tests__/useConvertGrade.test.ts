import { Grade } from "src/squads/syllabus/models/grade";

import useConvertGrade from "../useConvertGrade";

import { renderHook } from "@testing-library/react-hooks";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

jest.mock("src/squads/syllabus/hooks/useTranslate", () => jest.fn());

describe(useConvertGrade.name, () => {
    const translate = (translateKey: string) => translateKey;

    const translateWeExpect = (gradeNumber: number) => `resources.choices.grades.${gradeNumber}`;

    beforeEach(() => {
        (useTranslate as jest.Mock).mockImplementation(() => translate);
    });

    it("should return grade string translated", () => {
        const {
            result: { current },
        } = renderHook(() => useConvertGrade());

        const grades = [1, 3, 9];

        const expectData = grades.map((grade) => translateWeExpect(grade)).join(", ");

        expect(current.convertGradeToString(grades)).toEqual(expectData);
    });

    it("should return list grade string translated", () => {
        const {
            result: { current },
        } = renderHook(() => useConvertGrade());

        const grades = [1, 6, 7];

        const expectData = grades.map((grade) => translateWeExpect(grade));

        expect(current.convertGradeToArrayString(grades)).toEqual(expectData);
    });

    it("should return grade string translated with custom separator character", () => {
        const {
            result: { current },
        } = renderHook(() => useConvertGrade());

        const grades = [1, 6, 7];

        const expectData = grades.map((grade) => translateWeExpect(grade)).join("--");

        expect(current.convertGradeToString(grades, "--")).toEqual(expectData);
    });

    it("should return list grade object with id and name or empty list", () => {
        const {
            result: { current },
        } = renderHook(() => useConvertGrade());

        const grades = [1, 6, 7];

        const expectData: Grade[] = grades.map((grade) => ({
            id: grade,
            name: translateWeExpect(grade),
        }));

        expect(current.convertGradesToArrayGradeObject(grades)).toEqual(expectData);
        expect(current.convertGradesToArrayGradeObject([])).toEqual([]);
    });

    it("should return list grade number or empty list", () => {
        const {
            result: { current },
        } = renderHook(() => useConvertGrade());

        const grades: Grade[] = [
            { id: 1, name: "Grade 1" },
            { id: 6, name: "Grade 6" },
            { id: 7, name: "Grade 7" },
        ];

        const expectData = grades.map((grade) => grade.id);

        expect(current.convertGradeObjectsToArrayNumber(grades)).toEqual(expectData);
        expect(current.convertGradesToArrayGradeObject([])).toEqual([]);
    });
});
