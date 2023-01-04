import { mockWarner } from "src/squads/communication/test-utils/warner";

import useManaSidebarItems from "../useManaSidebarItems";

import { renderHook } from "@testing-library/react-hooks";

describe("useManaSidebarItems", () => {
    const mockError = jest.fn();
    mockWarner({
        error: mockError,
    });
    it("should return all of items after register sidebar item", () => {
        window.__MANA__ = window.__MANA__ || {};
        window.__MANA__.getManaSidebar = () => {
            return {
                registerSidebarItems: jest.fn(),
                getAllItems: jest.fn(),
                onValueChanged: jest.fn(),
                removeSidebarItems: jest.fn(),
            };
        };
        const { result } = renderHook(() => useManaSidebarItems());

        expect(result.current.registerSidebarItems).toEqual(expect.any(Function));
        expect(result.current.getAllItems).toEqual(expect.any(Function));
        expect(result.current.onValueChanged).toEqual(expect.any(Function));
        expect(result.current.removeSidebarItems).toEqual(expect.any(Function));
        window.__MANA__ = undefined as any; //force delete mock
    });

    it("should warn log when cannot get sidebar method", () => {
        window.__MANA__.getManaSidebar = () => undefined as any; //try to mock sidebar = undefined
        renderHook(() => useManaSidebarItems());

        expect(mockError).toBeCalledWith("[useManaSidebarItems]: cannot get sidebar");
    });
});
