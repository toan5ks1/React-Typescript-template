export enum PjOwner {
    GA = "ga",
    JPREP = "jprep",
    MANABIE = "manabie",
    RENSEIKAI = "renseikai",
    SYNERSIA = "synersia",
    AIC = "aic",
    STUDENT_COACH = "student-coach",
    E2E = "e2e",
    TOKYO = "tokyo",
}

export enum AppConfigTypes {
    API = "api",
    AUTH = "auth",
    ENDPOINT = "endpoint",
    UNLEASH = "unleash",
}

export enum EnvKeys {
    UAT = "uat",
    DEFAULT = "default",
    STAGING = "staging",
    PREPRODUCTION = "preproduction",
    PRODUCTION = "production",
    DEVELOPMENT = "development",
}

// Currently we only have feature toggle configs for these envs
export enum EnvKeysForUnleash {
    UAT = "uat",
    STAGING = "stag",
    PRODUCTION = "prod",
}

export interface EndpointGroups {
    gRPC: string;
    bobGraphQL: string;
    eurekaGraphQL: string;
    fatimaGraphQL: string;
    invoicemgmtGraphQL: string;
    entryexitmgmtGraphQL: string;
    OCR: string;
}
