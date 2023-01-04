import {
    AnswerFormValue,
    QuestionnaireResultTableData,
} from "src/squads/communication/common/constants/types";
import {
    createMapAnswerFieldArrayItem,
    createMapQuestionFieldArrayItem,
    getDefaultAnswerItems,
    checkTableTitleIsReactNode,
    reduceAnswersListToAnswersStringArr,
} from "src/squads/communication/common/utils/questionnaire-table-utils";
import { createMockQuestionnaireQuestionsList } from "src/squads/communication/test-utils/query-data";
import {
    createQuestionsList,
    createUserAnswersList,
} from "src/squads/communication/test-utils/questionnaire";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import { TableColumn } from "src/components/Table";

describe(getDefaultAnswerItems.name, () => {
    it("should return correct data", () => {
        const expectedValue: AnswerFormValue[] = [
            {
                content: "",
            },
            {
                content: "",
            },
        ];
        expect(getDefaultAnswerItems(2)).toEqual(expectedValue);
    });
});

describe(createMapAnswerFieldArrayItem.name, () => {
    it("should return correct data", () => {
        const answerChoices = ["Answer 1", "Answer 2"];
        const expectedResult = answerChoices.map((answerChoice) => ({
            content: answerChoice,
        }));

        expect(createMapAnswerFieldArrayItem(answerChoices)).toEqual(expectedResult);
    });

    it("should return empty array when answerChoices = undefined", () => {
        expect(createMapAnswerFieldArrayItem(undefined)).toEqual([]);
    });
});

describe(createMapQuestionFieldArrayItem.name, () => {
    it("should return correct data", () => {
        const questionnaireQuestions = createMockQuestionnaireQuestionsList();
        const expectedResult = questionnaireQuestions
            .sort((prev, next) => prev.order_index - next.order_index) // sort asc question by order_index
            .map((questionnaireQuestion) => ({
                answerFieldArrayItem: createMapAnswerFieldArrayItem(questionnaireQuestion.choices),
                content: questionnaireQuestion.title,
                isRequiredQuestion: Boolean(questionnaireQuestion.is_required),
                questionType: questionnaireQuestion.type,
                order: questionnaireQuestion.order_index,
            }));

        expect(createMapQuestionFieldArrayItem(questionnaireQuestions)).toEqual(expectedResult);
    });

    it("should return empty array when questionnaireQuestions = undefined", () => {
        expect(createMapQuestionFieldArrayItem(undefined)).toEqual([]);
    });
});

describe(checkTableTitleIsReactNode.name, () => {
    const std = mockWarner();

    it("should show warning when questionnaire result table title is ReactNode", () => {
        const questionnaireResultTableColumns: TableColumn<QuestionnaireResultTableData>[] = [
            {
                key: "column 1",
                title: <p>Title column 1</p>,
            },
        ];

        checkTableTitleIsReactNode(questionnaireResultTableColumns);
        expect(std.warn).toBeCalledWith(
            "Download questionnaire result in-correct headers because typeof title table is ReactNode"
        );
    });

    it("should do not show warning when questionnaire result table title is string", () => {
        const questionnaireResultTableColumns: TableColumn<QuestionnaireResultTableData>[] = [
            {
                key: "column 1",
                title: "Title column 1",
            },
        ];

        checkTableTitleIsReactNode(questionnaireResultTableColumns);
        expect(std.warn).not.toBeCalledWith(
            "Download questionnaire result in-correct headers because typeof title table is ReactNode"
        );
    });
});

describe(reduceAnswersListToAnswersStringArr.name, () => {
    it("should return string based on charInMiddle", () => {
        const answersList = createUserAnswersList()[0].answersList;

        const questionsList = createQuestionsList();
        const expectResult: ReturnType<typeof reduceAnswersListToAnswersStringArr> = [
            "A. B",
            "A. B",
            "A. B. C",
            "Answer free text",
        ];

        const result = reduceAnswersListToAnswersStringArr(answersList, questionsList, ".");

        expect(result).toEqual(expectResult);
    });

    it("should sort answers of each question by alphabet", () => {
        const answersList = createUserAnswersList()[0].answersList;

        const questionsList = createQuestionsList();
        const expectResult: ReturnType<typeof reduceAnswersListToAnswersStringArr> = [
            "A, B",
            "A, B",
            "A, B, C",
            "Answer free text",
        ];

        const result = reduceAnswersListToAnswersStringArr(answersList, questionsList);

        expect(result).toEqual(expectResult);
    });
});
