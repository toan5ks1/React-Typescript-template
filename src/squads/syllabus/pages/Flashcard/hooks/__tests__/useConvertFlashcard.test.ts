import { convertToRaw } from "draft-js";
import { createEditorStateFromText } from "src/squads/syllabus/common/utils/draft-js";
import {
    Quiz,
    QuizHasura,
    QuizType,
    Answer,
    QuizItemAttributeConfig,
    QuizAttribute,
    getDefaultAnswerAttribute,
} from "src/squads/syllabus/models/quiz";

import { Flashcard } from "../../common/types";
import useConvertFlashcard, {
    UseConvertFlashcardValues,
    convertQuizToFlashcard,
    convertFlashcardToQuiz,
} from "../useConvertFlashcard";

import { renderHook, RenderHookResult } from "@testing-library/react-hooks";

jest.mock("src/squads/syllabus/internals/logger");

const mockData: QuizHasura[] = [
    {
        id: "1",
        approved_by: "1",
        quiz_id: "2",
        external_id: "2",
        kind: "QUIZ_TYPE_TAD",
        school_id: 1,
        question: {
            raw: JSON.stringify(
                convertToRaw(createEditorStateFromText("IT_IS_QUESTION_01").getCurrentContent())
            ),
            rendered_url: "url",
            attribute: {
                configs: ["FLASHCARD_LANGUAGE_CONFIG_JP"],
                audio_link: "question_audio_link",
                img_link: "flashcard_img_link",
            },
        },
        tagged_los: [],
        difficulty_level: 1,
        explanation: {
            raw: "",
            rendered_url: "url",
        },
        options: [
            {
                configs: [],
                key: "1",
                content: {
                    raw: JSON.stringify(
                        convertToRaw(
                            createEditorStateFromText("IT_IS_OPTION_01").getCurrentContent()
                        )
                    ),
                    rendered_url: "url",
                },
                correctness: true,
                label: "1",
            },
        ],
    },
    {
        id: "2",
        approved_by: "1",
        quiz_id: "2",
        external_id: "2",
        kind: "QUIZ_TYPE_POW",
        school_id: 1,
        question: {
            raw: JSON.stringify(
                convertToRaw(createEditorStateFromText("IT_IS_QUESTION").getCurrentContent())
            ),
            rendered_url: "url",
        },
        tagged_los: [],
        difficulty_level: 1,
        explanation: {
            raw: "",
            rendered_url: "url",
        },
        options: [
            {
                configs: [],
                key: "1",
                content: {
                    raw: JSON.stringify(
                        convertToRaw(
                            createEditorStateFromText("IT_IS_QUESTION").getCurrentContent()
                        )
                    ),
                    rendered_url: "url",
                },
                correctness: true,
                label: "1",
            },
        ],
    },
];

describe(useConvertFlashcard.name, () => {
    let convertFlashcardHook: RenderHookResult<null, UseConvertFlashcardValues>;
    beforeEach(() => {
        convertFlashcardHook = renderHook(() => useConvertFlashcard());
    });

    it("should create flashcard it draft with type is term and definition", () => {
        const { createEmptyFlashcard } = convertFlashcardHook.result.current;
        const emptyFlashcard = createEmptyFlashcard({
            schoolId: 12,
            loId: "loId",
        });

        expect(emptyFlashcard.draft).toBe(true);
        expect(emptyFlashcard.kind).toEqual(QuizType.QUIZ_TYPE_POW);
    });

    it("should create flashcard term language is english and definition is japanese", () => {
        const { createEmptyFlashcard } = convertFlashcardHook.result.current;
        const emptyFlashcard = createEmptyFlashcard({
            schoolId: 12,
            loId: "loId",
        });

        expect(emptyFlashcard.termLanguage).toEqual(
            QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG
        );

        expect(emptyFlashcard.definitionLanguage).toEqual(
            QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_JP
        );
    });

    it("should return list match with list Quiz from query", () => {
        const { convertQuizToArrayForm } = convertFlashcardHook.result.current;

        const flashcard = convertQuizToArrayForm(mockData, "loId_test");

        expect(flashcard).toHaveLength(mockData.length);
    });
});

describe(`${convertQuizToFlashcard.name} convert quiz to the Flashcard`, () => {
    const questionText = "This_is_question_content";
    const answerText = "This_is_answer_content";

    const answerBase: Answer = {
        configs: [],
        correct: true,
        content: createEditorStateFromText(answerText),
        groupKey: "groupKey_01",
        id: "id_01",
        label: "",
        rects: [],
        attribute: getDefaultAnswerAttribute(),
    };

    const quizBase: Quiz = {
        explanation: {
            content: createEditorStateFromText(""),
            rects: [],
        },
        loId: "lo_id_01",
        externalId: "externalId_01_any",
        kind: QuizType.QUIZ_TYPE_TAD,
        quizId: "quiz_id_002",
        question: {
            content: createEditorStateFromText(questionText),
            rects: [],
        },
        schoolId: 12,
        answer: {
            configs: [],
            labelType: null,
            list: new Map<string, Answer>(),
        },
        attribute: getDefaultAnswerAttribute(),
    };

    it("should return undefined when answer list is empty", () => {
        const flashcard = convertQuizToFlashcard(quizBase, quizBase.loId);

        expect(flashcard).toBeUndefined();
    });

    it("should return flashcard image", () => {
        const quiz: Quiz = {
            ...quizBase,
            attribute: {
                configs: [],
                imgLink: "image_link_src_01",
            },
            answer: {
                configs: [],
                labelType: null,
                list: new Map<string, Answer>().set("1", answerBase),
            },
        };
        const flashcard = convertQuizToFlashcard(quiz, quiz.loId);

        expect(flashcard).toHaveProperty("image", quiz.attribute?.imgLink);
    });

    it("should return flashcard is revert of quiz", () => {
        const answer: Answer = {
            ...answerBase,
            attribute: {
                configs: [QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_JP],
                audioLink: "audioLink_A",
            },
        };
        const quiz: Quiz = {
            ...quizBase,
            attribute: {
                configs: [QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG],
                imgLink: "image_link_src",
                audioLink: "audioLink_B",
            },
            answer: {
                configs: [],
                labelType: null,
                list: new Map<string, Answer>().set("1", answer),
            },
        };
        const flashcard = convertQuizToFlashcard(quiz, quiz.loId);

        const flashcardExpect: Flashcard = {
            schoolId: quiz.schoolId,
            quizId: quiz.quizId,
            loId: quiz.loId,
            kind: QuizType.QUIZ_TYPE_POW,
            image: quiz.attribute?.imgLink,
            difficultyLevel: undefined,
            externalId: quiz.externalId,

            // Expect swap here
            definition: questionText,
            term: answerText,
            definitionLanguage: quiz.attribute?.configs[0],
            definitionAudio: quiz.attribute?.audioLink,
            termAudio: answer.attribute?.audioLink,
            termLanguage: answer.attribute?.configs[0],
        };

        expect(flashcard).toEqual(flashcardExpect);
    });
});

describe(convertFlashcardToQuiz.name, () => {
    const flashcard: Flashcard = {
        definition: "Definition_text",
        externalId: "externalId_01",
        kind: QuizType.QUIZ_TYPE_MAQ,
        loId: "lo_01",
        schoolId: 12,
        term: "Term_text",
        termAudio: "Term_audio",
        definitionAudio: "Definition_audio",
        image: "Image_src",
        definitionLanguage: QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG,
        termLanguage: QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_JP,
    };

    let quiz: Quiz;
    let firstAnswer: Answer;
    beforeEach(() => {
        quiz = convertFlashcardToQuiz(flashcard);
        firstAnswer = Array.from(quiz.answer.list.values())[0];
    });

    it("should return attribute of quiz from definition", () => {
        expect(quiz.attribute).toEqual<QuizAttribute>({
            configs: [flashcard.definitionLanguage || 0],
            imgLink: flashcard.image,
            audioLink: flashcard.definitionAudio,
        });
    });

    it("should return attribute of answer from term", () => {
        expect(firstAnswer.attribute).toEqual<QuizAttribute>({
            configs: [flashcard.termLanguage || 0],
            audioLink: flashcard.termAudio,
            imgLink: "",
        });
    });

    it("should generator question from definition", () => {
        const questionText = quiz.question.content.getCurrentContent().getPlainText();

        expect(questionText).toEqual(flashcard.definition);
    });

    it("should generator answer from term", () => {
        const answerText = firstAnswer.content.getCurrentContent().getPlainText();

        expect(answerText).toEqual(flashcard.term);
    });

    it("should return quiz with type is POW(Pair Of World)", () => {
        expect(quiz.kind).toEqual(QuizType.QUIZ_TYPE_POW);
    });
});
