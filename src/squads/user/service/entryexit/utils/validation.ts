import { formInvalidErr } from "src/internals/errors";
import { NsStudentEntryExitService } from "src/squads/user/service/entryexit/student-entry-exit-service/types";

export function validateDeleteEntryExitReq(
    data?: NsStudentEntryExitService.DeleteEntryExitRequest
) {
    if (!data || !data.studentId || !data.entryexitId) {
        throw formInvalidErr;
    }
}
