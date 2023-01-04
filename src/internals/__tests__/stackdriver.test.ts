import { resetProcessEnvironment } from "../../test-utils/environment";

jest.mock("stackdriver-errors-js", () => {
    const start = jest.fn();
    const report = jest.fn(() => Promise.resolve());

    function Report() {}

    Report.prototype.start = start;
    Report.prototype.report = report;

    return {
        __esModule: true,
        default: Report,
    };
});

describe("internals/stackdriver", () => {
    resetProcessEnvironment({ VITE_ENV: "production" });

    it("should call report function in stackdriver-errors-js", async () => {
        //we must use require, else we cannot get same instance of StackdriverErrorReporter
        const StackdriverErrorReporter = (await import("stackdriver-errors-js")).default;
        const stackdriver = require("../stackdriver").default;

        stackdriver.report("stackdriver report test");

        expect(new StackdriverErrorReporter().report).toHaveBeenCalled();
    });

    it("should not throw any error even if the reporting function throws", async () => {
        //we must use require, else we cannot get same instance of StackdriverErrorReporter
        const StackdriverErrorReporter = (await import("stackdriver-errors-js")).default;
        (StackdriverErrorReporter.prototype.report as jest.Mock).mockImplementation(async () => {
            throw new Error("Nothing");
        });

        const stackdriver = (await import("../stackdriver")).default;

        stackdriver.report("stackdriver report test");

        expect(new StackdriverErrorReporter().report).toHaveBeenCalled();
    });
});
