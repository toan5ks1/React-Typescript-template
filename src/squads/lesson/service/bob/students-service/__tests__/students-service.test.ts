import {
    CountStudentWithFilterQuery,
    CountStudentWithFilterQueryVariables,
    GradesOfStudentsListQueryVariables,
    StudentsListByFiltersWithoutGradeAndAggregateQueryVariables,
    StudentsManyQueryVariables,
} from "src/squads/lesson/service/bob/bob-types";
import { studentsService } from "src/squads/lesson/service/bob/students-service/students-service";
import { mockGradesList, mockStudentsMany } from "src/squads/lesson/test-utils/lesson-management";
import { createMockListStudentWithFilter } from "src/squads/lesson/test-utils/student";

import studentsQueriesBob from "src/squads/lesson/service/bob/students-service/students-bob.query";

jest.mock("src/squads/lesson/service/bob/students-service/students-bob.query", () => ({
    __esModule: true,
    default: {
        getMany: jest.fn(),
        getGradesOfStudentsList: jest.fn(),
        getListWithFilter: jest.fn(),
        getCountStudentWithFilter: jest.fn(),
    },
}));

describe("studentsGetMany query", () => {
    it("should query studentsGetMany success", async () => {
        (studentsQueriesBob.getMany as jest.Mock).mockResolvedValue(mockStudentsMany);
        const variables: StudentsManyQueryVariables = {
            user_ids: ["user ids"],
        };
        const response = await studentsService.query.studentsGetMany(variables);
        expect(studentsQueriesBob.getMany).toBeCalledWith(variables);
        expect(response).toEqual(mockStudentsMany);
    });

    it("should not call query studentsGetMany when user_ids is undefined", async () => {
        const invalidQueryVariable: StudentsManyQueryVariables = {
            user_ids: undefined,
        };
        (studentsQueriesBob.getMany as jest.Mock).mockResolvedValue(mockStudentsMany);

        await expect(async () => {
            await studentsService.query.studentsGetMany(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "studentsGetMany",
            serviceName: "bobGraphQL",
            errors: [{ field: "user_ids" }],
            name: "InvalidParamError",
        });

        expect(studentsQueriesBob.getMany).not.toBeCalled();
    });

    it("should not call query studentsGetMany when user_ids is an empty string", async () => {
        const invalidQueryVariable: StudentsManyQueryVariables = {
            user_ids: "",
        };
        (studentsQueriesBob.getMany as jest.Mock).mockResolvedValue(mockStudentsMany);

        await expect(async () => {
            await studentsService.query.studentsGetMany(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "studentsGetMany",
            serviceName: "bobGraphQL",
            errors: [{ field: "user_ids" }],
            name: "InvalidParamError",
        });

        expect(studentsQueriesBob.getMany).not.toBeCalled();
    });

    it("should not call query studentsGetMany when user_ids is an empty array", async () => {
        const invalidQueryVariable: StudentsManyQueryVariables = {
            user_ids: [],
        };
        (studentsQueriesBob.getMany as jest.Mock).mockResolvedValue(mockStudentsMany);

        await expect(async () => {
            await studentsService.query.studentsGetMany(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "studentsGetMany",
            serviceName: "bobGraphQL",
            errors: [{ field: "user_ids" }],
            name: "InvalidParamError",
        });

        expect(studentsQueriesBob.getMany).not.toBeCalled();
    });
});

describe("studentsGetListWithFilter query", () => {
    it("should query studentsGetListWithFilter success", async () => {
        const mockListStudentWithFilter = createMockListStudentWithFilter("user_id");
        (studentsQueriesBob.getListWithFilter as jest.Mock).mockResolvedValue(
            mockListStudentWithFilter
        );
        const variables: StudentsListByFiltersWithoutGradeAndAggregateQueryVariables = {};
        const response = await studentsService.query.studentsGetListWithFilter(variables);
        expect(studentsQueriesBob.getListWithFilter).toBeCalledWith(variables);
        expect(response).toEqual(mockListStudentWithFilter);
    });
});

describe("studentsGetGradesOfStudent query", () => {
    it("should query studentsGetGradesOfStudent success", async () => {
        (studentsQueriesBob.getGradesOfStudentsList as jest.Mock).mockResolvedValue(mockGradesList);
        const variables: GradesOfStudentsListQueryVariables = {
            student_ids: ["student ids"],
        };
        const response = await studentsService.query.studentsGetGradesOfStudent(variables);
        expect(studentsQueriesBob.getGradesOfStudentsList).toBeCalledWith(variables);
        expect(response).toEqual(mockGradesList);
    });

    it("should not call query studentsGetGradesOfStudent when student_ids is an empty array", async () => {
        const invalidQueryVariable: GradesOfStudentsListQueryVariables = {
            student_ids: [],
        };
        (studentsQueriesBob.getMany as jest.Mock).mockResolvedValue(mockStudentsMany);

        await expect(async () => {
            await studentsService.query.studentsGetGradesOfStudent(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "studentsGetGradesOfStudent",
            serviceName: "bobGraphQL",
            errors: [{ field: "student_ids" }],
            name: "InvalidParamError",
        });

        expect(studentsQueriesBob.getMany).not.toBeCalled();
    });

    it("should not call query studentsGetGradesOfStudent when student_ids is an empty string", async () => {
        const invalidQueryVariable: GradesOfStudentsListQueryVariables = {
            student_ids: "",
        };
        (studentsQueriesBob.getMany as jest.Mock).mockResolvedValue(mockStudentsMany);

        await expect(async () => {
            await studentsService.query.studentsGetGradesOfStudent(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "studentsGetGradesOfStudent",
            serviceName: "bobGraphQL",
            errors: [{ field: "student_ids" }],
            name: "InvalidParamError",
        });

        expect(studentsQueriesBob.getMany).not.toBeCalled();
    });

    it("should not call query studentsGetGradesOfStudent when student_ids is an undefined", async () => {
        const invalidQueryVariable: GradesOfStudentsListQueryVariables = {
            student_ids: undefined,
        };
        (studentsQueriesBob.getMany as jest.Mock).mockResolvedValue(mockStudentsMany);

        await expect(async () => {
            await studentsService.query.studentsGetGradesOfStudent(invalidQueryVariable);
        }).rejects.toMatchObject({
            action: "studentsGetGradesOfStudent",
            serviceName: "bobGraphQL",
            errors: [{ field: "student_ids" }],
            name: "InvalidParamError",
        });

        expect(studentsQueriesBob.getMany).not.toBeCalled();
    });
});

describe("studentsGetCountStudentWithFilter query", () => {
    it("should query studentsGetCountStudentWithFilter success", async () => {
        const mockUsersAggregate: CountStudentWithFilterQuery = {
            users_aggregate: { aggregate: {} },
        };
        (studentsQueriesBob.getCountStudentWithFilter as jest.Mock).mockResolvedValue(
            mockUsersAggregate
        );
        const variables: CountStudentWithFilterQueryVariables = {};
        const response = await studentsService.query.studentsGetCountStudentWithFilter(variables);
        expect(studentsQueriesBob.getCountStudentWithFilter).toBeCalledWith(variables);
        expect(response).toEqual(mockUsersAggregate);
    });
});
