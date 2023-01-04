import { EnvKeys, EnvKeysForUnleash } from "src/typings/configuration";

import { convertEnvKeysToUnleashEnvKeys } from "../get-unleash-env";

describe("convertEnvKeysToUnleashEnvKeys", () => {
    it("convert to unleash staging in development env", () => {
        expect(convertEnvKeysToUnleashEnvKeys(EnvKeys.DEVELOPMENT)).toEqual(
            EnvKeysForUnleash.STAGING
        );
    });
    it("convert to correctly unleash in stag/uat/prod", () => {
        expect(convertEnvKeysToUnleashEnvKeys(EnvKeys.STAGING)).toEqual(EnvKeysForUnleash.STAGING);
        expect(convertEnvKeysToUnleashEnvKeys(EnvKeys.UAT)).toEqual(EnvKeysForUnleash.UAT);
        expect(convertEnvKeysToUnleashEnvKeys(EnvKeys.PRODUCTION)).toEqual(
            EnvKeysForUnleash.PRODUCTION
        );
    });
    it("convert to unleash PROD for the out-of-box cases", () => {
        expect(convertEnvKeysToUnleashEnvKeys("out-of-box" as any)).toEqual(
            EnvKeysForUnleash.PRODUCTION
        );
    });
});
