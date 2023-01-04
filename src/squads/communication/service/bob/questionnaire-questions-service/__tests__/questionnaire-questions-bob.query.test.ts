import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/communication/internals/hasura-client/execute-query";
import {
    Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQuery,
    Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { createMockQuestionnaireQuestionsList } from "src/squads/communication/test-utils/query-data";

import questionnaireQuestionsQueriesBob from "../questionnaire-questions-bob.query";

jest.mock("src/squads/communication/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockQuestionnaireQuestionsList = createMockQuestionnaireQuestionsList();

describe("questionnaire questions bob query", () => {
    it("should return questionnaire question when calling getQuestionnaireQuestionsByQuestionnaireId", async () => {
        const variables: Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQueryVariables =
            {
                questionnaire_id: "questionnaire_id_1",
            };

        const mockQuestionnaireAnswerDoQuery: HasuraAndDefaultResponse<Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQuery> =
            {
                data: {
                    questionnaire_questions: mockQuestionnaireQuestionsList,
                },
            };

        (doQuery as jest.Mock).mockReturnValue(mockQuestionnaireAnswerDoQuery);

        const result =
            await questionnaireQuestionsQueriesBob.getQuestionnaireQuestionsByQuestionnaireId(
                variables
            );

        expect(result).toEqual(mockQuestionnaireQuestionsList);
    });
});
