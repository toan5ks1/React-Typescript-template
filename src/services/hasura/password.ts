import { ResetPasswordData } from "src/packages/abstract-auth";

import { ProviderTypes } from "../../common/constants/enum";
import { FirebaseError } from "../../common/utils/error";
import authManager from "../../internals/auth-manager";
import { getEmptyResponse } from "../utils";

type Params = {
    type: ProviderTypes.RESET_PASSWORD;
    payload: {
        data: ResetPasswordData;
    };
};
export default function (params: Params) {
    switch (params.type) {
        case ProviderTypes.RESET_PASSWORD: {
            const { data } = params.payload;
            return authManager
                .resetPassword(data)
                .then((res) => {
                    return {
                        data: res,
                    };
                })
                .catch((err) => {
                    throw new FirebaseError(err);
                });
        }

        default: {
            return getEmptyResponse();
        }
    }
}
