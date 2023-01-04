/* eslint-disable no-console*/
import createWarner, { LogLevel, Plugin } from "../packages/warner";
import reactiveStorage from "./reactive-storage";
import stackdriver from "./stackdriver";

declare global {
    interface Window {
        warner?: ReturnType<typeof createWarner>;
    }
}

function getUserInfoForTracing() {
    const profile = reactiveStorage.get("PROFILE");
    if (!profile) {
        return "user: Unknown/Unauthorized";
    }
    const user = profile.id ?? profile.name; // fallback into name in case cant find user id

    return `user: ${user}; schools: ${profile.schoolIdsList.join(",")}`;
}

const reportPlugin: Plugin = {
    warn: (...args) => {
        stackdriver.report(args, {
            user: getUserInfoForTracing(),
        });
    },
    error: (...args) => {
        stackdriver.report(args, {
            user: getUserInfoForTracing(),
        });
    },
};

const warner = createWarner({
    std: console,
    plugins: [reportPlugin],
    logLevel: () => {
        if (import.meta.env.VITE_ENV === "production") {
            return LogLevel.ERROR;
        }

        if (import.meta.env.VITE_ENV === "uat") {
            return LogLevel.WARN;
        }

        return LogLevel.DEBUG;
    },
});

export default warner;

export function enableLogger() {
    if (typeof window !== "undefined") {
        window.warner = warner;
        window.addEventListener("error", (e) => {
            warner.error("Unhandled error, resource fetched fail", e.error);
        });
    }
}
