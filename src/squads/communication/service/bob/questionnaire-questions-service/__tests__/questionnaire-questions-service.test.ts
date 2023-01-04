import { Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQueryVariables } from "src/squads/communication/service/bob/bob-types";
import { InvalidParamError } from "src/squads/communication/service/service-types";
import { createMockQuestionnaireQuestionsList } from "src/squads/communication/test-utils/query-data";

import questionnaireQuestionsQueriesBob from "../questionnaire-questions-bob.query";
import { questionnaireQuestionsService } from "../questionnaire-questions-service";

jest.mock(
    "src/squads/communication/service/bob/questionnaire-questions-service/questionnaire-questions-bob.query",
    () => ({
        __esModule: true,
        default: {
            getQuestionnaireQuestionsByQuestionnaireId: jest.fn(),
        },
    })
);

const mockQuestionnaireQuestionsList = createMockQuestionnaireQuestionsList();

describe("questionnaire questions service", () => {
    it("should return questionnaire when calling communicationGetQuestionnaireQuestionsByQuestionnaireId", async () => {
        const variables: Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQueryVariables =
            {
                questionnaire_id: "questionnaire_id_1",
            };

        (
            questionnaireQuestionsQueriesBob.getQuestionnaireQuestionsByQuestionnaireId as jest.Mock
        ).mockResolvedValue(mockQuestionnaireQuestionsList);

        const result =
            await questionnaireQuestionsService.query.communicationGetQuestionnaireQuestionsByQuestionnaireId(
                variables
            );

        expect(
            questionnaireQuestionsQueriesBob.getQuestionnaireQuestionsByQuestionnaireId
        ).toBeCalledWith(variables);
        expect(
            questionnaireQuestionsQueriesBob.getQuestionnaireQuestionsByQuestionnaireId
        ).toBeCalledTimes(1);
        expect(result).toEqual(mockQuestionnaireQuestionsList);
    });

    it("should throw error if questionnaire_id is undefined when calling communicationGetQuestionnaireQuestionsByQuestionnaireId", async () => {
        const variables: Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQueryVariables =
            {
                questionnaire_id: undefined,
            };

        await expect(async () => {
            await questionnaireQuestionsService.query.communicationGetQuestionnaireQuestionsByQuestionnaireId(
                variables
            );
        }).rejects.toThrowError(
            new InvalidParamError({
                action: "communicationGetQuestionnaireQuestionsByQuestionnaireId",
                errors: [
                    {
                        field: "questionnaire_id",
                        fieldValueIfNotSensitive: variables.questionnaire_id,
                    },
                ],
                serviceName: "bobGraphQL",
            })
        );

        expect(
            questionnaireQuestionsQueriesBob.getQuestionnaireQuestionsByQuestionnaireId
        ).not.toBeCalled();
    });
});
