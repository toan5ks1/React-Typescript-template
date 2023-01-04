import { CreateMockDataTest } from "src/squads/syllabus/test-utils/types";

import { QuizzesByExternalIdQuery } from "../../eureka-types";

export const createMockDataQuizzesByExternalIdQueryRaw: CreateMockDataTest<QuizzesByExternalIdQuery> =
    () => {
        return {
            quizzes: [
                {
                    external_id: "external_id",
                    quiz_id: "quiz_id",
                },
            ],
        };
    };
