import AnswerReview from "../AnswerReview";

import { render, screen } from "@testing-library/react";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

jest.mock("src/squads/syllabus/hooks/useFeatureToggle");

describe("<AnswerReview />", () => {
    it("should render 'correct' label on correct prop is true", () => {
        const { container } = render(
            <TestThemeProvider>
                <AnswerReview className="test" correct={true} />
            </TestThemeProvider>
        );

        // we assert the text produce by the "correct" tag
        expect(screen.getByText(/correct/)).toBeInTheDocument();
        // root component should have correct wrapper style  when correct props is passed
        expect(container.querySelector(".test")).toHaveStyle("border: 1px solid #4CAF50");
    });

    it("should render override component as default", () => {
        const override = "span";

        const { container } = render(
            <AnswerReview className="test" correct={true} component={override} />
        );

        //tagName will be in uppercase state
        expect(container.querySelector(".test")!.tagName).toEqual(override.toUpperCase());
    });
});
