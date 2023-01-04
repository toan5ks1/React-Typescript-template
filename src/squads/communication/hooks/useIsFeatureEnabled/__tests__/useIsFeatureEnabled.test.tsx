import FeatureController from "src/packages/feature-controller";
import { Features } from "src/squads/communication/common/constants/feature-keys";

import useIsFeatureEnabled from "../useIsFeatureEnabled";

import { renderHook } from "@testing-library/react-hooks";

function mockPermissionAndFeatureFlag(isEnablePermission: boolean, isEnableFeature: boolean) {
    const featureController = new FeatureController<Features>({
        init: () => Promise.resolve(true),
        get: jest.fn(),
        subscribeToRemoteChanges: jest.fn(),
        unsubscribe: jest.fn(),
        update: jest.fn(),
    });
    featureController.isFeatureEnabled = () => isEnableFeature;

    const permission = {
        can: (_resource: string, _action: string) => {
            return isEnablePermission;
        },
    };
    return {
        featureController,
        permission: permission as any, //because we only need to can fn to check
    };
}

/*Summary the test cases, the args: featureControllerConfig and permissionConfig
Prerequisites
- missing featureControllerConfig -> feature flag bypass -> return true
- missing permissionConfig -> permission bypass -> return true
EX: when u missing both permission and featureController config. isFeatureEnable will return true

1. {featureControllerConfig: undefined, permissionConfig: undefined} -> true
2. {featureControllerConfig: undefined, permissionConfig: set} -> check permission
3. {featureControllerConfig: set, permissionConfig: undefined} -> check feature flag
4. {featureControllerConfig: set, permissionConfig: set} -> check both feature flag and permission
*/

describe("useIsFeatureEnabled", () => {
    it("should return true when do not pass permission and feature flag configuration", () => {
        const { featureController, permission } = mockPermissionAndFeatureFlag(true, true);
        const { result } = renderHook(() => useIsFeatureEnabled(featureController, permission));
        expect(result.current({})).toEqual(true);
    });
    it("should return true when passing both configuration and permission and feature flag also enable", () => {
        const { featureController, permission } = mockPermissionAndFeatureFlag(true, true);
        const { result } = renderHook(() => useIsFeatureEnabled(featureController, permission));

        expect(
            result.current({
                featureConfigs: {
                    feature: Features.NOTIFICATION_SCHEDULE_MANAGEMENT,
                },
                permissionConfigs: {
                    action: "create",
                    subject: "notifications",
                },
            })
        ).toEqual(true);
    });
    it("should return true when passing feature configuration only", () => {
        const { featureController, permission } = mockPermissionAndFeatureFlag(true, true);
        const { result } = renderHook(() => useIsFeatureEnabled(featureController, permission));

        expect(
            result.current({
                featureConfigs: {
                    feature: Features.NOTIFICATION_SCHEDULE_MANAGEMENT,
                },
            })
        ).toEqual(true);
    });
    it("should return true when passing feature configuration only, permission auto enable", () => {
        const { featureController, permission } = mockPermissionAndFeatureFlag(false, true);
        const { result } = renderHook(() => useIsFeatureEnabled(featureController, permission));

        expect(
            result.current({
                featureConfigs: {
                    feature: Features.NOTIFICATION_SCHEDULE_MANAGEMENT,
                },
            })
        ).toEqual(true);
    });
    it("should return true when passing permission configuration only", () => {
        const { featureController, permission } = mockPermissionAndFeatureFlag(true, true);
        const { result } = renderHook(() => useIsFeatureEnabled(featureController, permission));

        expect(
            result.current({
                permissionConfigs: {
                    action: "create",
                    subject: "notifications",
                },
            })
        ).toEqual(true);
    });
    it("should return true when passing permission configuration only, feature flag auto enable", () => {
        const { featureController, permission } = mockPermissionAndFeatureFlag(true, false);
        const { result } = renderHook(() => useIsFeatureEnabled(featureController, permission));

        expect(
            result.current({
                permissionConfigs: {
                    action: "create",
                    subject: "notifications",
                },
            })
        ).toEqual(true);
    });
    it("should return false when only enable feature flag", () => {
        const { featureController, permission } = mockPermissionAndFeatureFlag(false, true);
        const { result } = renderHook(() => useIsFeatureEnabled(featureController, permission));

        expect(
            result.current({
                featureConfigs: {
                    feature: Features.NOTIFICATION_SCHEDULE_MANAGEMENT,
                },
                permissionConfigs: {
                    action: "create",
                    subject: "notifications",
                },
            })
        ).toEqual(false);
    });
    it("should return false when only enable permission", () => {
        const { featureController, permission } = mockPermissionAndFeatureFlag(true, false);
        const { result } = renderHook(() => useIsFeatureEnabled(featureController, permission));

        expect(
            result.current({
                featureConfigs: {
                    feature: Features.NOTIFICATION_SCHEDULE_MANAGEMENT,
                },
                permissionConfigs: {
                    action: "create",
                    subject: "notifications",
                },
            })
        ).toEqual(false);
    });
    it("should return false when disable both permission and feature flag", () => {
        const { featureController, permission } = mockPermissionAndFeatureFlag(false, false);
        const { result } = renderHook(() => useIsFeatureEnabled(featureController, permission));

        expect(
            result.current({
                featureConfigs: {
                    feature: Features.NOTIFICATION_SCHEDULE_MANAGEMENT,
                },
                permissionConfigs: {
                    action: "create",
                    subject: "notifications",
                },
            })
        ).toEqual(false);
    });
});
