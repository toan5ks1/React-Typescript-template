import { calculateQuestionnaireResultPercentage } from "src/squads/communication/common/utils/questionnaire-utils";
import { TestApp } from "src/squads/communication/test-utils";

import QuestionSummary, { QuestionSummaryProps } from "../QuestionSummary";

import { render, screen } from "@testing-library/react";
import useFeatureToggle from "src/squads/communication/hooks/useFeatureToggle";

jest.mock("src/squads/communication/hooks/useFeatureToggle", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const defaultQuestionSummaryProps: QuestionSummaryProps = {
    questionIndex: 0,
    numberOfRecipient: 10,
    numberOfResponder: 6,
    questionTitle: "Question Title",
};

const mockUseFeatureToggle = (isEnabled: boolean = true) => {
    (useFeatureToggle as jest.Mock).mockReturnValue({
        isEnabled,
    });
};

const renderQuestionSummary = (
    questionSummaryProps: QuestionSummaryProps = defaultQuestionSummaryProps
) => {
    return render(
        <TestApp>
            <QuestionSummary {...questionSummaryProps} />
        </TestApp>
    );
};

describe("<QuestionSummary />", () => {
    it("should render title, number of respondent and percentage correctly", () => {
        mockUseFeatureToggle();
        renderQuestionSummary();

        const { questionIndex, questionTitle, numberOfResponder, numberOfRecipient } =
            defaultQuestionSummaryProps;

        const percentage = calculateQuestionnaireResultPercentage(
            numberOfResponder,
            numberOfRecipient
        );

        expect(screen.getByTestId("QuestionSummary__title")).toHaveTextContent(
            `Question ${questionIndex + 1}: ${questionTitle}`
        );
        expect(screen.getByTestId("QuestionSummary__respondents")).toHaveTextContent(
            `Number of respondents ${numberOfResponder}/${numberOfRecipient} (${percentage})`
        );
    });

    it("should render title, number of respondent without percentage when number of recipient is 0", () => {
        const numberOfResponder = 0;
        const numberOfRecipient = 0;

        mockUseFeatureToggle();
        renderQuestionSummary({
            ...defaultQuestionSummaryProps,
            numberOfResponder,
            numberOfRecipient,
        });
        const { questionIndex, questionTitle } = defaultQuestionSummaryProps;

        expect(screen.getByTestId("QuestionSummary__title")).toHaveTextContent(
            `Question ${questionIndex + 1}: ${questionTitle}`
        );
        expect(screen.getByTestId("QuestionSummary__respondents")).toHaveTextContent(
            `Number of respondents ${numberOfResponder}/${numberOfRecipient}`
        );
    });

    it("should render title, number of respondent with percentage is 0.00% when number of responder is 0", () => {
        const numberOfResponder = 0;
        const numberOfRecipient = 10;

        mockUseFeatureToggle();
        renderQuestionSummary({
            ...defaultQuestionSummaryProps,
            numberOfResponder,
            numberOfRecipient,
        });
        const { questionIndex, questionTitle } = defaultQuestionSummaryProps;

        expect(screen.getByTestId("QuestionSummary__title")).toHaveTextContent(
            `Question ${questionIndex + 1}: ${questionTitle}`
        );
        expect(screen.getByTestId("QuestionSummary__respondents")).toHaveTextContent(
            `Number of respondents ${numberOfResponder}/${numberOfRecipient} (0.00%)`
        );
    });

    it("should not render number of respondents when NOTIFICATION_CONSOLIDATED_STATISTIC turn off", () => {
        mockUseFeatureToggle(false);
        renderQuestionSummary();

        expect(screen.queryByTestId("QuestionSummary__respondents")).not.toBeInTheDocument();
    });
});
