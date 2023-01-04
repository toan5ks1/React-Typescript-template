import { LabelTypes } from "src/common/utils/label-generator";
import {
    createEmptyAnswer,
    createEmptyQuiz,
    DifficultyLevels,
    isQuizFIB,
    QuizOptionConfig,
    QuizType,
} from "src/squads/syllabus/models/quiz";
import { createEmptyLO } from "src/squads/syllabus/test-utils/lo";
import { createMockQuizState, mockCreateQuiz } from "src/squads/syllabus/test-utils/quiz";
import { $enum } from "ts-enum-util";

import { QuizItemAttributeConfig } from "manabuf/common/v1/contents_pb";

import { NsQuizAction, QuizActions, QuizActionTypes } from "../actions";
import { QuizState } from "../quiz-types";
import reducer, { initialState } from "../reducer";

const getStateAlreadyHasQuiz = (kind?: QuizType): QuizState => {
    return {
        ...initialState,
        quizzes: [
            mockCreateQuiz({
                kind,
            }),
        ],
        currentQuizIndex: 0,
    };
};

const testCasesByQuizType = $enum(QuizType).getKeys();
const testCasesAddNewAnswer = $enum(QuizType)
    .getKeys()
    .filter((quizType) => {
        return QuizType[quizType] !== QuizType.QUIZ_TYPE_MIQ;
    });

describe("Quiz reducer", () => {
    test(QuizActionTypes.SET_QUIZ_ON_REVIEW, () => {
        const aQuiz = createEmptyQuiz({
            loId: "",
            schoolId: 1,
            isLo: false,
        });

        const state = reducer(getStateAlreadyHasQuiz(), QuizActions.setQuizOnReview(aQuiz));
        expect(state.quizOnReview).toEqual(aQuiz);

        const state1 = reducer(getStateAlreadyHasQuiz(), QuizActions.setQuizOnReview(null));
        expect(state1.quizOnReview).toEqual(null);
    });

    test(QuizActionTypes.SET_PDF_URL, () => {
        const url = "This is pdf url";

        const state = reducer(initialState, QuizActions.setPdfUrl({ url }));
        expect(state.pdfUrl).toEqual(url);
    });

    test(QuizActionTypes.DELETE_ANSWER, () => {
        const answerId = "id";
        const answer = createEmptyAnswer(answerId);

        // add new answer then delete it
        const state = reducer(getStateAlreadyHasQuiz(), QuizActions.addNewAnswer({ answer }));
        const state1 = reducer(state, QuizActions.deleteAnswer(answer.id));

        expect(state1.quizzes[0]!.answer.list.has(answerId)).toEqual(false);
    });

    test(QuizActionTypes.CHANGE_EDITOR_STATE, () => {
        const answer = createEmptyAnswer("answerId");

        // add new answer then delete it
        const state = reducer(getStateAlreadyHasQuiz(), QuizActions.addNewAnswer({ answer }));
        const state1 = reducer(state, QuizActions.deleteAnswer(answer.id));

        expect(state1.quizzes[0]!.answer.list.has(answer.id)).toEqual(false);
    });

    describe(QuizActionTypes.CHANGE_CORRECT_ANSWER, () => {
        const answer = createEmptyAnswer("answerId");
        const answer1 = createEmptyAnswer("answerId1");
        it("should set one answer is correctly", () => {
            // add new answer then delete it
            const state = reducer(getStateAlreadyHasQuiz(), QuizActions.addNewAnswer({ answer }));
            const state1 = reducer(state, QuizActions.addNewAnswer({ answer: answer1 }));
            const state2 = reducer(state1, QuizActions.changeCorrectAnswer(answer1.id));

            expect(state2.quizzes[0]!.answer.list.get(answer1.id)!.correct).toEqual(true);
        });

        // user can set multiple answers are correctly
        it("should multiple answers are correctly", () => {
            let totalCorrectly = 0;
            const state = reducer(
                getStateAlreadyHasQuiz(QuizType.QUIZ_TYPE_MAQ),
                QuizActions.addNewAnswer({ answer })
            );

            // add more answer then set correctly by answerId
            const state1 = reducer(state, QuizActions.addNewAnswer({ answer: answer1 }));
            const state2 = reducer(state1, QuizActions.changeCorrectAnswer(answer.id, true));
            const state3 = reducer(state2, QuizActions.changeCorrectAnswer(answer1.id, true));

            // count total answers are correctly
            state3.quizzes[0].answer.list.forEach((asr) => {
                if (asr.correct) totalCorrectly++;
            });
            expect(totalCorrectly).toEqual(3);
        });
    });

    test(QuizActionTypes.CHANGE_ANSWER_LABEL, () => {
        const answer = createEmptyAnswer("answerId");

        const state = reducer(
            getStateAlreadyHasQuiz(),
            QuizActions.changeQuizType(QuizType.QUIZ_TYPE_FIB)
        );
        const state1 = reducer(state, QuizActions.changeLabelType(LabelTypes.CUSTOM));
        // add new answer then change answer label
        const state2 = reducer(state1, QuizActions.addNewAnswer({ answer }));
        const state3 = reducer(state2, QuizActions.changeAnswerLabel(answer.id, "12345"));
        const state4 = reducer(state3, QuizActions.changeAnswerLabel(answer.id, "123456"));

        expect(state3.quizzes[0]!.answer.list.get(answer.id)!.label).toHaveLength(5);
        expect(state4.quizzes[0]!.answer.list.get(answer.id)!.label).toBe("12345");
    });

    test(QuizActionTypes.CHANGE_ANSWER_ATTRIBUTE_CONFIGS, () => {
        const groupKeyAnswer = "groupKeyAnswer";
        const answer = createEmptyAnswer("answerId", true, groupKeyAnswer);

        const state = reducer(
            getStateAlreadyHasQuiz(),
            QuizActions.changeQuizType(QuizType.QUIZ_TYPE_FIB)
        );

        const state1 = reducer(state, QuizActions.changeLabelType(LabelTypes.CUSTOM));
        // add new answer
        const state2 = reducer(state1, QuizActions.addNewAnswer({ answer }));

        // default answer attribute configs is empty
        expect(state2.quizzes[0]!.answer.list.get(answer.id)!.attribute?.configs).toEqual([]);

        // change answer attribute configs
        const state3 = reducer(
            state2,
            QuizActions.changeAnswerAttributeConfigs({
                answerId: answer.id,
                value: [QuizItemAttributeConfig.LANGUAGE_CONFIG_ENG],
            })
        );

        expect(state3.quizzes[0]!.answer.list.get(answer.id)!.attribute?.configs).toEqual([
            QuizItemAttributeConfig.LANGUAGE_CONFIG_ENG,
        ]);
    });

    test(QuizActionTypes.CHANGE_ANSWER_CONFIGS, () => {
        const state = reducer(
            getStateAlreadyHasQuiz(),
            QuizActions.changeQuizType(QuizType.QUIZ_TYPE_FIB)
        );

        // default config is already in the list
        expect(state.quizzes[0].answer.configs).toEqual([
            QuizOptionConfig.QUIZ_OPTION_CONFIG_CASE_SENSITIVE,
        ]);

        const state2 = reducer(
            state,
            QuizActions.changeAnswerConfigs(QuizOptionConfig.QUIZ_OPTION_CONFIG_CASE_SENSITIVE)
        );

        // toggle and the config will be removed
        expect(state2.quizzes[0].answer.configs).toEqual([]);

        const state3 = reducer(
            state2,
            QuizActions.changeAnswerConfigs(QuizOptionConfig.QUIZ_OPTION_CONFIG_CASE_SENSITIVE)
        );

        // toggle again and the config is added
        expect(state3.quizzes[0].answer.configs).toEqual([
            QuizOptionConfig.QUIZ_OPTION_CONFIG_CASE_SENSITIVE,
        ]);
    });

    test(QuizActionTypes.CHANGE_QUESTION_OPTION, () => {
        const state = reducer(
            getStateAlreadyHasQuiz(),
            QuizActions.changeQuizType(QuizType.QUIZ_TYPE_FIB)
        );
        const state1 = reducer(state, QuizActions.changeLabelType(LabelTypes.CUSTOM));
        // add new answer then change answer label
        const state2 = reducer(
            state1,
            QuizActions.changeQuestionOption({ difficultyLevel: DifficultyLevels.FIVE })
        );

        expect(state2.quizzes[0].difficultyLevel).toEqual(DifficultyLevels.FIVE);

        const state3 = reducer(
            state2,
            QuizActions.changeQuestionOption({ externalId: "externalId_latest" })
        );

        expect(state3.quizzes[0].externalId).toEqual("externalId_latest");
    });
});

describe(QuizActionTypes.ADD_NEW_ANSWER, () => {
    it.each(testCasesAddNewAnswer)(
        "should render correctly default answer with new answer add in quiz type %p",
        (quizType) => {
            const mockQuizState = createMockQuizState({ quizType: QuizType[quizType] });
            const mockPayLoadAddNewAnswer: NsQuizAction.AddNewAnswer["payload"] = isQuizFIB(
                QuizType[quizType]
            )
                ? {
                      groupKey: "groupKey",
                      answerAttributeConfigs: [QuizItemAttributeConfig.LANGUAGE_CONFIG_ENG],
                  }
                : {};
            const state = reducer(mockQuizState, QuizActions.addNewAnswer(mockPayLoadAddNewAnswer));
            const answerList = Array.from(
                state.quizzes[state.currentQuizIndex]!.answer.list.values()
            );

            switch (QuizType[quizType]) {
                case QuizType.QUIZ_TYPE_POW:
                case QuizType.QUIZ_TYPE_TAD: {
                    // Always 2 answers
                    expect(answerList.length).toEqual(2);
                    return;
                }
                case QuizType.QUIZ_TYPE_MAQ:
                case QuizType.QUIZ_TYPE_MCQ: {
                    //default 4 answers, add 1 more is 5
                    expect(answerList.length).toEqual(5);
                    return;
                }
                case QuizType.QUIZ_TYPE_FIB: {
                    //default 1 main answer, add 1 more is 2
                    expect(answerList.length).toEqual(2);
                    expect(answerList[1].attribute.configs).toEqual(
                        mockPayLoadAddNewAnswer.answerAttributeConfigs
                    );
                    return;
                }
                default:
                    // Cannot add MIQ answer
                    return;
            }
        }
    );
});

describe(QuizActionTypes.ADD_NEW_QUIZ, () => {
    it.each(testCasesByQuizType)("should render correctly %p with default answer", (quizType) => {
        const mockLO = createEmptyLO();
        const mockEmptyQuizState = createMockQuizState({ quizzes: [] });
        const state = reducer(
            mockEmptyQuizState,
            QuizActions.addNewQuiz({
                loId: mockLO.lo_id,
                schoolId: mockLO.school_id,
                isLo: true,
                kind: QuizType[quizType],
            })
        );
        const answerList = Array.from(state.quizzes[state.currentQuizIndex]!.answer.list.values());

        //TODO: Create default answer for all quiz type in general function in 1 place
        switch (state.quizzes[state.currentQuizIndex].kind) {
            case QuizType.QUIZ_TYPE_POW:
            case QuizType.QUIZ_TYPE_TAD: {
                // Always 2 answers
                expect(answerList.length).toEqual(1);
                return;
            }
            case QuizType.QUIZ_TYPE_MAQ:
            case QuizType.QUIZ_TYPE_MCQ: {
                //default 4 answers
                expect(answerList.length).toEqual(4);
                return;
            }
            case QuizType.QUIZ_TYPE_MIQ: {
                //Default 2 answers (Yes/No) for mobile team
                expect(answerList.length).toEqual(1);
                return;
            }
            case QuizType.QUIZ_TYPE_FIB: {
                //default 1 main answer
                expect(answerList.length).toEqual(1);
                return;
            }
        }
    });
});
