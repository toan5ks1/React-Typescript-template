import { CountryKeys } from "src/squads/user/typings/remote";

import { UserGroup } from "manabie-yasuo/enum_pb";

export declare namespace NsYasuoUserService {
    export interface CreateUser {
        user: {
            name: string;
            email: string;
            phone_number: string;
        };
        current_grade: number;
        country: CountryKeys;
        user_group: UserGroup;
        school_id: number;
    }

    export interface UpdateUser {
        student_id: string;
        user: {
            name: string;
            phone_number: string;
        };
        current_grade: number;
        country: CountryKeys;
        user_group: UserGroup;
        school_id: number;
    }

    export interface CreateUserResp {
        id: string | null;
    }
}
