import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/communication/internals/hasura-client/execute-query";
import {
    Communication_GetUserAnswersByQuestionIdsQuery,
    Communication_GetUserAnswersByQuestionIdsQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import {
    createMockQuestionnaireUserAnswersQuestionIds,
    createMockQuestionnaireUserAnswersResponse,
} from "src/squads/communication/test-utils/query-data";

import questionnaireUserAnswersQueriesBob from "src/squads/communication/service/bob/questionnaire-user-answers-service/questionnaire-user-answers-bob.query";

jest.mock("src/squads/communication/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockQueryQuestionnaireUserAnswerResponse = createMockQuestionnaireUserAnswersResponse();
const mockQueryQuestionnaireUSerAnswerQuestionIds = createMockQuestionnaireUserAnswersQuestionIds();

describe("questionnaire-user-answers-bob.query", () => {
    it("should get list of questionnaire user answers correctly", async () => {
        const variables: Communication_GetUserAnswersByQuestionIdsQueryVariables = {
            questionIds: mockQueryQuestionnaireUSerAnswerQuestionIds,
        };

        const mockDoQueryQuestionnaireUserAnswerResponse: HasuraAndDefaultResponse<Communication_GetUserAnswersByQuestionIdsQuery> =
            {
                data: mockQueryQuestionnaireUserAnswerResponse,
            };

        (doQuery as jest.Mock).mockReturnValue(mockDoQueryQuestionnaireUserAnswerResponse);

        const result =
            await questionnaireUserAnswersQueriesBob.getQuestionnaireUserAnswersByQuestionIds(
                variables
            );

        expect(result).toEqual(mockQueryQuestionnaireUserAnswerResponse.questionnaire_user_answers);
    });
});
