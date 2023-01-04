import NoResultPage from "src/components/NoResultPage";
import TranslationProvider from "src/providers/TranslationProvider";

import { render, screen } from "@testing-library/react";

describe("<NoResultPage /> component", () => {
    it("should render UI with empty icon and content correctly", () => {
        render(
            <TranslationProvider>
                <NoResultPage />
            </TranslationProvider>
        );
        expect(screen.getByTestId("NoResultPage__root")).toBeInTheDocument();
        expect(screen.getByTestId("NoResultPage__emptyIcon")).toBeInTheDocument();
        expect(screen.getByText("No results found")).toBeInTheDocument();
        expect(
            screen.getByText("Please try again with different keywords or filters")
        ).toBeInTheDocument();
    });
});
