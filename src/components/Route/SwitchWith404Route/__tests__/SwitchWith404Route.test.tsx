import { createMemoryHistory } from "history";
import { MemoryRouter, Route, Router } from "react-router";

import SwitchWith404Route from "../SwitchWith404Route";

import { render, screen } from "@testing-library/react";

const FakeComp = () => <span data-testid="Fake_root" />;

describe(SwitchWith404Route.name, () => {
    it("should render 404 page as default config", () => {
        const history = createMemoryHistory({ initialEntries: ["/admin"] });
        render(
            <Router history={history}>
                <SwitchWith404Route>
                    <Route path="/dashboard" component={FakeComp} />
                </SwitchWith404Route>
            </Router>
        );

        expect(history.location.pathname).toBe("/page-not-found");
    });

    it("should render without crash when catchAllMode is component and don't pass custom component", () => {
        render(
            <MemoryRouter initialEntries={["/admin"]}>
                <SwitchWith404Route catchAllMode="component">
                    <Route path="/dashboard" component={FakeComp} />
                </SwitchWith404Route>
                <span data-testid="Fixed_ui" />
            </MemoryRouter>
        );

        expect(screen.getByTestId("Fixed_ui")).toBeInTheDocument();
    });

    it("should render custom component with catchAllMode is component", () => {
        render(
            <MemoryRouter initialEntries={["/admin"]}>
                <SwitchWith404Route
                    catchAllMode="component"
                    component={<span data-testid="Custom_404" />}
                >
                    <Route path="/dashboard" component={FakeComp} />
                </SwitchWith404Route>
            </MemoryRouter>
        );

        expect(screen.getByTestId("Custom_404")).toBeInTheDocument();
    });

    it("should render when route is matched", () => {
        render(
            <MemoryRouter initialEntries={["/dashboard"]}>
                <SwitchWith404Route catchAllMode="component">
                    <Route path="/dashboard" component={FakeComp} />
                </SwitchWith404Route>
            </MemoryRouter>
        );

        expect(screen.getByTestId("Fake_root")).toBeInTheDocument();
    });
});
