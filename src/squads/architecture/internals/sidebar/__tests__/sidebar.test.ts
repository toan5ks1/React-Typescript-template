import { OutlinedFlag } from "@mui/icons-material";

import enableSidebarMethod, {
    createSidebarMethods,
    getSidebarMethod,
    sortSidebarItems,
} from "../sidebar";
import { SidebarItemError } from "../sidebar-errors";
import { MapItemsType, ISidebarItem } from "../sidebar-types";

describe("enableSidebarMethod && getSidebarMethod", () => {
    afterEach(() => {
        window.__MANA__ = undefined as any; //force cleanup window.__MANA__ in test
    });
    it("the order of item have been take", () => {
        enableSidebarMethod();
        const archMethods = getSidebarMethod();
        archMethods.registerSidebarItems([
            {
                icon: OutlinedFlag,
                key: "9",
                name: "Item 9",
                to: "/arch",
                order: 9,
                owner: "architecture",
                isActive: (path) => path.includes("/arch"),
            },
        ]);

        const item: ISidebarItem = {
            icon: OutlinedFlag,
            key: "10",
            name: "Item 10",
            to: "/arch",
            order: 9,
            owner: "architecture",
            isActive: (path) => path.includes("/arch"),
        };

        const commMethods = window.__MANA__.getManaSidebar();
        expect(() => {
            commMethods.registerSidebarItems([item]);
        }).toThrowError(new SidebarItemError(`The order ${item.order} have been taken`, item));
    });
    it("cannot update items of other teams", () => {
        enableSidebarMethod();
        const archMethods = getSidebarMethod();
        archMethods.registerSidebarItems([
            {
                icon: OutlinedFlag,
                key: "9",
                name: "Item 9",
                to: "/arch",
                order: 9,
                owner: "architecture",
                isActive: (path) => path.includes("/arch"),
            },
        ]);

        const item: ISidebarItem = {
            icon: OutlinedFlag,
            key: "9",
            name: "Item 9",
            to: "/communication",
            order: 9,
            owner: "communication",
            isActive: (path) => path.includes("/communication"),
        };

        const commMethods = window.__MANA__.getManaSidebar();
        expect(() => {
            commMethods.registerSidebarItems([item]);
        }).toThrowError(
            new SidebarItemError(
                `You dont have permission to update sidebar item of other team architecture`,
                item
            )
        );
    });
    it("throw error when remove unregister items via removeSidebarItems", () => {
        enableSidebarMethod();

        const item: ISidebarItem = {
            icon: OutlinedFlag,
            key: "9",
            name: "Item 9",
            to: "/arch",
            order: 9,
            owner: "architecture",
            isActive: (path) => path.includes("/arch"),
        };

        const archMethods = getSidebarMethod();
        expect(() => {
            archMethods.removeSidebarItems([item]);
        }).toThrowError(new SidebarItemError("The sidebar item do not exist before", item));
    });
    it("watch items change via onValueChanged", () => {
        enableSidebarMethod();

        const archCallback = jest.fn();
        const archMethods = getSidebarMethod();
        archMethods.onValueChanged(archCallback);

        const commMethods = window.__MANA__.getManaSidebar();
        const commCallback = jest.fn();
        commMethods.onValueChanged(commCallback);

        archMethods.registerSidebarItems([
            {
                icon: OutlinedFlag,
                key: "9",
                name: "Item 9",
                to: "/arch",
                order: 9,
                owner: "architecture",
                isActive: (path) => path.includes("/arch"),
            },
        ]);

        expect(commCallback).toBeCalledWith([
            {
                icon: OutlinedFlag,
                key: "9",
                name: "Item 9",
                to: "/arch",
                order: 9,
                owner: "architecture",
                isActive: expect.any(Function),
            },
        ]);
        expect(archCallback).toBeCalledWith([
            {
                icon: OutlinedFlag,
                key: "9",
                name: "Item 9",
                to: "/arch",
                order: 9,
                owner: "architecture",
                isActive: expect.any(Function),
            },
        ]);
    });
});
describe("createSidebarMethods", () => {
    it("should create success sidebar methods", () => {
        const methods = createSidebarMethods()();
        expect(methods.onValueChanged).toBeInstanceOf(Function);
        expect(methods.getAllItems()).toEqual([]);
        expect(methods.registerSidebarItems).toBeInstanceOf(Function);
        expect(methods.removeSidebarItems).toBeInstanceOf(Function);
    });
    it("register sidebar items via sidebar methods", () => {
        const methods = createSidebarMethods()();
        methods.registerSidebarItems([
            {
                icon: OutlinedFlag,
                key: "9",
                name: "Item 9",
                to: "/arch",
                order: 9,
                owner: "architecture",
                isActive: (path) => path.includes("/arch"),
            },
        ]);
        expect(methods.getAllItems()).toEqual([
            {
                icon: OutlinedFlag,
                key: "9",
                name: "Item 9",
                to: "/arch",
                order: 9,
                owner: "architecture",
                isActive: expect.any(Function),
            },
        ]);
    });

    it("remove sidebar items via sidebar methods", () => {
        const methods = createSidebarMethods()();
        methods.registerSidebarItems([
            {
                icon: OutlinedFlag,
                key: "9",
                name: "Item 9",
                to: "/arch9",
                owner: "architecture",
                isActive: (path) => path.includes("/arch9"),
                order: 9,
            },
            {
                icon: OutlinedFlag,
                key: "19",
                name: "Item 19",
                to: "/arch19",
                order: 19,
                owner: "architecture",
                isActive: (path) => path.includes("/arch19"),
            },
        ]);
        methods.removeSidebarItems([
            {
                icon: OutlinedFlag,
                key: "9",
                name: "Item 9",
                to: "/arch9",
                order: 9,
                isActive: (path) => path.includes("/arch9"),
                owner: "architecture",
            },
        ]);
        expect(methods.getAllItems()).toEqual([
            {
                icon: OutlinedFlag,
                key: "19",
                name: "Item 19",
                to: "/arch19",
                order: 19,
                owner: "architecture",
                isActive: expect.any(Function),
            },
        ]);
    });
});

describe("sortSidebarItems", () => {
    it("should return sorted array item", () => {
        const mapItems: MapItemsType = new Map();
        mapItems.set("9", {
            icon: OutlinedFlag,
            key: "9",
            name: "Item 9",
            owner: "architecture",
            to: "/arch",
            order: 9,
            isActive: (path) => path.includes("/arch"),
        });
        mapItems.set("1", {
            icon: OutlinedFlag,
            key: "1",
            name: "Item 1",
            owner: "architecture",
            isActive: (path) => path.includes("/arch1"),
            to: "/arch1",
            order: 1,
        });
        expect(sortSidebarItems(mapItems)).toEqual([
            {
                icon: OutlinedFlag,
                key: "1",
                name: "Item 1",
                owner: "architecture",
                to: "/arch1",
                order: 1,
                isActive: expect.any(Function),
            },
            {
                icon: OutlinedFlag,
                key: "9",
                name: "Item 9",
                owner: "architecture",
                to: "/arch",
                isActive: expect.any(Function),
                order: 9,
            },
        ]);
    });
});
