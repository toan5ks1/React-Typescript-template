export function isProduction(env: string) {
    return env === "production";
}

export function isSSR() {
    return typeof window === "undefined";
}
