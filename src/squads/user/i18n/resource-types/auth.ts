declare module NsAuth {
    export interface AuthError {
        "auth/wrong-password": string;
        "auth/argument-error": string;
        "auth/invalid-email": string;
        "auth/user-disabled": string;
        "auth/user-not-found": string;
        "auth/timeout": string;
        "auth/cannot-sign-out": string;
        "auth/credential-expired": string;
        "auth/unauthorized": string;
    }

    export interface Button {
        sign_in: string;
        logout: string;
        forgotPassword: string;
        forgotPasswordWithOrganization: string;
        resetPassword: string;
        backToLogin: string;
        redirectToTenantLogin: string;
        redirectNormalLoginPage: string;
    }

    export interface Label {
        username: string;
        password: string;
        organizationID: string;
        tenantId: string;
    }

    export interface Descriptions {
        enterEmail: string;
        enterPassword: string;
        enterOrganizationID: string;
        theLinkHasBeenSent: string;
        pleaseCheckYourEmailToRenewYourPassword: string;
        theLinkToRenewPasswordWillBeSentToYourEmail: string;
        resetAccountWithAccountWhichWasProvidedByYourSchool: string;
        signingOut: string;
        cannotSignOut: string;
        checkingProfile: string;
        auth_check_error: string;
        user_menu: string;
        sign_in_error: string;
    }

    export interface RootObject {
        authError: AuthError;
        button: Button;
        label: Label;
        descriptions: Descriptions;
    }
}

export interface Auth extends NsAuth.RootObject {}
