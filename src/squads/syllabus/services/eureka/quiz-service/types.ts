import { Quiz, QuizType } from "src/models/quiz";

import {
    UpdateDisplayOrderOfQuizSetRequest,
    RemoveQuizFromLORequest,
} from "manabuf/eureka/v1/quiz_modifier_pb";

declare namespace NsSyllabus_QuizService {
    interface RemoveQuizInLO extends RemoveQuizFromLORequest.AsObject {}
    interface UpsertSingleQuiz {
        quiz: Quiz;
    }

    interface UpsertQuizV2 {
        kind: QuizType;
        quizList: Quiz[];
    }

    interface UpdateDisplayOrderOfQuizSet extends UpdateDisplayOrderOfQuizSetRequest.AsObject {}
}

export default NsSyllabus_QuizService;
