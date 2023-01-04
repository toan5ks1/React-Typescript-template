import { mappedRoles } from "src/common/constants/const";
import { Features } from "src/common/constants/enum";
import { getEnumString } from "src/common/constants/helper";
import { FirebaseError, errorCodesMap, handleUnknownError } from "src/common/utils/error";
import { delay, toArr } from "src/common/utils/other";
import {
    AuthError,
    decodeJWTToken,
    EnumAuthErrors,
    LoginCredential,
    ProviderTypes,
} from "src/packages/abstract-auth";
import userServiceYasuo from "src/services/yasuo/user-service-yasuo";
import userGroupServiceUsermgmt from "src/squads/user/service/usermgmt/user-group-service-user-mgmt";
import userServiceUsermgmt from "src/squads/user/service/usermgmt/user-service-usermgmt";
import {
    AuthProviderOptions,
    AuthProviderType,
    CheckErrorOptions,
    UserIdentity,
    LoginOptions,
    LogoutOptions,
    UserTokenPayload,
} from "src/typings/auth-provider";
import { PjOwner } from "src/typings/configuration";
import { UserGroupKeys } from "src/typings/remote";

import { Country } from "manabie-yasuo/bob/enum_pb";
import { Platform } from "manabuf/common/v1/enums_pb";

import authManager from "../auth-manager";
import appConfigs from "../configuration";
import { AppError } from "../errors";
import featureControllerUnleash from "../feature-controller";
import { GrpcError } from "../grpc";
import permission, { isSchoolAdmin, isTeacher } from "../permission";
import reactiveStorage from "../reactive-storage";

import { FirebaseError as OriginalFirebaseError } from "@firebase/app";

const errPermissionDefined = new FirebaseError({
    code: "permission-denied",
    message: "Sorry, you don't have permission",
});
const errJWTInvalid = new FirebaseError({
    code: "claim_token_invalid",
    message: "Claim token is not valid. Please contact staffs for support!",
});

export const handleAuthUnknownError = (err: unknown): Error | FirebaseError => {
    //can not instanceof OriginalFirebaseError
    if ((err as OriginalFirebaseError).name === OriginalFirebaseError.name) {
        return new FirebaseError(err as OriginalFirebaseError);
    }

    if (err instanceof GrpcError) {
        throw new Error(err.message);
    }

    return handleUnknownError(err);
};

class AuthProvider implements AuthProviderType {
    private authManager: AuthProviderOptions["authManager"];

    constructor(options: AuthProviderOptions) {
        this.authManager = options.authManager;
    }

    // a shorter one but harder to understand claims = claims.match(/[\w.-]+/g).map(Number)
    private parseSchoolIdsClaims(claims: string): number[] {
        // remove first/end {} char, -2 because we already subString the first char
        const parsed = claims.substring(1).substring(0, claims.length - 2);

        return JSON.parse(`[${parsed}]`);
    }

    private checkClaimToken(tokens: UserTokenPayload | undefined | null, profile: UserIdentity) {
        if (!tokens) {
            window.warner?.log("[checkClaimToken]: token does not exist");
            throw errJWTInvalid;
        }

        const claims = tokens["https://hasura.io/jwt/claims"] || {};

        if (!claims["x-hasura-user-id"]) {
            window.warner?.log(`[checkClaimToken]: claims["x-hasura-user-id"]`);
            throw errJWTInvalid;
        }

        const role = claims["x-hasura-default-role"];
        const userGroups = toArr(profile.userGroup);
        if (!role || !userGroups?.includes(role)) {
            window.warner?.log("[checkClaimToken]: !userGroups?.includes(role)", userGroups, role);
            throw errJWTInvalid;
        }

        const schoolIdsClaim = claims["x-hasura-school-ids"];
        const isSchoolClaimValid =
            typeof schoolIdsClaim === "string" &&
            schoolIdsClaim.startsWith("{") &&
            schoolIdsClaim.endsWith("}");

        const schoolIds = isSchoolClaimValid ? this.parseSchoolIdsClaims(schoolIdsClaim!) : [];

        if (!schoolIds.includes(profile.schoolId!)) {
            window.warner?.log(
                `[checkClaimToken]: !schoolIds.includes(profile.schoolId!)`,
                profile.schoolId,
                schoolIds
            );
            throw errJWTInvalid;
        }
    }

    private async validationUserGroupOfUserLogin() {
        const isCheckWithNewUserGroup = featureControllerUnleash.isFeatureEnabled(
            Features.STAFF_MANAGEMENT_USER_GROUP_LOGIN_VALIDATION
        );

        if (!isCheckWithNewUserGroup) return;

        const result = await userGroupServiceUsermgmt.validateUserLogin({
            platform: Platform.PLATFORM_BACKOFFICE,
        });

        if (!result.allowable) {
            window.warner?.warn(`validateUserLogin not allowable`);

            throw errPermissionDefined;
        }
    }

    private async getUserBasicProfile(token: string) {
        const isCheckWithNewUserGroup = featureControllerUnleash.isFeatureEnabled(
            Features.USER_AUTHENTICATION_NEW_GET_BASIC_PROFILE_API
        );

        if (isCheckWithNewUserGroup) {
            const userProfile = await userServiceUsermgmt.getBasicUserProfile();
            if (!userProfile.data) {
                throw new AppError("ra.manabie-error.specified.user_not_found");
            }
            const roleList = userProfile.data.userGroupV2List
                .map((userGroup) => userGroup.rolesList)
                .flat();

            const userRoles = roleList
                .map((roleObject) => mappedRoles[roleObject.role])
                .filter((role) => role);

            const { userId, name, avatar, email, country, school } = userProfile.data;
            const profile: UserIdentity = {
                id: userId,
                name,
                email,
                avatar,
                country,
                userGroup: [...new Set(userRoles)],
                phoneNumber: "",
                deviceToken: "",
                schoolId: school?.schoolId,
                schoolName: school?.schoolName,
                schoolsList: school ? [school] : [],
                schoolIdsList: school ? [school.schoolId] : [],
            };
            return profile;
        } else {
            const userProfile = await userServiceYasuo.getBasicUserProfile({ token });
            if (!userProfile.data) {
                throw new AppError("ra.manabie-error.specified.user_not_found");
            }
            const profile: UserIdentity = {
                ...userProfile.data,
                userGroup: userProfile.data.userGroup as UserGroupKeys,
            };
            return profile;
        }
    }

    private async resolveCurrentUser(token: string) {
        const profile = await this.getUserBasicProfile(token);

        const owner = appConfigs.getCurrentPjOwner();

        const isTeacherLogging = isTeacher(profile?.userGroup);

        if (isTeacherLogging && owner === PjOwner.JPREP) {
            throw new Error(errorCodesMap.TEACHER_JPREP_PERMISSION_DENIED);
        }

        if (!isSchoolAdmin(profile.userGroup) && !isTeacherLogging) {
            throw errPermissionDefined;
        }

        if (isSchoolAdmin(profile.userGroup) || isTeacher(profile.userGroup)) {
            if (!profile.schoolsList || !profile.schoolsList.length) {
                throw new AppError("ra.manabie-error.specified.school_not_found");
            }

            const school = profile.schoolsList[0];
            profile.schoolName = school.schoolName;
            profile.schoolId = school.schoolId;
        }

        const tokens = await decodeJWTToken<UserTokenPayload | undefined>(token);
        this.checkClaimToken(tokens, profile);

        await permission.update(profile.userGroup); //update casl with current role
        profile.countryName = getEnumString(Country, profile.country);
        reactiveStorage.set("PROFILE", profile);

        return Promise.resolve({
            token,
            profile,
            tokens,
        });
    }

    async checkAuth() {
        if (!(await this.authManager.isAuthenticated(true))) {
            const err = new AuthError({ message: EnumAuthErrors.unauthorized });
            //TODO: append error msg, will remove in next version
            throw new Error(`ra.auth.${err.message}`);
        }
        try {
            // customToken is checked in isAuthenticated, so we dont check its existence here
            const token = await this.authManager.getCustomToken();
            await this.validationUserGroupOfUserLogin();

            return await this.resolveCurrentUser(token!);
        } catch (error) {
            window.warner?.warn("checkAuth:", error);

            throw handleAuthUnknownError(error);
        }
    }

    async login(
        { username, password, tenantId }: LoginCredential,
        options: LoginOptions = {}
    ): Promise<UserIdentity | undefined> {
        try {
            reactiveStorage.clear();
            await this.authManager.signIn(
                { username, password, tenantId },
                { additionalQuery: options.additionalQuery }
            );

            if (this.authManager.getType() !== ProviderTypes.oidc) {
                const { profile } = await this.checkAuth(); //call checkAuth to check permission of account in ourBD before redirect user to admin
                return profile;
            }
        } catch (error) {
            window.warner?.warn("Cannot login:", error);

            throw handleAuthUnknownError(error);
        }
    }
    isErrorRelatedToPermission(error: Error) {
        return (
            error.message === errorCodesMap.FIREBASE_PERMISSION_DENIED ||
            error.message === errorCodesMap.CLAIM_TOKEN_INVALID ||
            error.message === errorCodesMap.PERMISSION_DENIED ||
            error.message === errorCodesMap.INVALID_JWT || // logout when firebase can't find user
            error.message === errorCodesMap.TEACHER_JPREP_PERMISSION_DENIED ||
            AuthError.isCriticalError(error) ||
            error.message.includes(EnumAuthErrors.unauthorized) // Message error is override to show snackbar
        );
    }
    async checkError(error: Error, options: CheckErrorOptions = {}) {
        if (this.isErrorRelatedToPermission(error)) {
            const isTeacherJprepLoginError =
                error.message === errorCodesMap.TEACHER_JPREP_PERMISSION_DENIED;

            if (isTeacherJprepLoginError) {
                // I add delay 5s for here
                // Because if user jprep checkAuth gets an error,
                // We need to show the error first and then delay 5s so that the user can read the error message.
                await delay(5000);
                await this.authManager.signOut({ additionalQuery: options.additionalQuery });
            }

            // if user session is not expired, log them out
            if (!(await this.authManager.getAccessToken())) {
                await this.logout(options);
            }

            if (this.authManager.getType() !== ProviderTypes.oidc) {
                // we already handle log out in OIDC in different way
                return Promise.reject();
            }
        }

        return Promise.resolve();
    }
    async logout(options: LogoutOptions = {}) {
        try {
            await this.authManager.signOut({ additionalQuery: options.additionalQuery });
            reactiveStorage.clear();
        } catch (e) {
            window.warner?.warn(e);
            const err = new AuthError({ message: EnumAuthErrors.cannotSignOut });
            throw new Error(`ra.auth.${err.message}`);
        }

        return Promise.resolve(); //will auto redirect here
    }
}

//TODO: move to packages and resolve side-effect
const authProvider = new AuthProvider({
    authManager,
    appConfigs,
});
export default authProvider;
