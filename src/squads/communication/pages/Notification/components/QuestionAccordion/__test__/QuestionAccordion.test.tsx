import QuestionAccordion, { QuestionAccordionProps } from "../QuestionAccordion";

import { render, screen } from "@testing-library/react";

const defaultQuestionAccordionProps: QuestionAccordionProps = {
    accordionEndIcon: (
        <span data-testid="QuestionAccordion__accordionEndIcon">accordion summary end icon</span>
    ),
    children: <span data-testid="QuestionAccordion__listAnswers">list answers</span>,
    summaryContent: <span data-testid="QuestionItem__summaryContent">summary content</span>,
};

describe(QuestionAccordion.name, () => {
    it("should match snapshot", () => {
        const { container } = render(<QuestionAccordion {...defaultQuestionAccordionProps} />);

        expect(container).toMatchSnapshot();
    });

    it("should render correct the UI", () => {
        render(<QuestionAccordion {...defaultQuestionAccordionProps} />);

        expect(screen.getByTestId("QuestionItem__summaryContent")).toHaveTextContent(
            "summary content"
        );
        expect(screen.getByTestId("QuestionAccordion__accordionEndIcon")).toHaveTextContent(
            "accordion summary end icon"
        );
        expect(screen.getByTestId("QuestionAccordion__listAnswers")).toHaveTextContent(
            "list answers"
        );
    });
});
