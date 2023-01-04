import { Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQueryVariables } from "src/squads/communication/service/bob/bob-types";
import { InvalidParamError } from "src/squads/communication/service/service-types";

import questionnaireQuestionsQueriesBob from "./questionnaire-questions-bob.query";

import { defineService } from "@manabie-com/react-utils";

export const questionnaireQuestionsService = defineService({
    query: {
        communicationGetQuestionnaireQuestionsByQuestionnaireId: ({
            questionnaire_id,
        }: Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQueryVariables) => {
            if (typeof questionnaire_id === "undefined") {
                throw new InvalidParamError({
                    action: "communicationGetQuestionnaireQuestionsByQuestionnaireId",
                    errors: [
                        {
                            field: "questionnaire_id",
                            fieldValueIfNotSensitive: questionnaire_id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }

            return questionnaireQuestionsQueriesBob.getQuestionnaireQuestionsByQuestionnaireId({
                questionnaire_id,
            });
        },
    },
});
