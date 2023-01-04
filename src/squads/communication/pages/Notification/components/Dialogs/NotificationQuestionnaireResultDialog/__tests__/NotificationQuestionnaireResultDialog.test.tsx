import { TestApp } from "src/squads/communication/test-utils";
import { createMockNotificationPagination } from "src/squads/communication/test-utils/notification";
import { createMockQuestionnaireUserAnswer } from "src/squads/communication/test-utils/questionnaire";

import NotificationQuestionnaireResultDialog, {
    NotificationQuestionnaireResultDialogProps,
} from "src/squads/communication/pages/Notification/components/Dialogs/NotificationQuestionnaireResultDialog/NotificationQuestionnaireResultDialog";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import useQuestionnaireUserAnswersList, {
    UseQuestionnaireUserAnswersListReturn,
} from "src/squads/communication/pages/Notification/hooks/useQuestionnaireUserAnswersList/useQuestionnaireUserAnswersList";

jest.mock(
    "src/squads/communication/pages/Notification/hooks/useQuestionnaireUserAnswersList/useQuestionnaireUserAnswersList",
    () => ({
        __esModule: true,
        default: jest.fn(),
    })
);

const mockOnCloseDialog = jest.fn();
const mockOnSearch = jest.fn();
const mockRefreshPage = jest.fn();

const mockPagination = createMockNotificationPagination();
const mockUserAnswers = createMockQuestionnaireUserAnswer();

const defaultUseQuestionnaireUserAnswersList: UseQuestionnaireUserAnswersListReturn = {
    isLoadingAnswer: false,
    keyword: "",
    onSearch: mockOnSearch,
    pagination: mockPagination,
    refreshPage: mockRefreshPage,
    answers: mockUserAnswers,
};

const defaultNotificationQuestionnaireResultDialogProps: NotificationQuestionnaireResultDialogProps =
    {
        onClose: mockOnCloseDialog,
        questionnaireId: "",
    };

const mockNotificationQuestionnaireModules = (
    props: UseQuestionnaireUserAnswersListReturn = defaultUseQuestionnaireUserAnswersList
) => {
    (useQuestionnaireUserAnswersList as jest.Mock).mockReturnValue(props);
};

const renderNotificationQuestionnaireResultDialog = (
    props: NotificationQuestionnaireResultDialogProps = defaultNotificationQuestionnaireResultDialogProps
) =>
    render(
        <TestApp>
            <NotificationQuestionnaireResultDialog {...props} />
        </TestApp>
    );

describe("<NotificationQuestionnaireResultDialog />", () => {
    it("should render correct UI", () => {
        mockNotificationQuestionnaireModules();
        renderNotificationQuestionnaireResultDialog();

        expect(
            screen.getByTestId("NotificationQuestionnaireResultDialog__dialog")
        ).toBeInTheDocument();
        expect(screen.getByTestId("FormFilterAdvanced__textField")).toBeInTheDocument();
        expect(screen.getByTestId("QuestionnaireResultTable__table")).toBeInTheDocument();

        expect(screen.getByRole("table")).toBeInTheDocument();
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

    it("should have loading indicator when isLoadingAnswer is true and answers is undefined", () => {
        mockNotificationQuestionnaireModules({
            ...defaultUseQuestionnaireUserAnswersList,
            isLoadingAnswer: true,
            answers: undefined,
        });
        renderNotificationQuestionnaireResultDialog();

        expect(
            screen.getByTestId("NotificationQuestionnaireResultDialog__loading")
        ).toBeInTheDocument();

        expect(screen.queryByRole("table")).not.toBeInTheDocument();
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });

    it("should call onClose when closing the dialog", () => {
        mockNotificationQuestionnaireModules();
        renderNotificationQuestionnaireResultDialog();

        userEvent.click(screen.getByTestId("DialogFullScreen__buttonClose"));

        expect(mockOnCloseDialog).toBeCalledTimes(1);
    });
});
