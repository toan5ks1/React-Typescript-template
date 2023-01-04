import Configuration, { ConfigsContainer } from "src/packages/configuration";
import { PjOwner } from "src/typings/configuration";

import appConfigs from "./configuration";

export const initNewConfigWithOrganization = async (organization?: PjOwner) => {
    const { pjOwner } = Configuration.getDefaultEnv();
    // Init default configs when logout
    const owner = organization || pjOwner;

    const { default: configs } = await import(`./variants/${owner}.ts`);

    appConfigs.setCurrentPjOwner(owner as PjOwner);
    appConfigs.setConfig(configs as ConfigsContainer);
};
