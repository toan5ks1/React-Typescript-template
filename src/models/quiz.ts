import { convertToRaw, EditorState } from "draft-js";
import { ExtendedLabelTypes } from "src/common/utils/label-generator";

import { QuizOptionConfig, QuizType, RichText } from "manabie-yasuo/quiz_pb";
import { QuizItemAttributeConfig } from "manabuf/common/v1/contents_pb";

import { Rect } from "./canvas";
import { LOWithQuizSet } from "./quizset-lo";

export { QuizItemAttributeConfig };
export { QuizOptionConfig, QuizType };

export interface Quiz {
    loId: string;
    quizId?: string;
    externalId: string;
    kind: QuizType;
    taggedLOs?: (string | LOWithQuizSet)[];
    schoolId: number;
    answer: AnswerField;
    question: QuestionField;
    explanation: ExplanationField;
    difficultyLevel?: DifficultyLevels;
    attribute: QuizAttribute;
}

export interface RichTextHasura {
    raw: string;
    rendered_url: string;
}

export interface QuizOptionHasura {
    content: RichTextHasura;
    correctness: boolean;
    configs: Array<keyof typeof QuizOptionConfig>;
    label: string;
    key: string;
    attribute?: QuizAttributeHasura;
}

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

export enum FieldTypes {
    QUESTION = "QUESTION",
    ANSWER = "ANSWER",
    EXPLANATION = "EXPLANATION",
}

export interface QuizAttributeHasura {
    audio_link?: string;
    img_link?: string;
    configs: Array<keyof typeof QuizItemAttributeConfig>;
}

export interface QuizAttribute {
    audioLink?: string;
    imgLink?: string;
    configs: QuizItemAttributeConfig[];
}

type WithQuizAttribute<T, P> = T & {
    attribute?: P;
};

export interface Option {
    content: EditorState;
    rects: Rect[]; //rects created by selecting in ocr
}

export interface QuestionField extends Option {}
export interface ExplanationField extends Option {}

export interface Answer extends Option {
    id: string;
    correct: boolean;
    configs: QuizOptionConfig[];
    label: string;
    groupKey: string;
    attribute: QuizAttribute;
}
export type AnswerField = {
    labelType: ExtendedLabelTypes;
    configs: QuizOptionConfig[];
    list: Map<string, Answer>;
};

export enum DifficultyLevels {
    ONE = 1,
    TWO = 2,
    THREE = 3,
    FOUR = 4,
    FIVE = 5,
}

export const toRichText = (editorState: EditorState, innerHTML: string): RichText => {
    const richText = new RichText();

    richText.setRaw(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    richText.setRendered(innerHTML);

    return richText;
};

export const toDraftSelector = (selector: string) => {
    return `[data-js="${selector}"] .public-DraftEditor-content`;
};
