import graphqlClient from "src/squads/user/internals/hasura-client";
import {
    createMockListStudentWithFilter,
    createMockStudent,
    creatMockStudentWithGrade,
    createMockStudentCount,
} from "src/squads/user/test-utils/mocks/student";

import studentQueriesBob from "../student-service-bob.query";

const mockListStudentWithFilter = createMockListStudentWithFilter("student_id");
const mockStudent = createMockStudent({ id: "student_id", current_grade: 1 });
const { user_id, name, email, avatar } = mockStudent.user;
const mockStudentMany = [{ user_id, name, email, avatar }];
const mockStudentWithGrade = creatMockStudentWithGrade("student_id", 1);
const mockStudentCount = createMockStudentCount(10);

jest.mock("@manabie-com/graphql-client");
describe("student-service-bob", () => {
    it("getListWithFilter method", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                users: mockListStudentWithFilter,
            },
        });
        const _callSpy = jest.spyOn(studentQueriesBob, "_call");
        const result = await studentQueriesBob.getListWithFilterV3({});
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockListStudentWithFilter);
        _callSpy.mockClear();
    });
    it("getListWithFilterV2 method", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                users: mockListStudentWithFilter,
            },
        });
        const _callSpy = jest.spyOn(studentQueriesBob, "_call");
        const result = await studentQueriesBob.getListWithFilterV4({});
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockListStudentWithFilter);
        _callSpy.mockClear();
    });
    it("getMany method", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                users: mockStudentMany,
            },
        });
        const _callSpy = jest.spyOn(studentQueriesBob, "_call");
        const result = await studentQueriesBob.getMany({});
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockStudentMany);
        _callSpy.mockClear();
    });

    it("getOne method", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                students: [mockStudent],
            },
        });
        const _callSpy = jest.spyOn(studentQueriesBob, "_call");
        const result = await studentQueriesBob.getOne({ id: "student_id" });
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockStudent);
        _callSpy.mockClear();
    });
    it("getGradesOfStudentsList method", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                students: [mockStudentWithGrade],
            },
        });
        const _callSpy = jest.spyOn(studentQueriesBob, "_call");
        const result = await studentQueriesBob.getGradesOfStudentsList({
            student_ids: ["student_id"],
        });
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual([mockStudentWithGrade]);
        _callSpy.mockClear();
    });
    it("getCountStudentWithFilter method", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                users_aggregate: {
                    aggregate: {
                        count: mockStudentCount,
                    },
                },
            },
        });
        const _callSpy = jest.spyOn(studentQueriesBob, "_call");
        const result = await studentQueriesBob.getCountStudentWithFilter({});
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result?.aggregate?.count).toEqual(mockStudentCount);
        _callSpy.mockClear();
    });
    it("getCountStudentWithFilterV2 method", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                users_aggregate: {
                    aggregate: {
                        count: mockStudentCount,
                    },
                },
            },
        });
        const _callSpy = jest.spyOn(studentQueriesBob, "_call");
        const result = await studentQueriesBob.getCountStudentWithFilterV2({});
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result?.aggregate?.count).toEqual(mockStudentCount);
        _callSpy.mockClear();
    });
});
