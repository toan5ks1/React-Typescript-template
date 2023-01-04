import { formatDate } from "src/common/utils/time";
import { isShortAnswerTypeQuestion } from "src/squads/communication/common/utils/questionnaire-utils";
import { addAlphabetToArrayString } from "src/squads/communication/common/utils/utils";
import { TestApp } from "src/squads/communication/test-utils";
import {
    createMockGroupedQuestionnaireUserAnswers,
    createMockQuestionnaire,
    createMockQuestionnaireQuestionsList,
} from "src/squads/communication/test-utils/query-data";

import QuestionnaireDetailSection, {
    QuestionnaireDetailSectionProps,
} from "src/squads/communication/pages/Notification/components/QuestionnaireDetailSection";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useCheckExpandingQuestionnaireDetail from "src/squads/communication/pages/Notification/hooks/useCheckExpandingQuestionnaireDetail";

jest.mock(
    "src/squads/communication/pages/Notification/hooks/useCheckExpandingQuestionnaireDetail",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

const mockToggleViewMoreLess = jest.fn();
const mockExpandEachQuestion = jest.fn();

const mockQuestionnaire = createMockQuestionnaire();
const mockQuestionnaireQuestions = createMockQuestionnaireQuestionsList();
const mockQuestionnaireUserAnswers = createMockGroupedQuestionnaireUserAnswers();

const mockToggleViewButtonModules = () => {
    (useCheckExpandingQuestionnaireDetail as jest.Mock).mockReturnValue({
        isExpandingAll: false,
        listStatusQuestions: [
            {
                expanding: false,
                isShortAnswer: false,
            },
            {
                expanding: false,
                isShortAnswer: false,
            },
            {
                expanding: false,
                isShortAnswer: true,
            },
        ],
        expandEachQuestion: mockExpandEachQuestion,
        toggleViewMoreLess: mockToggleViewMoreLess,
    });
};

const defaultQuestionnaireDetailSectionProps: QuestionnaireDetailSectionProps = {
    questionnaire: mockQuestionnaire,
    questionnaireQuestions: mockQuestionnaireQuestions,
    questionnaireUserAnswers: mockQuestionnaireUserAnswers,
    numberOfRecipient: 10,
};

const renderQuestionnaireDetailSection = (
    props: QuestionnaireDetailSectionProps = defaultQuestionnaireDetailSectionProps
) => {
    return render(
        <TestApp>
            <QuestionnaireDetailSection {...props} />
        </TestApp>
    );
};

describe("<QuestionnaireDetailSection />", () => {
    it("should render correct UI", () => {
        mockToggleViewButtonModules();
        renderQuestionnaireDetailSection();

        expect(screen.getByText("Expiration Date")).toBeInTheDocument();
        expect(screen.getByText("List Question")).toBeInTheDocument();
        expect(screen.getByText("View More")).toBeInTheDocument();
    });

    it("should render correct detail of questionnaire and call expandEachQuestion when click each question", () => {
        mockToggleViewButtonModules();
        renderQuestionnaireDetailSection();

        expect(
            screen.getByText(formatDate(String(mockQuestionnaire.expiration_date), "yyyy/LL/dd"))
        ).toBeInTheDocument();
        mockQuestionnaireQuestions.forEach((question, index) => {
            const questionTitle = `Question ${index + 1}: ${question.title}`;

            expect(screen.getByText(questionTitle)).toBeInTheDocument();

            if (!isShortAnswerTypeQuestion(question.type)) {
                userEvent.click(screen.getByText(questionTitle));
                expect(mockExpandEachQuestion).toBeCalledWith(index);
            }
        });
    });

    it("should render correct detail of all questions questionnaire when click view more", () => {
        mockToggleViewButtonModules();
        renderQuestionnaireDetailSection();

        expect(screen.getByText("View More")).toBeInTheDocument();
        expect(screen.queryByText("View Less")).not.toBeInTheDocument();

        userEvent.click(screen.getByText("View More"));
        expect(mockToggleViewMoreLess).toBeCalledTimes(1);
    });

    it("should not render percentage when questionnaireUserAnswers is undefined", () => {
        (useCheckExpandingQuestionnaireDetail as jest.Mock).mockReturnValue({
            isExpandingAll: true,
            listStatusQuestions: [
                {
                    expanding: true,
                    isShortAnswer: false,
                },
            ],
            expandEachQuestion: mockExpandEachQuestion,
            toggleViewMoreLess: mockToggleViewMoreLess,
        });

        const questionnaireQuestion = createMockQuestionnaireQuestionsList()[0];
        renderQuestionnaireDetailSection({
            ...defaultQuestionnaireDetailSectionProps,
            questionnaireUserAnswers: undefined,
            questionnaireQuestions: [questionnaireQuestion],
        });

        screen.getAllByTestId("QuestionnaireDetailAnswers__answer").forEach((answerItem, index) => {
            expect(answerItem).toHaveTextContent(
                addAlphabetToArrayString(questionnaireQuestion.choices)[index]
            );
        });
    });
});
