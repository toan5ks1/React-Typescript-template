import { Grade } from "src/squads/lesson/models/grade";

import { renderHook } from "@testing-library/react-hooks";
import useGradeMap from "src/squads/lesson/hooks/useGradeMap";

describe(useGradeMap.name, () => {
    it("should return 17 grades", () => {
        const {
            result: { current },
        } = renderHook(() => useGradeMap());

        expect(current.choiceGrades).toHaveLength(17);
    });

    it("should return grades order by asc", () => {
        const {
            result: { current },
        } = renderHook(() => useGradeMap());

        // Remove the last grade is 0
        current.choiceGrades.pop();

        current.choiceGrades.forEach((val, index) => {
            expect(val).toEqual<Grade>({
                id: index + 1,
                name: `resources.choices.grades.${index + 1}`,
            });
        });
    });

    it("should the last grades is 0 (other grades)", () => {
        const {
            result: { current },
        } = renderHook(() => useGradeMap());
        expect(current.choiceGrades.pop()).toEqual<Grade>({
            id: 0,
            name: `resources.choices.grades.0`,
        });
    });
});
