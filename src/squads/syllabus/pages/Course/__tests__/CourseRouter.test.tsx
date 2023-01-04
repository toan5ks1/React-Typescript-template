import { Suspense } from "react";

import { MemoryRouter, Route } from "react-router";

import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import CourseRouter from "../CourseRouter";

import { render, screen, waitFor } from "@testing-library/react";

jest.mock("src/app/useFeatureController");

jest.mock("src/squads/syllabus/pages/Course/CourseList", () => {
    return {
        __esModule: true,
        default: () => {
            return <div>CourseList</div>;
        },
    };
});

describe("<CourseRouter />", () => {
    it("should render course list without crash", async () => {
        const { container } = render(
            <MemoryRouter initialEntries={["/syllabus/courses"]}>
                <Suspense fallback={"..."}>
                    <SwitchWith404Route>
                        <Route path="/syllabus/courses" component={CourseRouter} />
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
