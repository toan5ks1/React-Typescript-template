import { UseQuizEssentialsValues } from "../hooks/useQuizEssentials/useQuizEssentials";

import { createTestLO, createTestQuiz } from "src/squads/syllabus/test-utils/quizV2";

export const mockUseQuizEssentialsValues = (): UseQuizEssentialsValues => ({
    loId: "abc",
    lo: createTestLO({
        id: "abc",
        lo_id: "abc",
        quiz_sets: [
            {
                quiz_external_ids: ["external_1"],
            },
        ],
    }),
    isFetching: false,
    quiz: createTestQuiz({
        externalId: "external_1",
    }),
});
