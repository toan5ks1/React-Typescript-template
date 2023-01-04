import { ERPModules } from "src/common/constants/enum";

import useCheckFeatureAndPermissionFlag from "../useCheckFeatureAndPermissionFlag";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/app/useAppPermission", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                permission: {
                    can: (subject: string, action: string) => {
                        if (action === "show" && subject === "students_erp") {
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
                path: `/${ERPModules.STUDENTS}`,
                component: () => {
                    return <div>STUDENTS</div>;
                },
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${ERPModules.STUDENTS}`,
                component: () => {
                    return <div>STUDENTS</div>;
                },

                permissionConfigs: {
                    subject: "students_erp",
                    action: "show",
                },
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${ERPModules.STUDENTS}`,
                component: () => {
                    return <div>STUDENTS</div>;
                },
            })
        ).toEqual(true);
        expect(
            fn({
                path: `/${ERPModules.STUDENTS}`,
                component: () => {
                    return <div>STUDENTS</div>;
                },
                permissionConfigs: {
                    subject: "students_erp",
                    action: "show",
                },
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${ERPModules.STUDENTS}`,
                component: () => {
                    return <div>STUDENTS</div>;
                },
                permissionConfigs: {
                    subject: "students_erp",
                    action: "list",
                },
            })
        ).toEqual(false);
    });
});
