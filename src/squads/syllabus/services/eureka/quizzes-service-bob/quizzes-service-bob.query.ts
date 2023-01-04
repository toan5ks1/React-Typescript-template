import { gql } from "graphql-tag";
import { toArr } from "src/common/utils/other";
import appConfigs from "src/internals/configuration";
import { doQuery } from "src/squads/syllabus/internals/hasura-client/execute-query";
import {
    QuizzesByExternalIdQuery,
    QuizzesByExternalIdQueryVariables,
    QuizzesManyByLearningObjectIdQuery,
    QuizzesManyByLearningObjectIdQueryVariables,
    QuizzesOneQuery,
    QuizzesOneQueryVariables,
} from "src/squads/syllabus/services/eureka/eureka-types";

import { InheritedHasuraServiceClient } from "../../service-types";

const quizzesFragment = gql`
    fragment QuizzesAttrs on quizzes {
        approved_by
        country
        difficulty_level
        explanation
        external_id
        kind
        options
        question
        quiz_id
        school_id
        tagged_los
    }
`;

const getByExternalIdQuery = gql`
    query QuizzesByExternalId($external_id: String = "") {
        quizzes(where: { external_id: { _eq: $external_id } }) {
            external_id
            quiz_id
        }
    }
`;

const getOneQuery = gql`
    query QuizzesOne($quiz_id: String = "") {
        quizzes(where: { quiz_id: { _eq: $quiz_id } }) {
            ...QuizzesAttrs
        }
    }
    ${quizzesFragment}
`;

const getManyByLoIdQuery = gql`
    query QuizzesManyByLearningObjectId($lo_id: String) {
        find_quiz_by_lo_id(args: { id: $lo_id }) {
            ...QuizzesAttrs
        }
    }
    ${quizzesFragment}
`;

class QuizzesBobQuery extends InheritedHasuraServiceClient {
    async getQuizzesByExternalId(
        variables: QuizzesByExternalIdQueryVariables
    ): Promise<QuizzesByExternalIdQuery["quizzes"] | undefined> {
        const payload = {
            query: getByExternalIdQuery,
            variables,
        };
        const resp = await this._call<QuizzesByExternalIdQuery>(payload);
        return resp.data?.quizzes;
    }
    async getOne(
        variables: QuizzesOneQueryVariables
    ): Promise<QuizzesOneQuery["quizzes"][0] | undefined> {
        const body = {
            query: getOneQuery,
            variables,
        };

        const resp = await this._call<QuizzesOneQuery>(body);

        return toArr(resp.data?.quizzes)[0];
    }
    async getManyByLoId(
        variables: QuizzesManyByLearningObjectIdQueryVariables
    ): Promise<QuizzesManyByLearningObjectIdQuery["find_quiz_by_lo_id"] | undefined> {
        const body = {
            query: getManyByLoIdQuery,
            variables,
        };

        const resp = await this._call<QuizzesManyByLearningObjectIdQuery>(body);

        return resp.data?.find_quiz_by_lo_id;
    }
}

const quizzesQueriesBob = new QuizzesBobQuery(appConfigs, "eurekaGraphQL", doQuery);

export default quizzesQueriesBob;
