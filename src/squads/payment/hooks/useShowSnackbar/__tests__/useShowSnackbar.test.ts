import { SnackbarActions } from "src/squads/payment/stores/snackbar/actions";

import { AlertBaseProps } from "src/components/Alerts/AlertBase";

import useEnableManaEventEmitter from "../../useEnableManaEventEmitter";
import useSnackbarManaEventEmitter from "../../useSnackbarManaEventEmitter";
import useShowSnackbar, { sanitizerMsg, UseShowSnackbarParams } from "../useShowSnackbar";

import { renderHook, act } from "@testing-library/react-hooks";
import { UseTranslateParams } from "src/squads/payment/hooks/useTranslate";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
}));
const params: UseTranslateParams | string = "Message about something";
const severity: AlertBaseProps["severity"] = "success";

jest.mock("src/squads/payment/hooks/useEnableManaEventEmitter", () => {
    return {
        __esModule: true,
        default: jest.fn(() => false),
    };
});
describe("useShowSnackbar", () => {
    it("should it return a function", () => {
        const { result } = renderHook(() => useShowSnackbar());
        expect(typeof result.current).toBe("function");
    });
    it("should call dispatch snackbar action function at once", async () => {
        const { result } = renderHook(() => useShowSnackbar());

        act(() => {
            result.current(params, severity);
        });
        const { message, options } = sanitizerMsg(params);

        expect(mockDispatch).toHaveBeenCalledTimes(1);

        expect(mockDispatch).toHaveBeenCalledWith(
            SnackbarActions.showSnackbar({
                message,
                options,
                severity,
            })
        );
    });

    it("should call event emitter action function at once", async () => {
        (useEnableManaEventEmitter as jest.Mock).mockImplementation(() => true);
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
