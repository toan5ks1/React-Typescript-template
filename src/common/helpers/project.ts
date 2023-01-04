import { PUBLIC_URL } from "../constants/other";

const defaultValue = "https://localhost:3001";

export function getOriginUrl() {
    if (typeof window === "undefined") {
        return new URL(defaultValue);
    }

    return new URL(PUBLIC_URL || "", window.location.origin || defaultValue);
}
