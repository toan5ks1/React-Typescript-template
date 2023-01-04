import graphqlClient from "src/squads/lesson/internals/hasura-client";
import reactiveStorage from "src/squads/lesson/internals/reactive-storage";
import {
    Lesson_ClassByClassIdForLessonManagementQueryVariables,
    Lesson_ClassManyByNullableCourseIdsAndNameQuery,
    Lesson_ClassManyByNullableCourseIdsAndNameQueryVariables,
    Lesson_ClassManyForLessonManagementQueryVariables,
    Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery,
    Lesson_ClassManyByLocationIdAndCourseIdAndNameQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { generateMockClassMany } from "src/squads/lesson/test-utils/class-course";
import { getFakeLocalUser } from "src/squads/lesson/test-utils/mocks/user";

import classQueriesBob from "src/squads/lesson/service/bob/class-service/class-bob.query";

jest.mock("@manabie-com/graphql-client", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { request: jest.fn() };
        }),
    };
});

const user = getFakeLocalUser();

describe("class-bob.query", () => {
    it("should query getOne success", async () => {
        const variables: Lesson_ClassByClassIdForLessonManagementQueryVariables = {
            class_id: "Sample class Id",
        };
        const mockClass = [
            {
                class_id: "Sample class Id",
                name: "Sample Class Name",
            },
        ];
        reactiveStorage.set("PROFILE", user);

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                class: mockClass,
            },
        });

        const _callSpy = jest.spyOn(classQueriesBob, "_call");
        const result = await classQueriesBob.getOne(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockClass[0]);
    });

    it("should query getMany success", async () => {
        const variables: Lesson_ClassManyForLessonManagementQueryVariables = {
            class_ids: ["Sample Location ID 1", "Sample Location ID 2"],
        };

        const mockClasses = [
            {
                class_id: "Sample Location ID 1",
                name: "Sample Location Name 1",
            },
            {
                class_id: "Sample Location ID 2",
                name: "Sample Location Name 2",
            },
        ];
        reactiveStorage.set("PROFILE", user);

        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                class: mockClasses,
            },
        });
        const _callSpy = jest.spyOn(classQueriesBob, "_call");
        const result = await classQueriesBob.getMany(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockClasses);
    });

    it("should query lessonGetManyByLocationIdAndCourseIdAndNameQuery success", async () => {
        const mockCourseMany: Lesson_ClassManyByLocationIdAndCourseIdAndNameQuery = {
            class: generateMockClassMany(),
        };

        const variables: Lesson_ClassManyByLocationIdAndCourseIdAndNameQueryVariables = {
            location_id: "Location_Id",
            course_id: "Course_Id",
            name: "Class Name",
            limit: 10,
        };

        const _callSpy = jest.spyOn(classQueriesBob, "_call");

        _callSpy.mockResolvedValue({ data: mockCourseMany });

        const result = await classQueriesBob.lessonGetManyByLocationIdAndCourseIdAndNameQuery(
            variables
        );

        expect(result).toEqual(mockCourseMany.class);
    });

    describe("should query lessonGetManyByNullableCourseIdAndNameQuery success", () => {
        const mockCourseMany: Lesson_ClassManyByNullableCourseIdsAndNameQuery = {
            class: generateMockClassMany(),
        };

        beforeEach(() => {
            const _callSpy = jest.spyOn(classQueriesBob, "_call");
            _callSpy.mockResolvedValue({ data: mockCourseMany });
        });

        it("with courses", async () => {
            const queryVariable: Lesson_ClassManyByNullableCourseIdsAndNameQueryVariables = {
                course_ids: ["Course_Id_1", "Course_Id_2"],
                name: "Class Name",
                limit: 10,
            };

            const result = await classQueriesBob.lessonGetManyByNullableCourseIdAndNameQuery(
                queryVariable
            );

            expect(result).toEqual(mockCourseMany.class);
        });

        it("without courses", async () => {
            const queryVariable: Lesson_ClassManyByNullableCourseIdsAndNameQueryVariables = {
                course_ids: undefined,
                name: "Class Name",
                limit: 10,
            };

            const result = await classQueriesBob.lessonGetManyByNullableCourseIdAndNameQuery(
                queryVariable
            );

            expect(result).toEqual(mockCourseMany.class);
        });
    });
});
