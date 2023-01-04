import { ExoticComponent } from "react";

import { lazyWithRetry } from "src/common/utils/other";

import { LoginFormProps } from "../LoginFormV2/types";

let LoginForm: ExoticComponent<LoginFormProps>;

// should be text only to enable tree-shaking
if (import.meta.env.VITE_PJ_OWNER === "jprep") {
    LoginForm = lazyWithRetry(() => import("../LoginFormV2/LoginFormSSO"));
} else {
    LoginForm = lazyWithRetry(() => import("./LoginTenantForm"));
}

export default LoginForm;
