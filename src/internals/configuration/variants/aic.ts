import { unleashCommonConfig } from "src/internals/configuration/utils";
import { UnleashConfig } from "src/typings/unleash";

import { EnvKeys, AppConfigTypes } from "../../../typings/configuration";

const endpointProduction = {
    gRPC: "https://web-api.prod.aic.manabie.io:31400",
    bobGraphQL: "https://admin.prod.aic.manabie.io:31600",
    eurekaGraphQL: "https://admin.prod.aic.manabie.io:31600/eureka",
    fatimaGraphQL: "https://admin.prod.aic.manabie.io:31600/fatima",
    invoicemgmtGraphQL: "https://admin.prod.aic.manabie.io:31600/invoicemgmt",
    entryexitmgmtGraphQL: "https://admin.prod.aic.manabie.io:31600/entryexitmgmt",
    timesheetGraphQL: "https://admin.prod.aic.manabie.io:31600/timesheet",
    OCR: "https://asia-east2-content-management-syste-c40d1.cloudfunctions.net",
};

const firebaseProduction = {
    apiKey: "AIzaSyCavsmMzTHJuVzVa0amiZv7Xxv0hD88vbE",
    authDomain: "production-aic.firebaseapp.com",
    projectId: "production-aic",
    storageBucket: "production-aic.appspot.com",
    messagingSenderId: "1010613156712",
    appId: "1:1010613156712:web:eb3f8c7d760e79b472b4dd",
    measurementId: "G-6GP43JD83W",
};

const unleashProd: UnleashConfig = {
    url: "https://admin.prod.aic.manabie.io:31600/unleash/proxy",
    environment: "prod",
    ...unleashCommonConfig,
};

const firebasePreproduction = firebaseProduction;
const endpointPreproduction = {
    gRPC: "https://web-api.prep.aic.manabie.io:31400",
    bobGraphQL: "https://admin.prep.aic.manabie.io:31600",
    eurekaGraphQL: "https://admin.prep.aic.manabie.io:31600/eureka",
    fatimaGraphQL: "https://admin.prep.aic.manabie.io:31600/fatima",
    invoicemgmtGraphQL: "https://admin.prep.aic.manabie.io:31600/invoicemgmt",
    entryexitmgmtGraphQL: "https://admin.prep.aic.manabie.io:31600/entryexitmgmt",
    timesheetGraphQL: "https://admin.prep.aic.manabie.io:31600/timesheet",
    OCR: endpointProduction.OCR,
};
const unleashPreprod: UnleashConfig = {
    url: "https://admin.prep.aic.manabie.io:31600/unleash/proxy",
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
