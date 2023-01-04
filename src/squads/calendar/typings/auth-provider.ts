import { UserProfile } from "manabie-yasuo/user_pb";
import { UserGroup } from "manabuf/common/v1/profiles_pb";

export type UserGroupKeys = keyof typeof UserGroup;
export type Identity = string | number;

// from grpc endpoint getBasicUserProfile
export type GrpcUserProfile = UserProfile.AsObject & {};

export type UserIdentity = Omit<GrpcUserProfile, "userGroup"> & {
    schoolId?: number;
    userGroup: UserGroupKeys | UserGroupKeys[];

    //appended some additional info
    schoolName?: string;
    countryName?: string;
};
