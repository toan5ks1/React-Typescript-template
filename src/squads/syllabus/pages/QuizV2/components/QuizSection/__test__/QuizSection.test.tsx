import QuizSection, { QuizSectionProps } from "../QuizSection";

import { render, screen } from "@testing-library/react";

const childrenText: string = "Test editor component";

const renderUtil = (props: QuizSectionProps) => render(<QuizSection {...props} />);

describe(QuizSection.name, () => {
    it("should render correct quiz section's title and content", () => {
        const props: QuizSectionProps = {
            title: "Test title",
            children: <div>{childrenText}</div>,
        };

        renderUtil(props);

        expect(screen.getByText(props.title as string)).toBeInTheDocument();
        expect(screen.getByText(childrenText)).toBeInTheDocument();
    });
});
