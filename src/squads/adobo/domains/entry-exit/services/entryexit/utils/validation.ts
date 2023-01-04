import { formInvalidErr } from "src/internals/errors";
import { NsStudentEntryExitService } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/types";

export function validateDeleteEntryExitReq(
    data?: NsStudentEntryExitService.DeleteEntryExitRequest
) {
    if (!data || !data.studentId || !data.entryexitId) {
        throw formInvalidErr;
    }
}
