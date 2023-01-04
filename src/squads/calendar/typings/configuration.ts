export enum PjOwner {
    GA = "ga",
    JPREP = "jprep",
    MANABIE = "manabie",
    RENSEIKAI = "renseikai",
    SYNERSIA = "synersia",
    AIC = "aic",
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
