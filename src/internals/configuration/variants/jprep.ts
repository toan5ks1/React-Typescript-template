import { unleashCommonConfig } from "src/internals/configuration/utils";
import { UnleashConfig } from "src/typings/unleash";

import { EnvKeys, AppConfigTypes } from "../../../typings/configuration";

const endpointUat = {
    gRPC: "https://web-api.uat.jprep.manabie.io:31400",
    bobGraphQL: "https://admin.uat.jprep.manabie.io:31600",
    eurekaGraphQL: "https://admin.uat.jprep.manabie.io:31600/eureka",
    fatimaGraphQL: "https://admin.uat.jprep.manabie.io:31600/fatima",
    invoicemgmtGraphQL: "https://admin.uat.jprep.manabie.io:31600/invoicemgmt",
    entryexitmgmtGraphQL: "https://admin.uat.jprep.manabie.io:31600/entryexitmgmt",
    timesheetGraphQL: "https://admin.uat.jprep.manabie.io:31600/timesheet",
    OCR: "https://asia-east2-content-management-syste-c40d1.cloudfunctions.net",
};

const endpointProduction = {
    gRPC: "https://web-api.prod.jprep.manabie.io:31400",
    bobGraphQL: "https://admin.prod.jprep.manabie.io:31600",
    eurekaGraphQL: "https://admin.prod.jprep.manabie.io:31600/eureka",
    fatimaGraphQL: "https://admin.prod.jprep.manabie.io:31600/fatima",
    invoicemgmtGraphQL: "https://admin.prod.jprep.manabie.io:31600/invoicemgmt",
    entryexitmgmtGraphQL: "https://admin.prod.jprep.manabie.io:31600/entryexitmgmt",
    timesheetGraphQL: "https://admin.prod.jprep.manabie.io:31600/timesheet",
    OCR: "https://asia-east2-content-management-syste-c40d1.cloudfunctions.net",
};

const endpointPreproduction = {
    gRPC: "https://web-api.prep.jprep.manabie.io:31400",
    bobGraphQL: "https://admin.prep.jprep.manabie.io:31600",
    eurekaGraphQL: "https://admin.prep.jprep.manabie.io:31600/eureka",
    fatimaGraphQL: "https://admin.prep.jprep.manabie.io:31600/fatima",
    invoicemgmtGraphQL: "https://admin.prep.jprep.manabie.io:31600/invoicemgmt",
    entryexitmgmtGraphQL: "https://admin.prep.jprep.manabie.io:31600/entryexitmgmt",
    timesheetGraphQL: "https://admin.prep.jprep.manabie.io:31600/timesheet",
    OCR: endpointProduction.OCR,
};

const endpointStaging = {
    gRPC: "https://web-api.staging.jprep.manabie.io:31400",
    bobGraphQL: "https://admin.staging.jprep.manabie.io:31600",
    eurekaGraphQL: "https://admin.staging.jprep.manabie.io:31600/eureka",
    fatimaGraphQL: "https://admin.staging.jprep.manabie.io:31600/fatima",
    invoicemgmtGraphQL: "https://admin.staging-green.manabie.io:31600/invoicemgmt",
    entryexitmgmtGraphQL: "https://admin.staging-green.manabie.io:31600/entryexitmgmt",
    timesheetGraphQL: "https://admin.staging-green.manabie.io:31600/invoicemgmt",
    OCR: "https://asia-east2-content-management-syste-c40d1.cloudfunctions.net",
};

const unleashLocal: UnleashConfig = {
    url: "https://admin.local-green.manabie.io:31600/unleash/proxy",
    environment: "dev",
    ...unleashCommonConfig,
};

const unleashStaging: UnleashConfig = {
    url: "https://admin.staging.jprep.manabie.io:31600/unleash/proxy",
    environment: "stag",
    ...unleashCommonConfig,
};

const unleashUAT: UnleashConfig = {
    url: "https://admin.uat.jprep.manabie.io:31600/unleash/proxy",
    environment: "uat",
    ...unleashCommonConfig,
};

const unleashPreprod: UnleashConfig = {
    url: "https://admin.prep.jprep.manabie.io:31600/unleash/proxy",
    environment: "prod",
    ...unleashCommonConfig,
};

const unleashProd: UnleashConfig = {
    url: "https://admin.prod.jprep.manabie.io:31600/unleash/proxy",
    environment: "prod",
    ...unleashCommonConfig,
};

export default {
    [EnvKeys.DEFAULT]: {
        [AppConfigTypes.AUTH]: {
            authority:
                "https://d2020-ji-sso.jprep.jp/auth/realms/manabie-test/.well-known/openid-configuration",
            client_id: "manabie-app",
            response_type: "code",
            automaticSilentRenew: true,
            scope: "openid",
        },

        [AppConfigTypes.ENDPOINT]: endpointStaging,
        [AppConfigTypes.UNLEASH]: unleashLocal,
    },
    [EnvKeys.DEVELOPMENT]: {
        [AppConfigTypes.AUTH]: {
            authority:
                "https://d2020-ji-sso.jprep.jp/auth/realms/manabie-test/.well-known/openid-configuration",
            client_id: "manabie-app",
            response_type: "code",
            scope: "openid",
        },

        [AppConfigTypes.ENDPOINT]: endpointStaging,
        [AppConfigTypes.UNLEASH]: unleashLocal,
    },
    [EnvKeys.STAGING]: {
        [AppConfigTypes.AUTH]: {
            authority:
                "https://d2020-ji-sso.jprep.jp/auth/realms/manabie-test/.well-known/openid-configuration",
            client_id: "manabie-app",
            response_type: "code",
            scope: "openid",
        },

        [AppConfigTypes.ENDPOINT]: endpointStaging,
        [AppConfigTypes.UNLEASH]: unleashStaging,
    },
    [EnvKeys.UAT]: {
        [AppConfigTypes.AUTH]: {
            authority:
                "https://d2020-ji-sso.jprep.jp/auth/realms/manabie-test/.well-known/openid-configuration",
            client_id: "manabie-app",
            response_type: "code",
            scope: "openid",
        },

        [AppConfigTypes.ENDPOINT]: endpointUat,
        [AppConfigTypes.UNLEASH]: unleashUAT,
    },
    [EnvKeys.PREPRODUCTION]: {
        [AppConfigTypes.AUTH]: {
            authority: "https://ji-sso.jprep.jp/auth/realms/jprep/.well-known/openid-configuration",
            client_id: "manabie",
            response_type: "code",
            scope: "openid",
        },

        [AppConfigTypes.ENDPOINT]: endpointPreproduction,
        [AppConfigTypes.UNLEASH]: unleashPreprod,
    },
    [EnvKeys.PRODUCTION]: {
        [AppConfigTypes.AUTH]: {
            authority: "https://ji-sso.jprep.jp/auth/realms/jprep/.well-known/openid-configuration",
            client_id: "manabie",
            response_type: "code",
            scope: "openid",
        },

        [AppConfigTypes.ENDPOINT]: endpointProduction,
        [AppConfigTypes.UNLEASH]: unleashProd,
    },
};
