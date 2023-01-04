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
jest.mock("src/app/useFeatureController");

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...actual,
        useRouteMatch: () => ({
            path: "/entry-exit",
        }),
    };
});
jest.mock("src/squads/adobo/routing/useInitModules", () => {
    return {
        __esModule: true,
        default: () => ({
            routes: [
                {
                    path: "/entry_exit",
                    component: () => <div>EntryExitRouter</div>,
                },
                {
                    path: "/invoice",
                    component: () => <div>InvoiceRouter</div>,
                },
            ],
        }),
    };
});

describe("<MicroRouting />", () => {
    it("should render /entry-exit path", () => {
        const wrapper = render(
            <MemoryRouter initialEntries={["/entry-exit/entry_exit"]}>
                <Suspense fallback={"..."}>
                    <SwitchWith404Route>
                        <Route path="/entry-exit" component={MicroRouting} />
                    </SwitchWith404Route>
                </Suspense>
            </MemoryRouter>
        );
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render /invoice path", () => {
        const wrapper = render(
            <MemoryRouter initialEntries={["/invoice"]}>
                <Suspense fallback={"..."}>
                    <SwitchWith404Route>
                        <Route path="/invoice" component={MicroRouting} />
                    </SwitchWith404Route>
                </Suspense>
            </MemoryRouter>
        );
        expect(wrapper.container).toMatchSnapshot();
    });
});
