import { MathJaxLoadStatus } from "src/common/constants/enum";
import { KeyLOTypes } from "src/squads/syllabus/common/constants/const";
import { addDraftInlineElement } from "src/squads/syllabus/common/utils/draft-js";
import { Answer, Quiz } from "src/squads/syllabus/models/quiz";
import { currentLOSelector } from "src/squads/syllabus/store/quiz/selectors";
import { getExampleDraftContent } from "src/squads/syllabus/test-utils/draft-js";
import {
    createEmptyQuizState,
    createMockAnswerListFIB,
    createQuizWithLoadingImage,
} from "src/squads/syllabus/test-utils/quiz";
import { createArrayNumber } from "src/squads/syllabus/test-utils/utils";

import Editor from "src/squads/syllabus/pages/Quiz/components/WYSWYG/Editor";
import useInstallMathJax from "src/squads/syllabus/pages/Quiz/components/WYSWYG/useInstallMathJax";
import {
    CustomBlockTypes,
    getBlockKeysByEntityType,
} from "src/squads/syllabus/pages/Quiz/components/WYSWYG/wyswyg-utils";

import Create from "../../Create";
import useQuizUpdate, { UseQuizUpdateValues } from "../../hooks/useQuizUpdate";
import {
    getAllAnswerGroupsByGroupKey,
    removeAllLoadingImageFromHTML,
    removeLoadingImageFromQuizPayload,
} from "../utils";

import { render, screen } from "@testing-library/react";
import useStrictQuiz, {
    UseStrictQuizValues,
} from "src/squads/syllabus/hooks/useStrictEntity/useStrictQuiz";
import AppProvider from "src/squads/syllabus/test-utils/AppProvider";
import TestAppWithQueryClient from "src/squads/syllabus/test-utils/TestAppWithQueryClient";
import TestThemeProvider from "src/squads/syllabus/test-utils/TestThemeProvider";

jest.mock("src/squads/syllabus/hooks/useUploadFiles", () => ({
    __esModule: true,
    default: () => ({
        isUploading: false,
        onUploadFilesAsync: jest.fn(),
    }),
}));

jest.mock("src/squads/syllabus/pages/Quiz/components/WYSWYG/useInstallMathJax", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/syllabus/hooks/useStrictEntity/useStrictQuiz", () => jest.fn());

jest.mock("src/squads/syllabus/hooks/useShowSnackbar");
jest.mock("src/squads/syllabus/hooks/useResourceTranslate");
jest.mock("src/squads/syllabus/hooks/useTranslate");
jest.mock("react-pdf");

jest.mock("src/squads/syllabus/pages/Quiz/hooks/useQuizUpdate", () => jest.fn());

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

const renderUtil = (quiz: Quiz) => {
    return render(
        <AppProvider
            customStores={{
                quiz: {
                    ...createEmptyQuizState(),
                    quizzes: [quiz],
                    currentQuizIndex: 0,
                    quizOnReview: null,
                },
            }}
        >
            <Create />
        </AppProvider>,
        { wrapper: TestAppWithQueryClient }
    );
};

describe("removeAllLoadingImageFromHTML", () => {
    it("should remove all element have data-testid=Editor__loading-image", () => {
        (useInstallMathJax as jest.Mock).mockImplementation(() => ({
            loadStatus: MathJaxLoadStatus.LOADED,
        }));

        const editorStateWithLoadingImage = addDraftInlineElement(CustomBlockTypes.LOADING_IMAGE)(
            getExampleDraftContent(),
            "imageUrl"
        );
        render(
            <TestThemeProvider>
                <Editor editorState={editorStateWithLoadingImage} />
            </TestThemeProvider>
        );
        expect(screen.getByTestId(`Editor__loading-image`)).toBeInTheDocument();
        removeAllLoadingImageFromHTML();
        expect(screen.queryByTestId(`Editor__loading-image`)).not.toBeInTheDocument();
    });
});

describe("removeLoadingImageFromQuizPayload", () => {
    it("should remove all element have data-testid=Editor__loading-image and loading image block from quiz payload ", () => {
        const useQuizUpdateDefaultReturn: Partial<UseQuizUpdateValues> = {
            onCloseReview: jest.fn(),
            onAddNewQuiz: jest.fn(),
            onClearState: jest.fn(),
        };

        (useQuizUpdate as jest.Mock).mockReturnValue(useQuizUpdateDefaultReturn);

        const result: UseStrictQuizValues = {
            isFetching: false,
            id: "lo_id_parent",
            onNotify: jest.fn(),
            searchURL: "",
        };
        (useStrictQuiz as jest.Mock).mockReturnValue(result);
        (currentLOSelector as unknown as jest.Mock).mockReturnValue({
            lo_id: "lo_fake-id",
            school_id: "school_id of lo",
            type: KeyLOTypes.LEARNING_OBJECTIVE_TYPE_LEARNING,
        });

        (useInstallMathJax as jest.Mock).mockImplementation(() => ({
            loadStatus: MathJaxLoadStatus.LOADED,
        }));

        const quiz = createQuizWithLoadingImage();
        const newQuiz = removeLoadingImageFromQuizPayload(quiz);

        renderUtil(newQuiz);

        expect(screen.queryByTestId(`Editor__loading-image`)).not.toBeInTheDocument();

        expect(
            getBlockKeysByEntityType(newQuiz.question.content, CustomBlockTypes.LOADING_IMAGE)
        ).toHaveLength(0);

        expect(
            getBlockKeysByEntityType(newQuiz.explanation.content, CustomBlockTypes.LOADING_IMAGE)
        ).toHaveLength(0);

        newQuiz.answer.list.forEach((answer) => {
            expect(
                getBlockKeysByEntityType(answer.content, CustomBlockTypes.LOADING_IMAGE)
            ).toHaveLength(0);
        });
    });
});

describe(getAllAnswerGroupsByGroupKey.name, () => {
    it("should return an array contains answer groups", () => {
        const mainAnswer = { quantity: 2, quantityAlternative: 2 };
        const answerList = createMockAnswerListFIB({ mainAnswer });

        const result = getAllAnswerGroupsByGroupKey(answerList);

        const expectedResult: Array<Answer[]> = [];

        createArrayNumber(mainAnswer.quantity).map((numberMainAnswer) => {
            const answerGroup = answerList.filter((answer) => {
                const answerGroupKey = result[numberMainAnswer][0].groupKey;
                if (answer.groupKey === answerGroupKey) {
                    return answer;
                }
            });
            expectedResult.push(answerGroup);
        });

        // Answer group 1
        expect(result[0]).toEqual(expectedResult[0]);

        // Answer group 2
        expect(result[1]).toEqual(expectedResult[1]);
    });
});
