import { useMultipleSnackbar } from "../MultipleSnackbarContext";

import { renderHook } from "@testing-library/react-hooks";

describe("useMultipleSnackbar", () => {
    it("should return func enqueueSnackbar, closeSnackbar and closeAllSnackbarPersist", () => {
        const {
            result: { current },
        } = renderHook(() => useMultipleSnackbar());

        expect(typeof current.enqueueSnackbar).toBe("function");
        expect(typeof current.closeSnackbar).toBe("function");
        expect(typeof current.closeAllSnackbarPersist).toBe("function");
    });
});
