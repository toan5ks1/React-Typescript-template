import { Suspense } from "react";

import { MemoryRouter, Route } from "react-router";

import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import { render, waitFor, screen } from "@testing-library/react";
import OrderManagementRouter from "src/squads/payment/domains/OrderManagement/OrderManagementRouter";

jest.mock("src/internals/feature-controller");

jest.mock("src/squads/payment/domains/OrderManagement/pages/OrdersPage", () => {
    return {
        __esModule: true,
        default: () => {
            return <div>OrdersPage</div>;
        },
    };
});

describe("<OrderManagementRouter />", () => {
    it("should render order list without crash", async () => {
        const { container } = render(
            <MemoryRouter initialEntries={["/payment/orders"]}>
                <Suspense fallback={"..."}>
                    <SwitchWith404Route>
                        <Route path="/payment/orders" component={OrderManagementRouter} />
                    </SwitchWith404Route>
                </Suspense>
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.queryByText("...")).not.toBeInTheDocument();
        });

        expect(container).toMatchSnapshot();
    });
});
