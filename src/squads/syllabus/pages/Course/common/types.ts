import { Lesson_ClassListByCourseIdV3Query } from "src/squads/syllabus/services/bob/bob-types";
import { ArrayElement } from "src/squads/syllabus/typings/support-types";

export type ClassData = ArrayElement<Lesson_ClassListByCourseIdV3Query["class"]>;

const nameKey: keyof ClassData = "name";
export type EditClassForm = { [nameKey]: string };
