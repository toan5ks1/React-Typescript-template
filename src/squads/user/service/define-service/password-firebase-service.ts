import authManager from "src/internals/auth-manager";
import { ResetPasswordData } from "src/packages/abstract-auth";
import { defineService } from "src/squads/user/service/service-creator";

const passwordFirebaseService = defineService({
    mutation: {
        userResetPassword: (variables: ResetPasswordData) => {
            return authManager.resetPassword(variables);
        },
    },
});

export default passwordFirebaseService;
