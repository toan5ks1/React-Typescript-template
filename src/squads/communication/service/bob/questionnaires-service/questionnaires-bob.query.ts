import { gql } from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/communication/internals/hasura-client/execute-query";
import {
    Communication_GetQuestionnaireByQuestionnaireIdQueryVariables,
    Communication_GetQuestionnaireByQuestionnaireIdQuery,
} from "src/squads/communication/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/communication/service/service-types";

const QuestionnaireFragment = gql`
    fragment QuestionnaireAttrs on questionnaires {
        questionnaire_id
        resubmit_allowed
        expiration_date
        created_at
        updated_at
    }
`;

const GetQuestionnaireByQuestionnaireId = gql`
    query Communication_GetQuestionnaireByQuestionnaireId($questionnaire_id: String) {
        questionnaires(where: { questionnaire_id: { _eq: $questionnaire_id } }) {
            ...QuestionnaireAttrs
        }
    }

    ${QuestionnaireFragment}
`;

class QuestionnairesQueriesBob extends InheritedHasuraServiceClient {
    async getQuestionnaireByQuestionnaireId(
        variables: Communication_GetQuestionnaireByQuestionnaireIdQueryVariables
    ): Promise<
        | ArrayElement<Communication_GetQuestionnaireByQuestionnaireIdQuery["questionnaires"]>
        | undefined
    > {
        const res = await this._call<Communication_GetQuestionnaireByQuestionnaireIdQuery>({
            query: GetQuestionnaireByQuestionnaireId,
            variables,
        });

        return res.data?.questionnaires[0];
    }
}

const questionnairesQueriesBob = new QuestionnairesQueriesBob(appConfigs, "bobGraphQL", doQuery);

export default questionnairesQueriesBob;
