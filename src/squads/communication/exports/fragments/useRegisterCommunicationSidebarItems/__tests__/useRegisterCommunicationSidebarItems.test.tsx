import { waitFor } from "@testing-library/react";
import { renderHook } from "@testing-library/react-hooks";

const mockFeatureController = {
    init: () => Promise.resolve(),
    get: jest.fn(),
    subscribeToRemoteChanges: jest.fn(),
    unsubscribe: jest.fn(),
    isFeatureEnabled: jest.fn(() => true),
};
jest.mock("src/squads/communication/hooks/useFeatureController", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                featureController: mockFeatureController,
            };
        },
    };
});

jest.mock("src/squads/communication/hooks/useCommunicationPermission", () => {
    const instance = {
        rules: [{ action: "create", resource: "notification" }],
    };

    const permission = {
        getInstance: () => instance,
        update: jest.fn(),
        currentRoles: [],
        can: (_subject: string, _action: string) => true,
    };

    return {
        __esModule: true,
        default: () => {
            return { permission };
        },
    };
});
jest.mock("src/squads/communication/i18n/polyglot", () => {
    const get = require("lodash/get");
    const {
        default: reactiveStorage,
    } = require("src/squads/communication/internals/reactive-storage");
    function translate(key: string) {
        const lang = reactiveStorage.get("LANG") || "en";
        const jsonValues = require(`src/squads/communication/i18n/source/cms_${lang}.json`);

        return get(jsonValues, key);
    }
    return {
        __esModule: true,
        default: () => {
            return { translate };
        },
    };
});

describe("useRegisterCommunicationSidebarItems", () => {
    afterEach(() => {
        window.__MANA__ = undefined as any;
    });

    it("should register menu at staging with notification v1 and v2", async () => {
        let items: ISidebarItem[] = [];
        const sidebarMethods = {
            getAllItems: jest.fn(),
            onValueChanged: jest.fn(),
            registerSidebarItems: jest.fn((_items) => {
                items = _items;
            }),
            removeSidebarItems: jest.fn(),
        };

        window.__MANA__.getManaSidebar = () => sidebarMethods;
        const { default: useFeatureController } = await import(
            "src/squads/communication/hooks/useFeatureController"
        );

        (useFeatureController().featureController?.isFeatureEnabled as jest.Mock).mockReturnValue(
            true
        );

        const { default: useRegisterCommunicationSidebarItems } = await import(
            "../useRegisterCommunicationSidebarItems"
        );
        renderHook(() => useRegisterCommunicationSidebarItems());

        const result = [
            {
                icon: expect.anything(),
                order: 7,
                key: "communication.notifications",
                to: "/communication/notifications",
                name: "Notification",
                owner: "communication",
                isActive: expect.any(Function),
            },
            {
                icon: expect.anything(),
                order: 8,
                key: "communication.notificationsv2",
                to: "/communication/notificationsv2",
                name: "Notification V2",
                owner: "communication",
                isActive: expect.any(Function),
            },
        ];
        await waitFor(() => {
            expect(sidebarMethods.registerSidebarItems).toBeCalledWith(result);
        });
        expect(items).toEqual(result);

        items.forEach((item, index) => {
            expect(item.isActive(result[index].to)).toEqual(true);
        });
    });

    it("should register menu at uat with notification v1", async () => {
        let items: ISidebarItem[] = [];
        const sidebarMethods = {
            getAllItems: jest.fn(),
            onValueChanged: jest.fn(),
            registerSidebarItems: jest.fn((_items) => (items = _items)),
            removeSidebarItems: jest.fn(),
        };

        window.__MANA__.getManaSidebar = () => sidebarMethods;
        const { default: useFeatureController } = await import(
            "src/squads/communication/hooks/useFeatureController"
        );

        (useFeatureController().featureController?.isFeatureEnabled as jest.Mock).mockReturnValue(
            false
        );

        const { default: useRegisterCommunicationSidebarItems } = await import(
            "../useRegisterCommunicationSidebarItems"
        );

        const result = [
            {
                icon: expect.anything(),
                order: 7,
                key: "communication.notifications",
                to: "/communication/notifications",
                name: "Notification",
                owner: "communication",
                isActive: expect.any(Function),
            },
        ];

        renderHook(() => useRegisterCommunicationSidebarItems());
        await waitFor(() => {
            expect(sidebarMethods.registerSidebarItems).toBeCalledWith(result);
        });
        expect(items).toEqual(result);

        items.forEach((item, index) => {
            expect(item.isActive(result[index].to)).toEqual(true);
        });
    });
    it("should render translation correctly when change language", async () => {
        const sidebarMethods = {
            getAllItems: jest.fn(),
            onValueChanged: jest.fn(),
            registerSidebarItems: jest.fn(),
            removeSidebarItems: jest.fn(),
        };

        window.__MANA__.getManaSidebar = () => sidebarMethods;
        const { default: useFeatureController } = await import(
            "src/squads/communication/hooks/useFeatureController"
        );

        (useFeatureController().featureController?.isFeatureEnabled as jest.Mock).mockReturnValue(
            false
        );

        const { default: useRegisterCommunicationSidebarItems } = await import(
            "../useRegisterCommunicationSidebarItems"
        );

        renderHook(() => useRegisterCommunicationSidebarItems());
        await waitFor(() => {
            expect(sidebarMethods.registerSidebarItems).toBeCalledTimes(1);
        });
        expect(sidebarMethods.registerSidebarItems).toBeCalledWith([
            {
                icon: expect.anything(),
                order: 7,
                key: "communication.notifications",
                to: "/communication/notifications",
                name: "Notification",
                owner: "communication",
                isActive: expect.any(Function),
            },
        ]);

        const {
            default: reactiveStorage,
        } = require("src/squads/communication/internals/reactive-storage");
        reactiveStorage.set("LANG", "ja");

        await waitFor(() => {
            expect(sidebarMethods.registerSidebarItems).toBeCalledTimes(2);
        });
        expect(sidebarMethods.registerSidebarItems).toBeCalledWith([
            {
                icon: expect.anything(),
                order: 7,
                key: "communication.notifications",
                to: "/communication/notifications",
                name: "お知らせ配信",
                owner: "communication",
                isActive: expect.any(Function),
            },
        ]);
    });
});
