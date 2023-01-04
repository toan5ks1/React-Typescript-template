import { Suspense } from "react";

import { MemoryRouter, Route } from "react-router";

import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import MicroRouting from "../MicroRouting";

import { render } from "@testing-library/react";

jest.mock("src/squads/timesheet/internals/permission", () => {
    const originalModule = jest.requireActual("src/squads/timesheet/internals/permission");
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
            path: "/timesheet",
        }),
    };
});
jest.mock("src/squads/timesheet/routing/useInitModules", () => {
    return {
        __esModule: true,
        default: () => ({
            routes: [
                {
                    path: "/timesheet",
                    component: () => <div>TimesheetRouter</div>,
                },
            ],
        }),
    };
});

jest.mock("src/squads/timesheet/hooks/useTimesheetUpdatePermissionMicroApplication", () => {
    return {
        __esModule: true,
        default: () => "ROLE",
    };
});

describe("<MicroRouting />", () => {
    it("should render /timesheet path", () => {
        const wrapper = render(
            <MemoryRouter initialEntries={["/timesheet/timesheet"]}>
                <Suspense fallback={"..."}>
                    <SwitchWith404Route>
                        <Route path="/timesheet" component={MicroRouting} />
                    </SwitchWith404Route>
                </Suspense>
            </MemoryRouter>
        );
        expect(wrapper.container).toMatchSnapshot();
    });
});
