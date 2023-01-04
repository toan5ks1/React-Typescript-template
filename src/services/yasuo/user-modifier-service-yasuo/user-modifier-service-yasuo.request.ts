import { isSchoolAdmin } from "src/internals/permission";
import { UserIdentity } from "src/typings/auth-provider";

import { Country } from "manabie-bob/enum_pb";
import { UserGroup } from "manabie-yasuo/enum_pb";
import {
    UpdateUserProfileRequest,
    CreateUserRequest,
    CreateUserProfile,
} from "manabuf/yasuo/v1/users_pb";

import { emailIsValid } from "../../../common/utils/other";
import { formInvalidErr } from "../../../internals/errors";
import { NsYasuoUserService } from "./types";

export function validateCreateUser(userLogged: UserIdentity, email: string) {
    if (!userLogged) {
        throw formInvalidErr;
    }

    if (!isSchoolAdmin(userLogged.userGroup) || !emailIsValid(email)) {
        throw formInvalidErr;
    }
}

export function newCreateUserReq(
    data: Required<NsYasuoUserService.CreateUser>,
    userLogged: UserIdentity
) {
    const user = new CreateUserProfile();
    user.setName(data.user.name);
    user.setEmail(data.user.email);
    data.user_group === UserGroup.USER_GROUP_TEACHER
        ? user.setPhoneNumber(data.user.email) //TeacherForm doesn't require phone number so set it by email.
        : user.setPhoneNumber(data.user.phone_number);
    user.setCountry(Country[data.country]); //country set by useApplyUserCountryToForm() in StudentForm.
    user.setGrade(data.current_grade);
    const req = new CreateUserRequest();
    const schoolId = isSchoolAdmin(userLogged.userGroup) ? userLogged.schoolId! : data.school_id;

    req.addUsers(user);
    req.setSchoolId(schoolId);
    if (data.user_group === UserGroup.USER_GROUP_SCHOOL_ADMIN) {
        req.setOrganization(schoolId.toString());
    }
    req.setUserGroup(data.user_group);
    return req;
}

export function newUpdateUserProfile(
    data: NsYasuoUserService.UpdateUser
): UpdateUserProfileRequest {
    const req = new UpdateUserProfileRequest();
    req.setId(data.student_id);
    req.setName(data.user.name);
    req.setGrade(data.current_grade);

    return req;
}
