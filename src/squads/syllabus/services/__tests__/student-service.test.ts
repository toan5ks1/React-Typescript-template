import { StudentsManyQueryVariables } from "src/squads/syllabus/services/bob/bob-types";

import { studentService } from "../student-service";

import studentQueriesBob from "src/squads/syllabus/services/bob/student-service-bob/student-service-bob.query";

jest.mock("src/squads/syllabus/services/bob/student-service-bob/student-service-bob.query", () => ({
    __esModule: true,
    default: {
        getMany: jest.fn(),
    },
}));

jest.mock("src/internals/feature-controller");

describe(studentService.query.STUDENT_GET_MANY.name, () => {
    it("should't call query and return undefined when IDS is a nullish", async () => {
        const result = await studentService.query.STUDENT_GET_MANY({});

        expect(studentQueriesBob.getMany).not.toBeCalled();
        expect(result).toEqual(undefined);
    });

    it("should't call query and return undefined when IDS is an an empty array", async () => {
        const result = await studentService.query.STUDENT_GET_MANY({ user_ids: [] });

        expect(studentQueriesBob.getMany).not.toBeCalled();
        expect(result).toEqual(undefined);
    });

    it("should calll getMany and return correct data after query success", async () => {
        const queryResponse = "response_student_getMany";
        const params: StudentsManyQueryVariables = { user_ids: ["userId_1", "userId_2"] };
        (studentQueriesBob.getMany as jest.Mock).mockResolvedValue(queryResponse);

        const result = await studentService.query.STUDENT_GET_MANY(params);

        expect(studentQueriesBob.getMany).toBeCalledWith(params);
        expect(result).toEqual(queryResponse);
    });
});
