import { unleashCommonConfig } from "src/internals/configuration/utils";
import { UnleashConfig } from "src/typings/unleash";

import { EnvKeys, AppConfigTypes } from "../../../typings/configuration";

const endpointProduction = {
    gRPC: "https://web-api.prod.renseikai.manabie.io:31400",
    bobGraphQL: "https://admin.prod.renseikai.manabie.io:31600",
    eurekaGraphQL: "https://admin.prod.renseikai.manabie.io:31600/eureka",
    fatimaGraphQL: "https://admin.prod.renseikai.manabie.io:31600/fatima",
    invoicemgmtGraphQL: "https://admin.prod.renseikai.manabie.io:31600/invoicemgmt",
    entryexitmgmtGraphQL: "https://admin.prod.renseikai.manabie.io:31600/entryexitmgmt",
    timesheetGraphQL: "https://admin.prod.renseikai.manabie.io:31600/timesheet",
    OCR: "https://asia-east2-content-management-syste-c40d1.cloudfunctions.net",
};

const firebaseProduction = {
    apiKey: "AIzaSyCk7QXIT8AUAF1JB7NLPmSQybrL6-YGz_U",
    authDomain: "production-renseikai.firebaseapp.com",
    projectId: "production-renseikai",
    storageBucket: "production-renseikai.appspot.com",
    messagingSenderId: "783676965208",
    appId: "1:783676965208:web:e7d7ecac6acf83a664652d",
    measurementId: "G-WTDKYVHVN7",
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

const unleashLocal: UnleashConfig = {
    url: "https://admin.local-green.manabie.io:31600/unleash/proxy",
    environment: "dev",
    ...unleashCommonConfig,
};

const unleashProd: UnleashConfig = {
    url: "https://admin.prod.renseikai.manabie.io:31600/unleash/proxy",
    environment: "prod",
    ...unleashCommonConfig,
};

// For some reasons Renseikai doesn't have staging env right now, so I will use prod instance with stag env
// It should be the same instance that's generated from the same yaml anyway
// https://manabie.atlassian.net/browse/LT-6452?focusedCommentId=47880
const unleashStaging: UnleashConfig = {
    ...unleashProd,
    environment: "stag",
};

const firebasePreproduction = firebaseProduction;
const endpointPreproduction = {
    gRPC: "https://web-api.prep.renseikai.manabie.io:31400",
    bobGraphQL: "https://admin.prep.renseikai.manabie.io:31600",
    eurekaGraphQL: "https://admin.prep.renseikai.manabie.io:31600/eureka",
    fatimaGraphQL: "https://admin.prep.renseikai.manabie.io:31600/fatima",
    invoicemgmtGraphQL: "https://admin.prep.renseikai.manabie.io:31600/invoicemgmt",
    entryexitmgmtGraphQL: "https://admin.prep.renseikai.manabie.io:31600/entryexitmgmt",
    timesheetGraphQL: "https://admin.prep.renseikai.manabie.io:31600/timesheet",
    OCR: endpointProduction.OCR,
};
const unleashPreprod: UnleashConfig = {
    url: "https://admin.prep.renseikai.manabie.io:31600/unleash/proxy",
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
    [EnvKeys.DEFAULT]: {
        [AppConfigTypes.AUTH]: firebaseStaging,
        [AppConfigTypes.ENDPOINT]: endpointStagingGreen,
        [AppConfigTypes.UNLEASH]: unleashLocal,
    },
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
        [AppConfigTypes.AUTH]: firebaseProduction,
        [AppConfigTypes.ENDPOINT]: endpointProduction,
        [AppConfigTypes.UNLEASH]: unleashProd,
    },
};
