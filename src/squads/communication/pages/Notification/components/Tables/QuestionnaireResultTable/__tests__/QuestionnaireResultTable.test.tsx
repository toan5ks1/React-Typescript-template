import { toShortenStr } from "src/common/utils/other";
import { convertTimestampToDate, formatDate } from "src/common/utils/time";
import {
    mapQuestionsListToTableColumns,
    reduceAnswersListToAnswersStringArr,
} from "src/squads/communication/common/utils/questionnaire-table-utils";
import { TestApp } from "src/squads/communication/test-utils";
import { createMockNotificationPagination } from "src/squads/communication/test-utils/notification";
import {
    createMockQuestionnaireUserAnswer,
    createQuestionsList,
} from "src/squads/communication/test-utils/questionnaire";

import TranslationProvider from "src/providers/TranslationProvider";
import QuestionnaireResultTable, {
    QuestionnaireResultTableProps,
} from "src/squads/communication/pages/Notification/components/Tables/QuestionnaireResultTable/QuestionnaireResultTable";

import { QuestionType } from "manabuf/common/v1/notifications_pb";

import { render, screen, within } from "@testing-library/react";

const mockPagination = createMockNotificationPagination();
const mockUserAnswers = createMockQuestionnaireUserAnswer();
const mockQuestionList = createQuestionsList();
const mockQuestionnaireQuestionColumns = mapQuestionsListToTableColumns(
    mockUserAnswers.questionsList,
    jest.fn()
);

const defaultQuestionnaireResultTableProps: QuestionnaireResultTableProps = {
    isLoadingAnswer: false,
    pagination: mockPagination,
    answersFilter: mockUserAnswers,
    keyword: "",
};

const renderQuestionnaireResultTable = (
    questionnaireResultTableProps: QuestionnaireResultTableProps = defaultQuestionnaireResultTableProps
) =>
    render(
        <TranslationProvider>
            <TestApp>
                <QuestionnaireResultTable {...questionnaireResultTableProps} />
            </TestApp>
        </TranslationProvider>
    );

describe("<QuestionnaireResultTable/>", () => {
    it("should render correct UI with correct columns data", () => {
        renderQuestionnaireResultTable();

        expect(screen.getByTestId("QuestionnaireResultTable__table")).toBeInTheDocument();

        const headers = screen.getAllByTestId("TableBase__cellHeader");
        // Add 2 on length for the 2 fixed headers
        expect(headers).toHaveLength(mockQuestionnaireQuestionColumns.length + 2);

        const tableHeader = screen.getAllByRole("row")[0];

        const withinTableHeader = within(tableHeader);

        mockUserAnswers.questionsList.forEach((question) =>
            expect(withinTableHeader.getByText(question.title)).toBeInTheDocument()
        );
    });

    it("should render correct UI with correct row data", () => {
        const wrapper = renderQuestionnaireResultTable();

        const allUserAnswersRow = wrapper.getAllByTestId("TableBase__row");

        expect(allUserAnswersRow).toHaveLength(mockUserAnswers.userAnswersList.length);

        mockUserAnswers.userAnswersList.forEach((answer, index) => {
            const withinCurrentUserAnswerRow = within(allUserAnswersRow[index]);
            const convertedTimeStampString = convertTimestampToDate(answer.submittedAt);
            const timeStamp = formatDate(convertedTimeStampString, "yyyy/LL/dd, HH:mm");

            expect(
                withinCurrentUserAnswerRow.getByTestId("TypographyNotificationDate__root")
            ).toHaveTextContent(timeStamp);

            const expectedResponder = answer.isParent
                ? `${answer.responderName} (${answer.targetName})`
                : answer.responderName;

            expect(
                withinCurrentUserAnswerRow.getByTestId("QuestionnaireResultTable__responderName")
            ).toHaveTextContent(expectedResponder);

            const answerListValue = reduceAnswersListToAnswersStringArr(
                mockUserAnswers.userAnswersList[index].answersList,
                mockQuestionList
            );

            const listCellOfQuestionAnswer = withinCurrentUserAnswerRow.getAllByTestId(
                "QuestionnaireResultTable_questionnaireQuestionAnswer"
            );

            expect(listCellOfQuestionAnswer).toHaveLength(mockQuestionList.length);

            const currentCellContentOfQuestionAnswer = listCellOfQuestionAnswer[index].textContent;

            if (
                mockUserAnswers.questionsList[index].type === QuestionType.QUESTION_TYPE_FREE_TEXT
            ) {
                expect(currentCellContentOfQuestionAnswer).toEqual(
                    toShortenStr(answerListValue[index], 14)
                );
            } else {
                expect(currentCellContentOfQuestionAnswer).toEqual(answerListValue[index]);
            }
        });
    });

    it("should render loading indicator when isLoadingAnswer is true", () => {
        renderQuestionnaireResultTable({
            ...defaultQuestionnaireResultTableProps,
            isLoadingAnswer: true,
        });

        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("should render 'No Information' UI when userAnswersList is empty", () => {
        renderQuestionnaireResultTable({
            ...defaultQuestionnaireResultTableProps,
            answersFilter: {
                ...mockUserAnswers,
                userAnswersList: [],
                totalItems: 0,
            },
            isLoadingAnswer: false,
        });

        expect(screen.getByText("No Information")).toBeInTheDocument();
    });

    it("should render 'No Result' UI when filter return empty data", () => {
        renderQuestionnaireResultTable({
            ...defaultQuestionnaireResultTableProps,
            answersFilter: {
                ...mockUserAnswers,
                userAnswersList: [],
                totalItems: 0,
            },
            isLoadingAnswer: false,
            keyword: "test keyword",
        });

        expect(screen.getByText("No Result")).toBeInTheDocument();
        expect(
            screen.getByText("Please use try again with different keywords or filters")
        ).toBeInTheDocument();
    });
});
