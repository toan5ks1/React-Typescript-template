import { useContext } from "react";

import useFeatureToggle from "../../hooks/useFeatureToggle";
import { BookTypeKeys } from "../../pages/Book/common/constants";
import { BookDetailContext, BookDetailProvider } from "../BookDetailProvider";
import { createMockGetSyllabusBookOne } from "./data";

import { render } from "@testing-library/react";

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe(BookDetailProvider.name, () => {
    const TestingComponent = () => {
        const { isDisableAction } = useContext(BookDetailContext);

        return (
            <>
                <p data-testid="BookDetailProvider_text">{isDisableAction.toString()}</p>
            </>
        );
    };

    it("should returns false when feature flag is disabled", () => {
        const flagIsEnabled = false;

        const mockBookData = createMockGetSyllabusBookOne();
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: flagIsEnabled,
            };
        });

        const { getByTestId } = render(
            <BookDetailProvider book={mockBookData}>
                <TestingComponent />
            </BookDetailProvider>
        );

        const bookIdText = getByTestId("BookDetailProvider_text");

        expect(bookIdText).toHaveTextContent(flagIsEnabled.toString());
    });

    it("should returns false when feature flag is enabled and book type is GENERAL", () => {
        const flagIsEnabled = true;

        const mockBookDataGeneral = createMockGetSyllabusBookOne();
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: flagIsEnabled,
            };
        });

        const { getByTestId } = render(
            <BookDetailProvider book={mockBookDataGeneral}>
                <TestingComponent />
            </BookDetailProvider>
        );

        const bookIdText = getByTestId("BookDetailProvider_text");

        expect(bookIdText).toHaveTextContent((!flagIsEnabled).toString());
    });

    it("should returns true when feature flag is enabled and book type is AD_HOC", () => {
        const flagIsEnabled = true;

        const mockBookDataAdHoc = createMockGetSyllabusBookOne({
            book_type: BookTypeKeys.BOOK_TYPE_ADHOC,
        });
        (useFeatureToggle as jest.Mock).mockImplementation(() => {
            return {
                isEnabled: flagIsEnabled,
            };
        });

        const { getByTestId } = render(
            <BookDetailProvider book={mockBookDataAdHoc}>
                <TestingComponent />
            </BookDetailProvider>
        );

        const bookIdText = getByTestId("BookDetailProvider_text");

        expect(bookIdText).toHaveTextContent(flagIsEnabled.toString());
    });
});
