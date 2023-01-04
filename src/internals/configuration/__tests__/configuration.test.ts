// import { EnvKeys, PjOwner } from "src/typings/configuration";
import { resetProcessEnvironment } from "src/test-utils/environment";

describe("appConfigs", () => {
    resetProcessEnvironment();

    it("should contains properties based on process.env", () => {
        // import.meta.env.VITE_PJ_OWNER = PjOwner.MANABIE;
        // import.meta.env.VITE_ENV = EnvKeys.UAT;
        //
        // const appConfigs = require("../configuration").default;
        //
        // expect(appConfigs.getCurrentPjOwner()).toEqual(PjOwner.MANABIE);
        // expect(appConfigs.getCurrentEnv()).toEqual(EnvKeys.UAT);
    });
});
