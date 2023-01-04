import { Suspense } from "react";

import { MemoryRouter, Route } from "react-router";

import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import NotificationRouter from "../NotificationRouter";

import { render, waitFor, screen } from "@testing-library/react";

jest.mock("src/internals/feature-controller");

jest.mock("src/squads/communication/pages/Notification/NotificationList", () => {
    return {
        __esModule: true,
        default: () => {
            return <div>NotificationList</div>;
        },
    };
});

describe("<NotificationRouter />", () => {
    it("should render course list without crash", async () => {
        const { container } = render(
            <MemoryRouter initialEntries={["/communication/notifications"]}>
                <Suspense fallback={"..."}>
                    <SwitchWith404Route>
                        <Route path="/communication/notifications" component={NotificationRouter} />
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
