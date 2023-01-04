import { resetProcessEnvironment } from "src/test-utils/environment";

import warner from "../warner";

describe("warner", () => {
    resetProcessEnvironment();

    it("should use default console as std out", () => {
        const spy = jest.spyOn(console, "log").mockImplementation(() => {});

        warner.log("this is log");

        expect(spy).toHaveBeenCalled();
    });

    it("have correct prefix when logging", () => {
        const pjOwner = "pjOwner";
        const env = "env";
        import.meta.env.VITE_PJ_OWNER = pjOwner;
        import.meta.env.VITE_ENV = env;

        const spy = jest.spyOn(console, "log").mockImplementation(() => {});

        jest.isolateModules(() => {
            const warner = require("../warner").default;
            warner.log("this is log");

            expect(spy).toHaveBeenCalledWith("this is log");
        });
    });
});
