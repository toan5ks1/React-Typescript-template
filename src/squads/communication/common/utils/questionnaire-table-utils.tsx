import { ArrayElement } from "src/common/constants/types";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import {
    AnswerFormValue,
    AnswerOfFilter,
    QuestionFormValue,
    QuestionnaireIdAndAnswerMap,
    QuestionnaireQuestion,
    QuestionnaireQuestionType,
    QuestionnaireResultTableData,
} from "src/squads/communication/common/constants/types";
import { createCsvFile } from "src/squads/communication/common/utils/files";
import { getAlphabetArray } from "src/squads/communication/common/utils/other";
import { covertReactNodeToString } from "src/squads/communication/common/utils/utils";
import { Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQuery } from "src/squads/communication/service/bob/bob-types";

import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import { TableColumn } from "src/components/Table";
import TypographyBase from "src/components/Typographys/TypographyBase";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";
import ColumnsStudentParentName from "src/squads/communication/pages/Notification/components/Tables/ColumnStudentParentName";
import TypographyNotificationDate from "src/squads/communication/pages/Notification/components/TypographyNotificationDate";

import { GetAnswersByFilterResponse } from "manabuf/bob/v1/notifications_pb";
import { QuestionType } from "manabuf/common/v1/notifications_pb";

import { UseResourceTranslateReturn } from "src/squads/communication/hooks/useResourceTranslate";

export const createMapAnswerFieldArrayItem = (
    answerChoices?: QuestionnaireQuestion["choicesList"]
): AnswerFormValue[] => {
    if (!answerChoices) {
        return [];
    }

    return answerChoices.map((answerChoice) => ({
        content: answerChoice,
    }));
};

export const createMapQuestionFieldArrayItem = (
    questionnaireQuestions?:
        | Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQuery["questionnaire_questions"]
): QuestionFormValue[] => {
    if (!questionnaireQuestions) {
        return [];
    }

    return questionnaireQuestions
        .sort((prev, next) => prev.order_index - next.order_index) // sort asc question by order_index
        .map((questionnaireQuestion) => ({
            answerFieldArrayItem: createMapAnswerFieldArrayItem(questionnaireQuestion.choices),
            content: questionnaireQuestion.title,
            isRequiredQuestion: Boolean(questionnaireQuestion.is_required),
            questionType: questionnaireQuestion.type as QuestionnaireQuestionType,
            order: questionnaireQuestion.order_index,
        }));
};

export const getDefaultAnswerItems = (minimumAnswers: number) =>
    [...Array(minimumAnswers)].map<AnswerFormValue>(() => ({
        content: "",
    }));

/**
 * @param question the question which contains the choice list and the type of question
 * @param currentAnswer the answer you want to get the label
 * @description get the choice label from the choiceList of questionnaireQuestionId
 * @returns the choice label of the answer ["A, B, C", "A, D", "D", "B"]
 */
export const findChoiceStringByAnswer = (
    question: ArrayElement<GetAnswersByFilterResponse.AsObject["questionsList"]>,
    currentAnswer: AnswerOfFilter
): string => {
    const choiceIndex = question.choicesList.findIndex((choice) => choice === currentAnswer);
    const alphabetArr = getAlphabetArray("uppercase");

    const choicesString =
        question.type === QuestionType.QUESTION_TYPE_FREE_TEXT
            ? currentAnswer
            : alphabetArr[choiceIndex];

    return choicesString;
};

/**
* @param answersList
* @description convert the answersList to array of grouped answers by questionnaireQuestionId
* @example 
* const answersList = [
      {
          questionnaireQuestionId: 'id1', 
          answer: 'answer 1 of id1'
      },
      {
          questionnaireQuestionId: 'id1', 
          answer: 'answer 2 of id1'
      },
      {
          questionnaireQuestionId: 'id2', 
          answer: 'answer 1 of id2'
      },
      {
          questionnaireQuestionId: 'id3', 
          answer: 'answer 1 of id3'
      },
  ]

  => ['answer 1 of id1, answer 2 of id1', 'answer 1 of id2', 'answer 1 of id3']
* @returns array of grouped answers by questionnaireQuestionId
*/
export const reduceAnswersListToAnswersStringArr = (
    answersList: ArrayElement<
        GetAnswersByFilterResponse.AsObject["userAnswersList"]
    >["answersList"],
    questionsList: GetAnswersByFilterResponse.AsObject["questionsList"],
    charInMiddle: "." | "/" | "," = ","
) => {
    const reducedAnswersMap = answersList.reduce<QuestionnaireIdAndAnswerMap>(
        (map, { answer: currentAnswer, questionnaireQuestionId }) => {
            let existedAnswer: string = map.get(questionnaireQuestionId) || "";

            if (existedAnswer) existedAnswer = `${existedAnswer}${charInMiddle} `;

            const question = questionsList.find(
                (question) => question.questionnaireQuestionId === questionnaireQuestionId
            );

            const choicesString =
                (question && findChoiceStringByAnswer(question, currentAnswer)) || "";

            return map.set(questionnaireQuestionId, `${existedAnswer}${choicesString}`);
        },
        new Map()
    );

    const resultSorted = [...reducedAnswersMap.values()].map((ans) => {
        // format answer: "A, C, B"
        return ans.split(`${charInMiddle} `).sort().join(`${charInMiddle} `);
    });

    return resultSorted;
};

export const mapUserAnswersListToTableData = (
    userAnswersList: GetAnswersByFilterResponse.AsObject["userAnswersList"],
    questionsList: GetAnswersByFilterResponse.AsObject["questionsList"]
): QuestionnaireResultTableData[] =>
    userAnswersList.map(({ answersList, targetName, ...rest }): QuestionnaireResultTableData => {
        return {
            // Group answers by questionnaireQuestionId
            answers: reduceAnswersListToAnswersStringArr(answersList, questionsList),
            studentName: targetName,
            ...rest,
        };
    });

export const mapQuestionsListToTableColumns = (
    questionsList: GetAnswersByFilterResponse.AsObject["questionsList"],
    tNotification: UseResourceTranslateReturn
): TableColumn<QuestionnaireResultTableData>[] =>
    questionsList.map(({ type }, index) => ({
        key: String(index),
        title: `${tNotification("label.question")} ${index + 1}`,
        render: (record) => {
            const answerWithAlphabet = record.answers[index];

            if (type === QuestionType.QUESTION_TYPE_FREE_TEXT)
                return (
                    // TODO: mana-ui support for tooltip requested by designer
                    <TypographyShortenStr
                        variant="body2"
                        maxLength={14}
                        data-testid="QuestionnaireResultTable_questionnaireQuestionAnswer"
                    >
                        {answerWithAlphabet}
                    </TypographyShortenStr>
                );

            return (
                <TypographyBase
                    variant="body2"
                    data-testid="QuestionnaireResultTable_questionnaireQuestionAnswer"
                >
                    {answerWithAlphabet}
                </TypographyBase>
            );
        },
        cellProps: {
            style: {
                minWidth: "150px",
                maxWidth: type === QuestionType.QUESTION_TYPE_FREE_TEXT ? "13%" : "150px",
            },
        },
    }));

export const getColumnsTableView = (
    questionsList: GetAnswersByFilterResponse.AsObject["questionsList"],
    tNotification: UseResourceTranslateReturn
) => {
    const fixedColumns: TableColumn<QuestionnaireResultTableData>[] = [
        {
            key: "timeStamp",
            title: tNotification("label.timeStamp"),
            render: (record) => (
                <TypographyNotificationDate date={convertTimestampToDate(record.submittedAt)} />
            ),
            cellProps: {
                style: {
                    minWidth: "160px",
                },
            },
        },
        {
            key: "responderName",
            title: tNotification("label.responderName"),
            render: (record) => {
                if (!record.isParent)
                    return (
                        <Box data-testid="QuestionnaireResultTable__responderName">
                            {record.responderName}
                        </Box>
                    );

                return (
                    <ColumnsStudentParentName
                        chipBaseProps={{
                            "data-testid": "QuestionnaireResultTable__parent",
                            label: tNotification("label.parent", { smart_count: 1 }),
                            size: "small",
                        }}
                    >
                        <Grid item data-testid="QuestionnaireResultTable__responderName">
                            {`${record.responderName} (${record.studentName})`}
                        </Grid>
                    </ColumnsStudentParentName>
                );
            },
            cellProps: {
                style: {
                    minWidth: "300px",
                    maxWidth: "26%",
                },
            },
        },
    ];
    const questionColumns: TableColumn<QuestionnaireResultTableData>[] =
        mapQuestionsListToTableColumns(questionsList, tNotification);

    return [...fixedColumns, ...questionColumns];
};

export const checkTableTitleIsReactNode = (
    dataColumnsTableView: TableColumn<QuestionnaireResultTableData>[]
) => {
    for (const column of dataColumnsTableView) {
        if (typeof column.title !== "string") {
            window.warner?.warn(
                "Download questionnaire result in-correct headers because typeof title table is ReactNode"
            );
            break;
        }
    }
};

export const convertTableTitleToString = (
    title: TableColumn<QuestionnaireResultTableData>["title"]
) => (typeof title === "string" ? title : `${title}`);

const createCsvContent = (answers: GetAnswersByFilterResponse.AsObject) => {
    return mapUserAnswersListToTableData(answers.userAnswersList, answers.questionsList).map(
        ({ answers, submittedAt, responderName }, index) => {
            // headers of csv: Order, submitted at, responder name, and list name answers/questions
            return [
                `${index + 1}`,
                formatDate(convertTimestampToDate(submittedAt), "yyyy/LL/dd, HH:mm"),
                responderName,
                ...answers,
            ];
        }
    );
};

export const createCsvFileQuestionnaireResult = (
    answers: GetAnswersByFilterResponse.AsObject,
    tNotification: UseResourceTranslateReturn
) => {
    const dataColumnsTableView = getColumnsTableView(answers.questionsList, tNotification);

    checkTableTitleIsReactNode(dataColumnsTableView);

    const columnsTableCsv = dataColumnsTableView.map((item) => covertReactNodeToString(item.title));

    const csvHeaders = ["", ...columnsTableCsv]; // "" is header of order of rows.

    const csvContent = createCsvContent(answers);

    return createCsvFile(csvContent, csvHeaders);
};
