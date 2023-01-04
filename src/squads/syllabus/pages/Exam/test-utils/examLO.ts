import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";

import { CreateLOFormData } from "src/squads/syllabus/pages/LO/common/type";

const mockCreateLOFormDataEmpty: CreateLOFormData = {
    name: "",
    type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO,
    // TODO: "instruction" field will be added later
};

export const createMockExamLOFormData = (overrides = mockCreateLOFormDataEmpty) => {
    return { ...mockCreateLOFormDataEmpty, ...overrides };
};
