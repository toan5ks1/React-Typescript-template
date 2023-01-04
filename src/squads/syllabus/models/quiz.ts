import { convertToRaw, EditorState } from "draft-js";
import { Draft, produce } from "immer";
import {
    ExtendedLabelTypes,
    generateLabel,
    isLowerCase,
    isUpperCase,
    LabelTypes,
} from "src/common/utils/label-generator";
import { arrayHasItem, pick1stElement } from "src/common/utils/other";
import { AppError } from "src/internals/errors";
import sanitizer from "src/internals/sanitizer";
import {
    convertRawToState,
    createSimpleHtmlStringFromEditorState,
    isEditorContentEmpty,
} from "src/squads/syllabus/common/utils/draft-js";
import { genId } from "src/squads/syllabus/common/utils/generator";
import permission from "src/squads/syllabus/internals/permission";
import { QuizzesAttrsFragment } from "src/squads/syllabus/services/eureka/eureka-types";

import { QuizCore, QuizOption, QuizOptionConfig, QuizType, RichText } from "manabie-yasuo/quiz_pb";
import {
    ContentBasicInfo,
    QuizCore as QuizCoreV2,
    QuizItemAttribute,
    QuizItemAttributeConfig,
    QuizOption as QuizOptionV2,
} from "manabuf/common/v1/contents_pb";

import logger from "../internals/logger";
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

interface InnerHTMLForQuiz {
    answers: string[];
    explanation: string;
    question: string;
}

export const convertQuizHasuraToQuiz = (
    quizHsr: QuizHasura | Omit<QuizzesAttrsFragment, "country">,
    loId: string
): Quiz => {
    return {
        loId,
        externalId: quizHsr.external_id,
        quizId: quizHsr.quiz_id,
        kind: QuizType[quizHsr.kind],
        taggedLOs: quizHsr.tagged_los || [],
        schoolId: quizHsr.school_id,
        answer: {
            list: convertAnswerHasuraToQuizAnswer(quizHsr.options),
            configs: determineConfigs(quizHsr.options),
            labelType: determineLabelType(quizHsr.options),
        },
        question: convertRichTextHasuraToRichText(quizHsr.question),
        explanation: convertRichTextHasuraToRichText(quizHsr.explanation),
        difficultyLevel: quizHsr.difficulty_level || 1,
        attribute: convertAttributeHasuraToQuizAttribute(quizHsr.question.attribute),
    };
};

export const convertRichTextHasuraToRichText = (richTextHasura?: RichTextHasura): Option => {
    if (!richTextHasura) {
        return {
            content: EditorState.createEmpty(),
            rects: [],
        };
    }

    return {
        content: convertRawToState(richTextHasura.raw) || EditorState.createEmpty(),
        rects: [],
    };
};

export const convertAttributeHasuraToQuizAttribute = (
    attribute?: QuizAttributeHasura
): QuizAttribute => {
    if (!attribute) {
        return {
            configs: [],
        };
    }

    const { configs, audio_link, img_link } = attribute;

    const configsList: QuizItemAttributeConfig[] = (configs || []).map(
        (key) => QuizItemAttributeConfig[key]
    );

    const quizAttribute: QuizAttribute = {
        imgLink: img_link,
        audioLink: audio_link,
        configs: configsList,
    };

    return quizAttribute;
};

export const getLabelType = (label: string): LabelTypes => {
    if (!Number.isNaN(Number(label))) return LabelTypes.NUMBER;

    if (isUpperCase(label)) return LabelTypes.TEXT_UPPERCASE;

    if (isLowerCase(label)) return LabelTypes.TEXT;

    return LabelTypes.CUSTOM;
};

export const determineLabelType = (answers: QuizOptionHasura[]): AnswerField["labelType"] => {
    const firstElement = pick1stElement(answers);
    if (!firstElement) return LabelTypes.NUMBER; //cant determine, fallback to type number

    if (!firstElement.label) return null;

    const firstElementLabelType = getLabelType(firstElement.label);
    if (firstElementLabelType === LabelTypes.CUSTOM) {
        return LabelTypes.CUSTOM;
    }

    //all element in array must match the first element label type to be that LabelType, else LabelTypes.CUSTOM
    for (let i = 1; i < answers.length; ++i) {
        if (firstElementLabelType !== getLabelType(answers[i].label)) {
            return LabelTypes.CUSTOM;
        }
    }

    return firstElementLabelType;
};

export const determineConfigs = (answers: QuizOptionHasura[]): QuizOptionConfig[] => {
    const firstElement = pick1stElement(answers);
    if (!firstElement) return [];
    return convertQuizOptionKeyToValue(firstElement.configs);
};

export const convertQuizOptionKeyToValue = (configs: (keyof typeof QuizOptionConfig)[]) =>
    configs.map((configKey) => QuizOptionConfig[configKey]);

export const convertAnswerHasuraToQuizAnswer = (
    answersHsr: QuizOptionHasura[]
): AnswerField["list"] => {
    const map: AnswerField["list"] = new Map<string, Answer>();

    answersHsr.forEach((answerHsr) => {
        const fakeId = genId();
        const { attribute, label, configs, content, correctness, key } = answerHsr;
        const answer: Answer = {
            id: fakeId,
            label: label,
            configs: convertQuizOptionKeyToValue(configs),
            correct: correctness,
            // for old data we don't have the key field
            groupKey: key || genId(),
            attribute: convertAttributeHasuraToQuizAttribute(attribute),
            ...convertRichTextHasuraToRichText(content),
        };

        map.set(fakeId, answer);
    });

    return map;
};

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

export enum HandwritingLanguages {
    // TODO: [Handwriting] Fix the none enum when BE refactor
    DEFAULT = QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_NONE,
    EN = QuizItemAttributeConfig.LANGUAGE_CONFIG_ENG,
    JA = QuizItemAttributeConfig.LANGUAGE_CONFIG_JP,
}

export const getEmptyOption = (): Option => {
    return {
        content: EditorState.createEmpty(),
        rects: [],
    };
};

export const getDefaultAnswerAttribute = (): QuizAttribute => ({
    configs: [],
});

export interface CreateEmptyQuizParams {
    loId: Quiz["loId"];
    schoolId: Quiz["schoolId"];
    isLo: boolean;
    kind?: QuizType;
}

//TODO: Combine check quiz type to one function
export const isQuizMAQ = (quizType: QuizType): boolean => {
    return quizType === QuizType.QUIZ_TYPE_MAQ;
};

export const isQuizMCQ = (quizType: QuizType): boolean => {
    return quizType === QuizType.QUIZ_TYPE_MCQ;
};

export const isQuizMIQ = (quizType: QuizType): boolean => {
    return quizType === QuizType.QUIZ_TYPE_MIQ;
};

export const isQuizFIB = (quizType: QuizType) => quizType === QuizType.QUIZ_TYPE_FIB;

export const isFlashCardQuiz = (quizType: QuizType): boolean => {
    return quizType === QuizType.QUIZ_TYPE_TAD || quizType === QuizType.QUIZ_TYPE_POW;
};

export const createEmptyAnswer = (
    id: string,
    correct?: boolean,
    groupKey?: string,
    attribute?: QuizAttribute
): Answer => {
    return {
        id,
        label: "",
        configs: [],
        attribute: attribute || getDefaultAnswerAttribute(),
        // The key field is required
        groupKey: groupKey || genId(),
        correct: correct || false,
        ...getEmptyOption(),
    };
};

export const createAnswerMapFromArr = (answers: Answer[]): Map<string, Answer> => {
    const map = new Map();

    answers.forEach((answer) => {
        map.set(answer.id, answer);
    });
    return map;
};

//TODO: Create default answer for all quiz type in general function in 1 place
export const createDefaultAnswerField = (quizType: Quiz["kind"]) => {
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
        labelType: labelType,
        list: createAnswerMapFromArr(answers),
    };
};

const getTypeCreateEmptyQuiz = (isLo?: boolean, kind?: QuizType) => {
    if (typeof kind !== "undefined") return kind;

    if (isLo) return QuizType.QUIZ_TYPE_MCQ;

    return QuizType.QUIZ_TYPE_POW;
};

export const createQuizBaseInfo = ({
    loId,
    schoolId,
    isLo,
    kind: quizType,
}: CreateEmptyQuizParams): Omit<Quiz, "question" | "explanation" | "answer"> => ({
    loId,
    schoolId,
    taggedLOs: [],
    difficultyLevel: DifficultyLevels.ONE,
    kind: getTypeCreateEmptyQuiz(isLo, quizType),
    externalId: permission.can("quizzes", "show.external_id") ? "" : genId(),
    attribute: getDefaultAnswerAttribute(),
});

export const createEmptyQuiz = (params: CreateEmptyQuizParams): Quiz => {
    const baseInfo = createQuizBaseInfo(params);
    return {
        ...baseInfo,
        question: getEmptyOption(),
        explanation: getEmptyOption(),
        answer: createDefaultAnswerField(baseInfo.kind),
    };
};

export const createPayloadToSend = (quiz: Quiz) => {
    if (quiz.kind === QuizType.QUIZ_TYPE_MIQ) {
        return produce(quiz, (draft: Draft<Quiz>) => {
            // with manual input need 2 answer for mobile team
            draft.answer.list.clear();
            const answerId1 = genId();
            const answerId2 = genId();
            draft.answer.list.set(answerId1, createEmptyAnswer(answerId1, true));
            draft.answer.list.set(answerId2, createEmptyAnswer(answerId2, false));
        });
    }

    return quiz;
};

export const shouldVisibleExplanation = (kind: QuizType) => {
    const blackList: QuizType[] = [QuizType.QUIZ_TYPE_TAD, QuizType.QUIZ_TYPE_POW];
    return !blackList.includes(kind);
};

const shouldStrictFillAllAnswers = (kind: QuizType) => {
    const blackList: QuizType[] = [
        QuizType.QUIZ_TYPE_MCQ,
        QuizType.QUIZ_TYPE_TAD,
        QuizType.QUIZ_TYPE_POW,
        QuizType.QUIZ_TYPE_FIB,
        QuizType.QUIZ_TYPE_MAQ,
    ];
    return blackList.includes(kind);
};

const shouldStrictFillExplanation = (kind: QuizType) => {
    const blackList: QuizType[] = [QuizType.QUIZ_TYPE_MIQ];
    return blackList.includes(kind);
};

const isEmptyQuizContent = (answer: Option) => !answer.content.getCurrentContent().getPlainText();

const verifyFillAnswers = (answers: Answer[], min?: number) => {
    const size = answers.length;

    let fillCounter: number = 0;
    for (let i = 0; i < size; i++) {
        if (isEmptyQuizContent(answers[i])) {
            if (typeof min === "undefined")
                throw new AppError("ra.manabie-error.quiz.missingAnswers");
        } else {
            fillCounter++;
        }

        if (fillCounter === min) return true;
    }
    if (typeof min === "number" && fillCounter < min)
        throw new AppError("ra.manabie-error.quiz.missingAnswers");
};

export const getMainAnswersFIB = (answers: Answer[]): Answer[] => {
    let collections: { [groupKey: string]: boolean } = {};
    return answers.filter((currentAsr) => {
        if (!currentAsr.groupKey) return false;

        if (collections[currentAsr.groupKey]) return false;

        collections[currentAsr.groupKey] = true;
        return true;
    });
};
const verifyFillExplanation = (explanation: ExplanationField) => {
    if (isEmptyQuizContent(explanation))
        throw new AppError("ra.manabie-error.quiz.missingExplanation");
};

export const hasMultiCorrectAnswer = (kind: QuizType) => {
    const whiteList: QuizType[] = [QuizType.QUIZ_TYPE_MAQ];
    return whiteList.includes(kind);
};

export const hasAnswerSetting = (kind: QuizType) => {
    const types: QuizType[] = [QuizType.QUIZ_TYPE_MAQ, QuizType.QUIZ_TYPE_FIB];
    return types.includes(kind);
};

export const validateQuiz = (quiz: Quiz) => {
    if (!quiz.externalId) {
        throw new AppError("ra.manabie-error.quiz.missingQuizId");
    }

    if (isEditorContentEmpty(quiz.question.content.getCurrentContent())) {
        throw new AppError("ra.manabie-error.quiz.missingQuestionContent");
    }

    if (quiz.kind !== QuizType.QUIZ_TYPE_MIQ && quiz.answer.list.size === 0) {
        throw new AppError("ra.manabie-error.quiz.missingAnswers");
    }

    const answers = Array.from(quiz.answer.list.values());

    // Verify definition field
    if (shouldStrictFillAllAnswers(quiz.kind)) {
        verifyFillAnswers(answers);
    }

    if (shouldStrictFillExplanation(quiz.kind)) {
        verifyFillExplanation(quiz.explanation);
    }

    if (!answers.find((e) => e.correct)) {
        // Find if there are any correct answer
        throw new AppError("ra.manabie-error.quiz.thereIsNoCorrectAnswer");
    }

    if (answers.find((e) => quiz.answer.labelType === LabelTypes.CUSTOM && e.label === "")) {
        throw new AppError("ra.manabie-error.quiz.missingAnswerPrefix");
    }
};

export const toRemoteQuiz = (quiz: Quiz): { loId: string; quizCore: QuizCore } => {
    return {
        loId: quiz.loId as string,
        quizCore: toQuizCore(quiz),
    };
};

export const toQuizCore = (quiz: Quiz): QuizCore => {
    const quizCore = new QuizCore();
    const { question, answers, explanation } = selectInnerHTMLForQuiz(quiz);

    quizCore.setKind(quiz.kind);
    quizCore.setSchoolId(quiz.schoolId);
    if (arrayHasItem(quiz.taggedLOs)) {
        quizCore.setTaggedLosList(constructTaggedLOs(quiz.taggedLOs));
    }
    quizCore.setDifficultyLevel(quiz.difficultyLevel || 1);
    quizCore.setExternalId(quiz.externalId as string);
    quizCore.setOptionsList(constructAnswers(quiz.answer, answers));
    quizCore.setQuestion(toRichText(quiz.question.content, question));
    quizCore.setExplanation(toRichText(quiz.explanation.content, explanation));

    return quizCore;
};

export const constructTaggedLOs = (rawLOs: Quiz["taggedLOs"] = []) => {
    const result: string[] = [];

    //use for each instead of map, we dont want to add null or undefined to this array
    rawLOs.forEach((LO) => {
        if (typeof LO === "string") {
            result.push(LO);
        }

        if (typeof LO === "object" && LO !== null && LO.lo_id) {
            result.push(LO.lo_id);
        }
    });

    return result;
};

export const toRichText = (editorState: EditorState, innerHTML: string): RichText => {
    const richText = new RichText();

    richText.setRaw(JSON.stringify(convertToRaw(editorState.getCurrentContent())));
    richText.setRendered(innerHTML);

    return richText;
};

export const constructAnswers = (answerField: AnswerField, answerHTMLs: string[]) => {
    const answers: QuizOption[] = [];
    let currentIndex = 0;

    answerField.list.forEach((answer) => {
        const remoteAnswer = new QuizOption();
        const currentHTML = answerHTMLs[currentIndex] || "";

        remoteAnswer.setCorrectness(answer.correct);
        remoteAnswer.setConfigsList(answerField.configs);
        remoteAnswer.setLabel(answer.label);
        remoteAnswer.setContent(toRichText(answer.content, currentHTML));
        remoteAnswer.setKey(answer.groupKey);
        answers.push(remoteAnswer);
        currentIndex++;
    });

    return answers;
};

export const constructAnswersV2 = (answerField: AnswerField, answerHTMLs: string[]) => {
    const answers: QuizOptionV2[] = [];
    let currentIndex = 0;

    answerField.list.forEach((answer) => {
        const { correct, label, content, groupKey, attribute } = answer;

        const remoteAnswer = new QuizOptionV2();
        const currentHTML = answerHTMLs[currentIndex] || "";

        remoteAnswer.setCorrectness(correct);
        remoteAnswer.setConfigsList(answerField.configs);
        remoteAnswer.setLabel(label);
        remoteAnswer.setContent(toRichText(content, currentHTML));
        remoteAnswer.setKey(groupKey);

        if (attribute) {
            remoteAnswer.setAttribute(constructQuizAttribute(attribute));
        }
        answers.push(remoteAnswer);
        currentIndex++;
    });

    return answers;
};

export const constructQuizAttribute = (attr: QuizAttribute): QuizItemAttribute => {
    const { configs, audioLink, imgLink } = attr;

    const attribute = new QuizItemAttribute();
    attribute.setConfigsList(configs);

    if (audioLink) {
        attribute.setAudioLink(audioLink);
    }

    if (imgLink) {
        attribute.setImgLink(imgLink);
    }

    return attribute;
};

export enum QuizSelectors {
    question = "Quiz__question",
    answers = "Quiz__answers",
    settings = "Quiz__settings",
    explanation = "Quiz__explanation",
}

export const toTextFieldSelector = (selector: string) => {
    return `[data-js="${selector}"] [data-js="FillInBlank__input"] input`;
};

export const toDraftSelector = (selector: string) => {
    return `[data-js="${selector}"] .public-DraftEditor-content`;
};

const htmlProcessChooser: {
    [x in QuizType]: {
        selector: string;
        processor: (node: Element) => string;
    };
} = {
    [QuizType.QUIZ_TYPE_MCQ]: {
        selector: toDraftSelector(QuizSelectors.answers),
        processor(node: Element) {
            return node.innerHTML || "";
        },
    },
    [QuizType.QUIZ_TYPE_FIB]: {
        selector: toTextFieldSelector(QuizSelectors.answers),
        processor(node: Element) {
            return (node as HTMLInputElement).value || "";
        },
    },
    [QuizType.QUIZ_TYPE_POW]: {
        selector: toDraftSelector(QuizSelectors.answers),
        processor(node: Element) {
            return node.innerHTML || "";
        },
    },
    [QuizType.QUIZ_TYPE_TAD]: {
        selector: toDraftSelector(QuizSelectors.answers),
        processor(node: Element) {
            return node.innerHTML || "";
        },
    },
    [QuizType.QUIZ_TYPE_MIQ]: {
        selector: toDraftSelector(QuizSelectors.answers),
        processor(node: Element) {
            return node.innerHTML || "";
        },
    },
    [QuizType.QUIZ_TYPE_MAQ]: {
        selector: toDraftSelector(QuizSelectors.answers),
        processor(node: Element) {
            return node.innerHTML || "";
        },
    },
};

const selectAnswersHTML = (quizType: QuizType) => {
    let htmlProcessor = htmlProcessChooser[quizType];

    if (!htmlProcessor) {
        return [];
    }
    const { processor, selector } = htmlProcessor;

    return [...document.querySelectorAll(selector)].map(processor);
};

export const generatorHTMLForQuizOfFlashcard = ({
    questionContent,
    answerContentList,
}: {
    questionContent: Option;
    answerContentList: Option[];
}): InnerHTMLForQuiz => {
    const question = sanitizer.forDOM(
        createSimpleHtmlStringFromEditorState(questionContent.content)
    );
    const answers = answerContentList.map(({ content }) => {
        return sanitizer.forDOM(createSimpleHtmlStringFromEditorState(content));
    });

    return {
        explanation: "",
        question,
        answers,
    };
};

export const selectInnerHTMLForQuizzesNotFlashcard = (kind: QuizType): InnerHTMLForQuiz => {
    const questionHTML =
        document.querySelector(toDraftSelector(QuizSelectors.question))?.innerHTML || "";

    const answerHTMLs = selectAnswersHTML(kind);

    const explanationHTML =
        document.querySelector(toDraftSelector(QuizSelectors.explanation))?.innerHTML || "";

    return {
        question: sanitizer.forDOM(questionHTML),
        answers: answerHTMLs.map((answerHTML) => sanitizer.forDOM(answerHTML)),
        explanation: sanitizer.forDOM(explanationHTML),
    };
};

// To pass mock single module function
// https://github.com/facebook/jest/issues/11496
// https://github.com/facebook/jest/issues/9456
export const exportFunctions = {
    generatorHTMLForQuizOfFlashcard,
    selectInnerHTMLForQuizzesNotFlashcard,
};

export const selectInnerHTMLForQuiz = ({ kind, question, answer }: Quiz): InnerHTMLForQuiz => {
    switch (kind) {
        case QuizType.QUIZ_TYPE_POW: {
            return exportFunctions.generatorHTMLForQuizOfFlashcard({
                questionContent: question,
                answerContentList: Array.from(answer.list.values()),
            });
        }
        default: {
            return exportFunctions.selectInnerHTMLForQuizzesNotFlashcard(kind);
        }
    }
};

export const toRemoteQuizCoreV2 = (quiz: Quiz): QuizCoreV2 => {
    const { kind, attribute, quizId, schoolId } = quiz;
    const { question, answers, explanation } = selectInnerHTMLForQuiz(quiz);

    const quizCore = new QuizCoreV2();
    const contentInfo = new ContentBasicInfo();

    if (quizId) contentInfo.setId(quizId);

    contentInfo.setSchoolId(schoolId);

    quizCore.setInfo(contentInfo);
    quizCore.setExternalId(quiz.externalId);
    quizCore.setKind(kind);
    quizCore.setQuestion(toRichText(quiz.question.content, question));
    quizCore.setExplanation(toRichText(quiz.explanation.content, explanation));
    quizCore.setDifficultyLevel(quiz.difficultyLevel || 1);
    quizCore.setOptionsList(constructAnswersV2(quiz.answer, answers));

    if (arrayHasItem(quiz.taggedLOs)) {
        quizCore.setTaggedLosList(constructTaggedLOs(quiz.taggedLOs));
    }

    if (attribute) {
        quizCore.setAttribute(constructQuizAttribute(attribute));
    }

    return quizCore;
};

export const isQuizValid = (quiz: Quiz): boolean => {
    try {
        validateQuiz(quiz);
        return true;
    } catch (e: any) {
        logger.info("[Quiz invalid]", e);

        return false;
    }
};

export const regenerateAnswersLabel = (
    type: Quiz["answer"]["labelType"],
    answers: Draft<Quiz["answer"]["list"]>,
    quizType?: QuizType
) => {
    if (quizType === QuizType.QUIZ_TYPE_FIB) {
        regenerateAnswersLabelFIB(type, answers);
        return;
    }

    let currentIndex = 0;
    answers.forEach((answer) => {
        answer.label = generateLabel(type, currentIndex, answer.label);

        currentIndex++;
    });
};

export const regenerateAnswersLabelFIB = (
    type: Quiz["answer"]["labelType"],
    answers: Draft<Quiz["answer"]["list"]>
) => {
    let currentIndex = 0;
    let mainLabelCollection: { [groupAnswerId: string]: string } = {};
    answers.forEach((answer) => {
        if (!answer.groupKey) return;

        if (mainLabelCollection[answer.groupKey]) {
            answer.label = mainLabelCollection[answer.groupKey];
            return;
        }

        const label = generateLabel(type, currentIndex, answer.label);
        // For sub answer we need gen id with custom label
        mainLabelCollection[answer.groupKey] = label || genId();
        answer.label = label;

        currentIndex++;
    });
};
