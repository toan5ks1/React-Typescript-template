import { UserGroupUnion } from "src/squads/syllabus/common/constants/const";

export type UserGroupKeys = keyof typeof UserGroupUnion;
export type Identity = string | number;
