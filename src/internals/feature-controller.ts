import FeatureController, { IFeatureStorage } from "src/packages/feature-controller";

import { Features } from "../common/constants/enum";
import unleashClient from "./unleash-remote-config";

const unleashFeatureStorage: IFeatureStorage<Features> = {
    update: async ({ userId, schoolId, env, variant }) => {
        await unleashClient.updateContext({
            userId: userId,
            properties: {
                org: schoolId || "",
                env,
                var: variant || "",
            },
        });
        return true;
    },
    init: async ({ userId, schoolId, env, variant }) => {
        await unleashClient.updateContext({
            userId: userId,
            properties: {
                org: schoolId || "",
                env,
                var: variant || "",
            },
        });

        await unleashClient.start();

        return true;
    },
    get: (key: string) => {
        return unleashClient.isEnabled(key);
    },
    subscribeToRemoteChanges: (onConfigChange) => {
        unleashClient.on("update", onConfigChange);
    },
    unsubscribe: () => {
        unleashClient.stop();
    },
};
const featureControllerUnleash = new FeatureController<Features>(unleashFeatureStorage);

export default featureControllerUnleash;
