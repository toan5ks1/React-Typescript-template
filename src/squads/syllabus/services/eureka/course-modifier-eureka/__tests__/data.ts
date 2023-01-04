import { CreateMockDataTest } from "src/squads/syllabus/test-utils/types";

import { NsEurekaCourseModifierService } from "../types";

export const createMockDataDuplicateBook: CreateMockDataTest<NsEurekaCourseModifierService.DuplicateBook> =
    () => {
        return {
            bookId: "bookId01",
            bookName: "Duplicate bookName",
        };
    };

export const createMockDataUpdateDisplayOrderLOAndAssignment: CreateMockDataTest<NsEurekaCourseModifierService.UpdateDisplayOrdersOfLOsAndAssignments> =
    (override = {}) => {
        return {
            assignmentsList: [{ assignmentId: "assignmentId", displayOrder: 1, topicId: "01" }],
            learningObjectivesList: [{ loId: "loId", displayOrder: 2, topicId: "01" }],
            ...override,
        };
    };

export const createMockDataAddBooksToCourse: CreateMockDataTest<NsEurekaCourseModifierService.AddBooksToCourse> =
    (overrides = {}) => {
        return {
            courseId: "courseId01",
            bookIdsList: ["Book01", "Book02"],
            ...overrides,
        };
    };
