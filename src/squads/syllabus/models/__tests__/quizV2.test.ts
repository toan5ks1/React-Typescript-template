import { EditorState } from "draft-js";
import { createEditorStateFromText, createRawFromEditorState } from "src/common/utils/draft-js";

import { convertAttributeHasuraToQuizAttribute } from "../quiz";
import QuizV2, {
    createEmptyQuizV2,
    QuizAttribute,
    QuizType,
    QuizItemAttributeConfig,
    convertAnswerHasuraToQuizAnswerV2,
    QuizOptionHasura,
    Answer,
    QuizOptionConfig,
    convertQuizHasuraToQuizV2,
    QuizHasura,
    QuizAttributeHasura,
} from "../quizV2";

describe(createEmptyQuizV2.name, () => {
    it("should create quiz with one answer with type is manual input question", () => {
        const quiz = createEmptyQuizV2({
            kind: QuizType.QUIZ_TYPE_FIB,
            loId: "2",
            isLo: true,

            schoolId: 1,
        });
        expect(quiz.answer.list.length).toEqual(1);
    });
});

describe(convertAnswerHasuraToQuizAnswerV2.name, () => {
    const baseOption: QuizOptionHasura = {
        configs: ["QUIZ_OPTION_CONFIG_PARTIAL_CREDIT", "QUIZ_OPTION_CONFIG_CASE_SENSITIVE"],
        correctness: false,
        key: "12",
        label: "D",
        content: { raw: "", rendered_url: "rendered_url" },
    };

    const getFirstAnswerConverted = (
        options: QuizOptionHasura[]
    ): { firstAnswer: Answer; content: EditorState } => {
        const firstAnswer = Array.from(convertAnswerHasuraToQuizAnswerV2(options).values())[0];
        const content = EditorState.createEmpty();

        firstAnswer.id = "fakeId";
        firstAnswer.content = content;

        return { firstAnswer, content };
    };

    it("should return quiz option with empty attribute", () => {
        const { firstAnswer, content } = getFirstAnswerConverted([baseOption]);

        expect(firstAnswer).toEqual<Answer>({
            configs: [
                QuizOptionConfig.QUIZ_OPTION_CONFIG_PARTIAL_CREDIT,
                QuizOptionConfig.QUIZ_OPTION_CONFIG_CASE_SENSITIVE,
            ],
            content,
            correct: false,
            groupKey: "12",
            id: "fakeId",
            label: "D",
            rects: [],
            attribute: {
                configs: [],
            },
        });
    });

    it("should return quiz option attribute", () => {
        const option: QuizOptionHasura = {
            ...baseOption,
            configs: [],
            correctness: true,
            attribute: {
                img_link: "img_link_src",
                audio_link: "audio_link_any_src",
                configs: ["FLASHCARD_LANGUAGE_CONFIG_ENG"],
            },
        };
        const { firstAnswer, content } = getFirstAnswerConverted([option]);

        expect(firstAnswer).toEqual<Answer>({
            configs: [],
            content,
            correct: true,
            groupKey: "12",
            id: "fakeId",
            label: "D",
            rects: [],
            attribute: {
                configs: [QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG],
                audioLink: option.attribute?.audio_link,
                imgLink: option.attribute?.img_link,
            },
        });
    });
});

describe(convertQuizHasuraToQuizV2.name, () => {
    interface QuizInfo extends Omit<QuizV2, "explanation" | "options" | "question" | "answer"> {}

    const questionState = createEditorStateFromText("Question");
    const explainState = createEditorStateFromText("");
    const optionOneState = createEditorStateFromText("Option_01");
    const loId = "lo_id_01";

    const quizHasuraBase: QuizHasura = {
        approved_by: "approved_by_01",
        difficulty_level: 1,
        explanation: {
            raw: JSON.stringify(createRawFromEditorState(explainState)),
            rendered_url: "",
        },
        external_id: "external_id_01",
        id: "id_01",
        kind: "QUIZ_TYPE_MIQ",
        options: [
            {
                configs: [],
                content: {
                    raw: JSON.stringify(createRawFromEditorState(optionOneState)),
                    rendered_url: "",
                },
                correctness: true,
                label: "A",
                key: "option_key_01",
            },
        ],
        question: {
            raw: JSON.stringify(createRawFromEditorState(questionState)),
            rendered_url: "",
        },
        quiz_id: "id_01",
        school_id: 12,
        tagged_los: ["lo_01", "lo_09"],
    };

    it("should return quiz info when question don't have attribute", () => {
        const quiz = convertQuizHasuraToQuizV2(quizHasuraBase, loId);
        const { answer, explanation, question, ...quizInfo } = quiz;

        expect(quizInfo).toEqual<QuizInfo>({
            loId,
            schoolId: quizHasuraBase.school_id,
            externalId: quizHasuraBase.external_id,
            attribute: convertAttributeHasuraToQuizAttribute(undefined),
            difficultyLevel: quizHasuraBase.difficulty_level,
            kind: QuizType[quizHasuraBase.kind],
            quizId: quizHasuraBase.quiz_id,
            taggedLOs: quizHasuraBase.tagged_los,
        });
    });

    it("should return quiz attribute when content have attribute", () => {
        const quizHasura: QuizHasura = {
            ...quizHasuraBase,
            question: {
                ...quizHasuraBase.question,
                attribute: {
                    configs: ["FLASHCARD_LANGUAGE_CONFIG_JP"],
                    audio_link: "audio_link_src",
                    img_link: "img_link_src",
                },
            },
        };
        const quiz = convertQuizHasuraToQuizV2(quizHasura, loId);

        expect(quiz.attribute).toEqual<QuizAttribute>({
            configs: [QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_JP],
            audioLink: "audio_link_src",
            imgLink: "img_link_src",
        });
    });

    it("should return option attribute when option have attribute", () => {
        const attribute: QuizAttributeHasura = {
            configs: ["FLASHCARD_LANGUAGE_CONFIG_ENG"],
            audio_link: "audio_link_src",
            img_link: "img_link_src",
        };
        const quizHasura: QuizHasura = {
            ...quizHasuraBase,
            options: [
                {
                    ...quizHasuraBase.options[0],
                    attribute,
                },
            ],
        };
        const quiz = convertQuizHasuraToQuizV2(quizHasura, loId);

        expect(Array.from(quiz.answer.list.values())[0].attribute).toEqual<QuizAttribute>({
            configs: [QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG],
            imgLink: attribute.img_link,
            audioLink: attribute.audio_link,
        });
    });
});
