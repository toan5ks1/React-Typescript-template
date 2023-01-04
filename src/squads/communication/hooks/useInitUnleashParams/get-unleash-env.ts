import { EnvKeys, EnvKeysForUnleash } from "src/typings/configuration";

// This is based on our BE configuration in unleash yaml file
export const convertEnvKeysToUnleashEnvKeys = (envKey: EnvKeys): EnvKeysForUnleash => {
    switch (envKey) {
        case EnvKeys.DEVELOPMENT:
            return EnvKeysForUnleash.STAGING;
        case EnvKeys.STAGING:
            return EnvKeysForUnleash.STAGING;
        case EnvKeys.UAT:
            return EnvKeysForUnleash.UAT;
        case EnvKeys.PREPRODUCTION:
            return EnvKeysForUnleash.PRODUCTION;
        case EnvKeys.PRODUCTION:
            return EnvKeysForUnleash.PRODUCTION;
        default:
            // If no config exist or maybe we make some typos, I think it's safest to assume that it's prod
            return EnvKeysForUnleash.PRODUCTION;
    }
};
