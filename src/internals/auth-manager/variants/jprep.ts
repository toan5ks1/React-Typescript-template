import OIDC, { UserManagerSettings } from "src/packages/oidc";
import { AppConfigTypes } from "src/typings/configuration";

import { getOriginUrl } from "../../../common/helpers/project";
import appConfigs from "../../configuration";

const originUrl = getOriginUrl();
const configs: UserManagerSettings = {
    ...appConfigs.getConfig<UserManagerSettings>(AppConfigTypes.AUTH),

    redirect_uri: `${originUrl.origin}/_auth/_callback`,
    post_logout_redirect_uri: `${originUrl.origin}/_auth/_signout`,
    silent_redirect_uri: `${originUrl.origin}/_auth/_silent`,
    automaticSilentRenew: false,
    silentRequestTimeout: 10000,
};

const authManager = new OIDC(configs);

export default authManager;
