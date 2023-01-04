import { Entities, MutationMenus } from "src/common/constants/enum";
import permission from "src/internals/permission";

import useFilterActionPermissions, {
    MapAction,
    MapActionModel,
    UseFilterActionPermissionParams,
} from "../useFilterActionPermissions";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/internals/configuration");

jest.mock("src/internals/permission", () => {
    const originalModule = jest.requireActual("src/internals/permission");
    return {
        ...originalModule,
        can: jest.fn(originalModule.can),
    };
});

describe(useFilterActionPermissions.name, () => {
    it("should return permission with action is allowed", () => {
        (permission.can as jest.Mock).mockImplementation((_, action: MapActionModel["action"]) => {
            if (action === MutationMenus.DELETE) return true;
            if (action === MutationMenus.CREATE) return false;
            if (action === MutationMenus.EDIT) return true;
        });

        const mapActions: MapAction = {
            [MutationMenus.EDIT]: {
                action: MutationMenus.EDIT,
            },
            [MutationMenus.CREATE]: {
                action: MutationMenus.CREATE,
            },
            [MutationMenus.DELETE]: {
                action: MutationMenus.DELETE,
            },
        };
        const {
            result: { current },
        } = renderHook(() => useFilterActionPermissions({ entity: Entities.BOOKS, mapActions }));

        expect(current.actions).toEqual([MutationMenus.EDIT, MutationMenus.DELETE]);
    });

    it("should return permission is deny with action is not allowed", () => {
        (permission.can as jest.Mock).mockImplementation((_, action: MapActionModel["action"]) => {
            if (action === MutationMenus.DELETE) return false;
            if (action === MutationMenus.CREATE) return true;
            if (action === MutationMenus.EDIT) return true;
        });

        const mapActions: MapAction = {
            [MutationMenus.EDIT]: {
                action: MutationMenus.EDIT,
            },
            [MutationMenus.CREATE]: {
                action: MutationMenus.CREATE,
            },
            [MutationMenus.DELETE]: {
                action: MutationMenus.DELETE,
            },
        };

        const {
            result: { current },
        } = renderHook(() => useFilterActionPermissions({ entity: Entities.BOOKS, mapActions }));

        expect(current.actions).toEqual([MutationMenus.EDIT, MutationMenus.CREATE]);
    });

    it("should return permission with custom action", () => {
        (permission.can as jest.Mock).mockImplementation((_, action: MapActionModel["action"]) => {
            if (action === MutationMenus.DOWNLOAD) return false;
            return true;
        });
        const customActions: UseFilterActionPermissionParams["customActions"] = {
            [MutationMenus.DELETE]: {
                action: MutationMenus.DELETE,
                disabled: true,
                onClick: () => {},
                withConfirm: false,
            },
        };

        const mapActions: MapAction = {
            [MutationMenus.EDIT]: {
                action: MutationMenus.EDIT,
            },
            [MutationMenus.CREATE]: {
                action: MutationMenus.CREATE,
            },
            [MutationMenus.DELETE]: {
                action: MutationMenus.DELETE,
            },
            [MutationMenus.DOWNLOAD]: {
                action: MutationMenus.DOWNLOAD,
            },
        };

        const {
            result: { current },
        } = renderHook(() =>
            useFilterActionPermissions({ entity: Entities.BOOKS, mapActions, customActions })
        );

        expect(current.actions).toEqual([
            MutationMenus.EDIT,
            MutationMenus.CREATE,
            customActions[MutationMenus.DELETE],
        ]);
    });
});
