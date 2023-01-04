import { ImportUserActions } from "../actions";

const { importStudent, importStudentFinish } = ImportUserActions;

describe("importStudent", () => {
    const mockString = "string-base64";

    it("should return payload and type correctly", () => {
        const result = importStudent(mockString);

        expect(result.payload).toBe(mockString);
        expect(result.type).toBe("IMPORT_STUDENTS");
    });
});

describe("importStudentFinish", () => {
    it("should return payload and type correctly", () => {
        const result = importStudentFinish();

        expect(result.payload).toBe("");
        expect(result.type).toBe("IMPORT_STUDENTS_FINISH");
    });
});
