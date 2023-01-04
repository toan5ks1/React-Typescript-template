import { QuizzesManyByLearningObjectIdQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import QuizTable, { QuizTableProps } from "../QuizTable";

import { fireEvent, render } from "@testing-library/react";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import { UseQuizReviewValue } from "src/squads/syllabus/pages/Quiz/hooks/useQuizReview";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/services/infer-mutation");
jest.mock("src/squads/syllabus/hooks/useSwapQuizOrder/useSwapQuizOrder", () => ({
    __esModule: true,
    default: () => ({}),
}));
jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());

jest.mock("src/squads/syllabus/internals/logger");

jest.mock("src/internals/configuration");

jest.mock("src/squads/syllabus/pages/Quiz/hooks/useQuizReview", () => {
    const values: UseQuizReviewValue = {
        quizOnReview: null,
        onCloseReview: jest.fn(),
        onSetQuizReview: jest.fn(),
    };
    return { __esModule: true, default: () => values };
});

jest.mock("src/squads/syllabus/internals/permission", () => ({
    can: () => false,
}));

const mockQuizMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        quiz: mockQuizMutation,
    });
};

const quizzes: QuizzesManyByLearningObjectIdQuery["find_quiz_by_lo_id"] = [
    {
        quiz_id: "Quiz1",
        external_id: "Quiz1",
        approved_by: "Admin",
        country: "Vietnam",
        explanation: "explanation",
        kind: "QUIZ_TYPE_MIQ",
        options: "options",
        question: "question",
        school_id: 123,
    },
];

const renderUtil = (override: Partial<QuizTableProps> = {}) => {
    const mockRefetch = jest.fn();
    const props: QuizTableProps = {
        quizzes: [],
        loading: false,
        loId: "loId",
        refetchQuizzes: mockRefetch,
        ...override,
    };

    return render(<QuizTable {...props} />, { wrapper: TestAppWithQueryClient });
};

describe("<QuizTable />", () => {
    const mutateQuizFn = jest.fn();
    const snackbarFn = jest.fn();
    beforeEach(() => {
        mockQuizMutation.mockReturnValueOnce({ isLoading: false, mutate: mutateQuizFn });

        (useShowSnackbar as jest.Mock).mockReturnValue(snackbarFn);
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);

        expect(quizzes.length).toBeGreaterThanOrEqual(1);
    });

    it("should match snapshot", () => {
        const { container } = renderUtil();
        expect(container).toMatchSnapshot();
    });

    it("should render no data message when the data is empty", () => {
        const { getByTestId } = renderUtil({ quizzes: [] });
        expect(getByTestId("TableBase__noDataMessage")).toBeInTheDocument();
    });

    it("should call delete a quiz with correct data", () => {
        const lOId = "LO_ID_02";
        const firstQuizItem = quizzes[0];

        const { getByTestId, getByText } = renderUtil({ quizzes, loId: lOId });

        fireEvent.click(getByTestId("ActionPanel__trigger"));
        fireEvent.click(getByText("ra.common.action.delete"));
        fireEvent.click(getByTestId("FooterDialogConfirm__buttonSave"));

        expect(mutateQuizFn).toBeCalledWith({ loId: lOId, quizId: firstQuizItem.external_id });
    });

    it("should call refetch quiz when delete a quiz success call onError when error", () => {
        const refetchQuizzesFn = jest.fn();
        renderUtil({ refetchQuizzes: refetchQuizzesFn });

        const [options] = getLatestCallParams(mockQuizMutation);

        expect(refetchQuizzesFn).not.toBeCalled();

        options.onSuccess();
        expect(refetchQuizzesFn).toBeCalled();
        expect(snackbarFn).toBeCalledWith("You have deleted question successfully");

        options.onError(new Error("Custom_Err_ABC"));
        expect(snackbarFn).toBeCalledWith("Delete failed: Custom_Err_ABC", "error");

        expect(refetchQuizzesFn).toHaveBeenCalledTimes(1);
    });

    it("should hide or show Mapped ID column depending on permission", () => {
        const { queryByTestId } = renderUtil({ quizzes });

        expect(queryByTestId("QuizTable__id")).toBeNull();
    });
});
