import { createMemoryHistory } from "history";
import { Route, Router, Switch } from "react-router";

import PageNotFound from "../PageNotFound";

import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("src/hooks/useTranslate");

describe(PageNotFound.name, () => {
    it("should go to the home page when click back to home page", () => {
        const history = createMemoryHistory({ initialEntries: ["/page-not-found"] });
        render(
            <Router history={history}>
                <Switch>
                    <Route path="/page-not-found" component={PageNotFound} />
                    <Route
                        path="/"
                        component={() => <span data-testid="HomePage"> Home page </span>}
                    />
                </Switch>
            </Router>
        );

        fireEvent.click(screen.getByTestId("PageNotFound__backHome"));

        expect(history.location.pathname).toBe("/");

        expect(screen.getByTestId("HomePage")).toBeInTheDocument();
    });

    it("should render full screen without scroll", () => {
        const history = createMemoryHistory({ initialEntries: ["/page-not-found"] });
        const { container } = render(
            <Router history={history}>
                <Switch>
                    <Route path="/page-not-found" component={PageNotFound} />
                </Switch>
            </Router>
        );

        expect(screen.getByTestId("PageNotFound__root")).toHaveStyle("height: 100vh");
        expect(screen.getByTestId("PageNotFound__root")).toHaveStyle("width: 100vw");

        expect(container).toMatchSnapshot();
    });
});
