import { Suspense } from "react";

import { MemoryRouter, Route } from "react-router";

import SwitchWith404Route from "src/components/Route/SwitchWith404Route";

import BookRouter from "../BookRouter";

import { render, waitFor, screen } from "@testing-library/react";

jest.mock("src/squads/syllabus/pages/Book/BookList", () => {
    return {
        __esModule: true,
        default: () => {
            return <div>BookList</div>;
        },
    };
});

describe("<BookRouter />", () => {
    it("should render book list without crash", async () => {
        const { container } = render(
            <MemoryRouter initialEntries={["/syllabus/books"]}>
                <Suspense fallback={"..."}>
                    <SwitchWith404Route>
                        <Route path="/syllabus/books" component={BookRouter} />
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
