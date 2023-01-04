import Stackdriver from "../Stackdriver";

describe("Stackdriver", () => {
    const stackdriverOptions = {
        key: "key",
        context: {},
        projectId: "projectId",
        service: "Service",
        version: "1.1",
        shouldEnable: true,
    };

    it("should call start/report correctly", () => {
        const reportFn = jest.fn().mockImplementation(() => Promise.resolve());
        const startFn = jest.fn();

        const stackdriver = new Stackdriver(
            {
                report: reportFn,
                start: startFn,
            },
            stackdriverOptions
        );

        expect(startFn).toHaveBeenCalled();

        const errToReport = new Error("456");
        const reportOptions = { user: "user1" };
        stackdriver.report(errToReport, reportOptions);

        expect(reportFn).toHaveBeenCalledWith(errToReport, { user: reportOptions.user });
    });

    it("should NOT throw any errors when report function throw error", () => {
        const reportFn = jest.fn().mockImplementation(() => Promise.reject());
        const startFn = jest.fn();

        const stackdriver = new Stackdriver(
            {
                report: reportFn,
                start: startFn,
            },
            stackdriverOptions
        );

        expect(startFn).toHaveBeenCalled();

        const errToReport = new Error("Not report this");

        expect(() => stackdriver.report(errToReport)).not.toThrowError();
    });

    it("should enable the report again by setting the setEnable", () => {
        const reportFn = jest.fn().mockImplementation(() => Promise.reject());
        const startFn = jest.fn();

        const stackdriver = new Stackdriver(
            {
                report: reportFn,
                start: startFn,
            },
            {
                ...stackdriverOptions,
                shouldEnable: false,
            }
        );
        const msg = "report now";
        // don't enable at first
        stackdriver.report(msg);

        expect(reportFn).not.toHaveBeenCalled();

        // re-enable again
        stackdriver.setEnable(true);
        stackdriver.report(msg);

        expect(reportFn).toHaveBeenCalledWith(msg, undefined); // undefined is the options
    });
});
