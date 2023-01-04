import { TestApp } from "src/squads/communication/test-utils";
import { createMockNotificationPagination } from "src/squads/communication/test-utils/notification";
import { createMockQuestionnaireUserAnswer } from "src/squads/communication/test-utils/questionnaire";

import NotificationQuestionnaireResult, {
    NotificationQuestionnaireResultProps,
} from "src/squads/communication/pages/Notification/components/NotificationQuestionnaireResult/NotificationQuestionnaireResult";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockOnSearch = jest.fn();

const mockPagination = createMockNotificationPagination();
const mockUserAnswers = createMockQuestionnaireUserAnswer();

const defaultNotificationQuestionnaireResultProps: NotificationQuestionnaireResultProps = {
    isLoadingAnswer: false,
    onSearch: mockOnSearch,
    pagination: mockPagination,
    answersFilter: mockUserAnswers,
    keyword: "",
};

const renderNotificationQuestionnaireResult = (
    props: NotificationQuestionnaireResultProps = defaultNotificationQuestionnaireResultProps
) =>
    render(
        <TestApp>
            <NotificationQuestionnaireResult {...props} />
        </TestApp>
    );

describe("<NotificationQuestionnaireResult />", () => {
    it("should render correct UI", () => {
        const { container } = renderNotificationQuestionnaireResult();

        expect(container).toMatchSnapshot();
        expect(screen.getByTestId("FormFilterAdvanced__textField")).toBeInTheDocument();
        expect(screen.getByTestId("QuestionnaireResultTable__table")).toBeInTheDocument();
    });

    it("should call onSearch on enter a value to FormFilterAdvanced", () => {
        renderNotificationQuestionnaireResult();

        const testKeyWord = "test keyword";

        const searchBar = screen.getByRole("textbox");

        userEvent.type(searchBar, testKeyWord);
        userEvent.keyboard("{Enter}");

        expect(mockOnSearch).toBeCalledWith(testKeyWord);
    });
});
