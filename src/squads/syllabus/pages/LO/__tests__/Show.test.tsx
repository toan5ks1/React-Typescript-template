import { MathJaxLoadStatus } from "src/common/constants/enum";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { AppError } from "src/squads/syllabus/internals/errors";
import { createEmptyQuiz, Quiz } from "src/squads/syllabus/models/quiz";
import { QuizzesManyByLearningObjectIdQuery } from "src/squads/syllabus/services/eureka/eureka-types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import {
    createMockMutationByEntityFn,
    InitMutationParams,
} from "src/squads/syllabus/test-utils/infer-mutation";
import { getCallParamsAt } from "src/squads/syllabus/test-utils/mock-utils";
import { mockCreateQuiz } from "src/squads/syllabus/test-utils/quiz";

import useInstallMathJax from "src/squads/syllabus/pages/Quiz/components/WYSWYG/useInstallMathJax";

import { QuizType } from "manabie-yasuo/quiz_pb";

import { LOShow, LOShowProps } from "../LODetail";

import { fireEvent, render, screen } from "@testing-library/react";
import useDialog from "src/squads/syllabus/hooks/useDialog";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useQuizReview from "src/squads/syllabus/pages/Quiz/hooks/useQuizReview";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

const mockQuizzes: QuizzesManyByLearningObjectIdQuery["find_quiz_by_lo_id"] = [
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
    {
        quiz_id: "Quiz2",
        external_id: "Quiz2",
        approved_by: "Admin",
        country: "Vietnam",
        explanation: "explanation",
        kind: "QUIZ_TYPE_MIQ",
        options: "options",
        question: "question",
        school_id: 123,
    },
];
const mockParseQuery = {
    parentId: "parentId",
    bookId: "bookId",
    chapterId: "chapterId",
};

jest.mock("src/squads/syllabus/common/utils/url", () => {
    const actual = jest.requireActual("src/squads/syllabus/common/utils/url");
    return {
        __esModule: true,
        ...actual,
        parseQuery: () => mockParseQuery,
    };
});

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: () => () => ({
            data: mockQuizzes,
            refetch: jest.fn(),
            isLoading: false,
        }),
    };
});

jest.mock("src/squads/syllabus/pages/Quiz/hooks/useQuizReview", () => {
    return { __esModule: true, default: jest.fn() };
});

jest.mock("src/squads/syllabus/hooks/useNavigation");

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useDialog", () => jest.fn());

const createDefaultProps = (LOData: Partial<LOShowProps["record"]>) => {
    return {
        record: {
            lo_id: "loId",
            name: "LO name",
            quiz_sets: [
                {
                    quiz_external_ids: ["quizExternalId"],
                },
            ],
            school_id: 123,
            grade: 1,
            subject: "ENGLISH",
            created_at: "2021-05-2T14:50:17.74564+00:00",
            updated_at: "2021-05-2T14:50:17.74564+00:00",
            ...LOData,
        },
        refetchLO: jest.fn(),
    };
};

jest.mock("src/squads/syllabus/pages/Quiz/components/WYSWYG/useInstallMathJax", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/services/infer-mutation");

const mockPushNavigation = jest.fn();
const mockUseNavigation = () => {
    (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));
};

const mockUseQuizReview = (quizOnReview: Quiz | null = null) => {
    (useQuizReview as jest.Mock).mockReturnValue({
        quizOnReview,
        onSetQuizReview: () => {},
        onCloseReview: () => {},
    });
};

const mockQuizMutation = jest.fn();

const mockInferMutation = (params: InitMutationParams) => {
    return createMockMutationByEntityFn(params, {
        learningObjective: jest.fn().mockReturnValue({}),
        quiz: mockQuizMutation,
        media: jest.fn().mockReturnValue({}),
    });
};

describe("<LOShow />", () => {
    const mockEmptyQuiz = createEmptyQuiz({
        schoolId: 123,
        loId: "id",
        isLo: true,
    });

    beforeEach(() => {
        mockUseQuizReview(mockEmptyQuiz);
        mockQuizMutation.mockReturnValue({
            mutate: jest.fn(),
        });
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);
        (useDialog as jest.Mock).mockImplementation(() => ({ open: true }));

        (useInstallMathJax as jest.Mock).mockImplementation(() => ({
            loadStatus: MathJaxLoadStatus.LOADED,
        }));

        render(
            <TestAppWithQueryClient>
                <LOShow {...createDefaultProps({})} />
            </TestAppWithQueryClient>
        );
    });
    it("should render without crash", async () => {
        expect(await screen.findByLabelText("Quiz preview")).toBeInTheDocument();
    });

    it("should render quiz data", async () => {
        const previewButtons = await screen.findAllByTestId("QuizTable__previewButton");
        expect(previewButtons).toHaveLength(2);
        expect(await screen.findAllByTestId("QuizTable__description")).toHaveLength(3); // include title row
    });
});

describe("LO Show test delete quiz", () => {
    const onCloseDialogFn = jest.fn();
    const mockEmptyQuiz = createEmptyQuiz({
        schoolId: 123,
        loId: "id",
        isLo: true,
    });
    const mutateFn = jest.fn();
    const snackbarFn = jest.fn();

    beforeEach(() => {
        mockUseQuizReview(mockEmptyQuiz);
        (useDialog as jest.Mock).mockImplementation(() => {
            return {
                open: true,
                onClose: onCloseDialogFn,
            };
        });

        (useShowSnackbar as jest.Mock).mockReturnValue(snackbarFn);

        mockQuizMutation
            .mockReturnValueOnce({
                mutate: mutateFn,
            })
            .mockReturnValue({});
        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);

        (useInstallMathJax as jest.Mock).mockImplementation(() => ({
            loadStatus: MathJaxLoadStatus.LOADED,
        }));

        render(
            <TestAppWithQueryClient>
                <LOShow {...createDefaultProps({})} />
            </TestAppWithQueryClient>
        );
    });

    it("should call close confirm delete dialog after delete quiz success", () => {
        const confirmDeleteQuiz = screen
            .getByTestId("LODetail__confirmDeleteQuizDialog")
            .querySelector('[data-testid="FooterDialogConfirm__buttonSave"]');

        if (!confirmDeleteQuiz) throw new Error("Cannot find the delete quiz button");

        expect(onCloseDialogFn).not.toBeCalled();

        fireEvent.click(confirmDeleteQuiz);

        expect(mutateFn).toBeCalled();

        const [options] = getCallParamsAt(mockQuizMutation, 0);

        options.onSuccess();

        expect(onCloseDialogFn).toBeCalledTimes(1);
    });

    it("should show correct msg after delete quiz success", () => {
        const [options] = getCallParamsAt(mockQuizMutation, 0);

        options.onSuccess();

        expect(snackbarFn).toBeCalledWith("You have deleted question successfully");
    });

    it("should show correct msg after delete failed with unknown error", () => {
        const [options] = getCallParamsAt(mockQuizMutation, 0);

        const errMsg = "errMsg GRPC";
        options.onError(new Error(errMsg));

        expect(snackbarFn).toBeCalledWith(
            "Delete failed: We meet an unknown error. Please try again or contact with Staff.",
            "error"
        );
    });

    it("should show correct msg after delete failed with an AppError", () => {
        const [options] = getCallParamsAt(mockQuizMutation, 0);

        const errMsg = "errMsg GRPC";
        options.onError(new AppError(errMsg));

        expect(snackbarFn).toBeCalledWith(`ra.manabie-error.${errMsg}`, "error");
    });
});

describe("LO Show test display sections by type is Exam LO", () => {
    const props = createDefaultProps({ type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO });

    beforeEach(() => {
        mockUseQuizReview();
        mockQuizMutation.mockReturnValue({
            mutate: jest.fn(),
        });

        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);

        (useDialog as jest.Mock).mockImplementation(() => ({
            open: true,
        }));
        (useInstallMathJax as jest.Mock).mockImplementation(() => ({
            loadStatus: MathJaxLoadStatus.LOADED,
        }));

        render(
            <TestAppWithQueryClient>
                <LOShow {...props} />
            </TestAppWithQueryClient>
        );
    });
    it("shouldn't show attachment section", () => {
        expect(screen.queryByTestId("AttachmentSection__root")).not.toBeInTheDocument();
    });

    it("should show quiz table section without wrapper padding and border", () => {
        expect(screen.queryByTestId("QuizSection_root")).not.toBeInTheDocument();
    });
});

describe("LO Show navigate to exact path", () => {
    const { bookId, chapterId, parentId } = mockParseQuery;
    const defaultProps = createDefaultProps({ type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING });
    const mockQuiz = mockCreateQuiz({
        schoolId: 123,
        loId: "loId",
        kind: QuizType.QUIZ_TYPE_MIQ,
    });
    const mockTab =
        defaultProps.record.type === KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING ? 1 : 0;

    it("should navigate to edit question page", () => {
        mockUseNavigation();
        mockUseQuizReview(mockQuiz);
        mockQuizMutation.mockReturnValue({
            mutate: jest.fn(),
        });

        (inferMutation as jest.Mock).mockImplementation(mockInferMutation);

        (useDialog as jest.Mock).mockImplementation(() => ({ open: false }));
        (useInstallMathJax as jest.Mock).mockImplementation(() => ({
            loadStatus: MathJaxLoadStatus.LOADED,
        }));

        render(
            <TestAppWithQueryClient>
                <LOShow {...defaultProps} />
            </TestAppWithQueryClient>
        );

        const mockExpectedPushHistory = `/syllabus/quizzes/${mockQuiz.quizId}/edit?bookId=${bookId}&chapterId=${chapterId}&parentId=${mockQuiz.loId}&tab=${mockTab}&topicId=${parentId}`;

        const btnEdit = screen.getByTestId("QuizReview__editButton");

        fireEvent.click(btnEdit);

        expect(mockPushNavigation).toBeCalledWith(mockExpectedPushHistory);
    });
});
