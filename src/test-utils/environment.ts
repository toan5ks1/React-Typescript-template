export function resetProcessEnvironment(newEnv?: Record<string, string>) {
    const OLD_ENV = process.env;
    // from stackoverflow https://stackoverflow.com/questions/48033841/test-process-env-with-jest
    beforeEach(() => {
        jest.resetModules(); // most important - it clears the cache
        process.env = { ...OLD_ENV, ...newEnv }; // make a copy
    });

    afterAll(() => {
        process.env = OLD_ENV; // restore old env
    });
}

export function mockLocation(overrides: Partial<Location>) {
    const oldWindowLocation = window.location;

    beforeEach(() => {
        window.location = {
            ...oldWindowLocation,
            ...overrides,
        };
    });

    afterEach(() => {
        window.location = oldWindowLocation;
    });
}
