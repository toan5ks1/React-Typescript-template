import { ContentState, EditorState } from "draft-js";
import { LabelTypes } from "src/common/utils/label-generator";
import {
    createEditorStateFromText,
    createRawFromEditorState,
} from "src/squads/syllabus/common/utils/draft-js";
import { genId } from "src/squads/syllabus/common/utils/generator";
import { mockAnswerAttribute } from "src/squads/syllabus/test-utils/quiz";

import { QuizItemAttributeConfig } from "manabuf/common/v1/contents_pb";

import {
    Answer,
    AnswerField,
    constructAnswersV2,
    constructTaggedLOs,
    convertAnswerHasuraToQuizAnswer,
    convertAttributeHasuraToQuizAttribute,
    convertQuizHasuraToQuiz,
    createAnswerMapFromArr,
    createEmptyAnswer,
    createEmptyQuiz,
    createPayloadToSend,
    exportFunctions,
    generatorHTMLForQuizOfFlashcard,
    getDefaultAnswerAttribute,
    getMainAnswersFIB,
    isQuizValid,
    Quiz,
    QuizAttribute,
    QuizAttributeHasura,
    QuizHasura,
    QuizOptionConfig,
    QuizOptionHasura,
    QuizType,
    regenerateAnswersLabel,
    selectInnerHTMLForQuiz,
} from "../quiz";
import { LOWithQuizSet } from "../quizset-lo";

describe(isQuizValid.name, () => {
    const answerId = "answerId";
    let exampleQuiz = createEmptyQuiz({
        loId: "2",
        schoolId: 1,
        isLo: true,
        kind: QuizType.QUIZ_TYPE_FIB,
    });

    beforeEach(() => {
        //fill empty quiz with valid data
        exampleQuiz.externalId = "123";

        exampleQuiz.question.content = EditorState.createWithContent(
            ContentState.createFromText("question")
        );

        const answer = createEmptyAnswer(answerId, true); // default to correct answer first
        answer.content = EditorState.createWithContent(ContentState.createFromText("answer"));
        exampleQuiz.answer.list.clear();
        exampleQuiz.answer.list.set(answerId, answer);

        expect(isQuizValid(exampleQuiz)).toEqual(true);
    });

    it("should return `false` if do not have external id", () => {
        exampleQuiz.externalId = "";

        expect(isQuizValid(exampleQuiz)).toEqual(false);
    });

    it("should return `false` if question is empty", () => {
        exampleQuiz.question.content = EditorState.createEmpty();

        expect(isQuizValid(exampleQuiz)).toEqual(false);
    });

    it("should return `false` if do not have any answers", () => {
        exampleQuiz.answer.list = new Map();

        expect(isQuizValid(exampleQuiz)).toEqual(false);
    });

    it("should return `false` if do not have any answer", () => {
        exampleQuiz.answer.list = new Map();

        expect(isQuizValid(exampleQuiz)).toEqual(false);
    });

    it("should return `false` if do not have any correct answer on multiple choice type", () => {
        expect(isQuizValid(exampleQuiz)).toEqual(true);

        exampleQuiz.answer.list = new Map();
        exampleQuiz.answer.list.set(answerId, createEmptyAnswer(answerId, false)); //we only have 1 answer and it is incorrect

        expect(isQuizValid(exampleQuiz)).toEqual(false);
    });
});

describe(regenerateAnswersLabel.name, () => {
    const answerId = "123";
    const answerMap = createAnswerMapFromArr([createEmptyAnswer(answerId)]);

    it("should generate correct UPPERCASE label for answer map", () => {
        regenerateAnswersLabel(LabelTypes.TEXT_UPPERCASE, answerMap);

        expect(answerMap.get(answerId)!.label).toEqual("A");
    });

    it("should generate correct LOWERCASE label for answer map", () => {
        regenerateAnswersLabel(LabelTypes.TEXT, answerMap);

        expect(answerMap.get(answerId)!.label).toEqual("a");
    });

    it("should generate correct NUMBER label for answer map", () => {
        regenerateAnswersLabel(LabelTypes.NUMBER, answerMap);

        expect(answerMap.get(answerId)!.label).toEqual("1");
    });

    it("should generate correct CUSTOM label for answer map", () => {
        answerMap.get(answerId)!.label = "xyz";

        regenerateAnswersLabel(LabelTypes.CUSTOM, answerMap); //type custom will keep the label
    });
});

describe(constructTaggedLOs.name, () => {
    it("should return correct LO list", () => {
        expect(constructTaggedLOs(["123", { lo_id: "321" } as LOWithQuizSet])).toEqual([
            "123",
            "321",
        ]);
    });
});

describe(createEmptyQuiz.name, () => {
    it("should create quiz with one answer with type is manual input question", () => {
        const quiz = createEmptyQuiz({
            kind: QuizType.QUIZ_TYPE_FIB,
            loId: "2",
            isLo: true,

            schoolId: 1,
        });
        expect(quiz.answer.list.size).toEqual(1);
    });
});

describe(createPayloadToSend.name, () => {
    const exampleQuiz = createEmptyQuiz({
        kind: QuizType.QUIZ_TYPE_MIQ,
        loId: "2",
        isLo: true,

        schoolId: 1,
    });

    it("should have 2 answers with type is manual input question", () => {
        const payload = createPayloadToSend(exampleQuiz);
        expect(payload.answer.list.size).toEqual(2);
    });
});

describe(getMainAnswersFIB.name, () => {
    const exampleQuiz = createEmptyQuiz({
        kind: QuizType.QUIZ_TYPE_FIB,
        loId: "2",
        isLo: true,

        schoolId: 1,
    });
    const groupKeyAnswer1 = genId();
    const groupKeyAnswer2 = genId();

    const answer1 = createEmptyAnswer("1", true, groupKeyAnswer1);

    const answer2 = createEmptyAnswer("2", true, groupKeyAnswer2);

    const alternativeAsrOf1 = createEmptyAnswer("3", true, groupKeyAnswer1);

    exampleQuiz.answer.list.set("1", answer1);
    exampleQuiz.answer.list.set("2", answer2);
    exampleQuiz.answer.list.set("3", alternativeAsrOf1);

    it("should get all main answer without alternative answer", () => {
        expect(getMainAnswersFIB([...exampleQuiz.answer.list.values()])).toHaveLength(3);
    });
});

describe(convertAttributeHasuraToQuizAttribute.name, () => {
    it("should return attribute when configs is empty array", () => {
        const result = convertAttributeHasuraToQuizAttribute({ configs: [], img_link: "img_link" });
        expect(result).toEqual<QuizAttribute>({ configs: [], imgLink: "img_link" });
    });

    it("should return attribute when missing configs field", () => {
        // @ts-ignore I want configs field is missing
        const result = convertAttributeHasuraToQuizAttribute({ img_link: "img_link" });
        expect(result).toEqual<QuizAttribute>({ configs: [], imgLink: "img_link" });
    });

    it("should return empty attribute when input is null list", () => {
        const result = convertAttributeHasuraToQuizAttribute();
        expect(result).toEqual<QuizAttribute>({ configs: [] });
    });

    it("should return attribute", () => {
        const result = convertAttributeHasuraToQuizAttribute({
            img_link: "img_link",
            audio_link: "audio_link",
            configs: ["FLASHCARD_LANGUAGE_CONFIG_ENG"],
        });
        expect(result).toEqual<QuizAttribute>({
            configs: [QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG],
            imgLink: "img_link",
            audioLink: "audio_link",
        });
    });
});

describe(convertAnswerHasuraToQuizAnswer.name, () => {
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
        const firstAnswer = Array.from(convertAnswerHasuraToQuizAnswer(options).values())[0];
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

describe(convertQuizHasuraToQuiz.name, () => {
    interface QuizInfo extends Omit<Quiz, "explanation" | "options" | "question" | "answer"> {}

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
        const quiz = convertQuizHasuraToQuiz(quizHasuraBase, loId);
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
        const quiz = convertQuizHasuraToQuiz(quizHasura, loId);

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
        const quiz = convertQuizHasuraToQuiz(quizHasura, loId);

        expect(Array.from(quiz.answer.list.values())[0].attribute).toEqual<QuizAttribute>({
            configs: [QuizItemAttributeConfig.FLASHCARD_LANGUAGE_CONFIG_ENG],
            imgLink: attribute.img_link,
            audioLink: attribute.audio_link,
        });
    });
});

describe(generatorHTMLForQuizOfFlashcard.name, () => {
    const questionTest = "This is question";
    const answerText = "This is answer any";
    const questionEditor = createEditorStateFromText(questionTest);

    it("should return html string", () => {
        const { explanation, answers, question } = generatorHTMLForQuizOfFlashcard({
            questionContent: {
                content: questionEditor,
                rects: [],
            },
            answerContentList: [
                {
                    content: createEditorStateFromText(answerText),
                    rects: [],
                },
            ],
        });

        expect(explanation).toEqual("");
        expect(question).toContain(questionTest);

        answers.forEach((answer) => {
            expect(answer).toContain(answerText);
        });
    });
});

describe(selectInnerHTMLForQuiz.name, () => {
    const quiz = createEmptyQuiz({
        kind: QuizType.QUIZ_TYPE_POW,
        loId: "loId",
        isLo: false,
        schoolId: 12,
    });

    it("should call generatorHTMLForQuizOfFlashcard when quiz type is POW(Pair Of Word)", () => {
        const generatorHTMLForQuizOfFlashcardMock = jest.fn();

        const original = exportFunctions.generatorHTMLForQuizOfFlashcard;

        exportFunctions.generatorHTMLForQuizOfFlashcard = generatorHTMLForQuizOfFlashcardMock;

        selectInnerHTMLForQuiz({ ...quiz, kind: QuizType.QUIZ_TYPE_POW });

        expect(exportFunctions.generatorHTMLForQuizOfFlashcard).toBeCalled();

        exportFunctions.generatorHTMLForQuizOfFlashcard = original;
    });

    it("should call selectInnerHTMLForQuizzesNotFlashcard when quiz type not a POW(Pair Of Word)", () => {
        const selectInnerHTMLForQuizzesNotFlashcardMock = jest.fn();

        const original = exportFunctions.selectInnerHTMLForQuizzesNotFlashcard;

        exportFunctions.selectInnerHTMLForQuizzesNotFlashcard =
            selectInnerHTMLForQuizzesNotFlashcardMock;

        selectInnerHTMLForQuiz({ ...quiz, kind: QuizType.QUIZ_TYPE_MAQ });

        expect(exportFunctions.selectInnerHTMLForQuizzesNotFlashcard).toBeCalled();

        exportFunctions.selectInnerHTMLForQuizzesNotFlashcard = original;
    });
});

describe(constructAnswersV2.name, () => {
    const answerHTMLs: string[] = [""];
    const answerOne = createEmptyAnswer("ID-1", true);
    const answerTwo = createEmptyAnswer("ID-2", false);

    it("should set config for each answer by config in answers", () => {
        const answers: AnswerField["list"] = new Map();

        answers.set(answerOne.id, answerOne);
        answers.set(answerTwo.id, answerTwo);

        const answerField: AnswerField = {
            configs: [QuizOptionConfig.QUIZ_OPTION_CONFIG_CASE_SENSITIVE],
            labelType: LabelTypes.CUSTOM,
            list: answers,
        };

        const result = constructAnswersV2(answerField, answerHTMLs);

        const configOfAllAnswerIns = result.map((ans) => ans.getConfigsList());

        const configOfAnswer = answerField.configs;

        expect(configOfAllAnswerIns).toEqual(Array.from(answers).map(() => configOfAnswer));
    });
});

describe(createEmptyAnswer.name, () => {
    it("should auto gen groupId when not passed", () => {
        const answer = createEmptyAnswer("ID");
        expect(answer.groupKey.length).toBeGreaterThan(5);
    });

    it("should create answer by default value for properties (attribute, configs, correct)", () => {
        const { attribute, configs, correct } = createEmptyAnswer("ID");

        expect(attribute).toEqual(getDefaultAnswerAttribute());

        expect(correct).toEqual(false);

        expect(configs).toEqual([]);

        // TODO: Check content, rect
        // expect({ content, rects });
    });

    it("should create answer by override props (attribute, groupKey, correct, id)", () => {
        const mockAnswerId = "answerId";
        const mockCorrect = true;
        const mockGroupKey = "groupKey";
        const mockAttribute: QuizAttribute = mockAnswerAttribute({
            configs: [QuizItemAttributeConfig.LANGUAGE_CONFIG_ENG],
        });

        const answer = createEmptyAnswer(mockAnswerId, mockCorrect, mockGroupKey, mockAttribute);

        expect(answer.id).toEqual(mockAnswerId);
        expect(answer.correct).toEqual(mockCorrect);
        expect(answer.groupKey).toEqual(mockGroupKey);
        expect(answer.attribute).toEqual(mockAttribute);
    });
});

describe(getDefaultAnswerAttribute.name, () => {
    it("should create attribute with correct default values", () => {
        expect(getDefaultAnswerAttribute()).toEqual({
            configs: [],
        });
    });
});
