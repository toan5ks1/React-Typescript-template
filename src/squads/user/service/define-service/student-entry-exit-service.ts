import {
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables,
    StudentQrCodeByStudentIdsQueryVariables,
} from "src/squads/user/service/bob/bob-types";
import studentEntryExitQueriesBob from "src/squads/user/service/bob/student-entry-exit-service-bob";
import studentEntryExitService from "src/squads/user/service/entryexit/student-entry-exit-service";
import { NsStudentEntryExitService } from "src/squads/user/service/entryexit/student-entry-exit-service/types";
import { defineService } from "src/squads/user/service/service-creator";
import { InvalidParamError, ListQuery } from "src/squads/user/service/service-types";
import { isInvalidOrEmptyVariable } from "src/squads/user/service/utils";

const studentEntryExit = defineService({
    query: {
        entryExitGetManyStudentQrByStudentIds: (
            variables: ListQuery<StudentQrCodeByStudentIdsQueryVariables>
        ) => {
            const { filter = {} } = variables;

            return studentEntryExitQueriesBob.getMany(filter);
        },
        entryExitGetManyStudentRecords: (
            variables: ListQuery<EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables>
        ) => {
            const { filter, pagination } = variables;
            if (isInvalidOrEmptyVariable(filter?.student_id)) {
                throw new InvalidParamError({
                    action: "entryExitGetMany",
                    errors: [
                        {
                            field: "student_id",
                            fieldValueIfNotSensitive: filter?.student_id,
                        },
                    ],
                    serviceName: "bobGraphQL",
                });
            }
            return studentEntryExitQueriesBob.getList({
                student_id: filter?.student_id || "",
                ...pagination,
            });
        },
    },

    mutation: {
        CREATE: (data: NsStudentEntryExitService.CreateEntryExitRequest) => {
            return studentEntryExitService.createStudentEntryExit(data);
        },
        UPDATE: (data: NsStudentEntryExitService.UpdateEntryExitRequest) => {
            return studentEntryExitService.updateStudentEntryExit(data);
        },
        DELETE: (data: NsStudentEntryExitService.DeleteEntryExitRequest) => {
            return studentEntryExitService.deleteStudentEntryExit(data);
        },
        GENERATE_STUDENT_QR_CODES: (
            data: NsStudentEntryExitService.GenerateStudentQrCodesRequest
        ) => {
            return studentEntryExitService.generateStudentsQrCodes(data);
        },
        SCAN: (data: NsStudentEntryExitService.ScanRequest) => {
            return studentEntryExitService.scanStudentEntryExit(data);
        },
    },
});

export default studentEntryExit;
