import { MemoryRouter } from "react-router";
import { OrderManagementFeatures } from "src/squads/payment/constants/permission";
import permission from "src/squads/payment/internals/permission";

import RouteGuard from "../RouteGuard";

import { render, screen } from "@testing-library/react";
import { mockUseFeatureController } from "src/squads/payment/test-utils/mocks/useFeatureController";

jest.mock("src/squads/payment/internals/permission", () => {
    const originalModule = jest.requireActual("src/squads/payment/internals/permission");
    return {
        ...originalModule,
        can: jest.fn(originalModule.can),
    };
});

jest.mock("src/squads/payment/hooks/useFeatureController", () => jest.fn());
describe(RouteGuard.name, () => {
    it("should allow route when permission and feature flag are not passed", () => {
        mockUseFeatureController();

        render(
            <MemoryRouter initialEntries={["/payment/orders"]}>
                <RouteGuard path="/payment/orders" render={() => <span>HOME</span>} />
            </MemoryRouter>
        );
        expect(screen.getByText("HOME")).toBeInTheDocument();
    });

    it("should deny route when permission is denied", () => {
        (permission.can as jest.Mock).mockReturnValue(false);
        mockUseFeatureController();

        render(
            <MemoryRouter initialEntries={["/payment/orders"]}>
                <RouteGuard
                    path="/payment/orders"
                    render={() => <span>ORDERS</span>}
                    permissionConfigs={{
                        subject: "orders",
                        action: "show",
                    }}
                />
            </MemoryRouter>
        );
        expect(screen.queryByText("ORDERS")).not.toBeInTheDocument();
    });

    it("should allow route when permission is allowed", () => {
        (permission.can as jest.Mock).mockReturnValue(true);
        mockUseFeatureController();

        render(
            <MemoryRouter initialEntries={["/payment/orders"]}>
                <RouteGuard
                    path="/payment/orders"
                    render={() => <span>ORDERS</span>}
                    permissionConfigs={{
                        subject: "orders",
                        action: "show",
                    }}
                />
            </MemoryRouter>
        );
        expect(screen.getByText("ORDERS")).toBeInTheDocument();
    });

    it("should deny route when feature flag is denied", () => {
        (permission.can as jest.Mock).mockReturnValue(true);

        mockUseFeatureController({ get: () => false });

        const { container } = render(
            <MemoryRouter initialEntries={["/payment/orders"]}>
                <RouteGuard
                    path="/payment/orders"
                    render={() => <span>ORDERS</span>}
                    featureConfigs={{
                        feature: OrderManagementFeatures.PAYMENT_ORDER_MANAGEMENT,
                    }}
                />
            </MemoryRouter>
        );

        expect(container).toBeEmptyDOMElement();
    });

    it("should allow route when feature flag is enabled", () => {
        (permission.can as jest.Mock).mockReturnValue(false);

        mockUseFeatureController({ get: () => true });

        render(
            <MemoryRouter initialEntries={["/payment/orders"]}>
                <RouteGuard
                    path="/payment/orders"
                    render={() => <span>ORDERS</span>}
                    featureConfigs={{
                        feature: OrderManagementFeatures.PAYMENT_ORDER_MANAGEMENT,
                    }}
                />
            </MemoryRouter>
        );
        expect(screen.getByText("ORDERS")).toBeInTheDocument();
    });

    it("should deny when feature flag and permission are not allowed", () => {
        (permission.can as jest.Mock).mockReturnValue(false);

        mockUseFeatureController({ get: () => false });

        const { container } = render(
            <MemoryRouter initialEntries={["/payment/orders"]}>
                <RouteGuard
                    path="/payment/orders"
                    render={() => <span>ORDERS</span>}
                    featureConfigs={{
                        feature: OrderManagementFeatures.PAYMENT_ORDER_MANAGEMENT,
                    }}
                    permissionConfigs={{
                        subject: "orders",
                        action: "show",
                    }}
                />
            </MemoryRouter>
        );

        expect(container).toBeEmptyDOMElement();
    });
});
