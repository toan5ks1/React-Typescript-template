import { AbstractAuth, RedirectOptions } from "src/packages/abstract-auth";
import Configuration from "src/packages/configuration";

import { UserProfile } from "manabie-yasuo/user_pb";

import { UserGroupKeys } from "./remote";
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

export type AbstractAuthWithSupports<T> = OptionalToRequired<
    AbstractAuth<T>,
    "isAuthenticated" | "exchangeToken" | "getCustomToken" | "setCustomToken"
>;
