import { Suspense } from "react";

import { MemoryRouter, Route } from "react-router";

import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import MicroRouting from "../MicroRouting";

import { render } from "@testing-library/react";

jest.mock("src/internals/permission", () => {
    const originalModule = jest.requireActual("src/internals/permission");
    return {
        ...originalModule,
        can: () => true,
    };
});

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...actual,
        useRouteMatch: () => ({
            path: "/payment",
        }),
    };
});
jest.mock("src/squads/payment/routing/useInitModules", () => {
    return {
        __esModule: true,
        default: () => ({
            routes: [
                {
                    path: "/orders",
                    component: () => <div>PaymentRouter</div>,
                },
            ],
        }),
    };
});

jest.mock("src/squads/payment/hooks/usePaymentUpdatePermissionMicroApplication", () => {
    return {
        __esModule: true,
        default: () => "ROLE",
    };
});

describe("<MicroRouting />", () => {
    it("should render /payment path", () => {
        const wrapper = render(
            <MemoryRouter initialEntries={["/payment/orders"]}>
                <Suspense fallback={"..."}>
                    <SwitchWith404Route>
                        <Route path="/payment" component={MicroRouting} />
                    </SwitchWith404Route>
                </Suspense>
            </MemoryRouter>
        );
        expect(wrapper.container).toMatchSnapshot();
    });
});
