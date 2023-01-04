import { ManaEventEmitter } from "@manabie-com/event-emitter";

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
        // eslint-disable-next-line no-console
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

export default function useManaEventEmitter() {
    return mockManaEventEmitter;
}
