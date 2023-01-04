import { EditorState } from "draft-js";
import { LabelTypes } from "src/common/utils/label-generator";
import { createEditorStateFromText } from "src/squads/syllabus/common/utils/draft-js";
import { genId } from "src/squads/syllabus/common/utils/generator";
import {
    createEmptyAnswer,
    getEmptyOption,
    isQuizFIB,
    isQuizMCQ,
} from "src/squads/syllabus/models/quiz";
import { LOWithQuizSet } from "src/squads/syllabus/models/quizset-lo";

import QuizV2, {
    Answer,
    AnswerFieldV2,
    createDefaultAnswerFieldV2,
    ExplanationField,
    QuestionField,
    QuizAttribute,
    QuizOptionConfig,
    QuizType,
} from "src/squads/syllabus/models/quizV2";

export const createTestAnswerFieldV2 = (quizType: QuizV2["kind"]) => {
    let answers: Answer[] = [];
    let answer = createEmptyAnswer("answer-1", true);
    let labelType = null;
    const configs: QuizOptionConfig[] = [];

    answers.push(answer);

    if (isQuizFIB(quizType)) {
        labelType = LabelTypes.NUMBER;
        answer.label = "1";
        configs.push(QuizOptionConfig.QUIZ_OPTION_CONFIG_CASE_SENSITIVE);
    }

    if (isQuizMCQ(quizType) || quizType === QuizType.QUIZ_TYPE_MAQ) {
        answers.push(createEmptyAnswer("answer-2", false));
        answers.push(createEmptyAnswer("answer-3", false));
        answers.push(createEmptyAnswer("answer-4", false));
    }

    return {
        configs,
        labelType,
        list: answers,
    };
};

export const createTestLO = (overrides?: Partial<LOWithQuizSet>): LOWithQuizSet => {
    const id = "test-lo";
    return {
        id,
        lo_id: id,
        name: "ABC",
        created_at: "2022/07/19",
        school_id: 0,
        type: "LEARNING_OBJECTIVE_TYPE_EXAM_LO",
        quiz_sets: [],
        ...overrides,
    };
};

export const createTestQuiz = (overrides?: Partial<QuizV2>): QuizV2 => ({
    answer: {
        labelType: null,
        configs: [],
        list: [],
    },
    attribute: {
        configs: [],
    },
    explanation: {
        content: EditorState.createEmpty(),
        rects: [],
    },
    externalId: "",
    kind: QuizType.QUIZ_TYPE_MCQ,
    loId: "test-lo",
    question: {
        content: EditorState.createEmpty(),
        rects: [],
    },
    schoolId: 0,
    ...overrides,
});

export const createTestAnswerAttribute = (
    override: Partial<Answer["attribute"]> = {}
): QuizAttribute => {
    return {
        imgLink: "",
        configs: [],
        audioLink: "",
        ...override,
    };
};

export const createCustomTestAnswers = (kind: QuizType, answers: string[]): Answer[] => {
    return answers.map((answer, idx) => {
        const correct: boolean = kind === QuizType.QUIZ_TYPE_MAQ ? !!idx : !idx;

        return {
            id: genId(),
            label: kind === QuizType.QUIZ_TYPE_FIB ? String(idx + 1) : "",
            groupKey: genId(),
            correct: kind === QuizType.QUIZ_TYPE_FIB ? false : correct,
            content: createEditorStateFromText(answer),
            configs: kind === QuizType.QUIZ_TYPE_FIB ? [0] : [],
            attribute: {
                configs: [],
            },
            rects: [],
        };
    });
};

export const createCustomTestQuiz = ({
    kind,
    explanation,
    question,
    answer,
    difficultyLevel,
    externalId,
}: {
    kind: QuizType;
    difficultyLevel?: number;
    externalId?: string;
    explanation?: ExplanationField;
    question?: QuestionField;
    answer?: AnswerFieldV2;
}): QuizV2 => ({
    answer: answer ? answer : createDefaultAnswerFieldV2(kind),
    difficultyLevel: difficultyLevel ? difficultyLevel : 1,
    explanation: explanation ? explanation : getEmptyOption(),
    externalId: externalId ? externalId : genId(),
    kind,
    loId: "01",
    question: question ? question : getEmptyOption(),
    quizId: "test-id",
    schoolId: 1,
    taggedLOs: ["1", "2"],
    attribute: {
        configs: [],
    },
});
