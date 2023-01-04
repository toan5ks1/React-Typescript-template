import { Communication_GetUserAnswersByQuestionIdsQueryVariables } from "src/squads/communication/service/bob/bob-types";
import { questionnaireUserAnswersService } from "src/squads/communication/service/bob/questionnaire-user-answers-service/questionnaire-user-answers-service";
import {
    createMockQuestionnaireUserAnswers,
    createMockQuestionnaireUserAnswersQuestionIds,
} from "src/squads/communication/test-utils/query-data";
import { createMockQuestionnaireUserAnswer } from "src/squads/communication/test-utils/questionnaire";

import { GetAnswersByFilterRequest } from "manabuf/bob/v1/notifications_pb";

import questionnaireUserAnswersQueriesBob from "src/squads/communication/service/bob/questionnaire-user-answers-service/questionnaire-user-answers-bob.query";
import questionnaireUserAnswersReaderMutationService from "src/squads/communication/service/bob/questionnaire-user-answers-service/questionnaire-user-answers-reader.mutation";

jest.mock(
    "src/squads/communication/service/bob/questionnaire-user-answers-service/questionnaire-user-answers-reader.mutation",
    () => ({
        __esModule: true,
        default: {
            getAnswersByFilter: jest.fn(),
        },
    })
);

jest.mock(
    "src/squads/communication/service/bob/questionnaire-user-answers-service/questionnaire-user-answers-bob.query",
    () => ({
        __esModule: true,
        default: {
            getQuestionnaireUserAnswersByQuestionIds: jest.fn(),
        },
    })
);

const mockQuestionnaireUserAnswer = createMockQuestionnaireUserAnswer();
const mockQuestionnaireUserAnswersByQuestionIds = createMockQuestionnaireUserAnswers();
const mockQueryQuestionnaireUSerAnswerQuestionIds = createMockQuestionnaireUserAnswersQuestionIds();

describe("questionnaireUserAnswersService questionnaire user answers service", () => {
    it("should get questionnaire user answers successfully with communicationGetAnswersByFilter and communicationGetAnswersByFilterToDownloadCsv", async () => {
        (
            questionnaireUserAnswersReaderMutationService.getAnswersByFilter as jest.Mock
        ).mockResolvedValue(mockQuestionnaireUserAnswer);

        const getAnswersByFilterParams: GetAnswersByFilterRequest.AsObject = {
            keyword: "keyword",
            questionnaireId: "questionnaire_id_1",
            paging: {
                limit: 10,
                offsetInteger: 0,
                offsetString: "0",
            },
        };

        const result = await questionnaireUserAnswersService.query.communicationGetAnswersByFilter(
            getAnswersByFilterParams
        );

        expect(questionnaireUserAnswersReaderMutationService.getAnswersByFilter).toBeCalledWith(
            getAnswersByFilterParams
        );

        const resultDownloadCsv =
            await questionnaireUserAnswersService.query.communicationGetAnswersByFilterToDownloadCsv(
                getAnswersByFilterParams
            );

        expect(questionnaireUserAnswersReaderMutationService.getAnswersByFilter).toBeCalledWith(
            getAnswersByFilterParams
        );

        expect(result).toEqual(mockQuestionnaireUserAnswer);
        expect(resultDownloadCsv).toEqual(mockQuestionnaireUserAnswer);

        expect(questionnaireUserAnswersReaderMutationService.getAnswersByFilter).toBeCalledTimes(2);
    });

    it("should get questionnaire user answers successfully with communicationGetAnswersByQuestionIds", async () => {
        (
            questionnaireUserAnswersQueriesBob.getQuestionnaireUserAnswersByQuestionIds as jest.Mock
        ).mockResolvedValue(mockQuestionnaireUserAnswersByQuestionIds);

        const getUserAnswersByQuestionIdsParam: Communication_GetUserAnswersByQuestionIdsQueryVariables =
            {
                questionIds: mockQueryQuestionnaireUSerAnswerQuestionIds,
            };

        const result =
            await questionnaireUserAnswersService.query.communicationGetAnswersByQuestionIds(
                getUserAnswersByQuestionIdsParam
            );

        expect(
            questionnaireUserAnswersQueriesBob.getQuestionnaireUserAnswersByQuestionIds
        ).toBeCalledWith(getUserAnswersByQuestionIdsParam);

        expect(result).toEqual(mockQuestionnaireUserAnswersByQuestionIds);
    });

    it("should throw error when questionIds is undefined with communicationGetAnswersByQuestionIds", async () => {
        (
            questionnaireUserAnswersQueriesBob.getQuestionnaireUserAnswersByQuestionIds as jest.Mock
        ).mockResolvedValue(mockQuestionnaireUserAnswersByQuestionIds);

        const getUserAnswersByQuestionIdsParam: Communication_GetUserAnswersByQuestionIdsQueryVariables =
            {
                questionIds: undefined,
            };

        await expect(async () => {
            await questionnaireUserAnswersService.query.communicationGetAnswersByQuestionIds(
                getUserAnswersByQuestionIdsParam
            );
        }).rejects.toMatchObject({
            action: "communicationGetAnswersByQuestionIds",
            errors: [
                {
                    field: "questionIds",
                    fieldValueIfNotSensitive: getUserAnswersByQuestionIdsParam.questionIds,
                },
            ],
            serviceName: "bobGraphQL",
            name: "InvalidParamError",
        });
    });
});
