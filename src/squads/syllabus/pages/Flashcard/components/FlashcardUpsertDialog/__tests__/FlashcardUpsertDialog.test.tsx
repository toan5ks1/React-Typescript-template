import { QuizType } from "src/squads/syllabus/models/quiz";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";

import FlashcardUpsertDialog, { FlashcardUpsertDialogProps } from "../FlashcardUpsertDialog";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => jest.fn());

jest.mock("src/squads/syllabus/services/infer-mutation");
jest.mock("src/squads/syllabus/internals/logger");
const mockQuizMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        quiz: mockQuizMutation,
        media: jest.fn().mockReturnValue({}),
    });
};

describe(FlashcardUpsertDialog.name, () => {
    let createEmptyFlashcard: jest.Mock;
    let defaultProps: FlashcardUpsertDialogProps;
    const showSnackbarFn = jest.fn();
    const quizMutateFn = jest.fn();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockReturnValue(showSnackbarFn);

        mockQuizMutation.mockReturnValue({
            isLoading: false,
            mutate: quizMutateFn,
        });

        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
        createEmptyFlashcard = jest.fn(() => {
            return {
                definition: "",
                externalId: "",
                kind: QuizType.QUIZ_TYPE_TAD,
                term: "",
                schoolId: 1,
                loId: "",
            };
        });
        defaultProps = {
            open: true,
            onClose: () => {},
            loId: "loId_01",
            createEmptyFlashcard,
            onSuccess: jest.fn(),
            defaultValues: {
                flashcards: [
                    {
                        definition: "def",
                        externalId: "1",
                        kind: QuizType.QUIZ_TYPE_TAD,
                        term: "Term",
                        schoolId: 1,
                        loId: "lo_id",
                    },
                    {
                        definition: "def",
                        externalId: "2",
                        kind: QuizType.QUIZ_TYPE_TAD,
                        term: "Term",
                        schoolId: 1,
                        loId: "lo_id",
                    },
                ],
            },
        };
    });

    it("should call the createEmptyFlashcard when user click add more", () => {
        render(<FlashcardUpsertDialog {...defaultProps} />, { wrapper: TestAppWithQueryClient });
        fireEvent.click(screen.getByText(/Add More/i));

        expect(createEmptyFlashcard).toBeCalledTimes(1);
    });

    it("should render the list flashcard form", () => {
        render(<FlashcardUpsertDialog {...defaultProps} />, { wrapper: TestAppWithQueryClient });
        expect(screen.getAllByTestId("FlashCardFormWithBulkActions__root")).toHaveLength(
            defaultProps.defaultValues.flashcards.length
        );
    });

    it("should show loading and disable save action when upsert data is processing", () => {
        mockQuizMutation.mockImplementation(() => ({
            isLoading: true,
        }));

        render(<FlashcardUpsertDialog {...defaultProps} />, { wrapper: TestAppWithQueryClient });

        const buttonSave = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(screen.getByTestId("FlashcardUpsertDialog__saving")).toBeInTheDocument();
        expect(buttonSave).toBeDisabled();
    });

    it("should disable save action when flashcard list is empty", () => {
        render(<FlashcardUpsertDialog {...defaultProps} defaultValues={{ flashcards: [] }} />, {
            wrapper: TestAppWithQueryClient,
        });
        const buttonSave = screen.getByTestId("FooterDialogConfirm__buttonSave");

        expect(buttonSave).toBeDisabled();
    });

    it("should show correct msg after upsert card onSuccess and onError", async () => {
        render(<FlashcardUpsertDialog {...defaultProps} />, { wrapper: TestAppWithQueryClient });
        fireEvent.click(screen.getByTestId("FooterDialogConfirm__buttonSave"));

        await waitFor(() => expect(quizMutateFn).toBeCalled());

        const [payload, options] = getLatestCallParams(quizMutateFn);

        expect(payload.kind).toEqual(QuizType.QUIZ_TYPE_POW);

        options.onSuccess();
        expect(showSnackbarFn).toBeCalledWith("You have added the card successfully!");

        options.onError();

        expect(getLatestCallParams(showSnackbarFn)).toEqual(["Added failed", "error"]);
    });
});
