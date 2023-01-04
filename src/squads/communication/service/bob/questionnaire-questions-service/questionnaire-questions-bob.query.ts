import gql from "graphql-tag";
import { ArrayElement } from "src/common/constants/types";
import appConfigs from "src/internals/configuration";
import { QuestionnaireQuestionType } from "src/squads/communication/common/constants/types";
import { doQuery } from "src/squads/communication/internals/hasura-client/execute-query";
import {
    Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQuery,
    Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQueryVariables,
} from "src/squads/communication/service/bob/bob-types";
import { InheritedHasuraServiceClient } from "src/squads/communication/service/service-types";

const QuestionnaireQuestionsFragment = gql`
    fragment QuestionnaireQuestionsAttrs on questionnaire_questions {
        questionnaire_question_id
        questionnaire_id
        order_index
        type
        title
        choices
        is_required
        created_at
        updated_at
    }
`;

const communicationGetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndex = gql`
    query Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndex(
        $questionnaire_id: String
    ) {
        questionnaire_questions(
            where: { questionnaire_id: { _eq: $questionnaire_id } }
            order_by: { order_index: asc }
        ) {
            ...QuestionnaireQuestionsAttrs
        }
    }

    ${QuestionnaireQuestionsFragment}
`;

interface CustomQuestionnaireQuestions
    extends Omit<
        ArrayElement<
            Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQuery["questionnaire_questions"]
        >,
        "type"
    > {
    type: QuestionnaireQuestionType;
}

export interface CustomCommunication_GetQuestionnaireQuestionsByQuestionnaireIdQuery {
    questionnaire_questions: CustomQuestionnaireQuestions[];
}

class QuestionnaireQuestionsQueriesBob extends InheritedHasuraServiceClient {
    async getQuestionnaireQuestionsByQuestionnaireId(
        variables: Communication_GetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndexQueryVariables
    ): Promise<
        | CustomCommunication_GetQuestionnaireQuestionsByQuestionnaireIdQuery["questionnaire_questions"]
        | undefined
    > {
        const res =
            await this._call<CustomCommunication_GetQuestionnaireQuestionsByQuestionnaireIdQuery>({
                query: communicationGetQuestionnaireQuestionsByQuestionnaireIdAndSortByOrderIndex,
                variables,
            });

        return res.data?.questionnaire_questions;
    }
}

const questionnaireQuestionsQueriesBob = new QuestionnaireQuestionsQueriesBob(
    appConfigs,
    "bobGraphQL",
    doQuery
);

export default questionnaireQuestionsQueriesBob;
