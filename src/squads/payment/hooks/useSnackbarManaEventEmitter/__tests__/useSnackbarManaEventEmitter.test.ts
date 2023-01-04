import useSnackbarManaEventEmitter from "../useSnackbarManaEventEmitter";

import { renderHook } from "@testing-library/react-hooks";

describe("useSnackbarManaEventEmitter", () => {
    it("should render useSnackbarManaEventEmitter success", () => {
        const {
            result: { current },
        } = renderHook(() => useSnackbarManaEventEmitter());

        expect(current).not.toBeUndefined();
    });
    it("should call register success", async () => {
        const {
            result: { current },
        } = renderHook(() => useSnackbarManaEventEmitter());

        const manaEventEmitter = current.manaEventEmitter;
        expect(manaEventEmitter.register).toBeCalledTimes(1);
        expect(manaEventEmitter.register).toBeCalledWith("addSnackbar", {
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
});
