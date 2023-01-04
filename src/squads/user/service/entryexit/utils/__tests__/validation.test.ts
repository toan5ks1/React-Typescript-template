import { formInvalidErr } from "src/internals/errors";
import { NsStudentEntryExitService } from "src/squads/user/service/entryexit/student-entry-exit-service/types";

import { validateDeleteEntryExitReq } from "../validation";

const mockDeleteEntryExitData: NsStudentEntryExitService.DeleteEntryExitRequest = {
    studentId: "student_1",
    entryexitId: 1,
};

describe("validateDeleteEntryExitReq", () => {
    it("should NOT THROW when correct request", () => {
        expect(() => {
            validateDeleteEntryExitReq(mockDeleteEntryExitData);
        }).not.toThrowError(formInvalidErr);
    });

    it("should THROW when incorrect request", () => {
        expect(() => {
            validateDeleteEntryExitReq();
        }).toThrowError(formInvalidErr);
    });
});
