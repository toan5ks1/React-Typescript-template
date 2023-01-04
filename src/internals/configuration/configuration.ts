import Configuration from "src/packages/configuration";

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import container from "./variants/VITE_PJ_OWNER";

const env = Configuration.getDefaultEnv();

window.warner?.log("Init Project Env", env);

const appConfigs = new Configuration(container, env);

export default appConfigs;
