import { ERPModules, Features } from "src/common/constants/enum";
import { Rules } from "src/internals/permission/rules";

import { ActionKeys, SubjectKeys } from "@manabie-com/role-based-permission";
import { renderHook } from "@testing-library/react-hooks";
import useCheckFeatureAndPermissionFlag from "src/squads/calendar/routing/useCheckFeatureAndPermissionFlag";

jest.mock("src/app/useAppPermission", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                permission: {
                    can: (
                        subject: SubjectKeys<Rules>,
                        action: ActionKeys<Rules, SubjectKeys<Rules>>
                    ) => {
                        if (action === "show" && subject === "schedule") {
                            return true;
                        }
                        return false;
                    },
                },
            };
        },
    };
});

jest.mock("src/hooks/useStandaloneFeatureToggle", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                featureIsEnable: () => true,
            };
        },
    };
});

const mockPermissionConfigs = (
    action: ActionKeys<Rules, SubjectKeys<Rules>> = "show"
): { subject: SubjectKeys<Rules>; action: ActionKeys<Rules, SubjectKeys<Rules>> } | undefined => ({
    subject: "schedule",
    action: action,
});
describe("useCheckFeatureAndPermissionFlag hook", () => {
    it("should allow route when permission and feature flag are passed", () => {
        const { result } = renderHook(() => useCheckFeatureAndPermissionFlag());
        const fn = result.current;

        expect(
            fn({
                path: `/${ERPModules.SCHEDULE}`,
                component: () => {
                    return <div>SCHEDULE</div>;
                },
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${ERPModules.SCHEDULE}`,
                component: () => {
                    return <div>SCHEDULE</div>;
                },
                permissionConfigs: mockPermissionConfigs(),
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${ERPModules.SCHEDULE}`,
                component: () => {
                    return <div>SCHEDULE</div>;
                },
                featureConfigs: {
                    feature: Features.SCHEDULE_MANAGEMENT,
                },
            })
        ).toEqual(true);
        expect(
            fn({
                path: `/${ERPModules.SCHEDULE}`,
                component: () => {
                    return <div>SCHEDULE</div>;
                },
                permissionConfigs: mockPermissionConfigs(),
                featureConfigs: {
                    feature: Features.SCHEDULE_MANAGEMENT,
                },
            })
        ).toEqual(true);
        expect(
            fn({
                path: `/${ERPModules.SCHEDULE}`,
                component: () => {
                    return <div>SCHEDULE</div>;
                },
                permissionConfigs: mockPermissionConfigs("list"),
            })
        ).toEqual(false);
    });
});
