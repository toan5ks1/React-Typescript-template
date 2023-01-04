import { questionnaireUserAnswersService } from "src/squads/communication/service/bob/questionnaire-user-answers-service/questionnaire-user-answers-service";
import { inferStandaloneQuery } from "src/squads/communication/service/infer-query";
import { createMockQuestionnaireUserAnswer } from "src/squads/communication/test-utils/questionnaire";
import { mockWarner } from "src/squads/communication/test-utils/warner";

import useDownloadQuestionnaireUserAnswersList, {
    UseDownloadQuestionnaireUserAnswersListProps,
} from "../useDownloadQuestionnaireUserAnswersList";

import { renderHook } from "@testing-library/react-hooks";
import useShowSnackbar from "src/squads/communication/hooks/useShowSnackbar";

jest.mock("src/squads/communication/service/infer-query", () => ({
    __esModule: true,
    inferStandaloneQuery: jest.fn(),
}));

jest.mock("src/squads/communication/hooks/useShowSnackbar", () => ({
    __esModule: true,
    default: jest.fn(),
}));

const showSnackbar = jest.fn();

const mockQuestionnaireUserAnswer = createMockQuestionnaireUserAnswer();

const useDownloadQuestionnaireUserAnswersListDefaultProps: UseDownloadQuestionnaireUserAnswersListProps =
    {
        questionnaireId: "questionnaire_id_1",
    };

const mockInferQueryWithGRPCPagination = (isSuccess: boolean = true) => {
    (inferStandaloneQuery as jest.Mock).mockImplementation(
        (request: {
                entity: "questionnaireUserAnswers";
                action: keyof typeof questionnaireUserAnswersService.query;
            }) =>
            () => {
                if (
                    request.entity === "questionnaireUserAnswers" &&
                    request.action === "communicationGetAnswersByFilterToDownloadCsv"
                ) {
                    if (isSuccess) {
                        return mockQuestionnaireUserAnswer;
                    }

                    throw Error(
                        "ERROR downloadQuestionnaireUserAnswers - communicationGetAnswersByFilterToDownloadCsv"
                    );
                }
            }
    );
};

describe("useDownloadQuestionnaireUserAnswersList filter questionnaire user answers", () => {
    const std = mockWarner();

    beforeEach(() => {
        (useShowSnackbar as jest.Mock).mockImplementation(() => showSnackbar);
    });

    it("should return correct data when call communicationGetAnswersByFilterToDownloadCsv successfully", async () => {
        mockInferQueryWithGRPCPagination();

        const { result } = renderHook(() =>
            useDownloadQuestionnaireUserAnswersList(
                useDownloadQuestionnaireUserAnswersListDefaultProps
            )
        );

        const data = await result.current();

        expect(data).toEqual(mockQuestionnaireUserAnswer);
    });

    it("should log warning and show snackbar when the query communicationGetAnswersByFilterToDownloadCsv fails", async () => {
        mockInferQueryWithGRPCPagination(false);

        const { result } = renderHook(() =>
            useDownloadQuestionnaireUserAnswersList(
                useDownloadQuestionnaireUserAnswersListDefaultProps
            )
        );

        await result.current();

        expect(std.warn).toBeCalledWith(
            "useDownloadQuestionnaireUserAnswersList",
            Error(
                "ERROR downloadQuestionnaireUserAnswers - communicationGetAnswersByFilterToDownloadCsv"
            )
        );
        expect(showSnackbar).toBeCalledWith(
            "ra.message.unableToLoadData downloadQuestionnaireUserAnswers - communicationGetAnswersByFilterToDownloadCsv",
            "error"
        );
    });
});
