import faker from "faker";
import { UserIdentity } from "src/squads/user/typings/auth-provider";

import { Country } from "manabie-yasuo/bob/enum_pb";
import { BasicProfile } from "manabuf/common/v1/profiles_pb";
//TODO: Should remove service yasuo
import { CreateUserResponse } from "manabuf/yasuo/v1/users_pb";

// TODO: Remove unnecessary fn
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

export function getFakeCreateUserResponse(): CreateUserResponse {
    const user = new BasicProfile();
    user.setUserId(faker.datatype.uuid());
    const req = new CreateUserResponse();
    req.addUsers(user);
    return req;
}

export function getRandomEnumValue<T, K extends keyof T>(anEnum: T, omitProp?: K) {
    const enumValues = Object.keys(anEnum).filter(
        (x) => isNaN(parseInt(x)) && (omitProp ? x !== omitProp : true)
    ) as K[];

    const randomIndex = Math.floor(Math.random() * enumValues.length);
    const randomEnumValue = enumValues[randomIndex];
    return anEnum[randomEnumValue];
}
