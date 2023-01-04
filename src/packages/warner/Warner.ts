import { TypeOfObjectValues } from "../../typings/support-types";

export type StdFunction = (...params: any[]) => void;

export interface StdInterface {
    warn: StdFunction;
    error: StdFunction;
    log: StdFunction;
    trace: StdFunction;
}
type StdForPlugin = (...args: any[]) => unknown;

export type Plugin = {
    // only last message plugin will be run
    message?: (...args: any[]) => any[];
    log?: StdForPlugin;
    warn?: StdForPlugin;
    trace?: StdForPlugin;
    error?: StdForPlugin;
};

export type LogLevelValue = LogLevelType | (() => LogLevelType);
export type ProcessMsg = (...args: any[]) => string;

export interface WarnerConfigs {
    std: StdInterface;
    logLevel?: LogLevelValue;
    plugins?: Plugin[];
}

export const LogLevel = {
    DEBUG: 0,
    LOG: 1,
    WARN: 2,
    ERROR: 3,
    NOTHING: 4,
};

type LogLevelType = TypeOfObjectValues<typeof LogLevel>;

function getLogLevel(logLevel?: LogLevelValue) {
    return typeof logLevel === "function" ? logLevel() : logLevel;
}

function findLastPluginHasHook(plugins: Plugin[], hook: keyof Plugin) {
    const reversed = [...plugins].reverse();

    return reversed.find((plugin) => hook in plugin);
}

function createWarner({ std, logLevel: _logLevel, plugins = [] }: WarnerConfigs) {
    let logLevel: LogLevelType = getLogLevel(_logLevel) || LogLevel.LOG;

    function _getMsg(msg: any[]) {
        const hook = findLastPluginHasHook(plugins, "message");

        return hook ? hook.message!(...msg) : msg;
    }

    function runThroughPlugins(lifeCycle: keyof Plugin, ...args: any[]) {
        plugins.forEach((plugin) => {
            plugin[lifeCycle]?.(...args);
        });
    }

    function _call(std: StdFunction, msg: any[], stdLevel: LogLevelType) {
        if (stdLevel < logLevel) {
            return;
        }

        return std(..._getMsg(msg));
    }

    return {
        getLogLevel() {
            return logLevel;
        },

        setLogLevel(_logLevel: LogLevelType) {
            logLevel = _logLevel;
        },

        warn(...warningMsg: any[]) {
            runThroughPlugins("warn", ...warningMsg);
            return _call(std.warn, warningMsg, LogLevel.WARN);
        },

        log(...logMsg: any[]) {
            runThroughPlugins("log", ...logMsg);
            return _call(std.log, logMsg, LogLevel.LOG);
        },

        error(...errorMsg: any[]) {
            runThroughPlugins("error", ...errorMsg);
            return _call(std.error, errorMsg, LogLevel.ERROR);
        },
    };
}

export default createWarner;
