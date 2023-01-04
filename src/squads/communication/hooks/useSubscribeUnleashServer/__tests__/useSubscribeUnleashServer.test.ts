import { Features } from "src/squads/communication/common/constants/feature-keys";
import { EnvKeys, EnvKeysForUnleash } from "src/typings/configuration";

import { renderHook } from "@testing-library/react-hooks";

describe("useSubscribeUnleashServer", () => {
    it("should wont call subscribe when callback is undefined", async () => {
        const { default: useSubscribeUnleashServer } = await import("../useSubscribeUnleashServer");
        const mockFeatureController = {
            init: jest.fn(() => Promise.resolve()),
            subscribeToRemoteChanges: jest.fn(),
            unsubscribe: jest.fn(),
        };
        const initParams = {
            env: EnvKeysForUnleash.STAGING,
            schoolId: "schoolId",
            userId: "userId",
            variant: EnvKeys.STAGING,
        };

        const { unmount } = renderHook(() =>
            useSubscribeUnleashServer<Features>({
                featureController: mockFeatureController as any, //because we only need init/unsubscribe and subscribeToRemoteChanges fn
                permissionRules: [],
                initParams,
            })
        );

        await expect(mockFeatureController.init).toBeCalledWith(initParams);

        expect(mockFeatureController.subscribeToRemoteChanges).toBeCalledTimes(0);

        unmount();
        expect(mockFeatureController.unsubscribe).toBeCalledTimes(1);
    });
    it("should wont call callback when permissionRules.length = 0", async () => {
        const { default: useSubscribeUnleashServer } = await import("../useSubscribeUnleashServer");
        const callback = jest.fn();
        const onError = jest.fn();

        const mockFeatureController = {
            init: jest.fn(() => Promise.resolve()),
            subscribeToRemoteChanges: jest.fn(),
            unsubscribe: jest.fn(),
        };
        const initParams = {
            env: EnvKeysForUnleash.STAGING,
            schoolId: "schoolId",
            userId: "userId",
            variant: EnvKeys.STAGING,
        };

        const { unmount } = renderHook(() =>
            useSubscribeUnleashServer<Features>({
                callback,
                onError,
                featureController: mockFeatureController as any, //because we only need init/unsubscribe and subscribeToRemoteChanges fn
                permissionRules: [],
                initParams,
            })
        );

        await expect(mockFeatureController.init).toBeCalledWith(initParams);
        expect(callback).toBeCalledTimes(0);
        expect(onError).toBeCalledTimes(0);

        expect(mockFeatureController.subscribeToRemoteChanges).toBeCalledTimes(1);

        unmount();
        expect(mockFeatureController.unsubscribe).toBeCalledTimes(1);
    });
    it("should will init, callback, subscribe and unsubscribe after unmount", async () => {
        const { default: useSubscribeUnleashServer } = await import("../useSubscribeUnleashServer");
        const callback = jest.fn();
        const onError = jest.fn();

        const mockFeatureController = {
            init: jest.fn(() => Promise.resolve()),
            subscribeToRemoteChanges: jest.fn(),
            unsubscribe: jest.fn(),
        };
        const initParams = {
            env: EnvKeysForUnleash.STAGING,
            schoolId: "schoolId",
            userId: "userId",
            variant: EnvKeys.STAGING,
        };

        const { unmount } = renderHook(() =>
            useSubscribeUnleashServer<Features>({
                callback,
                featureController: mockFeatureController as any, //because we only need init/unsubscribe and subscribeToRemoteChanges fn
                permissionRules: [{ action: "show", subject: "notifications" }],
                initParams,
                onError,
            })
        );

        await expect(mockFeatureController.init).toBeCalledWith(initParams);
        expect(callback).toBeCalledTimes(1);
        expect(onError).toBeCalledTimes(0);

        expect(mockFeatureController.subscribeToRemoteChanges).toBeCalledTimes(1);

        unmount();
        expect(mockFeatureController.unsubscribe).toBeCalledTimes(1);
    });
    it("should call onError when cannot init unleash server", async () => {
        const { default: useSubscribeUnleashServer } = await import("../useSubscribeUnleashServer");
        const callback = jest.fn();
        const onError = jest.fn();

        const mockFeatureController = {
            init: jest.fn(() => Promise.reject("Init fail")),
            subscribeToRemoteChanges: jest.fn(),
            unsubscribe: jest.fn(),
        };
        const initParams = {
            env: EnvKeysForUnleash.STAGING,
            schoolId: "schoolId",
            userId: "userId",
            variant: EnvKeys.STAGING,
        };

        const { unmount } = renderHook(() =>
            useSubscribeUnleashServer<Features>({
                callback,
                onError,
                featureController: mockFeatureController as any, //because we only need init/unsubscribe and subscribeToRemoteChanges fn
                permissionRules: [{ action: "show", subject: "notifications" }],
                initParams,
            })
        );

        await expect(mockFeatureController.init).rejects.toEqual("Init fail");
        expect(callback).toBeCalledTimes(0);
        expect(onError).toBeCalledTimes(1);

        expect(mockFeatureController.subscribeToRemoteChanges).toBeCalledTimes(1);

        unmount();
        expect(mockFeatureController.unsubscribe).toBeCalledTimes(1);
    });
});
