import * as redux from "react-redux";

import { AppActions } from "../../../store/app";
import useToggleSidebar from "../useToggleSidebar";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("react-redux");

describe("useToggleSidebar", () => {
    let fn: jest.SpyInstance;

    beforeEach(() => {
        fn = jest.fn();
        jest.spyOn(redux, "useDispatch").mockImplementation(() => fn as any);
    });

    afterEach(() => {
        fn.mockReset();
    });

    it("should be called with undefined when type is toggle", () => {
        //default type is TOGGLE
        const { result } = renderHook(() => useToggleSidebar());

        result.current(undefined); // trigger toggle without params. Must pass undefined to calm typescript down

        expect(fn).toBeCalledWith(AppActions.toggleSidebar());
    });

    it("should be called with passed params when type is not TOGGLE", () => {
        const { result } = renderHook(() => useToggleSidebar());

        // when passed "true". Dispatch function must be called with "true" value
        result.current(true);
        expect(fn).toBeCalledWith(AppActions.toggleSidebar(true));

        // when passed "false". Dispatch function must be called with "false" value
        result.current(false);
        expect(fn).toBeCalledWith(AppActions.toggleSidebar(false));
    });
});
