import { LOWithQuizSet } from "../models/quizset-lo";

export function createEmptyLO(override: Partial<LOWithQuizSet> = {}): LOWithQuizSet {
    return {
        type: "LEARNING_OBJECTIVE_TYPE_LEARNING",
        id: "id",
        name: "loName",
        video: "",
        school_id: 1,
        quiz_sets: [],
        display_order: 1,
        lo_id: "loId",
        created_at: "",
        topic_id: "topicId",
        ...override,
    };
}
