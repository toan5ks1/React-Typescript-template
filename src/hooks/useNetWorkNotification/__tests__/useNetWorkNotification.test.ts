import * as reactUse from "react-use";

import useNetWorkNotification from "../useNetWorkNotification";

import { renderHook } from "@testing-library/react-hooks";
import { IUseNetworkState } from "react-use/lib/useNetworkState";
import useShowSnackbar from "src/hooks/useShowSnackbar";

afterAll(() => {
    jest.resetModules();
});

jest.mock("src/hooks/useShowSnackbar", () => jest.fn());
jest.mock("react-use");

describe(useNetWorkNotification.name, () => {
    const commonValues: Omit<IUseNetworkState, "online" | "previous"> = {
        downlink: undefined,
        downlinkMax: undefined,
        effectiveType: "4g",
        rtt: undefined,
        saveData: undefined,
        since: undefined,
        type: "ethernet",
    };
    const showSnackbarMockFn = jest.fn();
    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbarMockFn);
    });

    it("should notification when user network is changed", async () => {
        jest.spyOn(reactUse, "useNetworkState").mockImplementation(() => ({
            online: true,
            previous: undefined,
            ...commonValues,
        }));

        const { rerender } = renderHook(() => useNetWorkNotification());
        // First time will not show
        expect(showSnackbarMockFn).not.toBeCalled();

        rerender();
        jest.spyOn(reactUse, "useNetworkState").mockImplementation(() => ({
            online: false,
            previous: true,
            ...commonValues,
        }));

        rerender();
        // Network down
        expect(showSnackbarMockFn).toBeCalledWith("ra.message.youAreOffline", "error");

        jest.spyOn(reactUse, "useNetworkState").mockImplementation(() => ({
            online: true,
            previous: false,
            ...commonValues,
        }));
        rerender();
        // Network is restored
        expect(showSnackbarMockFn).toBeCalledWith("ra.message.youAreRestoredNetwork");
    });
});
