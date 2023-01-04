import StackdriverErrorReporter from "stackdriver-errors-js";

import { getErrorFromMsg } from "./utils";

export type StackdriverOptions = {
    user?: string;
    // additional?: string; this field is deprecated
    skipLocalFrames?: number;
};

interface Context {
    userId?: string;

    [x: string]: any;
}

interface PayloadContext extends Context {
    httpRequest: {
        userAgent: string;
        url: string;
    };
}

interface ServiceContext {
    service: string;
    version: string;
}

/**
 * Payload passed to the custom reporting function
 */
interface Payload {
    context: PayloadContext;
    message: string;
    serviceContext: ServiceContext;
}

/**
 * Initial configuration
 */
export interface InitialConfiguration {
    targetUrl?: string;
    context?: Context;
    customReportingFunction?: (payload: Payload) => Promise<void>;
    disabled?: boolean;
    key: string;
    projectId: string;
    reportUncaughtExceptions?: boolean;
    reportUnhandledPromiseRejections?: boolean;
    service?: string;
    version?: string;
}

export interface StackdriverInternal {
    report: (msg: Error | string, options?: StackdriverOptions) => Promise<void>;
    start: (configs: InitialConfiguration) => void;
    setUser?: (user: string) => void;
}

interface StackdriverStartOptions {
    key: string;
    projectId: string;
    service: string;
    context: Record<string, any>;
    version: string;
    reportUncaughtExceptions?: boolean;
    reportUnhandledPromiseRejections?: boolean;
    shouldEnable?: boolean | (() => boolean);
}

function checkEnable(shouldEnable: StackdriverStartOptions["shouldEnable"]) {
    if (typeof shouldEnable === "function") {
        return shouldEnable();
    }

    return shouldEnable ?? false;
}

class Stackdriver {
    private stackdriver: StackdriverInternal | StackdriverErrorReporter;
    isEnabled: boolean = false;

    constructor(
        stackdriver: StackdriverInternal | StackdriverErrorReporter,
        options: StackdriverStartOptions
    ) {
        this.stackdriver = stackdriver;
        this.isEnabled = checkEnable(options?.shouldEnable);

        this.stackdriver.start(options);

        this.report = this.report.bind(this);
        this.setEnable = this.setEnable.bind(this);
        this.getEnable = this.getEnable.bind(this);
    }

    report(err: Error | string | any[], options?: StackdriverOptions) {
        if (!this.isEnabled) {
            return;
        }

        const error = getErrorFromMsg(err);

        this.stackdriver.report(error, options).catch(() => {
            // prevent error reporting become error
        });
    }

    setEnable(enabled: boolean) {
        this.isEnabled = enabled;
    }

    getEnable() {
        return this.isEnabled;
    }
}

export default Stackdriver;
