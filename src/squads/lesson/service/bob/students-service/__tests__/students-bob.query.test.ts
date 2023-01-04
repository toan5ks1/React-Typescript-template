import graphqlClient from "src/squads/lesson/internals/hasura-client";
import reactiveStorage from "src/squads/lesson/internals/reactive-storage";
import {
    CountStudentWithFilterQuery,
    CountStudentWithFilterQueryVariables,
    GradesOfStudentsListQueryVariables,
    StudentsListByFiltersWithoutGradeAndAggregateQueryVariables,
    StudentsManyQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { mockGradesList, mockStudentsMany } from "src/squads/lesson/test-utils/lesson-management";
import { getFakeLocalUser } from "src/squads/lesson/test-utils/mocks/user";
import { createMockListStudentWithFilter } from "src/squads/lesson/test-utils/student";

import studentsQueriesBob from "src/squads/lesson/service/bob/students-service/students-bob.query";

jest.mock("@manabie-com/graphql-client", () => {
    return {
        __esModule: true,
        default: jest.fn().mockImplementation(() => {
            return { request: jest.fn() };
        }),
    };
});

const user = getFakeLocalUser();

describe("students-bob.query", () => {
    beforeEach(() => {
        reactiveStorage.set("PROFILE", user);
    });

    it("should query getMany success", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                users: mockStudentsMany,
            },
        });

        const variables: StudentsManyQueryVariables = { user_ids: "user_ids" };

        const _callSpy = jest.spyOn(studentsQueriesBob, "_call");
        const result = await studentsQueriesBob.getMany(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockStudentsMany);
    });

    it("should query getGradesOfStudentsList success", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                students: mockGradesList,
            },
        });

        const variables: GradesOfStudentsListQueryVariables = { student_ids: "student ids" };

        const _callSpy = jest.spyOn(studentsQueriesBob, "_call");
        const result = await studentsQueriesBob.getGradesOfStudentsList(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockGradesList);
    });

    it("should query getListWithFilter success", async () => {
        const mockListStudentWithFilter = createMockListStudentWithFilter("user id");
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                users: mockListStudentWithFilter,
            },
        });

        const variables: StudentsListByFiltersWithoutGradeAndAggregateQueryVariables = {
            student_ids: "student ids",
        };

        const _callSpy = jest.spyOn(studentsQueriesBob, "_call");
        const result = await studentsQueriesBob.getListWithFilter(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockListStudentWithFilter);
    });

    it("should query getCountStudentWithFilter success", async () => {
        const mockUsersAggregate: CountStudentWithFilterQuery = {
            users_aggregate: { aggregate: {} },
        };
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: mockUsersAggregate,
        });

        const variables: CountStudentWithFilterQueryVariables = { student_ids: "student ids" };

        const _callSpy = jest.spyOn(studentsQueriesBob, "_call");
        const result = await studentsQueriesBob.getCountStudentWithFilter(variables);
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockUsersAggregate);
    });
});
