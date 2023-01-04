import { useEffect } from "react";

import useManaEventEmitter from "./useManaEventEmitter";

export default function useSnackbarManaEventEmitter() {
    const { manaEventEmitter } = useManaEventEmitter();

    useEffect(() => {
        manaEventEmitter.register("addSnackbar", {
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

        return () => {
            manaEventEmitter.unregister("addSnackbar");
        };
    }, [manaEventEmitter]);

    return { manaEventEmitter };
}
