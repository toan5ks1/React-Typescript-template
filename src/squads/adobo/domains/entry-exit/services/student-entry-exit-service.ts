import studentEntryExitMgmtQueries from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-records-service";
import {
    StudentQrCodeByStudentIdsQueryVariables,
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables,
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2QueryVariables,
} from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-records-service/entryexitmgmt-types";
import { NsStudentEntryExitService } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/types";
import { defineService } from "src/squads/adobo/domains/entry-exit/services/service-creator";
import {
    InvalidParamError,
    ListQuery,
} from "src/squads/adobo/domains/entry-exit/services/service-types";
import { isInvalidOrEmptyVariable } from "src/squads/adobo/domains/entry-exit/services/utils";

import studentEntryExitMutation from "./entryexit/student-entry-exit-service";

const studentEntryExitService = defineService({
    query: {
        entryExitGetManyStudentQrByStudentIds: (
            variables: ListQuery<StudentQrCodeByStudentIdsQueryVariables>
        ) => {
            const { filter = {} } = variables;

            return studentEntryExitMgmtQueries.getMany(filter);
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
                    serviceName: "entryexitmgmtGraphQL",
                });
            }
            return studentEntryExitMgmtQueries.getList({
                student_id: filter?.student_id || "",
                ...pagination,
            });
        },
        entryExitGetManyStudentRecordsByDate: (
            variables: ListQuery<EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2QueryVariables>
        ) => {
            const { filter, pagination } = variables;
            if (isInvalidOrEmptyVariable(filter?.student_id)) {
                throw new InvalidParamError({
                    action: "entryExitGetManyStudentRecordsByDate",
                    errors: [
                        {
                            field: "student_id",
                            fieldValueIfNotSensitive: filter?.student_id,
                        },
                    ],
                    serviceName: "entryexitmgmtGraphQL",
                });
            }
            return studentEntryExitMgmtQueries.entryExitGetManyStudentRecordsByDate({
                student_id: filter?.student_id || "",
                start_date: filter?.start_date || "",
                end_date: filter?.end_date || "",
                ...pagination,
            });
        },
    },

    mutation: {
        CREATE: (data: NsStudentEntryExitService.CreateEntryExitRequest) => {
            return studentEntryExitMutation.createStudentEntryExit(data);
        },
        UPDATE: (data: NsStudentEntryExitService.UpdateEntryExitRequest) => {
            return studentEntryExitMutation.updateStudentEntryExit(data);
        },
        DELETE: (data: NsStudentEntryExitService.DeleteEntryExitRequest) => {
            return studentEntryExitMutation.deleteStudentEntryExit(data);
        },
        GENERATE_STUDENT_QR_CODES: (
            data: NsStudentEntryExitService.GenerateStudentQrCodesRequest
        ) => {
            return studentEntryExitMutation.generateStudentsQrCodes(data);
        },
        SCAN: (data: NsStudentEntryExitService.ScanRequest) => {
            return studentEntryExitMutation.scanStudentEntryExit(data);
        },
    },
});

export default studentEntryExitService;
