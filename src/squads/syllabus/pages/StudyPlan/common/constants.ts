import { convertEnumKeys } from "src/squads/syllabus/common/utils/enum";

import { StudyPlanItemStatus } from "manabuf/eureka/v1/assignments_pb";
import { StudyPlanStatus } from "manabuf/eureka/v1/enums_pb";

import { FormFilterStudyPlanValues, StudyPlanFormData } from "./types";

export const datePattern = /^(\d{4}\/\d{2}\/\d{2})$/;
export const dateTimePattern = /^(\d{4}\/\d{2}\/\d{2},\s\d{2}:\d{2})$/;

export const StudyPlanStatusKey = convertEnumKeys(StudyPlanStatus);
export const StudyPlanItemStatusKey = convertEnumKeys(StudyPlanItemStatus);

export const studyPlanFilterDefaultValues: FormFilterStudyPlanValues = {
    grades: [],
    books: [],
    archived: false,
};

export const defaultStudyPlanFormValues: StudyPlanFormData = {
    name: "",
    book: null,
    grades: [],
    trackSchoolProgress: false,
};
