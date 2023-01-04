import { ProviderTypes } from "src/packages/abstract-auth";
import { PjOwner } from "src/typings/configuration";

jest.mock("../../configuration");

describe("authManager", () => {
    const OLD_ENV = process.env;
    // from stackoverflow https://stackoverflow.com/questions/48033841/test-process-env-with-jest
    beforeEach(() => {
        jest.resetModules(); // most important - it clears the cache
        process.env = { ...OLD_ENV }; // make a copy
    });

    afterAll(() => {
        process.env = OLD_ENV; // restore old env
    });

    it("should contains all functionalities of manabie when import.meta.env.VITE_PJ_OWNER=manabie", () => {
        import.meta.env.VITE_PJ_OWNER = PjOwner.MANABIE;

        jest.isolateModules(() => {
            const authManager = require("../auth-manager").default;

            expect(authManager.getType()).toEqual(ProviderTypes.firebase);
        });
    });

    it("should contains all functionalities of manabie when import.meta.env.VITE_PJ_OWNER=matsuzemi", () => {
        import.meta.env.VITE_PJ_OWNER = PjOwner.SYNERSIA;

        jest.isolateModules(() => {
            const authManager = require("../auth-manager").default;

            expect(authManager.getType()).toEqual(ProviderTypes.firebase);
        });
    });

    // TODO: Currently we cant test the variants as we search and replace for variants
    // it("should contains all functionalities of manabie when import.meta.env.VITE_PJ_OWNER=jprep", () => {
    //     import.meta.env.VITE_PJ_OWNER = PjOwner.JPREP;
    //
    //     jest.isolateModules(() => {
    //         const authManager = require("../auth-manager").default;
    //
    //         expect(authManager.getType()).toEqual(ProviderTypes.oidc);
    //     });
    // });
});
