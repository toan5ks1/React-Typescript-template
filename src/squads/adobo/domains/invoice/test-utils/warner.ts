import createWarner, { LogLevel, StdInterface } from "src/packages/warner";

export function mockWarner(overrides?: Partial<ReturnType<typeof createWarner>>) {
    const std: StdInterface = {
        log: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        trace: jest.fn(),
    };

    beforeEach(() => {
        if (overrides) {
            window.warner = {
                ...overrides,
            } as ReturnType<typeof createWarner>;
        } else {
            window.warner = createWarner({ std, logLevel: LogLevel.LOG });
        }
    });

    afterEach(() => {
        delete window.warner;
    });

    return std;
}
