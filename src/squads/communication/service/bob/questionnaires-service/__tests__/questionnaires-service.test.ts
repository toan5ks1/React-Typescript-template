import { Communication_GetQuestionnaireByQuestionnaireIdQueryVariables } from "src/squads/communication/service/bob/bob-types";
import { InvalidParamError } from "src/squads/communication/service/service-types";
import { createMockQuestionnaire } from "src/squads/communication/test-utils/query-data";

import questionnairesQueriesBob from "../questionnaires-bob.query";
import { questionnairesService } from "../questionnaires-service";

jest.mock(
    "src/squads/communication/service/bob/questionnaires-service/questionnaires-bob.query",
    () => ({
        __esModule: true,
        default: {
            getQuestionnaireByQuestionnaireId: jest.fn(),
        },
    })
);

const mockQuestionnaire = createMockQuestionnaire();

describe("questionnaires service", () => {
    it("should return questionnaire when calling communicationGetQuestionnaireByQuestionnaireId", async () => {
        const variables: Communication_GetQuestionnaireByQuestionnaireIdQueryVariables = {
            questionnaire_id: "questionnaire_id_1",
        };

        (questionnairesQueriesBob.getQuestionnaireByQuestionnaireId as jest.Mock).mockResolvedValue(
            mockQuestionnaire
        );

        const result =
            await questionnairesService.query.communicationGetQuestionnaireByQuestionnaireId(
                variables
            );

        expect(questionnairesQueriesBob.getQuestionnaireByQuestionnaireId).toBeCalledWith(
            variables
        );
        expect(questionnairesQueriesBob.getQuestionnaireByQuestionnaireId).toBeCalledTimes(1);
        expect(result).toEqual(mockQuestionnaire);
    });

    it("should throw error if questionnaire_id is undefined when calling communicationGetQuestionnaireByQuestionnaireId", async () => {
        const variables: Communication_GetQuestionnaireByQuestionnaireIdQueryVariables = {
            questionnaire_id: undefined,
        };

        await expect(async () => {
            await questionnairesService.query.communicationGetQuestionnaireByQuestionnaireId(
                variables
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "communicationGetQuestionnaireByQuestionnaireId",
                errors: [
                    {
                        field: "questionnaire_id",
                        fieldValueIfNotSensitive: variables.questionnaire_id,
                    },
                ],
                serviceName: "bobGraphQL",
            })
        );

        expect(questionnairesQueriesBob.getQuestionnaireByQuestionnaireId).not.toBeCalled();
    });
});
