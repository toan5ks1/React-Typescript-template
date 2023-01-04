import { safeStringify } from "../../common/utils/other";

import isNil from "lodash/isNil";

export function getErrorFromMsg(messages: Error | string | any[]) {
    if (messages instanceof Error) {
        // if messages is string, then stackdriver is automatically generate an error from it
        return copyError(messages);
    }

    if (typeof messages === "string") {
        // if messages is string, then stackdriver is automatically generate an error from it
        return messages;
    }

    if (Array.isArray(messages)) {
        let finalMessage = combineMessages(messages);
        // if array message has an error, then clone the error (to take the stack), pass all the messages
        const firstError: Error = messages.find((msg) => msg instanceof Error);
        if (firstError) {
            return copyError(firstError, finalMessage);
        }
        return finalMessage;
    }

    return safeStringify(messages); // last fallback solution
}

// TODO: Move AppError to a package, then import here to check instance of
function isAppError(err: Error): err is Error & { originMessage?: string } {
    return typeof err["originMessage"] !== "undefined";
}

function copyError(err: Error & { originMessage?: string }, newMessage?: string) {
    let message: string = err.message;

    if (isAppError(err) && err.originMessage) {
        message = err.originMessage;
    }

    const newErr = new Error(newMessage ?? message);
    newErr.stack = err.stack;
    newErr.name = err.name;

    return newErr;
}

function combineMessages(messages: any[]) {
    const allMessages = messages.reduce<string[]>((combined, current) => {
        switch (true) {
            case typeof current === "string": {
                combined.push(current);
                break;
            }
            case current instanceof Error: {
                combined.push(current.toString());
                break;
            }
            case isNil(current): {
                combined.push(String(current));
                break;
            }
            case typeof current === "object": {
                combined.push(safeStringify(current));
                break;
            }
        }
        return combined;
    }, []);

    return allMessages.join(" ");
}
