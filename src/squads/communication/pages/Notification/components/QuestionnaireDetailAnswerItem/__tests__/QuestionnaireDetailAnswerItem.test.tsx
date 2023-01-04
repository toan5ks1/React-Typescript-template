import { calculateQuestionnaireResultPercentage } from "src/squads/communication/common/utils/questionnaire-utils";
import { TestApp } from "src/squads/communication/test-utils";

import QuestionnaireDetailAnswerItem, {
    QuestionnaireDetailAnswerItemProps,
} from "../QuestionnaireDetailAnswerItem";

import { render, screen } from "@testing-library/react";

const defaultQuestionnaireDetailAnswerItemProps: QuestionnaireDetailAnswerItemProps = {
    answer: "Answer",
    answerIndex: 0,
    numberOfVotes: 5,
    totalVotes: 10,
};

const renderQuestionnaireDetailAnswerItem = (
    props: QuestionnaireDetailAnswerItemProps = defaultQuestionnaireDetailAnswerItemProps
) => {
    return render(
        <TestApp>
            <QuestionnaireDetailAnswerItem {...props} />
        </TestApp>
    );
};

describe(QuestionnaireDetailAnswerItem.name, () => {
    it("should match snapshot", () => {
        const { container } = renderQuestionnaireDetailAnswerItem();

        expect(container).toMatchSnapshot();
    });

    it("should render answer item correctly with number of votes and percentage", () => {
        renderQuestionnaireDetailAnswerItem();

        const { answer, numberOfVotes, totalVotes } = defaultQuestionnaireDetailAnswerItemProps;
        const percentage = calculateQuestionnaireResultPercentage(numberOfVotes, totalVotes);

        expect(screen.getByTestId("CircleIcon")).toBeInTheDocument();
        expect(screen.getByTestId("QuestionnaireDetailAnswerItem__root")).toHaveTextContent(
            `A. ${answer} (${numberOfVotes} Votes)${percentage}`
        );
    });

    it("should render answer item without percentage when total votes is 0", () => {
        const numberOfVotes = 0;
        renderQuestionnaireDetailAnswerItem({
            ...defaultQuestionnaireDetailAnswerItemProps,
            numberOfVotes,
            totalVotes: 0,
        });

        const { answer } = defaultQuestionnaireDetailAnswerItemProps;

        expect(screen.queryByTestId("CircleIcon")).not.toBeInTheDocument();
        expect(screen.getByTestId("QuestionnaireDetailAnswerItem__root")).toHaveTextContent(
            `A. ${answer} (${numberOfVotes} Votes)`
        );
    });

    it("should render answer item with 1 responder", () => {
        const numberOfVotes = 1;
        renderQuestionnaireDetailAnswerItem({
            ...defaultQuestionnaireDetailAnswerItemProps,
            numberOfVotes,
        });

        const { answer, totalVotes } = defaultQuestionnaireDetailAnswerItemProps;
        const percentage = calculateQuestionnaireResultPercentage(numberOfVotes, totalVotes);

        expect(screen.getByTestId("CircleIcon")).toBeInTheDocument();
        expect(screen.getByTestId("QuestionnaireDetailAnswerItem__root")).toHaveTextContent(
            `A. ${answer} (${numberOfVotes} Vote)${percentage}`
        );
    });
});
