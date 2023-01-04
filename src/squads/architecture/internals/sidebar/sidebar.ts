import { SidebarItemError } from "./sidebar-errors";
import {
    Callback,
    ManaSidebarFnType,
    MapItemsType,
    MapOrderKeysType,
    ISidebarItem,
} from "./sidebar-types";

export function sortSidebarItems(_currentMapItems: MapItemsType) {
    return [..._currentMapItems.values()].sort((prev, next) => prev.order - next.order);
}

export const createSidebarMethods: () => ManaSidebarFnType = () => {
    let _currentMapItems: MapItemsType = new Map();
    let _currentMapOrderKeys: MapOrderKeysType = new Map();
    let callbacks: Callback[] = [];

    function fireSidebarCallback() {
        callbacks.forEach((callback) => {
            callback(sortSidebarItems(_currentMapItems));
        });
    }

    function updateSidebarItemsIntoMap({
        items,
        type,
    }: {
        items: ISidebarItem[];
        type: "set" | "delete";
    }) {
        items.forEach((item) => {
            _currentMapItems[type](item.key, item);
            _currentMapOrderKeys[type](item.order, item.key);
        });

        fireSidebarCallback();
    }

    const methods: ManaSidebarFnType = () => {
        return {
            getAllItems: () => sortSidebarItems(_currentMapItems),
            onValueChanged(listener: Callback) {
                callbacks.push(listener);
            },
            registerSidebarItems(items) {
                items.forEach((item) => {
                    if (
                        _currentMapItems.has(item.key) &&
                        _currentMapItems.get(item.key)?.owner !== item.owner
                    ) {
                        throw new SidebarItemError(
                            `You dont have permission to update sidebar item of other team ${
                                _currentMapItems.get(item.key)?.owner
                            }`,
                            item
                        );
                    }

                    if (
                        _currentMapOrderKeys.has(item.order) &&
                        _currentMapOrderKeys.get(item.order) !== item.key
                    ) {
                        throw new SidebarItemError(`The order ${item.order} have been taken`, item);
                    }
                });

                updateSidebarItemsIntoMap({
                    items,
                    type: "set",
                });
            },
            removeSidebarItems(items) {
                items.forEach((item) => {
                    if (!_currentMapItems.has(item.key)) {
                        throw new SidebarItemError("The sidebar item do not exist before", item);
                    }
                });

                updateSidebarItemsIntoMap({
                    items,
                    type: "delete",
                });
            },
        };
    };
    return methods;
};

function enableSidebarMethod() {
    if (typeof window !== "undefined" && typeof window.__MANA__?.getManaSidebar === "undefined") {
        const sidebar = createSidebarMethods();

        window.__MANA__ = window.__MANA__ || {};
        window.__MANA__.getManaSidebar = sidebar;
    }
}
export const getSidebarMethod = () => {
    const result = window.__MANA__?.getManaSidebar();
    return result;
};

export default enableSidebarMethod;
