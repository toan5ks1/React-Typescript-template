//@ts-nocheck

export default () => {
    // because we never clean up mocked resource, we may need to do that at teardown
    if (global.console.error.mock) {
        global.console.error.mockRestore();
    }

    if (global.console.warn.mock) {
        global.console.warn.mockRestore();
    }
};
