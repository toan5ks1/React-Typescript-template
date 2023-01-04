import createWarner, { LogLevel, StdInterface, Plugin } from "../Warner";

describe("Warner", () => {
    let std: StdInterface;

    beforeEach(() => {
        std = {
            log: jest.fn(),
            error: jest.fn(),
            warn: jest.fn(),
            trace: jest.fn(),
        };
    });

    it("should return correct log level", () => {
        const warner = createWarner({ std, logLevel: LogLevel.LOG });

        expect(warner.getLogLevel()).toEqual(LogLevel.LOG);

        //set log level again
        warner.setLogLevel(LogLevel.ERROR);
        expect(warner.getLogLevel()).toEqual(LogLevel.ERROR);
    });

    it("should log on correct log level only", () => {
        const warner = createWarner({ std, logLevel: LogLevel.ERROR });

        warner.warn("warn");

        expect(std.warn).toHaveBeenCalledTimes(0);
    });

    it("should call correct function on std passed", () => {
        const warner = createWarner({ std });

        //log function
        warner.log("thisIsLog");
        expect(std.log).toHaveBeenCalledWith("thisIsLog");

        //warn function
        warner.warn("thisIsWarn");
        expect(std.warn).toHaveBeenCalledWith("thisIsWarn");
    });

    it("should process through hooks", () => {
        const logHook: Plugin = {
            log: jest.fn(),
        };
        const warnHook: Plugin = {
            warn: jest.fn(),
        };
        const errorHook: Plugin = {
            error: jest.fn(),
        };

        const plugins = [logHook, warnHook, errorHook];

        const warner = createWarner({ std, plugins });

        warner.log("this is log");
        expect(logHook.log!).toHaveBeenCalledWith("this is log");

        warner.warn("this is warn");
        expect(warnHook.warn).toHaveBeenCalledWith("this is warn");

        warner.error("this is error");
        expect(errorHook.error).toHaveBeenCalledWith("this is error");
    });

    it("should only run the last 'message' hook and modify the return message", () => {
        const messageHook1: Plugin = {
            message: jest.fn(() => ["returnMsg1"]),
        };
        const messageHook2: Plugin = {
            message: jest.fn(() => ["real return message"]),
        };

        const warner = createWarner({ std, plugins: [messageHook1, messageHook2] });

        warner.log("This is log message");

        expect(messageHook1.message).not.toHaveBeenCalled();
        expect(messageHook2.message).toHaveBeenCalledWith("This is log message");
        // after modify the actual 'std' will be call with message return by the hook
        expect(std.log).toHaveBeenCalledWith(...messageHook2.message!());
    });
});
