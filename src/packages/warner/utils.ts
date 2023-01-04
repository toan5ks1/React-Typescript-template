export function getStackTrace(messages: any[]) {
    const firstError: Error = messages.find((msg) => msg instanceof Error);

    if (firstError) {
        return firstError;
    }

    return new Error(messages.join(","));
}
