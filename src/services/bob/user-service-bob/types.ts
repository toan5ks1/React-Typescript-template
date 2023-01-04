import { User_StaffOneV2Query } from "src/squads/user/service/bob/bob-types";
import { CountryKeys } from "src/typings/remote";

import { TeacherOneQuery } from "./../bob-types";

export type Teacher = TeacherOneQuery["teachers"][0];
export type Staff = User_StaffOneV2Query["staff"][0];

export declare namespace NsBobUserService {
    export interface DataUpdateUser {
        teacher_by_school_ids: Teacher["teacher_by_school_ids"];
        users: Teacher["users"];
        teacher_id: Teacher["teacher_id"];
        id: Teacher["teacher_id"];
        country: CountryKeys;
    }
    export interface UpdateUser {
        data: DataUpdateUser;
    }
}
