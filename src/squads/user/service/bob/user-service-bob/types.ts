import { ArrayElement } from "src/common/constants/types";
import { User_StaffOneQuery, User_StaffOneV2Query } from "src/squads/user/service/bob/bob-types";

export type Teacher = ArrayElement<User_StaffOneQuery["teachers"]>;
export type Staff = ArrayElement<User_StaffOneV2Query["staff"]>;
