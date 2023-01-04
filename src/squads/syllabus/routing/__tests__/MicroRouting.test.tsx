import { Suspense } from "react";

import { MemoryRouter, Route } from "react-router";

import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import MicroRouting from "../MicroRouting";

import { render } from "@testing-library/react";

jest.mock("src/squads/syllabus/internals/permission", () => {
    const originalModule = jest.requireActual("src/squads/syllabus/internals/permission");
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
            path: "/syllabus",
        }),
    };
});
jest.mock("src/squads/syllabus/routing/useInitModules", () => {
    return {
        __esModule: true,
        default: () => ({
            routes: [
                {
                    path: "/courses",
                    component: () => <div>SyllabusRoute</div>,
                },
            ],
        }),
    };
});

describe("<MicroRouting />", () => {
    it("should render /syllabus path", () => {
        const wrapper = render(
            <MemoryRouter initialEntries={["/syllabus/courses"]}>
                <Suspense fallback={"..."}>
                    <SwitchWith404Route>
                        <Route path="/syllabus" component={MicroRouting} />
                    </SwitchWith404Route>
                </Suspense>
            </MemoryRouter>
        );
        expect(wrapper.container).toMatchSnapshot();
    });
});
