import { Suspense } from "react";

import { MemoryRouter, Route } from "react-router";

import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import { render } from "@testing-library/react";
import MicroRouting from "src/squads/calendar/routing/MicroRouting";

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...actual,
        useRouteMatch: () => ({
            path: "/calendar",
        }),
    };
});

jest.mock("src/squads/calendar/routing/useInitModules", () => {
    return {
        __esModule: true,
        default: () => ({
            routes: [
                {
                    path: "/schedule",
                    component: () => <div>schedule</div>,
                },
            ],
        }),
    };
});

describe("<MicroRouting />", () => {
    it("should render /calendar path", () => {
        const wrapper = render(
            <MemoryRouter initialEntries={["/calendar/schedule"]}>
                <Suspense fallback={"..."}>
                    <SwitchWith404Route>
                        <Route path="/calendar" component={MicroRouting} />
                    </SwitchWith404Route>
                </Suspense>
            </MemoryRouter>
        );
        expect(wrapper.container).toMatchSnapshot();
    });
});
