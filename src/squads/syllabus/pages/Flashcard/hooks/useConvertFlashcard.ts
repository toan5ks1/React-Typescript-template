import { useCallback } from "react";

import { EditorState } from "draft-js";
import { createEditorStateFromText } from "src/squads/syllabus/common/utils/draft-js";
import { genId } from "src/squads/syllabus/common/utils/generator";
import logger from "src/squads/syllabus/internals/logger";
import {
    Answer,
    AnswerField,
    convertQuizHasuraToQuiz,
    CreateEmptyQuizParams,
    createQuizBaseInfo,
    Quiz,
    QuizType,
} from "src/squads/syllabus/models/quiz";
import { QuizzesManyByLearningObjectIdQuery } from "src/squads/syllabus/services/eureka/eureka-types";

import { QuizItemAttributeConfig } from "manabuf/common/v1/contents_pb";

import { Flashcard } from "../common/types";

export interface UseConvertFlashcardValues {
    createEmptyFlashcard: (baseInfo: Omit<CreateEmptyQuizParams, "isLo">) => Flashcard;
    convertQuizToArrayForm: (
        data: Omit<QuizzesManyByLearningObjectIdQuery["find_quiz_by_lo_id"][0], "country">[],
        loId: string
    ) => Flashcard[];
}

const defaultTermLanguage: QuizItemAttributeConfig =
    QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG;
const defaultDefinitionLanguage = QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_JP;

export const convertFlashcardToQuiz = (flashcard: Flashcard): Quiz => {
    const {
        loId,
        quizId,
        externalId,
        schoolId,
        difficultyLevel,
        image,
        term,
        definition,
        definitionLanguage = defaultTermLanguage,
        termLanguage = defaultDefinitionLanguage,
        termAudio,
        definitionAudio,
    } = flashcard;

    const answers: AnswerField["list"] = new Map<string, Answer>();

    const fakeId = genId();
    const answer: Answer = {
        configs: [],
        rects: [],
        correct: true,
        groupKey: fakeId,
        content: createEditorStateFromText(term || ""),
        id: fakeId,
        label: "",
        attribute: {
            imgLink: "",
            audioLink: termAudio,
            configs: [termLanguage],
        },
    };

    answers.set(fakeId, answer);

    const quiz: Quiz = {
        quizId,
        loId,
        externalId,
        schoolId,
        difficultyLevel,
        kind: QuizType.QUIZ_TYPE_POW,
        explanation: {
            content: EditorState.createEmpty(),
            rects: [],
        },
        question: {
            content: createEditorStateFromText(definition || ""),
            rects: [],
        },
        answer: {
            configs: [],
            labelType: null,
            list: answers,
        },
        attribute: {
            imgLink: image || "",
            audioLink: definitionAudio,
            configs: [definitionLanguage],
        },
    };

    return quiz;
};

export const convertQuizToFlashcard = (quiz: Quiz, loId: string): Flashcard | undefined => {
    let flashcard: Flashcard | undefined = undefined;
    const {
        question,
        answer,
        difficultyLevel,
        schoolId,
        quizId,
        externalId,
        attribute = {
            configs: [],
            imgLink: undefined,
            audioLink: undefined,
        },
    } = quiz;
    try {
        const term = question.content.getCurrentContent().getPlainText();
        const definition = Array.from(answer.list.values())[0];

        const {
            content,
            attribute: attributeDefinition = {
                configs: [],
            },
        } = definition;

        const definitionText = content.getCurrentContent().getPlainText();

        const { imgLink: image, audioLink, configs } = attribute;
        const flashcardInfos: Flashcard = {
            difficultyLevel,
            schoolId,
            quizId,
            externalId,
            loId,
            image,
            kind: QuizType.QUIZ_TYPE_POW,
            // Term is first option, Definition is question so we must be swap data
            term: definitionText,
            definition: term,
            termLanguage: attributeDefinition.configs[0] || defaultTermLanguage,
            definitionLanguage: configs[0] || defaultDefinitionLanguage,
            termAudio: attributeDefinition.audioLink,
            definitionAudio: audioLink,
        };
        flashcard = flashcardInfos;
    } catch (error) {
        logger.warn("[convertQuizToFlashcard]", error);
    }

    return flashcard;
};

const useConvertFlashcard = (): UseConvertFlashcardValues => {
    const createEmptyFlashcard: UseConvertFlashcardValues["createEmptyFlashcard"] = useCallback(
        ({ schoolId, loId }) => {
            const baseInfo = createQuizBaseInfo({
                schoolId,
                kind: QuizType.QUIZ_TYPE_POW,
                loId,
                isLo: false,
            });
            const flashcard: Flashcard = {
                ...baseInfo,
                term: "",
                definition: "",
                draft: true,
                termLanguage: defaultTermLanguage,
                definitionLanguage: defaultDefinitionLanguage,
            };
            return flashcard;
        },
        []
    );

    const convertQuizToArrayForm: UseConvertFlashcardValues["convertQuizToArrayForm"] = useCallback(
        (data, loId) => {
            const quizzes = data.map((quiz) => convertQuizHasuraToQuiz(quiz, loId));

            const flashcards: Flashcard[] = [];
            quizzes.forEach((quiz) => {
                const flashcard = convertQuizToFlashcard(quiz, loId);
                if (flashcard) {
                    flashcards.push(flashcard);
                }
            });
            return flashcards;
        },
        []
    );

    return { convertQuizToArrayForm, createEmptyFlashcard };
};

export default useConvertFlashcard;
