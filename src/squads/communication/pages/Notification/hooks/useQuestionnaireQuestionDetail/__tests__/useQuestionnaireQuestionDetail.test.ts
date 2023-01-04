import {
    Communication_GetQuestionnaireByQuestionnaireIdQuery,
    Communication_GetQuestionnaireByQuestionnaireIdQueryVariables,
    Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQuery,
    Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQueryVariables,
    Communication_GetUserAnswersByQuestionIdsQuery,
    Communication_GetUserAnswersByQuestionIdsQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { questionnaireQuestionsService } from "src/squads/communication/service/bob/questionnaire-questions-service/questionnaire-questions-service";
import { questionnaireUserAnswersService } from "src/squads/communication/service/bob/questionnaire-user-answers-service/questionnaire-user-answers-service";
import { questionnairesService } from "src/squads/communication/service/bob/questionnaires-service/questionnaires-service";
import { inferQuery } from "src/squads/communication/service/infer-query";
import {
    createMockQuestionnaire,
    createMockQuestionnaireQuestionsList,
    createMockQuestionnaireUserAnswers,
} from "src/squads/communication/test-utils/query-data";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import useQuestionnaireQuestionDetail from "../useQuestionnaireQuestionDetail";

import { UseQueryBaseOptions } from "@manabie-com/react-utils";
import { renderHook } from "@testing-library/react-hooks";
import groupBy from "lodash/groupBy";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

jest.mock("src/squads/communication/service/infer-query", () => {
    return {
        __esModule: true,
        inferQuery: jest.fn(),
    };
});

const mockQuestionnaire = createMockQuestionnaire();
const mockQuestionnaireQuestions = createMockQuestionnaireQuestionsList();
const mockQuestionnaireUserAnswers = createMockQuestionnaireUserAnswers();

describe("useQuestionnaireQuestionDetail", () => {
    const showSnackbar = jest.fn();

    const std = mockWarner();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should return questionnaire and questionnaire question", () => {
        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity:
                        | "questionnaires"
                        | "questionnaireQuestions"
                        | "questionnaireUserAnswers";
                    action:
                        | keyof typeof questionnairesService.query
                        | keyof typeof questionnaireQuestionsService.query
                        | keyof typeof questionnaireUserAnswersService.query;
                }) =>
                (
                    _params: Communication_GetUserAnswersByQuestionIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        | Communication_GetUserAnswersByQuestionIdsQuery["questionnaire_user_answers"]
                        | undefined
                    >
                ) => {
                    switch (resource.entity) {
                        case "questionnaires":
                            return {
                                data: mockQuestionnaire,
                                isFetching: false,
                            };

                        case "questionnaireQuestions":
                            return {
                                data: mockQuestionnaireQuestions,
                                isFetching: false,
                            };

                        case "questionnaireUserAnswers": {
                            const groupedQuestionnaireUserAnswers = options.selector?.(
                                mockQuestionnaireUserAnswers
                            );

                            return {
                                data: groupedQuestionnaireUserAnswers,
                                isFetching: false,
                            };
                        }

                        default: {
                            return {
                                data: [],
                                isFetching: false,
                            };
                        }
                    }
                }
        );

        const {
            result: { current },
        } = renderHook(() =>
            useQuestionnaireQuestionDetail({ questionnaireId: "questionnaire_id_1" })
        );

        expect(current.questionnaire).toEqual(mockQuestionnaire);
        expect(current.questionnaireQuestions).toEqual(mockQuestionnaireQuestions);
        expect(current.questionnaireUserAnswers).toEqual(
            groupBy(mockQuestionnaireUserAnswers, "questionnaire_question_id")
        );
    });

    it("should call onError when fetching questionnaire", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "questionnaires";
                    action: keyof typeof questionnairesService.query;
                }) =>
                (
                    _params: Communication_GetQuestionnaireByQuestionnaireIdQueryVariables,
                    options: UseQueryBaseOptions<
                        | Communication_GetQuestionnaireByQuestionnaireIdQuery["questionnaires"]
                        | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "communicationGetQuestionnaireByQuestionnaireId") {
                            callbackRan = true;
                            options.onError?.(Error("ERROR QUESTIONNAIRE"));
                        }
                    }

                    return {
                        data: [],
                        isFetching: false,
                    };
                }
        );

        renderHook(() => useQuestionnaireQuestionDetail({ questionnaireId: "questionnaire_id_1" }));

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
        expect(std.warn).toBeCalledWith(
            "useNotificationDetail notification questionnaires",
            Error("ERROR QUESTIONNAIRE")
        );
    });

    it("should call onError when fetching questionnaire questions", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "questionnaireQuestions";
                    action: keyof typeof questionnaireQuestionsService.query;
                }) =>
                (
                    _params: Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQueryVariables,
                    options: UseQueryBaseOptions<
                        | Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQuery["questionnaire_questions"]
                        | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (
                            resource.action ===
                            "communicationGetQuestionnaireQuestionsByQuestionnaireId"
                        ) {
                            callbackRan = true;
                            options.onError?.(Error("ERROR QUESTIONNAIRE QUESTIONS"));
                        }
                    }

                    return {
                        data: [],
                        isFetching: false,
                    };
                }
        );

        renderHook(() => useQuestionnaireQuestionDetail({ questionnaireId: "questionnaire_id_1" }));

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
        expect(std.warn).toBeCalledWith(
            "useNotificationDetail notification questionnaire questions",
            Error("ERROR QUESTIONNAIRE QUESTIONS")
        );
    });

    it("should call onError when fetching questionnaire user answers", () => {
        let callbackRan = false;

        (inferQuery as jest.Mock).mockImplementation(
            (resource: {
                    entity: "questionnaireUserAnswers";
                    action: keyof typeof questionnaireUserAnswersService.query;
                }) =>
                (
                    _params: Communication_GetUserAnswersByQuestionIdsQueryVariables,
                    options: UseQueryBaseOptions<
                        | Communication_GetUserAnswersByQuestionIdsQuery["questionnaire_user_answers"]
                        | undefined
                    >
                ) => {
                    if (!callbackRan) {
                        if (resource.action === "communicationGetAnswersByQuestionIds") {
                            callbackRan = true;
                            options.onError?.(Error("ERROR QUESTIONNAIRE USER ANSWERS"));
                        }
                    }

                    return {
                        data: [],
                        isFetching: false,
                    };
                }
        );

        renderHook(() => useQuestionnaireQuestionDetail({ questionnaireId: "questionnaire_id_1" }));

        expect(showSnackbar).toBeCalledWith("ra.manabie-error.unknown", "error");
        expect(std.warn).toBeCalledWith(
            "useNotificationDetail notification questionnaire user answers",
            Error("ERROR QUESTIONNAIRE USER ANSWERS")
        );
    });
});
