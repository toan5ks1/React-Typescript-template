import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";

import { CreateLOFormData } from "src/squads/syllabus/pages/LO/common/type";

export const emptyExamLOFormData: CreateLOFormData = {
    name: "",
    type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO,
};

export const createLOEmptyFormData = (): CreateLOFormData => emptyExamLOFormData;
