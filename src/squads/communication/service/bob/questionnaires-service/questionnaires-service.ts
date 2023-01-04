import { Communication_GetQuestionnaireByQuestionnaireIdQueryVariables } from "src/squads/communication/service/bob/bob-types";
import { InvalidParamError } from "src/squads/communication/service/service-types";

import questionnairesQueriesBob from "./questionnaires-bob.query";

import { defineService } from "@manabie-com/react-utils";

export const questionnairesService = defineService({
    query: {
        communicationGetQuestionnaireByQuestionnaireId: ({
            questionnaire_id,
        }: Communication_GetQuestionnaireByQuestionnaireIdQueryVariables) => {
            if (typeof questionnaire_id === "undefined") {
                throw new InvalidParamError({
                    action: "communicationGetQuestionnaireByQuestionnaireId",
                    errors: [
                        {
                            field: "questionnaire_id",
                            fieldValueIfNotSensitive: questionnaire_id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }

            return questionnairesQueriesBob.getQuestionnaireByQuestionnaireId({ questionnaire_id });
        },
    },
});
