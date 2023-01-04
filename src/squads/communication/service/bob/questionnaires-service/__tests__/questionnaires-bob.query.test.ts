import {
    doQuery,
    HasuraAndDefaultResponse,
} from "src/squads/communication/internals/hasura-client/execute-query";
import {
    Communication_GetQuestionnaireByQuestionnaireIdQuery,
    Communication_GetQuestionnaireByQuestionnaireIdQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { createMockQuestionnaire } from "src/squads/communication/test-utils/query-data";

import questionnairesQueriesBob from "../questionnaires-bob.query";

jest.mock("src/squads/communication/internals/hasura-client/execute-query", () => ({
    __esModule: true,
    doQuery: jest.fn(),
}));

const mockQuestionnaire = createMockQuestionnaire();

describe("questionnaires bob query", () => {
    it("should return questionnaire when calling getQuestionnaireByQuestionnaireId", async () => {
        const variables: Communication_GetQuestionnaireByQuestionnaireIdQueryVariables = {
            questionnaire_id: "questionnaire_id_1",
        };

        const mockQuestionnaireDoQuery: HasuraAndDefaultResponse<Communication_GetQuestionnaireByQuestionnaireIdQuery> =
            {
                data: {
                    questionnaires: [mockQuestionnaire],
                },
            };

        (doQuery as jest.Mock).mockReturnValue(mockQuestionnaireDoQuery);

        const result = await questionnairesQueriesBob.getQuestionnaireByQuestionnaireId(variables);

        expect(result).toEqual(mockQuestionnaire);
    });
});
