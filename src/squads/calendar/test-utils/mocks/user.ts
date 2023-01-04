import faker from "faker";
import { UserIdentity } from "src/squads/calendar/typings/auth-provider";

import { Country } from "manabie-yasuo/bob/enum_pb";

export function getFakeLocalUser(override?: Partial<UserIdentity>): UserIdentity {
    return {
        id: faker.datatype.uuid(),
        avatar: faker.image.avatar(),
        name: faker.name.firstName(1),
        country: Country.COUNTRY_SG,
        countryName: "Country name",
        userGroup: "USER_GROUP_SCHOOL_ADMIN",
        email: faker.internet.email(),
        schoolId: 12133,
        phoneNumber: faker.phone.phoneNumber(),
        schoolName: "School name",
        deviceToken: "asss",
        schoolsList: [],
        schoolIdsList: [],
        ...override,
    };
}
