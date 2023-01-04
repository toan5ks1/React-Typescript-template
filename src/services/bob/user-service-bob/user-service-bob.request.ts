import { Country } from "manabie-bob/enum_pb";
import { UpdateUserProfileRequest, UserProfile } from "manabie-bob/user_pb";

import { formInvalidErr } from "../../../internals/errors";
import { CountryKeys } from "../../../typings/remote";
import { NsBobUserService } from "./types";

export function validateUpdateUserProfile(data?: NsBobUserService.DataUpdateUser) {
    let users = data?.users!;

    if (!(users && users.name && data!.teacher_id)) {
        throw formInvalidErr;
    }
}

export function newUpdateUserProfileRequest(
    data: NsBobUserService.DataUpdateUser
): UpdateUserProfileRequest {
    const req = new UpdateUserProfileRequest();
    const userProfile = new UserProfile();
    const users = data.users!;

    userProfile.setName(users.name);
    // we wont update other properties
    userProfile.setId(data.teacher_id);
    userProfile.setAvatar(users.avatar!);
    userProfile.setEmail(users.email!);
    userProfile.setUserGroup(users.user_group);
    userProfile.setPhoneNumber(users.phone_number!);
    userProfile.setCountry(Country[users.country as CountryKeys]);

    req.setProfile(userProfile);

    return req;
}
