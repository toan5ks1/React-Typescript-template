import { ERPModules } from "src/common/constants/enum";

import useCheckFeatureAndPermissionFlag from "../useCheckFeatureAndPermissionFlag";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/squads/timesheet/hooks/useTimesheetPermission", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                permission: {
                    can: (subject: string, action: string) => {
                        if (action === "show" && subject === "timesheet_management") {
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

describe("useCheckFeatureAndPermissionFlag hook", () => {
    it("should allow route when permission and feature flag are passed", () => {
        const { result } = renderHook(() => useCheckFeatureAndPermissionFlag());

        const fn = result.current;

        expect(
            fn({
                path: `/${ERPModules.TIMESHEET_MANAGEMENT}`,
                component: () => {
                    return <div>TIMESHEET_MANAGEMENT</div>;
                },
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${ERPModules.TIMESHEET_MANAGEMENT}`,
                component: () => {
                    return <div>TIMESHEET_MANAGEMENT</div>;
                },

                permissionConfigs: {
                    subject: "timesheet_management",
                    action: "show",
                },
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${ERPModules.TIMESHEET_MANAGEMENT}`,
                component: () => {
                    return <div>TIMESHEET_MANAGEMENT</div>;
                },
            })
        ).toEqual(true);
        expect(
            fn({
                path: `/${ERPModules.TIMESHEET_MANAGEMENT}`,
                component: () => {
                    return <div>TIMESHEET_MANAGEMENT</div>;
                },
                permissionConfigs: {
                    subject: "timesheet_management",
                    action: "show",
                },
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${ERPModules.TIMESHEET_MANAGEMENT}`,
                component: () => {
                    return <div>TIMESHEET_MANAGEMENT</div>;
                },
                permissionConfigs: {
                    subject: "timesheet_management",
                    action: "list",
                },
            })
        ).toEqual(false);
    });
});
