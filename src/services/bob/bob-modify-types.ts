import { TeacherManyReferenceQuery, TeacherOneQuery, TeacherManyQuery } from "./bob-types";

export type TeacherOne = TeacherOneQuery["teachers"][0];
export type TeacherMany = TeacherManyQuery["find_teacher_by_school_id"][0];
export type TeacherManyReference = TeacherManyReferenceQuery["find_teacher_by_school_id"][0];
