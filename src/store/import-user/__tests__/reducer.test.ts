import reducerImportUser, { initialState } from "../reducer";

describe("reducerImportUser", () => {
    const mockString = "string-base64";
    it("should return state student and isStudentImporting correctly in type IMPORT_STUDENTS", () => {
        const result = reducerImportUser(initialState, {
            payload: mockString,
            type: "IMPORT_STUDENTS",
        });
        expect(result.isStudentImporting).toBe(true);
        expect(result.student).toBe(mockString);
    });

    it("should return state student and isStudentImporting correctly in type IMPORT_STUDENTS_FINISH", () => {
        const result = reducerImportUser(initialState, {
            payload: "",
            type: "IMPORT_STUDENTS_FINISH",
        });
        expect(result.isStudentImporting).toBe(false);
        expect(result.student).toBe("");
    });

    it("should return state parent and isParentImporting correctly in type IMPORT_PARENTS", () => {
        const result = reducerImportUser(initialState, {
            payload: mockString,
            type: "IMPORT_PARENTS",
        });
        expect(result.isParentImporting).toBe(true);
        expect(result.parent).toBe(mockString);
    });

    it("should return state parent and isParentImporting correctly in type IMPORT_PARENTS_FINISH", () => {
        const result = reducerImportUser(initialState, {
            payload: "",
            type: "IMPORT_PARENTS_FINISH",
        });
        expect(result.isParentImporting).toBe(false);
        expect(result.parent).toBe("");
    });
});
