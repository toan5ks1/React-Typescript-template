import { AbstractAuth, RedirectOptions } from "src/packages/abstract-auth";
import Configuration from "src/packages/configuration";
import { UserGroupKeys } from "src/squads/timesheet/typings/remote";

//TODO: we need to chang `manabie-yasuo`?
import { UserGroup } from "manabie-yasuo/bob/enum_pb";
import { UserProfile } from "manabie-yasuo/user_pb";

import { OptionalToRequired } from "./support-types";

// from grpc endpoint getBasicUserProfile
export type GrpcUserProfile = UserProfile.AsObject & {};

export type UserIdentity = Omit<GrpcUserProfile, "userGroup"> & {
    schoolId?: number;
    userGroup: UserGroupKeys | UserGroupKeys[];

    //appended some additional info
    schoolName?: string;
    countryName?: string;
};

export interface LoginCredential {
    username: string;
    password: string;
    tenantName?: string;
}
export interface LoginOptions extends RedirectOptions {}

export interface CheckErrorOptions extends RedirectOptions {}

export interface LogoutOptions extends RedirectOptions {}

export interface AuthProviderOptions {
    authManager: AbstractAuthWithSupports<any>;
    appConfigs: Configuration;
}

/**
 * authProvider types
 */
export type AuthProviderType = {
    login: (params: LoginCredential, options?: LoginOptions) => Promise<UserIdentity | undefined>;
    logout: (options?: LogoutOptions) => Promise<void>;
    checkError: (err: Error, options?: CheckErrorOptions) => Promise<void>;
    checkAuth: () => Promise<any>;
    getIdentity?: () => Promise<UserIdentity>;
    isErrorRelatedToPermission: (err: Error) => boolean;
    [key: string]: any;
};

export interface UserTokenPayload {
    "https://hasura.io/jwt/claims"?: {
        "x-hasura-allowed-roles"?: (keyof typeof UserGroup)[];
        "x-hasura-default-role"?: UserGroupKeys;
        "x-hasura-school-id"?: number;
        "x-hasura-user-id"?: string;
        "x-hasura-school-ids"?: string;
    };
    manabie?: {
        "x-hasura-allowed-roles"?: (keyof typeof UserGroup)[];
        "x-hasura-default-role"?: UserGroupKeys;
        "x-hasura-school-id"?: number;
        "x-hasura-user-id"?: string;
        "x-hasura-school-ids"?: string;
    };
    iss: string;
    aud: string;
    auth_time: number;
    user_id: string;
    sub: string;
    iat: number;
    exp: number;
    email: string;
    email_verified: boolean;
}

export type AbstractAuthWithSupports<T> = OptionalToRequired<
    AbstractAuth<T>,
    "isAuthenticated" | "exchangeToken" | "getCustomToken" | "setCustomToken"
>;
