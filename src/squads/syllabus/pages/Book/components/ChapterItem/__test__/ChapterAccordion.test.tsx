import ChapterAccordion from "../ChapterAccordion";

import { render, screen } from "@testing-library/react";

describe(ChapterAccordion.name, () => {
    beforeEach(() => {
        render(
            <ChapterAccordion name="chapter_name" endNode="chapter_action">
                <span data-testid="chapter_children">child</span>
            </ChapterAccordion>
        );
    });

    it("should render correct the UI", () => {
        expect(screen.getByText("chapter_name")).toBeInTheDocument();
        expect(screen.getByText("chapter_action")).toBeInTheDocument();

        expect(screen.getByTestId("chapter_children")).toBeInTheDocument();
    });
});
