import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { createEmptyQuiz } from "src/squads/syllabus/models/quiz";
import { initialState } from "src/squads/syllabus/store/quiz";
import { QuizState } from "src/squads/syllabus/store/quiz/quiz-types";
import { currentLOSelector, quizValidSelector } from "src/squads/syllabus/store/quiz/selectors";
import { RootState } from "src/squads/syllabus/store/store-types";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";
import { createEmptyQuizState } from "src/squads/syllabus/test-utils/quiz";

import { QuizType } from "manabuf/common/v1/contents_pb";

import useNavigation from "../../../hooks/useNavigation";
import Create from "../Create";
import useCheckQuizExternalId from "../hooks/useCheckQuizExternalId";

import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import useStrictQuiz, {
    UseStrictQuizValues,
} from "src/squads/syllabus/hooks/useStrictEntity/useStrictQuiz";
import useQuizUpdate, {
    UseQuizUpdateValues,
} from "src/squads/syllabus/pages/Quiz/hooks/useQuizUpdate";
import useUpsertQuiz from "src/squads/syllabus/pages/Quiz/hooks/useUpsertQuiz/useUpsertQuiz";
import AppProvider from "src/squads/syllabus/test-utils/AppProvider";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("react-pdf");

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");
jest.mock("src/squads/syllabus/hooks/useResourceTranslate");
jest.mock("src/squads/syllabus/hooks/useTranslate");
jest.mock("../hooks/useCheckQuizExternalId", () => jest.fn());
jest.mock("src/squads/syllabus/pages/Quiz/hooks/useQuizUpdate", () => jest.fn());
jest.mock("src/squads/syllabus/hooks/useStrictEntity/useStrictQuiz", () => jest.fn());
jest.mock("src/squads/syllabus/pages/Quiz/hooks/useUpsertQuiz/useUpsertQuiz", () => jest.fn());

jest.mock("src/squads/syllabus/store/quiz/selectors", () => {
    const original = jest.requireActual("src/squads/syllabus/store/quiz/selectors");

    return {
        ...original,
        currentLOSelector: jest.fn(original.currentLOSelector),
        quizValidSelector: jest.fn(original.quizValidSelector),
    };
});

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/hooks/useNavigation");

const renderUtil = (customStores?: Partial<RootState>) => {
    const quiz = createEmptyQuiz({
        schoolId: 123,
        loId: "id",
        isLo: false,
    });
    return render(
        <AppProvider
            customStores={
                customStores
                    ? customStores
                    : {
                          quiz: {
                              ...createEmptyQuizState(),
                              quizzes: [quiz],
                              currentQuizIndex: 0,
                              quizOnReview: null,
                          },
                      }
            }
        >
            <Create />
        </AppProvider>,
        { wrapper: TestAppWithQueryClient }
    );
};

beforeEach(() => {
    (useUpsertQuiz as jest.Mock).mockReturnValue({
        upsertQuiz: jest.fn(),
    });
    const useQuizUpdateDefaultReturn: Partial<UseQuizUpdateValues> = {
        onCloseReview: jest.fn(),
        onAddNewQuiz: jest.fn(),
        onClearState: jest.fn(),
    };

    (useQuizUpdate as jest.Mock).mockReturnValue(useQuizUpdateDefaultReturn);

    const original = jest.requireActual("../hooks/useCheckQuizExternalId/useCheckQuizExternalId");

    (useCheckQuizExternalId as jest.Mock).mockReturnValue(original);

    const result: UseStrictQuizValues = {
        isFetching: false,
        id: "lo_id_parent",
        onNotify: jest.fn(),
        searchURL: "",
    };
    (useStrictQuiz as jest.Mock).mockReturnValue(result);
});

describe("Quiz <Create />", () => {
    describe(Create.name, () => {
        // It equal with create mode
        const result: UseStrictQuizValues = {
            isFetching: false,
            id: "lo_id_parent",
            onNotify: jest.fn(),
            searchURL: "",
        };
        (useStrictQuiz as jest.Mock).mockReturnValue(result);
    });
    // It equals with create mode
    it("shouldn't call onAddNewQuiz when current quiz is not found and learning objective is null-list", () => {
        const quizState: QuizState = {
            ...initialState,
            currentQuizIndex: 0,
            quizzes: [],
            lo: null,
        };

        renderUtil({ quiz: quizState });

        expect(useQuizUpdate().onAddNewQuiz).not.toBeCalled();
    });

    // It equals with create mode
    it("should call onAddNewQuiz when current quiz is not found and learning objective fetched", () => {
        const quizState: QuizState = {
            ...initialState,
            currentQuizIndex: 0,
            quizzes: [],
            lo: null,
        };

        (currentLOSelector as unknown as jest.Mock).mockReturnValue({
            lo_id: "lo_fake-id",
            school_id: "school_id of lo",
            type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
        });

        renderUtil({ quiz: quizState });

        expect(useQuizUpdate().onAddNewQuiz).toBeCalledWith({
            loId: "lo_fake-id",
            schoolId: "school_id of lo",
            isLo: true,
        });
    });

    it("shouldn't create quiz when externalId is null-list", () => {
        (currentLOSelector as unknown as jest.Mock).mockReturnValue({
            lo_id: "lo_fake-id",
            school_id: "school_id of lo",
            type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
        });
        (quizValidSelector as unknown as jest.Mock).mockReturnValue(true);

        const mutateFn = jest.fn();

        const quiz = createEmptyQuiz({
            schoolId: 123,
            loId: "id",
            isLo: true,
        });

        // @ts-ignore Intentional
        quiz.externalId = null;

        const quizState: QuizState = {
            ...initialState,
            currentQuizIndex: 0,
            quizzes: [quiz],
            lo: null,
        };

        renderUtil({ quiz: quizState });

        fireEvent.click(screen.getByTestId("QuizLayout__submit"));

        expect(mutateFn).not.toBeCalled();
    });

    it("shouldn't create quiz when externalId available", () => {
        (currentLOSelector as unknown as jest.Mock).mockReturnValue({
            lo_id: "lo_fake-id",
            school_id: "school_id of lo",
            type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
        });
        (quizValidSelector as unknown as jest.Mock).mockReturnValue(true);

        (useCheckQuizExternalId as jest.Mock).mockReturnValue({
            checkExternalIdIsValid: () => false,
        });

        const mutateFn = jest.fn();

        const quiz = createEmptyQuiz({
            schoolId: 123,
            loId: "id",
            isLo: true,
        });

        const quizState: QuizState = {
            ...initialState,
            currentQuizIndex: 0,
            quizzes: [quiz],
            lo: null,
        };

        renderUtil({ quiz: quizState });

        fireEvent.click(screen.getByTestId("QuizLayout__submit"));

        expect(mutateFn).not.toBeCalled();
    });

    it("should handle onSubmit and onCancel", async () => {
        (currentLOSelector as unknown as jest.Mock).mockReturnValue({
            lo_id: "lo_fake-id",
            school_id: "school_id of lo",
            type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
        });
        (quizValidSelector as unknown as jest.Mock).mockReturnValue(true);

        const checkQuizExternalFn = jest.fn().mockResolvedValue(true);
        (useCheckQuizExternalId as jest.Mock).mockReturnValue({
            checkExternalIdIsValid: checkQuizExternalFn,
        });

        const mutateFn = jest.fn();

        (useUpsertQuiz as jest.Mock).mockReturnValue({
            upsertQuiz: mutateFn,
        });

        const mockPushNavigation = jest.fn();
        (useNavigation as jest.Mock).mockImplementation(() => ({ push: mockPushNavigation }));

        const quiz = createEmptyQuiz({
            schoolId: 123,
            loId: "id",
            isLo: true,
        });

        const quizState: QuizState = {
            ...initialState,
            currentQuizIndex: 0,
            quizzes: [quiz],
            lo: null,
        };

        renderUtil({ quiz: quizState });

        fireEvent.click(screen.getByTestId("QuizLayout__submit"));

        expect(checkQuizExternalFn).toBeCalledWith(quiz.externalId);
        await waitFor(() => expect(getLatestCallParams(mutateFn)[0]).toEqual({ quiz }));

        fireEvent.click(screen.getByText("ra.common.action.cancel"));

        expect(mockPushNavigation).toBeCalledWith(
            "/syllabus/learning_objectives/lo_id_parent/show"
        );
    });

    it("should show loading when fetching data of parent entity (Learning Objective)", () => {
        (useStrictQuiz as jest.Mock).mockReturnValue({
            isFetching: true,
            parent: {},
            id: "lo_id_parent",
            onNotify: jest.fn(),
        });

        renderUtil();

        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });
});

describe("Test Create Quiz page when LO type is Exam LO", () => {
    it("should call onAddNewQuiz with kind is MCQ multiple choice question", () => {
        const quizState: QuizState = {
            ...initialState,
            currentQuizIndex: 0,
            quizzes: [],
            lo: null,
        };

        (currentLOSelector as unknown as jest.Mock).mockReturnValue({
            lo_id: "lo_fake-id",
            school_id: "school_id of lo",
            type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_EXAM_LO,
        });

        renderUtil({ quiz: quizState });

        expect(useQuizUpdate().onAddNewQuiz).toBeCalledWith({
            loId: "lo_fake-id",
            schoolId: "school_id of lo",
            isLo: false,
            kind: QuizType.QUIZ_TYPE_MCQ,
        });
    });
});
