import { Fn } from "../../typings/support-types";
import { OptionalLogger } from "../abstract-auth";

import type { FirebaseApp } from "@firebase/app";
import {
    getRemoteConfig,
    ensureInitialized,
    fetchAndActivate,
    getString,
    getValue,
    RemoteConfigSettings,
    RemoteConfig as FbRemoteConfig,
} from "@firebase/remote-config";

interface RemoteConfigOptions {
    settings: RemoteConfigSettings;
    environment: string;
}

export interface Logger {
    log: Fn;
    warn: Fn;
    error: Fn;
}

//T is a collection of firebase variables
class RemoteConfig {
    private initialized = false;
    private readonly remoteConfig: FbRemoteConfig;
    private readonly environment: string;
    private logger: Logger | null = null;

    constructor(firebaseApp: FirebaseApp, options: RemoteConfigOptions) {
        this.environment = options.environment;

        if (!firebaseApp) {
            throw new Error("Doesnt provide firebase app");
        }
        this.remoteConfig = getRemoteConfig(firebaseApp);
        this.remoteConfig.settings = options.settings;

        this.init = this.init.bind(this);
        this.isInitialized = this.isInitialized.bind(this);
        this.getString = this.getString.bind(this);
        this.getValue = this.getValue.bind(this);
    }

    async init() {
        try {
            await ensureInitialized(this.remoteConfig);

            // If the fetched configs were already activated, the promise will resolve to false.
            await fetchAndActivate(this.remoteConfig);
            this.initialized = true;

            return this.initialized;
        } catch (e) {
            this.logger?.warn("Cannot fetch remote config", e);
        }
    }

    isInitialized(): boolean {
        return this.initialized;
    }

    setLogger(logger: OptionalLogger) {
        this.logger = logger;
    }

    //return only string of the key in the config
    getString(key: string): string {
        const resp = getString(this.remoteConfig, key);

        try {
            return JSON.parse(resp)[this.environment];
        } catch (e) {
            return resp;
        }
    }

    //get value will include this _source
    getValue(key: string) {
        return getValue(this.remoteConfig, key);
    }
}

export default RemoteConfig;
