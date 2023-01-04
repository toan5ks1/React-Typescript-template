import { CreateMockDataTest } from "src/squads/syllabus/test-utils/types";

import NsSyllabus_Yasuo_CoursesService from "../types";

export const createMockDataAddBooksToCourse: CreateMockDataTest<NsSyllabus_Yasuo_CoursesService.AddBooksToCourse> =
    (overrides = {}) => {
        return {
            courseId: "courseId01",
            bookIdsList: ["Book01", "Book02"],
            ...overrides,
        };
    };
