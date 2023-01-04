import { UserGroup } from "manabie-bob/enum_pb";

export enum ExtendedUserGroup {
    USER_GROUP_HQ_STAFF = 16,
    USER_GROUP_TEACHER_LEAD = 17,
    USER_GROUP_CENTRE_LEAD = 18,
    USER_GROUP_CENTRE_MANAGER = 19,
    USER_GROUP_CENTRE_STAFF = 20,
}

export const UserGroupUnion = Object.assign({}, UserGroup, ExtendedUserGroup);
