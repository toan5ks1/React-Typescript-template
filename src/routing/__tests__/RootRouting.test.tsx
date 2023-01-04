import { MemoryRouter } from "react-router";

import RootRouting from "../RootRouting";

import { render } from "@testing-library/react";

jest.mock("src/internals/permission", () => {
    const originalModule = jest.requireActual("src/internals/permission");
    return {
        ...originalModule,
        can: () => true,
    };
});

jest.mock("src/app/useFeatureController");
jest.mock("src/squads/user/routing/routings.ts");
jest.mock("src/squads/timesheet/routing/routings.ts");

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...actual,
        Route: ({ path }: { path: string }) => {
            return <div>{path}</div>;
        },
    };
});

describe("<RootRouting />", () => {
    it("should render /user path", () => {
        const wrapper = render(
            <MemoryRouter initialEntries={["/user/student_erp"]}>
                <RootRouting />
            </MemoryRouter>
        );
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render /timesheet path", () => {
        const wrapper = render(
            <MemoryRouter initialEntries={["/timesheet/timesheet_management"]}>
                <RootRouting />
            </MemoryRouter>
        );
        expect(wrapper.container).toMatchSnapshot();
    });
});
