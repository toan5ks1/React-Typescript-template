import appConfigs from "src/internals/configuration";
import { commonGrpcOptions } from "src/internals/grpc";
import { validateQuiz, createPayloadToSend } from "src/squads/syllabus/models/quiz";

import { QuizModifierServicePromiseClient } from "manabuf/eureka/v1/quiz_modifier_grpc_web_pb";

import { InheritedGrpcServiceClient } from "../../service-types";
import {
    createUpsertSignleQuizRequest,
    createUpdateDisplayOrderOfQuizSetRequest,
    createUpsertQuizV2Request,
    validateUpsertQuizV2,
    createRemoveQuizInLORequest,
    validateRemoveQuizInLO,
    validateUpdateDisplayOrderOfQuizSet,
} from "./quiz-modifier.mutation.request";
import NsSyllabus_QuizService from "./types";

class QuizModifierService extends InheritedGrpcServiceClient<QuizModifierServicePromiseClient> {
    async upsertSingleQuiz({ quiz: quizOriginal }: NsSyllabus_QuizService.UpsertSingleQuiz) {
        validateQuiz(quizOriginal);

        const quiz = createPayloadToSend(quizOriginal);

        const request = createUpsertSignleQuizRequest({ quiz });

        const response = await this._call("upsertSingleQuiz", request);

        return response.toObject();
    }

    async updateDisplayOrderOfQuizSet(payload: NsSyllabus_QuizService.UpdateDisplayOrderOfQuizSet) {
        validateUpdateDisplayOrderOfQuizSet(payload);

        const request = createUpdateDisplayOrderOfQuizSetRequest(payload);

        const response = await this._call("updateDisplayOrderOfQuizSet", request);

        return response.toObject();
    }

    // This method used to upsert card in the flashcard
    async upsertQuizV2(payload: NsSyllabus_QuizService.UpsertQuizV2) {
        validateUpsertQuizV2(payload);

        const request = createUpsertQuizV2Request(payload);

        const response = await this._call("upsertQuizV2", request);
        return response.toObject();
    }

    async removeQuizInLO(payload: NsSyllabus_QuizService.RemoveQuizInLO) {
        validateRemoveQuizInLO(payload);

        const request = createRemoveQuizInLORequest(payload);
        const response = await this._call("removeQuizFromLO", request);
        return response.toObject();
    }
}

const quizModifierService = new QuizModifierService(
    QuizModifierServicePromiseClient,
    appConfigs,
    commonGrpcOptions
);

export default quizModifierService;
