import { unleashCommonConfig } from "src/internals/configuration/utils";
import { UnleashConfig } from "src/typings/unleash";

import { EnvKeys, AppConfigTypes } from "../../../typings/configuration";

const firebaseLocal = {
    apiKey: "AIzaSyAlE26SQ0OMGjmr4IiF9D6CJkK0eRvV6HA",
    authDomain: "dev-manabie-online.firebaseapp.com",
    projectId: "dev-manabie-online",
    storageBucket: "dev-manabie-online.appspot.com",
    messagingSenderId: "888663408192",
    appId: "1:888663408192:web:3835337d61df3f479969a5",
    measurementId: "G-FBGS2ECKKX",
};

const firebaseStaging = {
    apiKey: "AIzaSyA7h5F1D1irKjtxd5Uj8A1OTMRmoc1ANRs",
    authDomain: "staging-manabie-online.firebaseapp.com",
    databaseURL: "https://staging-manabie-online.firebaseio.com",
    projectId: "staging-manabie-online",
    storageBucket: "staging-manabie-online.appspot.com",
    messagingSenderId: "456005132078",
    appId: "1:456005132078:web:b1c4550c9c44f85d27a4bf",
    measurementId: "G-QM065T9M0F",
};

const firebaseProduction = {
    apiKey: "AIzaSyAX_hkFpXOfLzf5NWOVdvqLctPsaX3NdQ8",
    authDomain: "student-coach-e1e95.firebaseapp.com",
    databaseURL: "https://student-coach-e1e95.firebaseio.com",
    projectId: "student-coach-e1e95",
    storageBucket: "student-coach-e1e95.appspot.com",
    messagingSenderId: "418860883682",
    appId: "1:418860883682:web:0523db7bb5bb01e9",
    measurementId: "G-NJ8E94Q888",
};

const endpointLocalGreen = {
    gRPC: "https://web-api.local-green.manabie.io:31400",
    bobGraphQL: "https://admin.local-green.manabie.io:31600",
    eurekaGraphQL: "https://admin.local-green.manabie.io:31600/eureka",
    fatimaGraphQL: "https://admin.local-green.manabie.io:31600/fatima",
    invoicemgmtGraphQL: "https://admin.local-green.manabie.io:31600/invoicemgmt",
    entryexitmgmtGraphQL: "https://admin.local-green.manabie.io:31600/entryexitmgmt",
    timesheetGraphQL: "https://admin.local-green.manabie.io:31600/timesheet",
    OCR: "https://asia-east2-content-management-syste-c40d1.cloudfunctions.net",
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

const endpointProductionGreen = {
    gRPC: "https://web-api.prod.manabie-vn.manabie.io:31400",
    bobGraphQL: "https://admin.prod.manabie-vn.manabie.io:31600",
    eurekaGraphQL: "https://admin.prod.manabie-vn.manabie.io:31600/eureka",
    fatimaGraphQL: "https://admin.prod.manabie-vn.manabie.io:31600/fatima",
    invoicemgmtGraphQL: "https://admin.prod.manabie-vn.manabie.io:31600/invoicemgmt",
    entryexitmgmtGraphQL: "https://admin.prod.manabie-vn.manabie.io:31600/entryexitmgmt",
    timesheetGraphQL: "https://admin.prod.manabie-vn.manabie.io:31600/timesheet",
    OCR: "https://asia-east2-content-management-syste-c40d1.cloudfunctions.net",
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

const unleashLocal: UnleashConfig = {
    url: "https://admin.local-green.manabie.io:31600/unleash/proxy",
    environment: "dev",
    ...unleashCommonConfig,
};

const unleashStaging: UnleashConfig = {
    url: "https://admin.staging.manabie.io:31600/unleash/proxy",
    environment: "stag",
    ...unleashCommonConfig,
};

const unleashUAT: UnleashConfig = {
    url: "https://admin.uat.manabie.io:31600/unleash/proxy",
    environment: "uat",
    ...unleashCommonConfig,
};

const unleashProd: UnleashConfig = {
    url: "https://admin.prod.manabie-vn.manabie.io:31600/unleash/proxy",
    environment: "prod",
    ...unleashCommonConfig,
};

export default {
    [EnvKeys.DEVELOPMENT]: import.meta.env.VITE_RUN_BE_LOCAL
        ? {
              [AppConfigTypes.AUTH]: firebaseLocal,
              [AppConfigTypes.ENDPOINT]: endpointLocalGreen,
              [AppConfigTypes.UNLEASH]: unleashLocal,
          }
        : {
              [AppConfigTypes.AUTH]: firebaseStaging,
              [AppConfigTypes.ENDPOINT]: endpointStagingGreen,
              [AppConfigTypes.UNLEASH]: unleashStaging,
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
    [EnvKeys.PRODUCTION]: {
        [AppConfigTypes.AUTH]: firebaseProduction,
        [AppConfigTypes.ENDPOINT]: endpointProductionGreen,
        [AppConfigTypes.UNLEASH]: unleashProd,
    },
};
