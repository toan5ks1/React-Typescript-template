import { unleashCommonConfig } from "src/internals/configuration/utils";
import { UnleashConfig } from "src/typings/unleash";

import { EnvKeys, AppConfigTypes } from "../../../typings/configuration";

const endpointStagingGreen = {
    gRPC: "https://web-api.staging-green.manabie.io:31400",
    bobGraphQL: "https://admin.staging-green.manabie.io:31600",
    eurekaGraphQL: "https://admin.staging-green.manabie.io:31600/eureka",
    fatimaGraphQL: "https://admin.staging-green.manabie.io:31600/fatima",
    invoicemgmtGraphQL: "https://admin.staging-green.manabie.io:31600/invoicemgmt",
    entryexitmgmtGraphQL: "https://admin.staging-green.manabie.io:31600/entryexitmgmt",
    timesheetGraphQL: "https://admin.staging-green.manabie.io:31600/timesheet",
    OCR: "https://asia-east2-content-management-syste-c40d1.cloudfunctions.net",
};

const firebaseStaging = {
    apiKey: "AIzaSyA7h5F1D1irKjtxd5Uj8A1OTMRmoc1ANRs",
    authDomain: "staging-manabie-online.firebaseapp.com",
    databaseURL: "https://staging-manabie-online.firebaseio.com",
    projectId: "staging-manabie-online",
    storageBucket: "staging-manabie-online.appspot.com",
    messagingSenderId: "456005132078",
    appId: "1:456005132078:web:29bea7c27304ef6527a4bf",
    measurementId: "G-CH49VJD9Y8",
};

const firebaseProduction = {
    apiKey: "AIzaSyCc0AkN1DRxlId2HM1Ss1VJWm2O3zwtel0",
    authDomain: "synersia.firebaseapp.com",
    databaseURL: "https://synersia.firebaseio.com",
    projectId: "synersia",
    storageBucket: "synersia.appspot.com",
    messagingSenderId: "205629481736",
    appId: "1:205629481736:web:ae75478d026d1a465d82bd",
    measurementId: "G-DLJLTY9ZFH",
};

const unleashLocal: UnleashConfig = {
    url: "https://admin.local-green.manabie.io:31600/unleash/proxy",
    environment: "dev",
    ...unleashCommonConfig,
};

const unleashProd: UnleashConfig = {
    url: "https://admin.synersia.manabie.io:31600/unleash/proxy",
    environment: "prod",
    ...unleashCommonConfig,
};

// For some reasons Synersia doesn't have staging and UAT env right now, so I will use prod instance with stag env
// It should be the same instance that's generated from the same yaml anyway
// https://manabie.atlassian.net/browse/LT-6452?focusedCommentId=47880
const unleashStaging: UnleashConfig = {
    ...unleashProd,
    environment: "stag",
};

const firebasePreproduction = firebaseProduction;
const endpointPreproduction = {
    gRPC: "https://web-api.prep.synersia.manabie.io:31400",
    bobGraphQL: "https://admin.prep.synersia.manabie.io:31600",
    eurekaGraphQL: "https://admin.prep.synersia.manabie.io:31600/eureka",
    fatimaGraphQL: "https://admin.prep.synersia.manabie.io:31600/fatima",
    invoicemgmtGraphQL: "https://admin.prep.synersia.manabie.io:31600/invoicemgmt",
    entryexitmgmtGraphQL: "https://admin.prep.synersia.manabie.io:31600/entryexitmgmt",
    timesheetGraphQL: "https://admin.prep.synersia.manabie.io:31600/timesheet",
    OCR: "https://asia-east2-content-management-syste-c40d1.cloudfunctions.net",
};
const unleashPreprod: UnleashConfig = {
    url: "https://admin.prep.synersia.manabie.io:31600/unleash/proxy",
    environment: "prod",
    ...unleashCommonConfig,
};

const firebaseUAT = {
    apiKey: "AIzaSyBULNKqiy-4kJTTsyLoTA6bwAaSFc_7g9M",
    authDomain: "uat-manabie.firebaseapp.com",
    projectId: "uat-manabie",
    storageBucket: "uat-manabie.appspot.com",
    messagingSenderId: "401512356686",
    appId: "1:401512356686:web:fb002f75aa4cd49544dc1f",
    measurementId: "G-E41KN6KREV",
};

const endpointUAT = {
    gRPC: "https://web-api.uat.manabie.io:31400",
    bobGraphQL: "https://admin.uat.manabie.io:31600",
    eurekaGraphQL: "https://admin.uat.manabie.io:31600/eureka",
    fatimaGraphQL: "https://admin.uat.manabie.io:31600/fatima",
    invoicemgmtGraphQL: "https://admin.uat.manabie.io:31600/invoicemgmt",
    entryexitmgmtGraphQL: "https://admin.uat.manabie.io:31600/entryexitmgmt",
    timesheetGraphQL: "https://admin.uat.manabie.io:31600/timesheet",
    OCR: "https://asia-east2-content-management-syste-c40d1.cloudfunctions.net",
};

const unleashUAT: UnleashConfig = {
    url: "https://admin.uat.manabie.io:31600/unleash/proxy",
    environment: "uat",
    ...unleashCommonConfig,
};

export default {
    [EnvKeys.DEVELOPMENT]: {
        [AppConfigTypes.AUTH]: firebaseStaging,
        [AppConfigTypes.ENDPOINT]: endpointStagingGreen,
        [AppConfigTypes.UNLEASH]: unleashLocal,
    },
    [EnvKeys.STAGING]: {
        [AppConfigTypes.AUTH]: firebaseStaging,
        [AppConfigTypes.ENDPOINT]: endpointStagingGreen,
        [AppConfigTypes.UNLEASH]: unleashStaging,
    },
    [EnvKeys.UAT]: {
        [AppConfigTypes.AUTH]: firebaseUAT,
        [AppConfigTypes.ENDPOINT]: endpointUAT,
        [AppConfigTypes.UNLEASH]: unleashUAT,
    },
    [EnvKeys.PREPRODUCTION]: {
        [AppConfigTypes.AUTH]: firebasePreproduction,
        [AppConfigTypes.ENDPOINT]: endpointPreproduction,
        [AppConfigTypes.UNLEASH]: unleashPreprod,
    },
    [EnvKeys.PRODUCTION]: {
        [AppConfigTypes.AUTH]: {
            apiKey: "AIzaSyCc0AkN1DRxlId2HM1Ss1VJWm2O3zwtel0",
            authDomain: "synersia.firebaseapp.com",
            databaseURL: "https://synersia.firebaseio.com",
            projectId: "synersia",
            storageBucket: "synersia.appspot.com",
            messagingSenderId: "205629481736",
            appId: "1:205629481736:web:ae75478d026d1a465d82bd",
            measurementId: "G-DLJLTY9ZFH",
        },

        [AppConfigTypes.ENDPOINT]: {
            gRPC: "https://web-api.synersia.manabie.io:31400",
            bobGraphQL: "https://admin.synersia.manabie.io:31600",
            eurekaGraphQL: "https://admin.synersia.manabie.io:31600/eureka",
            fatimaGraphQL: "https://admin.synersia.manabie.io:31600/fatima",
            invoicemgmtGraphQL: "https://admin.synersia.manabie.io:31600/invoicemgmt",
            entryexitmgmtGraphQL: "https://admin.synersia.manabie.io:31600/entryexitmgmt",
            timesheetGraphQL: "https://admin.synersia.manabie.io:31600/timesheet",
            OCR: "https://asia-east2-content-management-syste-c40d1.cloudfunctions.net",
        },
        [AppConfigTypes.UNLEASH]: unleashProd,
    },
};
