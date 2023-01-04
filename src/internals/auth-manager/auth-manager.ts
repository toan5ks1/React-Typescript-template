import warner from "../warner";
import withSupports from "./injects";
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import rawAuthManager from "./variants/VITE_PJ_OWNER";

const authManager = withSupports<any>(rawAuthManager);
authManager.setLogger(warner);

export default authManager;
