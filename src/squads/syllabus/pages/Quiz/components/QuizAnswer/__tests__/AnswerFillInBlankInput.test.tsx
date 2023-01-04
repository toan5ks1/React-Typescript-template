import {
    createMockAnswerGroupFIB,
    createMockOptionContent,
} from "src/squads/syllabus/test-utils/quiz";

import AnswerFillInBlankInput, { AnswerFillInBlankInputProps } from "../AnswerFillInBlankInput";

import { render, screen, within } from "@testing-library/react";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

const renderUtil = (props: AnswerFillInBlankInputProps) => {
    return render(<AnswerFillInBlankInput {...props} />, { wrapper: TestApp });
};
describe(AnswerFillInBlankInput.name, () => {
    it("should render main answer input when alternativeIndex is 0", () => {
        const mainAnswerIndex = 0;
        const answerGroup = createMockAnswerGroupFIB({
            mainAnswerIndex,
            quantityAlternative: 1,
        });
        const content = createMockOptionContent(`Answer ${mainAnswerIndex + 1} Content`);
        const mockProps: AnswerFillInBlankInputProps = {
            id: answerGroup[mainAnswerIndex].id,
            content,
            mainAnswerNumber: mainAnswerIndex + 1,
            alternativeIndex: mainAnswerIndex,
            onChange: () => {},
        };

        renderUtil(mockProps);

        const answer = screen.getByTestId("AnswerFillInBlankInput__root");
        const answerInput = screen.getByTestId("AnswerFillInBlankInput__answer");

        expect(answer).toHaveAttribute("data-js", "FillInBlank__input");
        expect(
            within(answer).getByLabelText(`Answer ${mockProps.mainAnswerNumber}`)
        ).toBeInTheDocument();
        expect(answerInput).toHaveAttribute("placeholder", `Answer ${mockProps.mainAnswerNumber}`);
        expect(answerInput).toHaveValue(content.getCurrentContent().getPlainText());
    });

    it("should render alternative input when alternativeIndex !== 0", () => {
        const mainAnswerIndex = 0;
        const alternativeIndex = 1;
        const answerGroup = createMockAnswerGroupFIB({
            mainAnswerIndex,
            quantityAlternative: alternativeIndex + 1,
        });
        const content = createMockOptionContent(`Alternative ${alternativeIndex} Content`);
        const mockProps: AnswerFillInBlankInputProps = {
            id: answerGroup[alternativeIndex].id,
            content,
            mainAnswerNumber: mainAnswerIndex + 1,
            alternativeIndex: alternativeIndex,
            onChange: () => {},
        };

        renderUtil(mockProps);

        const alternative = screen.getByTestId("AnswerFillInBlankInput__root");
        const alternativeInput = screen.getByTestId("AnswerFillInBlankInput__alternative");

        expect(alternative).toHaveAttribute("data-js", "FillInBlank__inputAlter");
        expect(
            within(alternative).getByLabelText(`Alternative ${alternativeIndex}`)
        ).toBeInTheDocument();
        expect(alternativeInput).toHaveAttribute("placeholder", "Enter Alternative Value");
        expect(alternativeInput).toHaveValue(content.getCurrentContent().getPlainText());
    });
});
