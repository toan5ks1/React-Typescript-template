import createSanitizer, { Logger } from "../Sanitizer";

describe("createSanitizer", () => {
    const sanitizer = createSanitizer();

    it("should return same result if sting is safe", () => {
        const safe = "<div>Hello</div>";

        expect(sanitizer.forDOM(safe)).toEqual(safe);
    });

    it("should sanitize the dirty html", () => {
        const dirtyContent = "<script>alert(1)</script>";
        const dirty = `<div>Hello${dirtyContent}</div>`;

        expect(sanitizer.forDOM(dirty)).toEqual("<div>Hello</div>");
    });

    it("should sanitize the dirty url", () => {
        const dirtyUrl = "javascript:alert('xss')";

        expect(sanitizer.forURL(dirtyUrl)).toEqual("");

        expect(
            sanitizer.forURL(decodeURIComponent("JaVaScRiP%0at:alert(document.domain)"))
        ).toEqual("");
    });
});

describe("createSanitizer test for app secure dangerous input", () => {
    const sanitizer = createSanitizer();

    const logger: Logger = {
        log: jest.fn(),
    };

    sanitizer.setLogger(logger);

    it("should not call logger when string is safe", () => {
        const safes: string[] = [
            '<div data-text="true" data-offset-key="32km2-0-0" data-editor="94c2a" data-block="true" class="" data-contents="true">Question 01FHPKC3AJE7NWSEH2KYS8NEZN</div>',
            "<div>   Hello   </div>",
        ];

        safes.forEach((safe) => {
            sanitizer.forDOM(safe);
        });

        expect(logger.log).not.toBeCalled();
    });

    it("should call logger the dirty html", () => {
        const dirtyContent = "<script>alert(1)</script>";

        const notSafes: string[] = [
            `<span data-test="true">Hello${dirtyContent}</span>`,
            "<div><img src=x onerror=alert(1)//><div>",
            "<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>",
        ];

        notSafes.forEach((notSafe) => {
            sanitizer.forDOM(notSafe);
        });

        expect(logger.log).toBeCalledTimes(notSafes.length);
    });
});
