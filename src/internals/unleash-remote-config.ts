import appConfigs from "src/internals/configuration";
import { AppConfigTypes } from "src/typings/configuration";
import { UnleashConfig } from "src/typings/unleash";
import { UnleashClient } from "unleash-proxy-client";
import type { IConfig } from "unleash-proxy-client";

// https://manabie.atlassian.net/browse/LT-9523
const REMOTE_CONFIG_REFRESH_INTERVAL = 60 * 15;

// | undefined because it is possible for us to forget to setup unleash config
const unleashConfig = appConfigs.getConfig<UnleashConfig | undefined>(AppConfigTypes.UNLEASH);

// Using random strings makes sure the app doesn't crash without a config
const featureToggleConfig: IConfig = {
    clientKey: unleashConfig?.clientKey || "missing-client-key",
    appName: unleashConfig?.appName || "missing-app-name",
    url: unleashConfig?.url || "https://missing-url-for-feature-toggle.com",
    // This 'environment' field is actually useless right now.
    // The reason we can't use this is because we're using the free version.
    // Check https://docs.getunleash.io/user_guide/environments#open-source-free
    // We compensate for this using strategy and updating context.properties.env in run time using the env in .env file
    environment: unleashConfig?.environment,
    refreshInterval: REMOTE_CONFIG_REFRESH_INTERVAL,
    // We can use this to optimize config fetching for better UX but I'm not using it for now
    // See custom store section at: https://github.com/Unleash/unleash-proxy-client-js/blob/main/README.md
    // Consider add this to save user from initial loading in the future, right now we're fetching firebase config anyway
    // storageProvider: {
    //     save: async (name: string, data: any) => console.log("unleash save", name, data),
    //     get: async (name: string) => console.log("unleash getting", name),
    // },
};

const unleashClient = new UnleashClient(featureToggleConfig);

export default unleashClient;
