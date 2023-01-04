import { configure } from "enzyme";
import { enableMapSet } from "immer";
import fetchMock from "jest-fetch-mock";
import nodeUtils from "util";

import { createSerializer } from "@emotion/jest";
import { ManaEventEmitter } from "@manabie-com/mana-utils";
import "@testing-library/jest-dom";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import SpyInstance = jest.SpyInstance;

expect.addSnapshotSerializer(createSerializer());

fetchMock.enableMocks();
enableMapSet();

configure({ adapter: new Adapter() });

function preventStaticModulesFromReset() {
    // exclude some module from deletedBy resetModules
    const RESET_MODULE_EXCEPTIONS = ["react", "react-redux"];

    let mockActualRegistry = {};

    RESET_MODULE_EXCEPTIONS.forEach((moduleName) => {
        jest.doMock(moduleName, () => {
            if (!mockActualRegistry[moduleName]) {
                mockActualRegistry[moduleName] = jest.requireActual(moduleName);
            }
            return mockActualRegistry[moduleName];
        });
    });
}

function defineAssignOnLocation() {
    if (typeof window === "undefined") {
        return;
    }
    Object.defineProperty(global.window, "location", {
        value: {
            assign: jest.fn(),
        },
        writable: true,
    });
}

function preventAccessToNetwork() {
    if (typeof window !== "undefined") {
        let spied1: jest.SpyInstance;
        let spied2: jest.SpyInstance;
        let spied3: jest.SpyInstance;
        beforeEach(() => {
            spied1 = jest.spyOn(global, "fetch").mockImplementation(() => {
                throw new Error("Dont call fetchhhhh");
            });

            spied2 = jest
                .spyOn(global, "XMLHttpRequest")
                .mockImplementation(function (...args: any[]) {
                    throw new Error(`Dont call XMLHttpRequest \n ${JSON.stringify(args, null, 2)}`);
                });

            spied3 = jest.spyOn(global, "WebSocket").mockImplementation(function () {
                throw new Error("Dont call WebSocket");
            });
        });

        afterEach(() => {
            spied1.mockRestore();
            spied2.mockRestore();
            spied3.mockRestore();
        });
    }

    jest.doMock("src/internals/data-provider", () => {
        const handler = new Proxy(
            {},
            {
                get: function (_target, p) {
                    return function (...args: any[]) {
                        console.log("Provider is called with", p, "args:", ...args);
                        throw new Error("This test is calling to dataProvider, please check again");
                    };
                },
            }
        );

        return {
            __esModule: true,
            default: handler,
        };
    });
}

function preventWarningMessage() {
    let spiedErr: SpyInstance;
    let spiedWarn: SpyInstance;

    function formatMessage(errType: "warn" | "error", ...args: any[]) {
        // add two empty line to make it easier to read
        return (
            `\n${errType.toUpperCase()} IS RESTRICTED IN UNIT TEST \n` + nodeUtils.format(...args)
        );
    }

    function makeTestFailed(errType: "warn" | "error", ...msg: any[]) {
        // TODO: need to be fix later
        const exceptions: string[] = [
            "$$__", // any error with this message will be ignored
            "You should use `import { alpha } from '@mui/material/styles'`",
            "ERROR IS RESTRICTED IN UNIT TEST", // because new throw Error below, but throw error also calls console.error
            "WARN IS RESTRICTED IN UNIT TEST",
        ];

        const shouldIgnoreThisErr = msg.some((e) => {
            const combined = typeof e === "string" ? e : e instanceof Error ? e.message : null;
            if (combined !== null) {
                return exceptions.some((exception) => combined && combined.includes(exception));
            }

            return false;
        });

        if (!shouldIgnoreThisErr) {
            throw new Error(formatMessage(errType, ...msg));
        }
    }

    beforeEach(() => {
        // @ts-expect-error
        if (!global.console.error.mock) {
            spiedErr = jest.spyOn(global.console, "error").mockImplementation((...args) => {
                makeTestFailed("error", ...args);
            });
        }

        // @ts-expect-error
        if (!global.console.warn.mock) {
            spiedWarn = jest.spyOn(global.console, "warn").mockImplementation((...args) => {
                makeTestFailed("warn", ...args);
            });
        }
    });

    afterEach(() => {
        spiedErr; // read the value here, so that it won't be collected by the GC
        spiedWarn;
    });
}

function preventImportMemLeakAbleModules() {
    jest.mock("src/internals/manabie-event", () => {
        const store = {};

        return {
            __esModule: true,
            manabieWindowEvent: {
                dispatchEvent: (eventName: string, details: CustomEventInit) => {
                    if (store[eventName]) {
                        store[eventName](details);
                    }
                },
                addListener: (eventName: string, listener: EventListenerOrEventListenerObject) => {
                    store[eventName] = listener;
                },
            },
        };
    });
}

afterEach(() => {
    if (typeof window !== "undefined") {
        localStorage.clear();
    }
});

function preventAccessEventEmitter() {
    if (typeof window === "undefined") {
        return;
    }

    const mockManaEventEmitter: ManaEventEmitter<IEvents> = {
        publish: jest.fn((channel, data) => ({ channel, data })),
        subscribe: jest.fn((_channel, _data) => {
            return {
                unsubscribe: jest.fn(),
            };
        }),
        register: jest.fn((_channel, _data) => {
            return true;
        }),
        getLatest: jest.fn((_channel) => {
            return {
                message: "Hello",
                severity: "success",
                options: {
                    persist: false,
                },
            };
        }),
        ins: (() => {
            console.log("this is ins");
        }) as any,
        getSchema: jest.fn((_channel) => {
            return {
                type: "object",
                properties: {
                    message: {
                        type: "string",
                    },
                    severity: {
                        $ref: "#/definitions/AlertColor",
                    },
                    options: {
                        type: "object",
                        properties: {
                            persist: {
                                type: "boolean",
                            },
                        },
                    },
                },
                required: ["message", "severity"],
                additionalProperties: false,
            };
        }),
        unregister: jest.fn((_channel) => true),
    };

    beforeEach(() => {
        window.__MANA__ = {
            ...window.__MANA__,
            getManaEventEmitter: () => mockManaEventEmitter,
        };
    });
    afterEach(() => {
        window.__MANA__ = undefined as any; //force cleanup window.__MANA__ in test
    });
}

preventAccessEventEmitter();

preventImportMemLeakAbleModules();
preventAccessToNetwork();
preventWarningMessage();
preventStaticModulesFromReset();

defineAssignOnLocation();
jest.setTimeout(30000);
