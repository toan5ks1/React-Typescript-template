import { FieldTypes } from "src/squads/syllabus/models/quiz";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";
import { createMockAnswerListFIB } from "src/squads/syllabus/test-utils/quiz";

import OCRSelectionAnswerFIB, { OCRAnswerLocationFIBProps } from "../OCRSelectionAnswerFIB";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { getAllAnswerGroupsByGroupKey } from "src/squads/syllabus/pages/Quiz/common/utils";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

const renderUtil = (props: OCRAnswerLocationFIBProps) => {
    return render(<OCRSelectionAnswerFIB {...props} />, { wrapper: TestApp });
};
describe(OCRSelectionAnswerFIB.name, () => {
    it("should show OCR answer with alternative options and call its handler", () => {
        const mainAnswerIndex = 1;
        const answerList = createMockAnswerListFIB({
            mainAnswer: { quantity: mainAnswerIndex + 1, quantityAlternative: 2 },
        });
        const answerGroupList = getAllAnswerGroupsByGroupKey(answerList);

        const mockOnSelect = jest.fn();
        const mockProps: OCRAnswerLocationFIBProps = {
            answerList: answerGroupList[mainAnswerIndex],
            mainAnswerIndex,
            onSelect: mockOnSelect,
        };

        renderUtil(mockProps);

        // 1 answer with 2 alternatives
        expect(screen.getAllByRole("button")).toHaveLength(3);

        const answer = screen.getByTestId("OCRSelectionAnswerFIB__answer"); //first option: answer 2
        const alternative1 = screen.getAllByTestId("OCRSelectionAnswerFIB__alternative")[0]; //second option: alternative 1
        const alternative2 = screen.getAllByTestId("OCRSelectionAnswerFIB__alternative")[1]; //third option: alternative 2

        // Check render correctly answer group in answer group list
        expect(answer.textContent).toEqual(`Answer ${mockProps.mainAnswerIndex}`);
        userEvent.click(answer);
        expect(getLatestCallParams(mockOnSelect)).toEqual([
            FieldTypes.ANSWER,
            mockProps.answerList[0].id,
        ]);

        expect(alternative1.textContent).toEqual("Alternative 1");
        userEvent.click(alternative1);
        expect(getLatestCallParams(mockOnSelect)).toEqual([
            FieldTypes.ANSWER,
            mockProps.answerList[1].id,
        ]);

        expect(alternative2.textContent).toEqual("Alternative 2");
        userEvent.click(alternative2);
        expect(getLatestCallParams(mockOnSelect)).toEqual([
            FieldTypes.ANSWER,
            mockProps.answerList[2].id,
        ]);
    });
});
