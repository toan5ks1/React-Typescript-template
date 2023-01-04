import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import FlashCardFormWithBulkAction, {
    FlashCardFormWithBulkActionProps,
} from "../FlashCardFormWithBulkAction";

import { fireEvent, render, screen } from "@testing-library/react";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import TestHookForm from "src/squads/syllabus/test-utils/TestHookForm";

jest.mock("src/squads/syllabus/services/infer-mutation");

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());

const mockQuizMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        quiz: mockQuizMutation,
        media: jest.fn().mockReturnValue({}),
    });
};

const defaultValues: FlashCardFormWithBulkActionProps["defaultValues"] = {
    externalId: "1",
    definition: "",
    kind: 0,
    schoolId: 1,
    quizId: "quiz_id",
    term: "",
    loId: "",
};

const renderUtil = (override: Partial<FlashCardFormWithBulkActionProps> = {}) => {
    const defaultProps: FlashCardFormWithBulkActionProps = {
        index: 1,
        defaultValues: defaultValues,
        loId: "loId_01",
        onDeleteSuccess: jest.fn(),
        ...override,
    };

    return render(
        <TestHookForm>
            <FlashCardFormWithBulkAction {...defaultProps} />
        </TestHookForm>,
        { wrapper: TestAppWithQueryClient }
    );
};

describe(FlashCardFormWithBulkAction.name, () => {
    const showSnackbar = jest.fn();
    const mutateFn = jest.fn();

    beforeEach(() => {
        mockQuizMutation.mockReturnValue({
            mutate: mutateFn,
        });

        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should render no-index and delete action", () => {
        renderUtil({ index: 0 });

        expect(screen.getByText("1")).toBeInTheDocument();
        expect(screen.getByTestId("PaperBulkActions__delete")).toBeInTheDocument();
    });

    it("should delete draft without call the delete endpoint", () => {
        const onDeleteSuccessFn = jest.fn();

        renderUtil({
            index: 0,
            onDeleteSuccess: onDeleteSuccessFn,
            defaultValues: { ...defaultValues, draft: true },
        });

        const deleteBtn = screen.getByTestId("PaperBulkActions__delete");
        fireEvent.click(deleteBtn);

        const confirmRemoveFileBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");
        fireEvent.click(confirmRemoveFileBtn);

        expect(mutateFn).not.toBeCalled();
        expect(onDeleteSuccessFn).toBeCalledWith(0);
    });

    it("should delete flashcard with call the delete endpoint when it is not a draft", () => {
        renderUtil({
            defaultValues: { ...defaultValues, draft: false },
        });

        const deleteBtn = screen.getByTestId("PaperBulkActions__delete");
        fireEvent.click(deleteBtn);

        const confirmRemoveFileBtn = screen.getByTestId("FooterDialogConfirm__buttonSave");
        fireEvent.click(confirmRemoveFileBtn);

        expect(getLatestCallParams(mutateFn)[0]).toEqual({
            loId: "loId_01",
            quizId: defaultValues.externalId,
        });
    });

    it("should disabled confirm delete button when it's in processing", () => {
        mockQuizMutation.mockReturnValue({
            isLoading: true,
        });
        renderUtil();

        const deleteBtn = screen.getByTestId("PaperBulkActions__delete");
        fireEvent.click(deleteBtn);

        expect(screen.getByTestId("FooterDialogConfirm__buttonSave")).toBeDisabled();
    });
});
