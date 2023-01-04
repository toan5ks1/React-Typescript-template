export interface UnleashConfig {
    url: string;
    clientKey: string;
    refreshInterval?: number;
    appName: string;
    // This 'environment' field is actually useless right now.
    // The reason we can't use this is because we're using the free version.
    // Check https://docs.getunleash.io/user_guide/environments#open-source-free
    // We compensate for this using strategy and updating context.properties.env in run time using the env in .env file
    environment: "dev" | "stag" | "uat" | "prod";
}
