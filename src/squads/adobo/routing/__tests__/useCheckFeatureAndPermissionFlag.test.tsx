import { ERPModules, Features } from "src/common/constants/enum";

import useCheckFeatureAndPermissionFlag from "../useCheckFeatureAndPermissionFlag";

import { renderHook } from "@testing-library/react-hooks";

jest.mock("src/app/useAppPermission", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                permission: {
                    can: (subject: string, action: string) => {
                        if (action === "show" && subject === "student_qr_scanner") {
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
                path: `/${ERPModules.STUDENT_QR_SCANNER}`,
                component: () => {
                    return <div>ENTRY_EXIT</div>;
                },
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${ERPModules.STUDENT_QR_SCANNER}`,
                component: () => {
                    return <div>ENTRY_EXIT</div>;
                },
                permissionConfigs: {
                    subject: "student_qr_scanner",
                    action: "show",
                },
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${ERPModules.STUDENT_QR_SCANNER}`,
                component: () => {
                    return <div>ENTRY_EXIT</div>;
                },
                featureConfigs: {
                    feature: Features.ENTRY_EXIT_MANAGEMENT,
                },
            })
        ).toEqual(true);
        expect(
            fn({
                path: `/${ERPModules.STUDENT_QR_SCANNER}`,
                component: () => {
                    return <div>ENTRY_EXIT</div>;
                },
                permissionConfigs: {
                    subject: "student_qr_scanner",
                    action: "show",
                },
                featureConfigs: {
                    feature: Features.ENTRY_EXIT_MANAGEMENT,
                },
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${ERPModules.STUDENT_QR_SCANNER}`,
                component: () => {
                    return <div>ENTRY_EXIT</div>;
                },
                permissionConfigs: {
                    subject: "student_qr_scanner",
                    action: "list",
                },
            })
        ).toEqual(false);
    });
});
