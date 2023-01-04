import BooksAutocompleteHF from "../BooksAutocompleteHF";

import { render, RenderResult, waitFor } from "@testing-library/react";
import useAutocompleteReference from "src/squads/syllabus/hooks/useAutocompleteReference";
import { withReactHookForm } from "src/squads/syllabus/test-utils/HOCs";

jest.mock("src/squads/syllabus/hooks/useAutocompleteReference", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("<BooksAutocompleteHF />", () => {
    let wrapper: RenderResult;
    const BooksAutocomplete = withReactHookForm(
        BooksAutocompleteHF,
        {
            name: "books",
            disableClearable: false,
            disableCloseOnSelect: true,
        },
        {
            defaultValues: {
                books: [{ book_id: undefined, value: "All Books", name: "All Books" }],
            },
        }
    );

    beforeEach(() => {
        (useAutocompleteReference as jest.Mock).mockReturnValue({
            options: [{ book_id: undefined, value: "All Books", name: "All Books" }],
        });

        wrapper = render(<BooksAutocomplete />);
    });

    it("should render correct UI", async () => {
        await waitFor(() =>
            expect(wrapper.queryByTestId("AutocompleteBase__loading")).not.toBeInTheDocument()
        );

        expect(wrapper.getByTestId("AutocompleteBase__input")).toBeInTheDocument();
        expect(wrapper.getByLabelText("Clear")).toBeInTheDocument();
    });
});
