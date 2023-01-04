import { Entities } from "src/common/constants/enum";
import { MicroFrontendTypes } from "src/routing/type";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { UseQueryBaseV2Return } from "src/squads/syllabus/hooks/data/data-types";
import { convertQuizHasuraToQuiz, createEmptyQuiz } from "src/squads/syllabus/models/quiz";
import { inferQuery } from "src/squads/syllabus/services/infer-query";
import { currentLOSelector, initialState } from "src/squads/syllabus/store/quiz";
import { QuizState } from "src/squads/syllabus/store/quiz/quiz-types";
import { RootState } from "src/squads/syllabus/store/store-types";
import { getLatestCallParams } from "src/squads/syllabus/test-utils/mock-utils";
import { createEmptyQuizState } from "src/squads/syllabus/test-utils/quiz";

import { NotFoundProps } from "src/components/NotFound";

import Edit from "../Edit";

import { render, screen } from "@testing-library/react";
import useNavigation from "src/squads/syllabus/hooks/useNavigation";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useStrictQuiz, {
    UseStrictQuizValues,
} from "src/squads/syllabus/hooks/useStrictEntity/useStrictQuiz";
import AppProvider from "src/squads/syllabus/test-utils/AppProvider";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";

jest.mock("react-router", () => {
    const actual = jest.requireActual("react-router");

    return {
        __esModule: true,
        ...actual,
        useParams: () => ({ id: "quizId" }),
    };
});

jest.mock("src/squads/syllabus/services/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

jest.mock("src/squads/syllabus/store/quiz/selectors", () => {
    const original = jest.requireActual("src/squads/syllabus/store/quiz/selectors");

    return {
        ...original,
        currentLOSelector: jest.fn(original.currentLOSelector),
        quizValidSelector: jest.fn(original.quizValidSelector),
    };
});

jest.mock("src/squads/syllabus/models/quiz", () => {
    const original = jest.requireActual("src/squads/syllabus/models/quiz");
    return {
        ...original,
        convertQuizHasuraToQuiz: jest.fn(original.convertQuizHasuraToQuiz),
    };
});

jest.mock("src/squads/syllabus/hooks/useNavigation");

jest.mock("react-pdf");

jest.mock("src/squads/syllabus/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useResourceTranslate");
jest.mock("src/squads/syllabus/hooks/useTranslate");

jest.mock("src/squads/syllabus/hooks/useStrictEntity/useStrictQuiz", () => jest.fn());

jest.mock("src/squads/syllabus/internals/logger");

jest.mock("src/components/NotFound", () => {
    return {
        __esModule: true,
        default: (props: NotFoundProps) => (
            <span data-testid="NotFound_page" data-redirect={props.redirect} />
        ),
    };
});

jest.mock("src/squads/syllabus/store/quiz/selectors", () => {
    const original = jest.requireActual("src/squads/syllabus/store/quiz/selectors");

    return {
        ...original,
        currentLOSelector: jest.fn(original.currentLOSelector),
        quizValidSelector: jest.fn(original.quizValidSelector),
    };
});

const mockShowSnackbar = jest.fn();
const mockUseShowSnackbar = () => {
    (useShowSnackbar as jest.Mock).mockImplementation(() => mockShowSnackbar);
};

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
            <Edit />
        </AppProvider>,
        { wrapper: TestAppWithQueryClient }
    );
};

describe(`Quiz ${Edit.name}`, () => {
    const queryQuizGetOne = jest.fn();

    const mockInferQuery =
        (override: Partial<UseQueryBaseV2Return<{}>> = {}) =>
        () =>
            queryQuizGetOne.mockReturnValue({ ...override });

    beforeEach(() => {
        const result: UseStrictQuizValues = {
            isFetching: false,
            id: "lo_id_parent",
            onNotify: jest.fn(),
            searchURL: "",
        };
        (useStrictQuiz as jest.Mock).mockReturnValue(result);
        (inferQuery as jest.Mock).mockImplementation(mockInferQuery());
    });

    afterEach(() => {
        queryQuizGetOne.mockRestore();
    });

    it("shouldn't accept edit without externalId we will show not found page", () => {
        const quiz = createEmptyQuiz({
            schoolId: 123,
            loId: "id",
            isLo: false,
        });

        // @ts-ignore Intentional
        quiz.externalId = undefined;
        const quizState: QuizState = {
            ...initialState,
            currentQuizIndex: 0,
            quizzes: [quiz],
            lo: null,
        };

        renderUtil({ quiz: quizState });

        expect(screen.getByTestId("NotFound_page")).toHaveAttribute(
            `data-redirect`,
            `/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}`
        );
    });

    it("should return not found page when quiz set is not include current externalId", () => {
        (currentLOSelector as unknown as jest.Mock).mockReturnValue({
            lo_id: "lo_fake-id",
            school_id: "school_id of lo",
            type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
        });

        renderUtil();

        expect(screen.getByTestId("NotFound_page")).toHaveAttribute(
            `data-redirect`,
            `/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}`
        );
    });

    it("should redirect to book detail when fetch record to edit is failed", () => {
        const searchURL = "?search=query";
        const navigationFn = jest.fn();

        (useNavigation as jest.Mock).mockImplementation(() => ({ push: navigationFn }));
        (useStrictQuiz as jest.Mock).mockReturnValue({
            isFetching: true,
            parent: {},
            id: "lo_id_parent",
            onNotify: jest.fn(),
            searchURL,
        });
        mockUseShowSnackbar();

        renderUtil();

        getLatestCallParams(queryQuizGetOne)[1].onError();

        expect(mockShowSnackbar).toBeCalledWith("ra.notification.item_doesnt_exist", "error");
        expect(navigationFn).toBeCalledWith(
            `/syllabus/learning_objectives/lo_id_parent/show${searchURL}`
        );
    });

    it("should redirect to not found page when quiz data is not existed by quiz_id", () => {
        const convertQuizHasuraToQuizFn = jest.fn();

        (convertQuizHasuraToQuiz as jest.Mock).mockImplementation(() => convertQuizHasuraToQuizFn);
        mockUseShowSnackbar();

        renderUtil();

        getLatestCallParams(queryQuizGetOne)[1].onSuccess({});

        expect(screen.getByTestId("NotFound_page")).toHaveAttribute(
            `data-redirect`,
            `/${MicroFrontendTypes.SYLLABUS}/${Entities.BOOKS}`
        );
        expect(mockShowSnackbar).toBeCalledWith("ra.notification.item_doesnt_exist", "error");
        expect(convertQuizHasuraToQuiz).not.toBeCalled();
    });

    it("should call convert quizHasuraToQuiz when get quiz to edit success", () => {
        const loId = "lo_id_parent";
        (useStrictQuiz as jest.Mock).mockReturnValue({
            isFetching: true,
            parent: {},
            id: loId,
            onNotify: jest.fn(),
            searchURL: "?this_is_search_query",
        });

        const convertQuizHasuraToQuizFn = jest.fn();
        (convertQuizHasuraToQuiz as jest.Mock).mockImplementation(() => convertQuizHasuraToQuizFn);

        renderUtil();

        const params = getLatestCallParams(queryQuizGetOne)[1];

        const quizHasura = { name: "this_is_quiz_hasura" };

        params.onSuccess(quizHasura);
        expect(convertQuizHasuraToQuiz).toBeCalledWith(quizHasura, loId);
    });

    it("should render loading when fetching record", () => {
        const queryReturns: Partial<UseQueryBaseV2Return<{}>> = {
            isLoading: true,
        };
        (inferQuery as jest.Mock).mockImplementation(mockInferQuery(queryReturns));
        renderUtil();

        expect(screen.getByTestId("Loading__root")).toBeInTheDocument();
    });

    it("should render loading when parent(Learning Objective) record is fetching", () => {
        const queryReturns: Partial<UseQueryBaseV2Return<{}>> = {
            isLoading: false,
        };
        (inferQuery as jest.Mock).mockImplementation(mockInferQuery(queryReturns));
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
