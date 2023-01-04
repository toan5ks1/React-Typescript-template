import DOMPurify, { Config } from "dompurify";

import { Fn } from "../../typings/support-types";

export interface Sanitizer {
    readonly forDOM: (htmlStr: string) => string;
    readonly forURL: (URL: string) => string;
    readonly setLogger: (logger: Logger) => void;
}

export interface CreateSanitizerOptions {
    DOMOptions?: Config;
}

export interface Logger {
    log: Fn;
}

function createSanitizer(options?: CreateSanitizerOptions): Sanitizer {
    if (options?.DOMOptions) {
        DOMPurify.setConfig(options?.DOMOptions);
    }
    let _logger: Logger | undefined;

    return {
        forDOM(htmlStr: string) {
            const result = DOMPurify.sanitize(htmlStr);

            if (htmlStr && result.length !== htmlStr.length) {
                _logger?.log("forDOM: Someone enter dangerous input", htmlStr);
            }

            return result;
        },

        forURL(URL: string) {
            // we pretend this url is an anchor url, then use DOMPurify to strip the dirty part
            const fakeElementId = "sanitizer";
            const dirtyTemplate = `<a id="${fakeElementId}" href="${URL}">`;

            const result = DOMPurify.sanitize(dirtyTemplate);

            const doc = new DOMParser().parseFromString(result, "text/html");
            const aTag = doc.querySelector(`#${fakeElementId}`);
            if (!aTag) {
                // 'a' tag is deleted, be careful
                return "";
            }
            return aTag.getAttribute("href") || "";
        },

        setLogger(logger: Logger) {
            _logger = logger;
        },
    } as const;
}

export default createSanitizer;
