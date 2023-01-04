import { getOriginUrl } from "../project";

describe(getOriginUrl.name, () => {
    const oldLocation = window.location;

    afterEach(() => {
        //@ts-expect-error
        delete window.location;
        window.location = oldLocation;
    });

    const defaultValue = "https://localhost:3001";
    it("should return correct fallback value", () => {
        window.location = {
            ...window.location,
            origin: ``,
        };
        expect(getOriginUrl()).toEqual(new URL(defaultValue));
    });

    it("should return correct window.location.origin", () => {
        window.location = {
            ...window.location,
            origin: `https://localhost:3002`,
        };

        expect(getOriginUrl()).toEqual(new URL(window.location.origin));
    });
});
