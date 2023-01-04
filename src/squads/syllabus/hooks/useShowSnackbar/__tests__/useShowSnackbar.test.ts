import { SnackbarActions } from "src/squads/syllabus/store/snackbar/actions";

import { AlertBaseProps } from "src/components/Alerts/AlertBase";

import useShowSnackbar, { sanitizerMsg, UseShowSnackbarParams } from "../useShowSnackbar";

import { renderHook, act } from "@testing-library/react-hooks";
import useEnableManaEventEmitter from "src/squads/syllabus/hooks/useEnableManaEventEmitter";
import useSnackbarManaEventEmitter from "src/squads/syllabus/hooks/useSnackbarManaEventEmitter";
import { UseTranslateParams } from "src/squads/syllabus/hooks/useTranslate";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
}));
const params: UseTranslateParams | string = "Message about something";
const severity: AlertBaseProps["severity"] = "success";

jest.mock("src/squads/syllabus/hooks/useEnableManaEventEmitter", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});

describe(useShowSnackbar.name, () => {
    it("should it return a function", () => {
        const { result } = renderHook(() => useShowSnackbar());
        expect(typeof result.current).toBe("function");
    });
    it("should call dispatch snackbar action function at once", () => {
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
describe(sanitizerMsg.name, () => {
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
