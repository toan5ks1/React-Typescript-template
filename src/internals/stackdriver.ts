import { copyError } from "src/common/utils/error";
import StackdriverErrorReporter from "stackdriver-errors-js";

import { ManaLoggerPluginReporter } from "@manabie-com/mana-logger-plugin-reporter";

declare global {
    interface Window {
        enableCloudReport?: (enabled: boolean) => void;
    }
}

const ins = new StackdriverErrorReporter();
const stackdriver = new ManaLoggerPluginReporter(ins, {
    key: import.meta.env.VITE_STACK_DRIVER_KEY || "AIzaSyADemSsjLl-B1l325lqNc0WwEowP2Agu-8",
    projectId: "student-coach-e1e95",
    service: `Portal <${import.meta.env.VITE_PJ_OWNER}|${import.meta.env.VITE_ENV}>`,
    context: {}, // default context
    version: import.meta.env.VITE_BUILD_VERSION || "0.0.1",
    reportUncaughtExceptions: false,
    reportUnhandledPromiseRejections: false,
    copyError,
    shouldEnable: () => {
        return (
            import.meta.env.VITE_ENV === "uat" ||
            import.meta.env.VITE_ENV === "preproduction" ||
            import.meta.env.VITE_ENV === "production"
        );
    },
});

export function enableReport() {
    if (typeof window != "undefined") {
        // expose this function only
        window.enableCloudReport = stackdriver.setEnable;
    }
}

export default stackdriver;
