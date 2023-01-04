export enum PjOwner {
    GA = "ga",
    JPREP = "jprep",
    MANABIE = "manabie",
    RENSEIKAI = "renseikai",
    SYNERSIA = "synersia",
    AIC = "aic",
    E2E = "e2e",
    TOKYO = "tokyo",
}

export enum AppConfigTypes {
    API = "api",
    AUTH = "auth",
    ENDPOINT = "endpoint",
    CROSS_ORIGIN_COMMUNICATION_ALLOW_LIST = "cross_origin_communication_allow_list",
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
    timesheetGraphQL: string;
    OCR: string;
}

//TODO: Should remove unnecessary
export enum ActionConfigs {
    QUIZ_TAG_LO = "tag_lo",
    QUIZ_DIFFICULTY = "difficulty",
    COURSE_DELETE = "course_delete",
    QUIZ_EXTERNAL_ID = "external_id",
    SCHOOL_CONFIGS_SCHOOLS = "schools",
    SCHEDULE_BRAND_FILTER = "brand_filter",
    SCHEDULE_CENTER_FILTER = "center_filter",
    STUDY_PLAN_DELETE = "study_plan_delete",
    STUDENT_EXTERNAL_ID_SHOW = "student_external_id_show",
    STUDY_PLAN_V2 = "study_plan_v2",
    STUDENT_DEVELOPMENT_MODE = "STUDENT_DEVELOPMENT_MODE",
    GENDER_AND_BIRTHDAY = "gender_and_birthday",
}
