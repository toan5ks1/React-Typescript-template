import { Entities, Features } from "src/common/constants/enum";

import { renderHook } from "@testing-library/react-hooks";
import useCheckFeatureAndPermissionFlag from "src/squads/payment/routing/useCheckFeatureAndPermissionFlag";

jest.mock("src/squads/payment/hooks/usePaymentPermission", () => {
    return {
        __esModule: true,
        default: () => {
            return {
                permission: {
                    can: (subject: string, action: string) => {
                        if (action === "show" && subject === "orders") {
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
                path: `/${Entities.ORDERS}`,
                component: () => {
                    return <div>ORDERS</div>;
                },
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${Entities.ORDERS}`,
                component: () => {
                    return <div>ORDERS</div>;
                },
                permissionConfigs: {
                    subject: "orders",
                    action: "show",
                },
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${Entities.ORDERS}`,
                component: () => {
                    return <div>ORDERS</div>;
                },
                featureConfigs: {
                    feature: Features.PAYMENT_ORDER_MANAGEMENT,
                },
            })
        ).toEqual(true);
        expect(
            fn({
                path: `/${Entities.ORDERS}`,
                component: () => {
                    return <div>ORDERS</div>;
                },
                permissionConfigs: {
                    subject: "orders",
                    action: "show",
                },
                featureConfigs: {
                    feature: Features.PAYMENT_ORDER_MANAGEMENT,
                },
            })
        ).toEqual(true);

        expect(
            fn({
                path: `/${Entities.ORDERS}`,
                component: () => {
                    return <div>ORDERS</div>;
                },
                permissionConfigs: {
                    subject: "orders",
                    action: "list",
                },
            })
        ).toEqual(false);
    });
});
