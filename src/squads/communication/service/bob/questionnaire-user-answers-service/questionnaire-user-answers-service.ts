import { Communication_GetUserAnswersByQuestionIdsQueryVariables } from "src/squads/communication/service/bob/bob-types";
import { InvalidParamError } from "src/squads/communication/service/service-types";

import { GetAnswersByFilterRequest } from "manabuf/bob/v1/notifications_pb";

import questionnaireUserAnswersReaderMutationService from "./questionnaire-user-answers-reader.mutation";

import { defineService } from "@manabie-com/react-utils";
import questionnaireUserAnswersQueriesBob from "src/squads/communication/service/bob/questionnaire-user-answers-service/questionnaire-user-answers-bob.query";

export const questionnaireUserAnswersService = defineService({
    query: {
        communicationGetAnswersByFilter: (params: GetAnswersByFilterRequest.AsObject) => {
            return questionnaireUserAnswersReaderMutationService.getAnswersByFilter(params);
        },
        communicationGetAnswersByFilterToDownloadCsv: (
            params: GetAnswersByFilterRequest.AsObject
        ) => {
            return questionnaireUserAnswersReaderMutationService.getAnswersByFilter(params);
        },
        communicationGetAnswersByQuestionIds: ({
            questionIds,
        }: Communication_GetUserAnswersByQuestionIdsQueryVariables) => {
            if (typeof questionIds === "undefined") {
                throw new InvalidParamError({
                    action: "communicationGetAnswersByQuestionIds",
                    errors: [
                        {
                            field: "questionIds",
                            fieldValueIfNotSensitive: questionIds,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }

            return questionnaireUserAnswersQueriesBob.getQuestionnaireUserAnswersByQuestionIds({
                questionIds,
            });
        },
    },
});
