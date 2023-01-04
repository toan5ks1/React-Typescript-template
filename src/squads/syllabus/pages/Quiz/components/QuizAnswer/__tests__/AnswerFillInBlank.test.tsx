import { LabelTypes } from "src/common/utils/label-generator";
import { createEmptyAnswer, QuizItemAttributeConfig } from "src/squads/syllabus/models/quiz";
import { getCallParamsAt } from "src/squads/syllabus/test-utils/mock-utils";
import { createMockAnswerListFIB } from "src/squads/syllabus/test-utils/quiz";

import AnswerFillInBlank, { AnswerFillInBlankProps, getOptionValue } from "../AnswerFillInBlank";

import { fireEvent, render, screen } from "@testing-library/react";
import useFeatureToggle from "src/squads/syllabus/hooks/useFeatureToggle";
import TestApp from "src/squads/syllabus/test-utils/TestApp";

jest.mock("src/squads/syllabus/hooks/useFeatureToggle", () => {
    const { Features } = jest.requireActual("src/common/constants/enum");

    return (...params: Parameters<typeof useFeatureToggle>) => {
        const [toggleName] = params;

        if (toggleName === Features.SYLLABUS_QUIZ_HANDWRITING) {
            return {
                isEnabled: true,
            };
        }

        throw new Error("Should catch the other feature flags");
    };
});

const renderUtil = (props: AnswerFillInBlankProps) => {
    return render(
        <TestApp>
            <AnswerFillInBlank {...props} />
        </TestApp>
    );
};

describe("AnswerFillInBlank", () => {
    it("should change handwriting language in both answer and alternative", () => {
        const mockOnChangeAttributeConfigs = jest.fn();
        const mockAnswerList = createMockAnswerListFIB();
        const mockProps: AnswerFillInBlankProps = {
            index: 0,
            labelType: LabelTypes.NUMBER,
            list: mockAnswerList,
            onAddNewAnswer: () => {},
            onChange: () => {},
            onChangeAttributeConfigs: mockOnChangeAttributeConfigs,
            onChangeLabel: () => {},
            onDelete: () => {},
            onDeleteGroup: () => {},
        };

        const { container } = renderUtil(mockProps);

        // Choose English language in handwriting
        fireEvent.mouseDown(
            container.querySelector(
                "[data-testid='AnswerFillInBlank__handwritingSetting'] [role='button']"
            ) as HTMLButtonElement
        );
        fireEvent.click(screen.getAllByRole("option")[1]);

        mockAnswerList.forEach((answer, index) => {
            expect(getCallParamsAt(mockOnChangeAttributeConfigs, index)[0]).toEqual({
                answerId: answer.id,
                value: [QuizItemAttributeConfig.LANGUAGE_CONFIG_ENG],
            });
        });
    });

    it("should add new alternative with handwriting language and group key of main answer", () => {
        const mockAnswerList = createMockAnswerListFIB({
            mainAnswer: { attributeConfigs: [QuizItemAttributeConfig.LANGUAGE_CONFIG_ENG] },
        });
        const mockProps: AnswerFillInBlankProps = {
            index: 0,
            labelType: LabelTypes.NUMBER,
            list: mockAnswerList,
            onAddNewAnswer: jest.fn(),
            onChange: () => {},
            onChangeAttributeConfigs: () => {},
            onChangeLabel: () => {},
            onDelete: () => {},
            onDeleteGroup: () => {},
        };

        renderUtil(mockProps);

        fireEvent.click(screen.getByTestId("AnswerFillInBlank__addAlternative"));

        expect(mockProps.onAddNewAnswer).toBeCalledWith({
            answerAttributeConfigs: mockProps.list[0].attribute.configs,
            groupKey: mockAnswerList[0].groupKey,
        });
    });
});

describe(getOptionValue.name, () => {
    it("should get config from answer attribute configs", () => {
        const config = QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG;
        const answer = createEmptyAnswer("ID");
        answer.attribute.configs = [config];

        expect(getOptionValue(answer)).toEqual(config);
    });

    it("should return FLASHCARD_LANGUAGE_CONFIG_NONE when answer's attribute configs are empty", () => {
        const answer = createEmptyAnswer("ID");
        answer.attribute.configs = [];

        expect(getOptionValue(answer)).toEqual(
            QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_NONE
        );
    });
});
