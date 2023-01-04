import { Suspense } from "react";

import { MemoryRouter, Route } from "react-router";

import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import NotificationRouterV2 from "../NotificationRouterV2";

import { render, waitFor, screen } from "@testing-library/react";

jest.mock("src/internals/feature-controller");

jest.mock("src/squads/communication/pages/NotificationV2/NotificationListV2", () => {
    return {
        __esModule: true,
        default: () => {
            return <div>NotificationList</div>;
        },
    };
});

describe("<NotificationRouterV2 />", () => {
    it("should render course list without crash", async () => {
        const { container } = render(
            <MemoryRouter initialEntries={["/communication/notificationsv2"]}>
                <Suspense fallback={"..."}>
                    <SwitchWith404Route>
                        <Route
                            path="/communication/notificationsv2"
                            component={NotificationRouterV2}
                        />
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
