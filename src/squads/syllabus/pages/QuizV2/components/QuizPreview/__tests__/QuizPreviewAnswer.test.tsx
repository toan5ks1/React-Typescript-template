import { ReactNode } from "react";

import QuizPreviewAnswer, {
    QuizPreviewAnswerProps,
} from "src/squads/syllabus/pages/QuizV2/components/QuizPreview/QuizPreviewAnswer";

import { render, screen } from "@testing-library/react";
import TestCommonAppProvider from "src/squads/syllabus/test-utils/TestCommonAppProvider";

const answer: string = "answer text";
const label: string = "Correct";
const children: ReactNode = <div>{answer}</div>;

const renderUtil = (props: QuizPreviewAnswerProps) =>
    render(<QuizPreviewAnswer {...props} />, { wrapper: TestCommonAppProvider });

describe(QuizPreviewAnswer.name, () => {
    it("should render answer with correct label", () => {
        renderUtil({ children, correct: true });

        expect(screen.getByText(answer)).toBeInTheDocument();
        expect(screen.getByText(label)).toBeInTheDocument();
    });

    it("should render answer without correct label", () => {
        renderUtil({ children, correct: false });

        expect(screen.getByText(answer)).toBeInTheDocument();
        expect(screen.queryByText(label)).not.toBeInTheDocument();
    });
});
