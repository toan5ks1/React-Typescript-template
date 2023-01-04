import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";

import { createLOEmptyFormData } from "src/squads/syllabus/pages/Exam/utils/exam";

describe(createLOEmptyFormData.name, () => {
    it("should return correct empty data", () => {
        const emptyFormData = createLOEmptyFormData();

        expect(emptyFormData).toEqual({
            name: "",
            type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO,
        });
    });
});
