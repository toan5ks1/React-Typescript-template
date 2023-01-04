import { createListAnswers } from "src/squads/communication/test-utils/questionnaire";

import QuestionItem, { QuestionItemProps } from "../QuestionItem";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockExpandEachQuestion = jest.fn();

const defaultPropsQuestionItem: QuestionItemProps = {
    choicesList: createListAnswers(),
    isExpand: false,
    toggleListAnswers: mockExpandEachQuestion,
    summaryContent: <span data-testid="QuestionItem__summaryContent">summary content</span>,
};

describe(QuestionItem.name, () => {
    it("should render correctly when click to question's name", () => {
        render(<QuestionItem {...defaultPropsQuestionItem} />);

        userEvent.click(screen.getByTestId("AccordionSummaryBase__root"));

        expect(mockExpandEachQuestion).toBeCalledTimes(1);
    });

    it("should not have icon expand when choicesList is empty array", () => {
        render(<QuestionItem {...defaultPropsQuestionItem} choicesList={[]} />);

        expect(screen.queryByTestId("AccordionSummaryBase__expandIcon")).not.toBeInTheDocument();
    });
});
