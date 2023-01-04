import graphqlClient from "src/squads/syllabus/internals/hasura-client";
import {
    Lesson_CoursesListQuery,
    Lesson_CoursesListQueryVariables,
    Lesson_CoursesOneQuery,
    Lesson_CoursesOneQueryVariables,
    CoursesListQuery,
    CoursesListQueryVariables,
    CoursesOneQueryVariables,
} from "src/squads/syllabus/services/bob/bob-types";

import coursesQueriesBob from "src/squads/syllabus/services/bob/courses-service/courses-bob.query";

jest.mock("@manabie-com/graphql-client", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { request: jest.fn() };
        }),
    };
});

jest.mock("src/internals/feature-controller");

describe("courses-bob.query", () => {
    it("getOne method", async () => {
        const variables: CoursesOneQueryVariables = {
            course_id: "course_id",
        };

        const mockCourse = [
            {
                course_id: "course_id",
                name: "course name",
            },
        ];

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                courses: mockCourse,
            },
        });

        const _callSpy = jest.spyOn(coursesQueriesBob, "_call");
        const result = await coursesQueriesBob.getOne(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockCourse[0]);
    });

    it("getOne method", async () => {
        const variables: Lesson_CoursesOneQueryVariables = {
            course_id: "course_id",
        };

        const mockCourse: Lesson_CoursesOneQuery["courses"] = [
            {
                course_id: "course_id",
                name: "course name",
                school_id: 1,
                course_books: [],
            },
        ];

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                courses: mockCourse,
            },
        });

        const _callSpy = jest.spyOn(coursesQueriesBob, "_call");
        const result = await coursesQueriesBob.getOneV2(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockCourse[0]);
    });

    it("getList method", async () => {
        const variables: CoursesListQueryVariables = {
            name: "course name",
        };

        const mockCourseList: CoursesListQuery = {
            courses: [
                {
                    course_id: "course_id",
                    name: "course name",
                    school_id: 1,
                },
            ],
            courses_aggregate: {
                aggregate: {
                    count: 10,
                },
            },
        };

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: mockCourseList,
        });

        const _callSpy = jest.spyOn(coursesQueriesBob, "_call");
        const result = await coursesQueriesBob.getList(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
            data: mockCourseList.courses,
            total: mockCourseList.courses_aggregate.aggregate?.count,
        });
    });

    it("getListV2 method", async () => {
        const variables: Lesson_CoursesListQueryVariables = {
            limit: 10,
            offset: 0,
        };

        const mockCourseListV2: Lesson_CoursesListQuery = {
            courses: [
                {
                    course_id: "course_id",
                    name: "course name",
                    school_id: 1,
                },
            ],
            courses_aggregate: {
                aggregate: {
                    count: 10,
                },
            },
        };

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: mockCourseListV2,
        });

        const _callSpy = jest.spyOn(coursesQueriesBob, "_call");
        const result = await coursesQueriesBob.getListV2(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual({
            data: mockCourseListV2.courses,
            total: mockCourseListV2.courses_aggregate.aggregate?.count,
        });
    });
});
