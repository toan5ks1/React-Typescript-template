import { EditorState } from "draft-js";
import { ExtendedLabelTypes, LabelTypes } from "src/common/utils/label-generator";
import { genId } from "src/squads/syllabus/common/utils/generator";
import { QuizzesAttrsFragment } from "src/squads/syllabus/services/eureka/eureka-types";

import { QuizOptionConfig, QuizType } from "manabie-yasuo/quiz_pb";
import { QuizItemAttributeConfig } from "manabuf/common/v1/contents_pb";

import { Rect } from "./canvas";
import {
    convertAttributeHasuraToQuizAttribute,
    convertQuizOptionKeyToValue,
    convertRichTextHasuraToRichText,
    createEmptyAnswer,
    createQuizBaseInfo,
    determineConfigs,
    determineLabelType,
    getEmptyOption,
    isQuizFIB,
    isQuizMCQ,
} from "./quiz";
import { LOWithQuizSet } from "./quizset-lo";

export { QuizItemAttributeConfig };
export { QuizOptionConfig, QuizType };

export interface Option {
    content: EditorState;
    rects: Rect[]; //rects created by selecting in ocr
}

export interface QuizAttribute {
    audioLink?: string;
    imgLink?: string;
    configs: QuizItemAttributeConfig[];
}

export interface Answer extends Option {
    id: string;
    correct: boolean;
    configs: QuizOptionConfig[];
    label: string;
    groupKey: string;
    attribute: QuizAttribute;
}

export interface RichTextHasura {
    raw: string;
    rendered_url: string;
}

export interface QuizAttributeHasura {
    audio_link?: string;
    img_link?: string;
    configs: Array<keyof typeof QuizItemAttributeConfig>;
}

export interface QuizOptionHasura {
    content: RichTextHasura;
    correctness: boolean;
    configs: Array<keyof typeof QuizOptionConfig>;
    label: string;
    key: string;
    attribute?: QuizAttributeHasura;
}

export interface QuestionField extends Option {}
export interface ExplanationField extends Option {}
export enum DifficultyLevels {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
}

export type AnswerFieldV2 = {
    labelType: ExtendedLabelTypes;
    configs: QuizOptionConfig[];
    list: Answer[];
};

type WithQuizAttribute<T, P> = T & {
    attribute?: P;
};

export interface QuizHasura {
    id: string;
    kind: keyof typeof QuizType;
    quiz_id: string;
    school_id: number;
    approved_by: string;
    external_id: string;
    tagged_los: string[];
    difficulty_level: number;
    question: WithQuizAttribute<RichTextHasura, QuizAttributeHasura>;
    explanation: RichTextHasura;
    options: QuizOptionHasura[];
}

export default interface QuizV2 {
    loId: string;
    quizId?: string;
    externalId: string;
    kind: QuizType;
    taggedLOs?: (string | LOWithQuizSet)[];
    schoolId: number;
    answer: AnswerFieldV2;
    question: QuestionField;
    explanation: ExplanationField;
    difficultyLevel?: DifficultyLevels;
    attribute: QuizAttribute;
}

export const convertAnswerHasuraToQuizAnswerV2 = (
    answers: QuizOptionHasura[]
): AnswerFieldV2["list"] => {
    return answers.map((answerHsr) => {
        const generatedId = genId();
        const { attribute, label, configs, content, correctness, key } = answerHsr;
        const answer: Answer = {
            id: generatedId,
            label: label,
            configs: convertQuizOptionKeyToValue(configs),
            correct: correctness,
            // for old data we don't have the key field
            groupKey: key || genId(),
            attribute: convertAttributeHasuraToQuizAttribute(attribute),
            ...convertRichTextHasuraToRichText(content),
        };

        return answer;
    });
};

export const convertQuizHasuraToQuizV2 = (
    quizHsr: QuizHasura | Omit<QuizzesAttrsFragment, "country">,
    loId: string
): QuizV2 => {
    return {
        loId,
        externalId: quizHsr.external_id,
        quizId: quizHsr.quiz_id,
        kind: QuizType[quizHsr.kind],
        taggedLOs: quizHsr.tagged_los || [],
        schoolId: quizHsr.school_id,
        answer: {
            list: convertAnswerHasuraToQuizAnswerV2(quizHsr.options),
            configs: determineConfigs(quizHsr.options),
            labelType: determineLabelType(quizHsr.options),
        },
        question: convertRichTextHasuraToRichText(quizHsr.question),
        explanation: convertRichTextHasuraToRichText(quizHsr.explanation),
        difficultyLevel: quizHsr.difficulty_level || 1,
        attribute: convertAttributeHasuraToQuizAttribute(quizHsr.question.attribute),
    };
};

export const createDefaultAnswerFieldV2 = (quizType: QuizV2["kind"]) => {
    let answers: Answer[] = [];
    let answer = createEmptyAnswer(genId(), true);
    let labelType = null;
    const configs: QuizOptionConfig[] = [];

    answers.push(answer);

    if (isQuizFIB(quizType)) {
        labelType = LabelTypes.NUMBER;
        answer.label = "1";
        configs.push(QuizOptionConfig.QUIZ_OPTION_CONFIG_CASE_SENSITIVE);
    }

    if (isQuizMCQ(quizType) || quizType === QuizType.QUIZ_TYPE_MAQ) {
        answers.push(createEmptyAnswer(genId(), false));
        answers.push(createEmptyAnswer(genId(), false));
        answers.push(createEmptyAnswer(genId(), false));
    }

    return {
        configs,
        labelType,
        list: answers,
    };
};

export interface CreateEmptyQuizParams {
    loId: QuizV2["loId"];
    schoolId: QuizV2["schoolId"];
    isLo: boolean;
    kind?: QuizType;
}

export const createEmptyQuizV2 = (params: CreateEmptyQuizParams): QuizV2 => {
    const baseInfo = createQuizBaseInfo(params);
    return {
        ...baseInfo,
        question: getEmptyOption(),
        explanation: getEmptyOption(),
        answer: createDefaultAnswerFieldV2(baseInfo.kind),
    };
};
