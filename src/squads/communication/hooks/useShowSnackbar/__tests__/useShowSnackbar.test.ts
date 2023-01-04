import { SnackbarActions } from "src/squads/communication/store/snackbar/actions";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import { AlertBaseProps } from "src/components/Alerts/AlertBase";

import useShowSnackbar, { sanitizerMsg, UseShowSnackbarParams } from "../useShowSnackbar";

import { act, renderHook } from "@testing-library/react-hooks";
import useEnableManaEventEmitter from "src/squads/communication/hooks/useEnableManaEventEmitter";
import useSnackbarManaEventEmitter from "src/squads/communication/hooks/useSnackbarManaEventEmitter";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
}));
const params = "Message about something";
const severity: AlertBaseProps["severity"] = "success";
const std = mockWarner();

jest.mock("src/squads/communication/hooks/useEnableManaEventEmitter", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

const mockUseEnableManaEventEmitter = (isEnable: boolean = false) => {
    (useEnableManaEventEmitter as jest.Mock).mockReturnValue(isEnable);
};

describe("useShowSnackbar", () => {
    it("should it return a function", () => {
        const { result } = renderHook(() => useShowSnackbar());
        expect(typeof result.current).toBe("function");
    });
    it("should call dispatch snackbar action function at once", () => {
        mockUseEnableManaEventEmitter();

        const { result } = renderHook(() => useShowSnackbar());

        act(() => {
            result.current(params, severity);
        });
        const { message, options } = sanitizerMsg(params);

        expect(mockDispatch).toHaveBeenCalledWith(
            SnackbarActions.showSnackbar({
                message,
                options,
                severity,
            })
        );
    });

    it("should call event emitter action function at once", () => {
        mockUseEnableManaEventEmitter(true);
        const { result } = renderHook(() => useShowSnackbar());
        const { result: resultMana } = renderHook(() => useSnackbarManaEventEmitter());

        act(() => {
            result.current(params, severity);
        });
        const { message, options } = sanitizerMsg(params);
        const manaEventEmitter = resultMana.current.manaEventEmitter;

        expect(manaEventEmitter.publish).toBeCalledWith("addSnackbar", {
            message,
            options,
            severity,
        });
    });

    it("should call warner.log when event emitter is enable", () => {
        mockUseEnableManaEventEmitter(true);

        const { result } = renderHook(() => useShowSnackbar());

        act(() => {
            result.current(params, severity);
        });

        expect(std.log).toBeCalledWith("addSnackbarByEventEmitter", params);
    });
});
describe("sanitizerMsg function", () => {
    it("should return the correct object when message param is string", () => {
        const result = sanitizerMsg(params);

        expect(result).toEqual({ message: params });
    });
    it("should return the correct object when message param is object", () => {
        const msgParam: UseShowSnackbarParams = {
            message: params,
            options: {
                persist: true,
            },
        };
        const result = sanitizerMsg(msgParam);

        expect(result).toEqual(msgParam);
    });
});
