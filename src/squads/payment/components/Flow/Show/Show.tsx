import { useMemo } from "react";

interface ShowProps<T> {
    when: T | undefined | null | false;
    fallback?: JSX.Element | null;
    children: JSX.Element | ((item: NonNullable<T>) => JSX.Element);
}

export default function Show<T>({
    when,
    fallback = null,
    children,
}: ShowProps<T>): JSX.Element | null {
    return useMemo(() => {
        if (when) {
            return typeof children === "function" ? children(when as NonNullable<T>) : children;
        }
        return fallback;
    }, [when, children, fallback]);
}

export type { ShowProps };
