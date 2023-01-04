import useSnackbarManaEventEmitter from "../useSnackbarManaEventEmitter";

import { renderHook } from "@testing-library/react-hooks";

const channel = "addSnackbar";

describe("useSnackbarManaEventEmitter", () => {
    it("should call register successfully", () => {
        const {
            result: { current },
        } = renderHook(() => useSnackbarManaEventEmitter());

        const manaEventEmitter = current.manaEventEmitter;
        expect(manaEventEmitter.register).toBeCalledTimes(1);
        expect(manaEventEmitter.register).toBeCalledWith(channel, {
            type: "object",
            properties: {
                message: {
                    type: "string",
                },
                severity: {
                    type: "string",
                    enum: ["success", "info", "warning", "error"],
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
        });
    });

    it("should call unregister successfully", () => {
        const {
            unmount,
            result: { current },
        } = renderHook(() => useSnackbarManaEventEmitter());

        unmount();

        expect(current.manaEventEmitter.unregister).toBeCalledWith(channel);
    });
});
