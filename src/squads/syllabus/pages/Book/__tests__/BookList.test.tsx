import { inferQueryPagination } from "src/squads/syllabus/services/infer-query";

import CommonTranslationProvider from "src/providers/TranslationProvider";

import BookList from "../BookList";

import { render, RenderResult, screen } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

jest.mock("src/squads/syllabus/services/infer-query", () => ({
    __esModule: true,
    inferQueryPagination: jest.fn(),
}));

jest.mock("src/squads/syllabus/pages/Book/hooks/useBookMutation", () => ({
    __esModule: true,
    default: () => ({ onCreate: jest.fn }),
}));

describe(BookList.name, () => {
    let wrapper: RenderResult;

    beforeEach(() => {
        (inferQueryPagination as jest.Mock).mockReturnValue(() => ({
            result: {
                isLoading: false,
            },
            data: { data: [], total: 0 },
        }));

        wrapper = render(
            <TestApp>
                <CommonTranslationProvider>
                    <BookList />
                </CommonTranslationProvider>
            </TestApp>
        );
    });

    it("should match snapshot", () => {
        expect(wrapper.container).toMatchSnapshot();
    });

    it("should render UI correctly", () => {
        const button = screen.getByTestId("AddBook__addButton");
        const searchInput = screen.getByTestId("FormFilterAdvanced__textField");
        const bookTable = screen.getByTestId("BookList__table");

        expect(screen.getByText("Book")).toBeInTheDocument();
        expect(button).toHaveTextContent("Add");
        expect(searchInput).toBeInTheDocument();
        expect(bookTable).toBeInTheDocument();
    });
});
