import { PropsWithChildren } from "react";

import CommonTranslationProvider from "src/providers/TranslationProvider";

import Show, { ShowProps } from "../Show";
import useGetFlashcard from "../hooks/useGetFlashcard";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());
jest.mock("../hooks/useGetFlashcard", () => jest.fn());

const defaultProps: ShowProps = {
    record: {
        lo_id: "lo_01",
        name: "name",
        school_id: 12,
    },
};

const renderUtil = () => {
    render(<Show {...defaultProps} />, {
        wrapper: ({ children }: PropsWithChildren<{}>) => (
            <TestAppWithQueryClient>
                <CommonTranslationProvider>{children}</CommonTranslationProvider>
            </TestAppWithQueryClient>
        ),
    });
};

describe("Flashcard <Show />", () => {
    beforeEach(() => {
        (useGetFlashcard as jest.Mock).mockReturnValue({});
        renderUtil();
    });

    it("should display title and the upsert button", () => {
        expect(screen.getByText("Card Listing")).toBeInTheDocument();
        expect(screen.getByTestId("ButtonUpsert__root")).toBeInTheDocument();
    });

    it("should display dialog to upsert flashcard", () => {
        expect(screen.queryByTestId("DialogFullScreen__dialog")).not.toBeInTheDocument();

        fireEvent.click(screen.getByTestId("ButtonUpsert__root"));
        expect(screen.getByTestId("DialogFullScreen__dialog")).toBeInTheDocument();
    });

    it("should render flashcard table", () => {
        expect(screen.getByTestId("FlashcardTable__root")).toBeInTheDocument();
    });
});

describe("Flashcard <Show /> disable upsert button", () => {
    it("should disable upsert button when data is loading", async () => {
        (useGetFlashcard as jest.Mock).mockReturnValue({ isLoading: true });
        renderUtil();
        await waitFor(() => expect(screen.getByTestId("ButtonUpsert__root")).toBeDisabled());
    });
});
