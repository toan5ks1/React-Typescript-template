import gql from "graphql-tag";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/communication/internals/hasura-client/execute-query";
import {
    Communication_GetUserAnswersByQuestionIdsQuery,
    Communication_GetUserAnswersByQuestionIdsQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/communication/service/service-types";

const communicationGetQuestionnaireUserAnswersByQuestionIds = gql`
    query Communication_GetUserAnswersByQuestionIds($questionIds: [String!] = []) {
        questionnaire_user_answers(where: { questionnaire_question_id: { _in: $questionIds } }) {
            answer
            questionnaire_question_id
            submitted_at
            target_id
            user_id
            user_notification_id
        }
    }
`;

class QuestionnaireUserAnswersQueriesBob extends InheritedHasuraServiceClient {
    async getQuestionnaireUserAnswersByQuestionIds(
        variables: Communication_GetUserAnswersByQuestionIdsQueryVariables
    ): Promise<
        Communication_GetUserAnswersByQuestionIdsQuery["questionnaire_user_answers"] | undefined
    > {
        const res = await this._call<Communication_GetUserAnswersByQuestionIdsQuery>({
            query: communicationGetQuestionnaireUserAnswersByQuestionIds,
            variables,
        });

        return res.data?.questionnaire_user_answers;
    }
}

const questionnaireUserAnswersQueriesBob = new QuestionnaireUserAnswersQueriesBob(
    appConfigs,
    "bobGraphQL",
    doQuery
);

export default questionnaireUserAnswersQueriesBob;
