import { KeyQuestionTypes } from "src/squads/communication/common/constants/const";
import {
    calculateQuestionnaireResultPercentage,
    checkShouldDisableRemoveAnswerButton,
    checkShouldHideAddAnswerButton,
    createQuestionsListFromQuestionFieldArray,
    getAnswerItemContent,
} from "src/squads/communication/common/utils/questionnaire-utils";
import {
    createMockQuestionAnswerItems,
    createMockQuestionsListFormData,
} from "src/squads/communication/test-utils/questionnaire";

import { QuestionType } from "manabuf/common/v1/notifications_pb";

describe(checkShouldDisableRemoveAnswerButton.name, () => {
    it("should return true when number of answers equal minimum number", () => {
        expect(checkShouldDisableRemoveAnswerButton(2, 2)).toBe(true);
    });

    it("should return false when number of answers more than minimum number", () => {
        expect(checkShouldDisableRemoveAnswerButton(3, 2)).toBe(false);
    });
});

describe(checkShouldHideAddAnswerButton.name, () => {
    it("should return true when number of answers equal maximum number", () => {
        expect(checkShouldHideAddAnswerButton(10, 10)).toBe(true);
    });

    it("should return false when number of answers less than maximum number", () => {
        expect(checkShouldHideAddAnswerButton(3, 10)).toBe(false);
    });
});

describe(createQuestionsListFromQuestionFieldArray.name, () => {
    const mockQuestionnaireQuestionReturn = createMockQuestionsListFormData();

    const questionFieldArray = createMockQuestionAnswerItems({
        numberOfQuestions: 1,
        numberOfAnswer: 2,
    });

    it("should return correct data when QuestionType is multiple choice", () => {
        const mappedQuestionFieldArray = questionFieldArray.map((questionField) => ({
            ...questionField,
            questionType: KeyQuestionTypes.QUESTION_TYPE_MULTIPLE_CHOICE,
        }));

        const mappedMockQuestionnaireQuestionReturn = mockQuestionnaireQuestionReturn.map(
            (question) => ({
                ...question,
                type: QuestionType[KeyQuestionTypes.QUESTION_TYPE_MULTIPLE_CHOICE],
            })
        );

        expect(createQuestionsListFromQuestionFieldArray(mappedQuestionFieldArray)).toEqual(
            mappedMockQuestionnaireQuestionReturn
        );
    });

    it("should return correct data when QuestionType is short answer", () => {
        const mappedQuestionFieldArray = questionFieldArray.map((questionField) => ({
            ...questionField,
            questionType: KeyQuestionTypes.QUESTION_TYPE_FREE_TEXT,
        }));

        const mappedMockQuestionnaireQuestionReturn = mockQuestionnaireQuestionReturn.map(
            (question) => ({
                ...question,
                type: QuestionType[KeyQuestionTypes.QUESTION_TYPE_FREE_TEXT],
                choicesList: [],
            })
        );

        expect(createQuestionsListFromQuestionFieldArray(mappedQuestionFieldArray)).toEqual(
            mappedMockQuestionnaireQuestionReturn
        );
    });
});

describe(calculateQuestionnaireResultPercentage.name, () => {
    it("should return percentage with default fractionDigits", () => {
        expect(calculateQuestionnaireResultPercentage(4, 10)).toEqual("40.00%");
    });

    it("should return percentage with fractionDigits equal 0", () => {
        expect(calculateQuestionnaireResultPercentage(4, 10, 0)).toEqual("40%");
    });

    it("should return empty with totalOfElement equal 0", () => {
        expect(calculateQuestionnaireResultPercentage(0, 0, 0)).toEqual("");
    });

    it("should return 100% when numberOfElement = totalOfElement", () => {
        expect(calculateQuestionnaireResultPercentage(10, 10)).toEqual("100%");
    });
});

describe(getAnswerItemContent.name, () => {
    it("should return answer item content", () => {
        expect(getAnswerItemContent(0, "Answer", "2 Votes")).toEqual("A. Answer (2 Votes)");
    });
});
