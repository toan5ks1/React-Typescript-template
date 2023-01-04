import { UserIdentity } from "src/squads/timesheet/typings/auth-provider";

import { Country } from "manabie-yasuo/bob/enum_pb";

// TODO: Remove unnecessary fn
export function getFakeLocalUser(override?: Partial<UserIdentity>): UserIdentity {
    return {
        id: "user_id",
        avatar: "",
        name: "user_name",
        country: Country.COUNTRY_SG,
        countryName: "Country name",
        userGroup: "USER_GROUP_SCHOOL_ADMIN",
        email: "user_email@gmail.com",
        schoolId: 12133,
        phoneNumber: "999999999",
        schoolName: "School name",
        deviceToken: "asss",
        schoolsList: [],
        schoolIdsList: [],
        ...override,
    };
}
