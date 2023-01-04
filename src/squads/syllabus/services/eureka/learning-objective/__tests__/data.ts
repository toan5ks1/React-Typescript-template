import { CreateMockDataTest } from "src/squads/syllabus/test-utils/types";

import NsSyllabus_LearningObjectiveService from "../types";

export const createMockDataUpsertLOs: CreateMockDataTest<NsSyllabus_LearningObjectiveService.UpsertLOs> =
    (override = {}) => {
        return {
            loId: "LO_ID",
            displayOrder: 7,
            name: "LO_NAME",
            schoolId: 99,
            topicId: "topicId",
            type: "LEARNING_OBJECTIVE_TYPE_LEARNING",
            ...override,
        };
    };

export const createMockDataDeleteLOs: CreateMockDataTest<NsSyllabus_LearningObjectiveService.DeleteLOs> =
    (override = {}) => {
        return {
            loIdsList: ["LO_1", "LO_2"],
            ...override,
        };
    };
