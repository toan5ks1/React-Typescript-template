import get from "lodash/get";
import { UserManagerSettings } from "oidc-client";

import { EnvKeys, PjOwner, AppConfigTypes, EndpointGroups } from "../../typings/configuration";

import type { FirebaseOptions } from "@firebase/app";

export type ConfigOptions = {
    pjOwner: PjOwner;
    env: EnvKeys;
};

export type Config =
    | UserManagerSettings
    | FirebaseOptions
    | EndpointGroups
    | string
    | Array<string>;

export type ConfigsContainer = {
    [x in PjOwner]?: {
        [z in EnvKeys]?: {
            [y in AppConfigTypes]?: Config;
        };
    };
};

class Configuration {
    private currentPjOwner: PjOwner;
    private currentEnv: EnvKeys;
    private configs: ConfigsContainer;

    static getDefaultEnv(): ConfigOptions {
        return {
            pjOwner: (import.meta.env.VITE_PJ_OWNER as PjOwner) || PjOwner.MANABIE,
            env: (import.meta.env.VITE_ENV as EnvKeys) || EnvKeys.DEVELOPMENT,
        };
    }

    constructor(configs: ConfigsContainer, options: ConfigOptions) {
        this.currentPjOwner = options.pjOwner;
        this.currentEnv = options.env;
        this.configs = configs;

        this.getConfig = this.getConfig.bind(this);
        this.getEndpoints = this.getEndpoints.bind(this);
        this.getCurrentEnv = this.getCurrentEnv.bind(this);
        this.getCurrentPjOwner = this.getCurrentPjOwner.bind(this);
        this.setConfig = this.setConfig.bind(this);
        this.setCurrentPjOwner = this.setCurrentPjOwner.bind(this);
    }

    getConfig<Config>(name: AppConfigTypes): Config {
        return get(this.configs, `${this.currentEnv}.${name}`);
    }

    getEndpoints(): EndpointGroups {
        return get(this.configs, `${this.currentEnv}.${AppConfigTypes.ENDPOINT}`);
    }

    getCurrentEnv() {
        return this.currentEnv;
    }

    getCurrentPjOwner() {
        return this.currentPjOwner;
    }

    setConfig(configs: ConfigsContainer) {
        this.configs = configs;
    }

    setCurrentPjOwner(organization: PjOwner) {
        this.currentPjOwner = organization;
    }
}

export default Configuration;
