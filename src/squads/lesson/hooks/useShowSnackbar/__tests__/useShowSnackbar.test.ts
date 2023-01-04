import { SnackbarActions } from "src/squads/lesson/store/snackbar/actions";

import { AlertBaseProps } from "src/components/Alerts/AlertBase";

import { renderHook, act } from "@testing-library/react-hooks";
import useEnableManaEventEmitter from "src/squads/lesson/hooks/useEnableManaEventEmitter";
import useShowSnackbar, {
    sanitizerMsg,
    UseShowSnackbarParams,
} from "src/squads/lesson/hooks/useShowSnackbar";
import useSnackbarManaEventEmitter from "src/squads/lesson/hooks/useSnackbarManaEventEmitter";
import { UseTranslateParams } from "src/squads/lesson/hooks/useTranslate";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => {
    const origin = jest.requireActual("react-redux");

    return {
        ...origin,
        useDispatch: () => mockDispatch,
    };
});
const params: UseTranslateParams | string = "Message about something";
const severity: AlertBaseProps["severity"] = "success";

jest.mock("src/squads/lesson/hooks/useEnableManaEventEmitter", () => {
    return {
        __esModule: true,
        default: jest.fn(),
    };
});
describe("useShowSnackbar", () => {
    it("should it return a function", () => {
        const { result } = renderHook(() => useShowSnackbar());
        expect(typeof result.current).toEqual("function");
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
