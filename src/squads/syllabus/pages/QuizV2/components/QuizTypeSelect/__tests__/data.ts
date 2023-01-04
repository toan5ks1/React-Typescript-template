import { LOWithQuizSet } from "src/squads/syllabus/models/quizset-lo";

import { createTestLO } from "src/squads/syllabus/test-utils/quizV2";

export const mockLOValue: LOWithQuizSet = createTestLO({
    id: "abc",
    lo_id: "abc",
    quiz_sets: [
        {
            quiz_external_ids: ["external_1"],
        },
    ],
});
