import { QueryParamsService } from "../params";

describe("params", () => {
    it("QueryParamsService", () => {
        expect(Object.keys(QueryParamsService)).toEqual([
            "learning_objectives",
            "assignments",
            "quizzes",
            "study_plans",
            "live_lessons",
            "lesson_management",
            "notifications",
            "students_erp",
            "teachers",
            "staff",
            "orders",
            "user_group",
            "timesheet_management",
        ]);

        expect(QueryParamsService["learning_objectives"]).toEqual([
            { query: "bookId", resource: "books", basename: "syllabus" },
            {
                query: "chapterId",
                resource: "chapters",
                rootId: "bookId",
                rootResource: "books",
                basename: "syllabus",
            },
            {
                query: "parentId",
                resource: "topics",
                rootId: "bookId",
                rootResource: "books",
                basename: "syllabus",
            },
        ]);
        expect(QueryParamsService["assignments"]).toEqual(
            QueryParamsService["learning_objectives"]
        );

        expect(QueryParamsService["quizzes"]).toEqual([
            { query: "parentId", resource: "learning_objectives", basename: "syllabus" },
            { query: "topicId", resource: "topics", basename: "syllabus" },
        ]);
        expect(QueryParamsService["live_lessons"]).toEqual([
            {
                resource: "live_lessons",
                translateKey: "resources.live_lessons.lessonManagement",
                basename: "lesson",
            },
        ]);
        expect(QueryParamsService["students_erp"]).toEqual([
            {
                resource: "students_erp",
                translateKey: "resources.students_erp.titles.studentManagement",
                basename: "user",
            },
        ]);
        expect(QueryParamsService["study_plans"]).toEqual([
            { resource: "courses", translateKey: "resources.courses.name", basename: "syllabus" },
            { query: "courseId", resource: "courses", basename: "syllabus" },
        ]);
    });
});
