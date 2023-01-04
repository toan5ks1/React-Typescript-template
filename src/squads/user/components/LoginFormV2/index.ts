import { ExoticComponent } from "react";

import { lazyWithRetry } from "src/common/utils/other";

import { LoginFormProps } from "./types";

export * from "./types";

let LoginForm: ExoticComponent<LoginFormProps>;

// should be text only to enable tree-shaking
if (import.meta.env.VITE_PJ_OWNER === "jprep") {
    LoginForm = lazyWithRetry(() => import("./LoginFormSSO"));
} else {
    LoginForm = lazyWithRetry(() => import("./LoginForm"));
}

export default LoginForm;
