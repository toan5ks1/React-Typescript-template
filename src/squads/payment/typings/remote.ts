import { UserGroupUnion } from "src/squads/payment/constants/const";

export type UserGroupKeys = keyof typeof UserGroupUnion;
export type Identity = string | number;
