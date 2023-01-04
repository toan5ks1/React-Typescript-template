import { ContentState, EditorState } from "draft-js";
import { LabelTypes } from "src/common/utils/label-generator";
import { addDraftInlineElement } from "src/squads/syllabus/common/utils/draft-js";
import {
    Answer,
    createAnswerMapFromArr,
    createQuizBaseInfo,
    isQuizFIB,
    isQuizMAQ,
    isQuizMCQ,
    isQuizMIQ,
    Option,
    Quiz,
    QuizAttribute,
} from "src/squads/syllabus/models/quiz";
import { QuizState } from "src/squads/syllabus/store/quiz/quiz-types";
import { getExampleDraftContent } from "src/squads/syllabus/test-utils/draft-js";
import { createEmptyLO } from "src/squads/syllabus/test-utils/lo";

import { CustomBlockTypes } from "src/squads/syllabus/pages/Quiz/components/WYSWYG/wyswyg-utils";

import { QuizOptionConfig, QuizType } from "manabie-yasuo/quiz_pb";
import { QuizItemAttributeConfig } from "manabuf/common/v1/contents_pb";

import { createArrayNumber } from "./utils";

export function createEmptyQuizState(override?: Partial<QuizState>): QuizState {
    const lo = createEmptyLO();
    return {
        lo,
        currentQuizIndex: 0,
        quizOnReview: null,
        quizzes: [
            mockCreateQuiz({
                loId: lo.lo_id,
                isLo: true,
                schoolId: lo.school_id,
            }),
        ],
        pdfUrl: "",
        ...override,
    };
}

export function createMockQuizState(
    override: Partial<QuizState & { quizType: Quiz["kind"] }> = {}
): QuizState {
    const mockLO = createEmptyLO();
    const mockQuizzes = [
        mockCreateQuiz({
            kind: override.quizType,
            loId: mockLO.lo_id,
            schoolId: mockLO.school_id,
        }),
    ];

    return {
        lo: mockLO,
        currentQuizIndex: 0,
        quizOnReview: null,
        quizzes: mockQuizzes,
        pdfUrl: null,
        ...override,
    };
}

export function createQuizWithLoadingImage() {
    const lo = createEmptyLO();
    const quiz = mockCreateQuiz({
        loId: lo.lo_id,
        isLo: true,
        schoolId: lo.school_id,
    });
    const editorStateWithLoadingImage = addDraftInlineElement(CustomBlockTypes.LOADING_IMAGE)(
        getExampleDraftContent(),
        "imageUrl"
    );
    const answerList = new Map();
    quiz.answer.list.forEach((answer) => {
        answerList.set(answer.id, {
            ...answer,
            content: editorStateWithLoadingImage,
        });
    });
    return {
        ...quiz,
        answer: {
            ...quiz.answer,
            list: answerList,
        },
        question: {
            ...quiz.question,
            content: editorStateWithLoadingImage,
        },
        explanation: {
            ...quiz.explanation,
            content: editorStateWithLoadingImage,
        },
    };
}

export const createMockOptionContent = (text: string | undefined): Option["content"] => {
    if (text) {
        return EditorState.createWithContent(ContentState.createFromText(text));
    }

    return EditorState.createEmpty();
};

export const createMockOption = (text: string | undefined): Option => {
    return {
        content: createMockOptionContent(text),
        rects: [],
    };
};

export const createMockDefaultAnswer = (quizType: Quiz["kind"]) => {
    let answers: Answer[] = [];
    let answer = createMockModelAnswer({ id: "answerId_1", correct: true });
    let labelType = null;
    const configs: QuizOptionConfig[] = [];

    answers.push(answer);

    if (isQuizFIB(quizType)) {
        labelType = LabelTypes.NUMBER;
        answer.label = "1";
        configs.push(QuizOptionConfig.QUIZ_OPTION_CONFIG_CASE_SENSITIVE);
    }

    if (isQuizMCQ(quizType) || isQuizMAQ(quizType)) {
        const answerIdList = ["answerId_2", "answerId_3", "answerId_4"];
        answerIdList.forEach((answerId) =>
            answers.push(createMockModelAnswer({ id: answerId, correct: false }))
        );
    }

    if (isQuizMIQ(quizType)) {
        answers.push(createMockModelAnswer({ id: "answerId_2", correct: false }));
    }

    return {
        configs,
        labelType: labelType,
        list: createAnswerMapFromArr(answers),
    };
};

export const mockCreateQuiz = (override: Partial<Quiz & { isLo: boolean }> = {}): Quiz => {
    const {
        quizId = "quizId",
        loId = "loId",
        schoolId = 123,
        isLo = true,
        kind = QuizType.QUIZ_TYPE_MCQ,
    } = override;
    const questionContent = "Question Content";
    const explanationContent = "Explanation Content";

    const baseInfo = createQuizBaseInfo({ loId, schoolId, isLo, kind });

    return {
        quizId,
        ...baseInfo,
        question: createMockOption(questionContent),
        explanation: createMockOption(explanationContent),
        answer: createMockDefaultAnswer(baseInfo.kind),
    };
};

export const mockAnswerAttribute = (override: Partial<Answer["attribute"]> = {}): QuizAttribute => {
    return {
        imgLink: "",
        configs: [],
        audioLink: "",
        ...override,
    };
};

export const createMockModelAnswer = (override: Partial<Answer> = {}): Answer => {
    return {
        id: "answerId",
        label: "",
        configs: [],
        attribute: mockAnswerAttribute(),
        groupKey: "groupKey",
        correct: false,
        ...createMockOption(undefined),
        ...override,
    };
};

export const createMockAnswerList = ({
    quantity = 1,
    override,
}: {
    quantity?: number;
    override?: Answer;
} = {}): Answer[] => {
    let answerList: Answer[] = [];

    if (quantity === 1) {
        answerList = [
            createMockModelAnswer({
                id: `answerId_${quantity}`,
                ...override,
            }),
        ];
        return answerList;
    }

    createArrayNumber(quantity).map((index) => {
        answerList = [
            ...answerList,
            createMockModelAnswer({
                id: `answerId_${index + 1}`,
                ...override,
            }),
        ];
    });

    return answerList;
};

// Answer group contain 1 answer with many alternatives
export const createMockAnswerGroupFIB = ({
    mainAnswerIndex = 0,
    quantityAlternative = 1,
    attributeConfigs = [QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_NONE],
}: {
    mainAnswerIndex?: number;
    quantityAlternative?: number;
    attributeConfigs?: QuizItemAttributeConfig[];
} = {}): Answer[] => {
    let answerList: Answer[] = [
        createMockModelAnswer({
            id: `answerId_${mainAnswerIndex + 1}`,
            groupKey: `groupKey_${mainAnswerIndex + 1}`,
            attribute: mockAnswerAttribute({ configs: attributeConfigs }),
        }),
    ];

    if (quantityAlternative === 1) {
        answerList = [
            ...answerList,
            createMockModelAnswer({
                id: `alternativeId_${quantityAlternative}`,
                groupKey: `groupKey_${mainAnswerIndex + 1}`,
                attribute: mockAnswerAttribute({ configs: attributeConfigs }),
            }),
        ];
        return answerList;
    }

    createArrayNumber(quantityAlternative).map((alternativeIndex) => {
        answerList = [
            ...answerList,
            createMockModelAnswer({
                id: `alternativeId_${alternativeIndex + 1}`,
                groupKey: `groupKey_${mainAnswerIndex + 1}`,
                attribute: mockAnswerAttribute({ configs: attributeConfigs }),
            }),
        ];
    });

    return answerList;
};

export const createMockAnswerListFIB = ({
    mainAnswer = {},
}: {
    mainAnswer?: {
        quantity?: number;
        quantityAlternative?: number;
        attributeConfigs?: QuizItemAttributeConfig[];
    };
} = {}): Answer[] => {
    const {
        quantity = 1,
        quantityAlternative = 1,
        attributeConfigs = [QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_NONE],
    } = mainAnswer;
    let answerList: Answer[] = [];

    if (quantity === 1 && quantityAlternative === 1) {
        return createMockAnswerGroupFIB({ attributeConfigs });
    }

    createArrayNumber(quantity).map((mainAnswerIndex) => {
        const answerGroup = createMockAnswerGroupFIB({
            mainAnswerIndex,
            quantityAlternative,
            attributeConfigs,
        });
        answerList = [...answerList, ...answerGroup];
    });

    return answerList;
};
