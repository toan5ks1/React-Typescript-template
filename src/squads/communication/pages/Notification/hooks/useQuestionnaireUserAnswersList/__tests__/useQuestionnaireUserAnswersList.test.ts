import { questionnaireUserAnswersService } from "src/squads/communication/service/bob/questionnaire-user-answers-service/questionnaire-user-answers-service";
import { inferQueryWithGRPCPagination } from "src/squads/communication/service/infer-query";
import { createMockQuestionnaireUserAnswer } from "src/squads/communication/test-utils/questionnaire";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import {
    GetAnswersByFilterResponse,
    GetAnswersByFilterRequest,
} from "manabuf/bob/v1/notifications_pb";

import useQuestionnaireUserAnswersList, {
    UseQuestionnaireUserAnswersListProps,
} from "../useQuestionnaireUserAnswersList";

import { UseQueryWithGRPCPaginationOptions } from "@manabie-com/react-utils";
import { renderHook, act } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferQueryWithGRPCPagination: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const showSnackbar = jest.fn();
const goToFirstPage = jest.fn();

const mockQuestionnaireUserAnswer = createMockQuestionnaireUserAnswer();

const useQuestionnaireUserAnswersListDefaultProps: UseQuestionnaireUserAnswersListProps = {
    questionnaireId: "questionnaire_id_1",
};

const mockInferQueryWithGRPCPagination = (isSuccess: boolean = true) => {
    let callbackRan = false;

    (inferQueryWithGRPCPagination as jest.Mock).mockImplementation(
        (request: {
                entity: "questionnaireUserAnswers";
                action: keyof typeof questionnaireUserAnswersService.query;
            }) =>
            (
                _params: GetAnswersByFilterRequest.AsObject,
                options: UseQueryWithGRPCPaginationOptions<GetAnswersByFilterResponse.AsObject>
            ) => {
                if (
                    request.entity === "questionnaireUserAnswers" &&
                    request.action === "communicationGetAnswersByFilter"
                ) {
                    if (isSuccess) {
                        if (!callbackRan) {
                            options.onSuccess?.(mockQuestionnaireUserAnswer);
                            callbackRan = true;
                        }

                        return {
                            results: {
                                data: mockQuestionnaireUserAnswer,
                                isFetching: false,
                            },
                            goToFirstPage,
                        };
                    } else {
                        options.onError?.(
                            Error(
                                "ERROR questionnaireUserAnswers - communicationGetAnswersByFilter"
                            )
                        );

                        return {
                            results: { data: undefined, isFetching: false },
                            goToFirstPage,
                        };
                    }
                }
            }
    );
};

describe("useQuestionnaireUserAnswersList filter questionnaire user answers", () => {
    const std = mockWarner();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should return questionnaire user answers list successful", () => {
        mockInferQueryWithGRPCPagination();

        const {
            result: { current },
        } = renderHook(() =>
            useQuestionnaireUserAnswersList(useQuestionnaireUserAnswersListDefaultProps)
        );

        expect(current.answers).toEqual(mockQuestionnaireUserAnswer);
    });

    it("should log warning and show snackbar when the query fails", () => {
        mockInferQueryWithGRPCPagination(false);

        renderHook(() =>
            useQuestionnaireUserAnswersList(useQuestionnaireUserAnswersListDefaultProps)
        );

        expect(std.warn).toBeCalledWith(
            "useQuestionnaireUserAnswersList",
            Error("ERROR questionnaireUserAnswers - communicationGetAnswersByFilter")
        );
        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData questionnaireUserAnswers - communicationGetAnswersByFilter",
            "error"
        );
    });

    it("should execute goToFirstPage correctly when onSearch", () => {
        mockInferQueryWithGRPCPagination();

        const {
            result: {
                current: { onSearch },
            },
        } = renderHook(() =>
            useQuestionnaireUserAnswersList(useQuestionnaireUserAnswersListDefaultProps)
        );

        act(() => {
            onSearch("");
        });

        expect(goToFirstPage).toBeCalledTimes(1);

        act(() => {
            onSearch("keyword");
        });

        expect(goToFirstPage).toBeCalledTimes(2);
    });
});
