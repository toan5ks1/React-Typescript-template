export enum PjOwner {
    GA = "ga",
    JPREP = "jprep",
    MANABIE = "manabie",
    RENSEIKAI = "renseikai",
    SYNERSIA = "synersia",
    AIC = "aic",
}

export enum AppConfigTypes {
    API = "api",
    AUTH = "auth",
    ENDPOINT = "endpoint",
    FIREBASE = "firebase",
    CROSS_ORIGIN_COMMUNICATION_ALLOW_LIST = "cross_origin_communication_allow_list",
}

export enum EnvKeys {
    UAT = "uat",
    DEFAULT = "default",
    STAGING = "staging",
    PREPRODUCTION = "preproduction",
    PRODUCTION = "production",
    DEVELOPMENT = "development",
}

export interface EndpointGroups {
    gRPC: string;
    bobGraphQL: string;
    eurekaGraphQL: string;
    fatimaGraphQL: string;
    OCR: string;
}
