import enableSidebarMethod, { getSidebarMethod } from "src/squads/architecture/internals/sidebar";
import { mockWarner } from "src/squads/architecture/test-utils/warner";

import { MessageOutlined } from "@mui/icons-material";

import useManaSidebarItems from "../useManaSidebarItems";

import { act, renderHook } from "@testing-library/react-hooks";

describe("useManaSidebarItems", () => {
    const mockError = jest.fn();
    mockWarner({
        error: mockError,
    });
    it("should return all of items after register sidebar item", () => {
        enableSidebarMethod();
        const { result } = renderHook(() => useManaSidebarItems());
        const sidebarMethod = getSidebarMethod();
        const mockItems: ISidebarItem[] = [
            {
                icon: MessageOutlined,
                isActive: (path) => path.includes("/arch"),
                key: "arch",
                name: "Arch",
                order: 1,
                owner: "arch",
                to: "/arch/path1",
                target: "_self",
            },
            {
                icon: MessageOutlined,
                isActive: (path) => path.includes("/comm"),
                key: "comm",
                name: "Comm",
                order: 1,
                owner: "comm",
                to: "/comm/path2",
                target: "_self",
            },
        ];

        act(() => {
            sidebarMethod.registerSidebarItems(mockItems);
        });
        expect(result.current).toEqual(mockItems);
        window.__MANA__ = undefined as any; //force delete mock
    });

    it("should warn log when cannot get sidebar method", () => {
        window.__MANA__.getManaSidebar = () => undefined as any; //try to mock sidebar = undefined
        renderHook(() => useManaSidebarItems());

        expect(mockError).toBeCalledWith("[useManaSidebarItems]: cannot get sidebar");
    });
});
