import { MemoryRouter } from "react-router";

import MicroRouting from "../MicroRouting";

import { render } from "@testing-library/react";

jest.mock("src/internals/permission", () => {
    const originalModule = jest.requireActual("src/internals/permission");
    return {
        ...originalModule,
        can: () => true,
    };
});

jest.mock("src/squads/user/hooks/useFeatureController");

jest.mock("src/squads/user/routing/routings.ts");

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...actual,
        useRouteMatch: () => ({
            path: "/user",
        }),
    };
});

jest.mock("src/squads/user/routing/useInitModules", () => {
    return {
        __esModule: true,
        default: () => ({
            routes: [
                {
                    path: "/student-erp",
                    component: () => <div>UserRouter</div>,
                },
            ],
        }),
    };
});

describe("<MicroRouting />", () => {
    it("should render /user path", () => {
        const wrapper = render(
            <MemoryRouter initialEntries={["/user/student-erp"]}>
                <MicroRouting />
            </MemoryRouter>
        );
        expect(wrapper.container).toMatchSnapshot();
    });
});
