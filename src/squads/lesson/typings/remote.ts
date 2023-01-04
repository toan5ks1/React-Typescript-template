import { UserGroupUnion } from "src/squads/lesson/common/constants";

export type UserGroupKeys = keyof typeof UserGroupUnion;
export type Identity = string | number;
