import { AppError } from "src/internals/errors";
import { formInvalidError } from "src/squads/syllabus/internals/errors";
import { toRemoteQuizCoreV2 } from "src/squads/syllabus/models/quiz";

import {
    QuizLO,
    UpsertSingleQuizRequest,
    UpdateDisplayOrderOfQuizSetRequest,
    UpsertQuizV2Request,
    RemoveQuizFromLORequest,
} from "manabuf/eureka/v1/quiz_modifier_pb";

import NsSyllabus_QuizService from "./types";

export const validateUpdateDisplayOrderOfQuizSet = (
    data: NsSyllabus_QuizService.UpdateDisplayOrderOfQuizSet
) => {
    const { loId, pairsList } = data;
    if (!loId || !pairsList || !pairsList.length) throw formInvalidError;

    pairsList.forEach((pair) => {
        const { first, second } = pair;
        if (!first || !second) throw formInvalidError;
    });
};

export const createUpsertSignleQuizRequest = ({
    quiz,
}: NsSyllabus_QuizService.UpsertSingleQuiz) => {
    const request = new UpsertSingleQuizRequest();

    const quizLO = new QuizLO();

    quizLO.setLoId(quiz.loId);
    quizLO.setQuiz(toRemoteQuizCoreV2(quiz));

    request.setQuizLo(quizLO);

    return request;
};

export const createUpdateDisplayOrderOfQuizSetRequest = (
    data: NsSyllabus_QuizService.UpdateDisplayOrderOfQuizSet
) => {
    const { loId, pairsList } = data;

    const request = new UpdateDisplayOrderOfQuizSetRequest();

    const pairs = pairsList.map(({ first, second }) => {
        const pair = new UpdateDisplayOrderOfQuizSetRequest.QuizExternalIDPair();
        pair.setFirst(first);
        pair.setSecond(second);

        return pair;
    });

    request.setLoId(loId);
    request.setPairsList(pairs);

    return request;
};

export const validateUpsertQuizV2 = (data: NsSyllabus_QuizService.UpsertQuizV2) => {
    const { quizList } = data;

    if (!quizList.length) throw formInvalidError;
};

export const createUpsertQuizV2Request = (data: NsSyllabus_QuizService.UpsertQuizV2) => {
    const { kind, quizList } = data;
    const request = new UpsertQuizV2Request();

    request.setKind(kind);

    quizList.forEach((currentQuiz) => {
        const quizLO = new QuizLO();
        const quizCore = toRemoteQuizCoreV2(currentQuiz);
        quizLO.setQuiz(quizCore);
        quizLO.setLoId(currentQuiz.loId);

        request.addQuizzes(quizLO);
    });
    return request;
};

export const createRemoveQuizInLORequest = (data: NsSyllabus_QuizService.RemoveQuizInLO) => {
    const { loId, quizId } = data;
    const request = new RemoveQuizFromLORequest();

    request.setLoId(loId);
    request.setQuizId(quizId);
    return request;
};

export const validateRemoveQuizInLO = (data: NsSyllabus_QuizService.RemoveQuizInLO) => {
    const { loId, quizId } = data;

    if (!loId) throw new AppError("missingLOId");
    if (!quizId) throw new AppError("missingQuizId");
};
