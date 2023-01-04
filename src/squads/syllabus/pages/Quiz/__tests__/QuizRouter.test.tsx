import { Suspense } from "react";

import { LocationDescriptor } from "history";
import { MemoryRouter } from "react-router";

import QuizRouter from "../QuizRouter";

import { render, screen, waitFor } from "@testing-library/react";

const quizCreateV1: string = "Quiz Create V1";
const quizEditV1: string = "Quiz Edit V1";
const quizCreateV2: string = "Quiz Create V2";
const quizEditV2: string = "Quiz Edit V2";

jest.mock("src/components/Route/RouteGuard", () => ({
    __esModule: true,
    default: ({ component: ComponentRoute }: { component: () => JSX.Element }) => {
        return <ComponentRoute />;
    },
}));

jest.mock("src/squads/syllabus/pages/Quiz/Create", () => ({
    __esModule: true,
    default: () => <div>{quizCreateV1}</div>,
}));

jest.mock("src/squads/syllabus/pages/Quiz/Edit", () => ({
    __esModule: true,
    default: () => <div>{quizEditV1}</div>,
}));

jest.mock("src/squads/syllabus/pages/QuizV2/QuizCreate", () => ({
    __esModule: true,
    default: () => <div>{quizCreateV2}</div>,
}));

jest.mock("src/squads/syllabus/pages/QuizV2/QuizEdit", () => ({
    __esModule: true,
    default: () => <div>{quizEditV2}</div>,
}));

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");
    return {
        __esModule: true,
        ...actual,
        useRouteMatch: () => ({
            path: "/quizzes",
        }),
    };
});
const renderUtil = (initialEntries: LocationDescriptor[]) =>
    render(
        <MemoryRouter initialEntries={initialEntries}>
            <Suspense fallback={"..."}>
                <QuizRouter />
            </Suspense>
        </MemoryRouter>
    );

describe(QuizRouter.name, () => {
    it("should render quiz create v1 component", async () => {
        renderUtil(["/quizzes/create"]);

        await waitFor(() => {
            expect(screen.queryByText("...")).not.toBeInTheDocument();
        });

        expect(screen.getByText(quizCreateV1)).toBeInTheDocument();
    });

    it("should render quiz edit v1 component", async () => {
        renderUtil(["/quizzes/testid/edit"]);

        await waitFor(() => {
            expect(screen.queryByText("...")).not.toBeInTheDocument();
        });

        expect(screen.getByText(quizEditV1)).toBeInTheDocument();
    });

    it("should render quiz create v2 component", async () => {
        renderUtil(["/quizzes/create-v2"]);

        await waitFor(() => {
            expect(screen.queryByText("...")).not.toBeInTheDocument();
        });
        expect(screen.getByText(quizCreateV2)).toBeInTheDocument();
    });

    it("should render quiz edit v2 component", async () => {
        renderUtil(["/quizzes/testid/edit-v2"]);

        await waitFor(() => {
            expect(screen.queryByText("...")).not.toBeInTheDocument();
        });

        expect(screen.getByText(quizEditV2)).toBeInTheDocument();
    });
});
