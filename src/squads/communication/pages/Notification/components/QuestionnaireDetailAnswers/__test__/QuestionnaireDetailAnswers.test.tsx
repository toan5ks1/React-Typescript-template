import { createListAnswers } from "src/squads/communication/test-utils/questionnaire";

import QuestionnaireDetailAnswers, {
    QuestionnaireDetailAnswersProps,
} from "../QuestionnaireDetailAnswers";

import { render, screen } from "@testing-library/react";

const choicesList = createListAnswers();

const defaultPropsListAnswers: QuestionnaireDetailAnswersProps = {
    choicesList,
};

describe(QuestionnaireDetailAnswers.name, () => {
    it("should render correct answers with correct length", () => {
        render(<QuestionnaireDetailAnswers {...defaultPropsListAnswers} />);

        expect(screen.getAllByTestId("QuestionnaireDetailAnswers__answer")).toHaveLength(
            defaultPropsListAnswers.choicesList.length
        );
        choicesList.forEach((answer) => {
            expect(screen.getByText(answer)).toBeInTheDocument();
        });
    });

    it("should render empty without choicesList", () => {
        render(<QuestionnaireDetailAnswers choicesList={[]} />);

        expect(screen.queryByTestId("QuestionnaireDetailAnswers__answer")).not.toBeInTheDocument();
    });
});
