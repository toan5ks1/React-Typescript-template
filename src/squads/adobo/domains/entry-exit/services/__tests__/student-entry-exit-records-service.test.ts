import studentEntryExitMgmtQueries from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-records-service";
import {
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables,
    StudentQrCodeByStudentIdsQueryVariables,
    EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2QueryVariables,
} from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-records-service/entryexitmgmt-types";
import { NsStudentEntryExitService } from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/types";
import {
    InvalidParamError,
    ListQuery,
    ToStringFormat,
} from "src/squads/adobo/domains/entry-exit/services/service-types";
import studentEntryExitService from "src/squads/adobo/domains/entry-exit/services/student-entry-exit-service";
import { getInvalidParamErrorObject } from "src/squads/adobo/domains/entry-exit/test-utils/service";

import studentEntryExitModifier from "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/student-entry-exit-service.mutation";

jest.mock(
    "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-service/student-entry-exit-service.mutation"
);

jest.mock(
    "src/squads/adobo/domains/entry-exit/services/entryexit/student-entry-exit-records-service/student-entryexit-records-service-entry-exit.query"
);

describe(`test for entry exit service ${studentEntryExitService.mutation.SCAN.name}`, () => {
    it("should return correct data after success", async () => {
        const response = "studentEntryExitResponse";
        const payload: NsStudentEntryExitService.ScanRequest = {
            qrcodeContent: "qrcodeContent",
            touchTime: new Date(),
        };

        (studentEntryExitModifier.scanStudentEntryExit as jest.Mock).mockResolvedValue(response);

        const result = await studentEntryExitService.mutation.SCAN(payload);

        expect(studentEntryExitModifier.scanStudentEntryExit).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});

describe(`test for entry exit service ${studentEntryExitService.mutation.CREATE.name}`, () => {
    it("should return correct data after success", async () => {
        const response = "studentEntryExitResponse";
        const payload: NsStudentEntryExitService.CreateEntryExitRequest = {
            studentId: "id",
            notifyParents: false,
        };

        (studentEntryExitModifier.createStudentEntryExit as jest.Mock).mockResolvedValue(response);

        const result = await studentEntryExitService.mutation.CREATE(payload);

        expect(studentEntryExitModifier.createStudentEntryExit).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});

describe(`test for entry exit service ${studentEntryExitService.mutation.UPDATE.name}`, () => {
    it("should return correct data after success", async () => {
        const response = "studentEntryExitResponse";
        const payload: NsStudentEntryExitService.UpdateEntryExitRequest = {
            entryexitId: 1,
            entryExitPayload: {
                notifyParents: true,
                studentId: "student id",
            },
        };

        (studentEntryExitModifier.updateStudentEntryExit as jest.Mock).mockResolvedValue(response);

        const result = await studentEntryExitService.mutation.UPDATE(payload);

        expect(studentEntryExitModifier.updateStudentEntryExit).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});

describe(`test for entry exit service ${studentEntryExitService.mutation.DELETE.name}`, () => {
    it("should return correct data after success", async () => {
        const response = "studentEntryExitResponse";
        const payload: NsStudentEntryExitService.DeleteEntryExitRequest = {
            entryexitId: 1,
            studentId: "student id",
        };

        (studentEntryExitModifier.deleteStudentEntryExit as jest.Mock).mockResolvedValue(response);

        const result = await studentEntryExitService.mutation.DELETE(payload);

        expect(studentEntryExitModifier.deleteStudentEntryExit).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});

describe(`test for entry exit service ${studentEntryExitService.mutation.GENERATE_STUDENT_QR_CODES.name}`, () => {
    it("should return correct data after success", async () => {
        const response = "studentEntryExitResponse";
        const payload: NsStudentEntryExitService.GenerateStudentQrCodesRequest = {
            studentIdsList: ["id1", "id2"],
        };

        (studentEntryExitModifier.generateStudentsQrCodes as jest.Mock).mockResolvedValue(response);

        const result = await studentEntryExitService.mutation.GENERATE_STUDENT_QR_CODES(payload);

        expect(studentEntryExitModifier.generateStudentsQrCodes).toBeCalledWith(payload);
        expect(result).toEqual(response);
    });
});

describe(`test for entry exit service ${studentEntryExitService.query.entryExitGetManyStudentQrByStudentIds.name}`, () => {
    it("should call query and return correct data after query success", async () => {
        const filter = { student_ids: ["id1", "id2"] };
        const response = "response_getMany";
        const params: ListQuery<StudentQrCodeByStudentIdsQueryVariables> = {
            filter,
        };

        (studentEntryExitMgmtQueries.getMany as jest.Mock).mockResolvedValue(response);

        const result = await studentEntryExitService.query.entryExitGetManyStudentQrByStudentIds(
            params
        );

        expect(result).toEqual(response);
        expect(studentEntryExitMgmtQueries.getMany).toBeCalledWith(filter);
    });
});

describe(`success test for entry exit service ${studentEntryExitService.query.entryExitGetManyStudentRecords.name}`, () => {
    it("should call query and return correct data after query success", async () => {
        const response = "response_getList";
        const filter = { student_id: "id01" };
        const params: ListQuery<EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdQueryVariables> =
            {
                filter,
            };

        (studentEntryExitMgmtQueries.getList as jest.Mock).mockResolvedValue(response);

        const result = await studentEntryExitService.query.entryExitGetManyStudentRecords(params);

        expect(result).toEqual(response);
        expect(studentEntryExitMgmtQueries.getList).toBeCalledWith(filter);
    });

    it("should throw error if incorrect payload", async () => {
        let error;
        try {
            await studentEntryExitService.query.entryExitGetManyStudentRecords({
                filter: { student_id: "" },
            });
        } catch (err) {
            error = err;
        }

        expect(error).toBeInstanceOf(InvalidParamError);
        expect(getInvalidParamErrorObject(error)).toEqual<ToStringFormat>({
            action: "entryExitGetMany",
            errorName: "InvalidParamError",
            errors: [{ field: "student_id", fieldValueIfNotSensitive: "" }],
            serviceName: "entryexitmgmtGraphQL",
        });
    });
});

describe(`test for entry exit service ${studentEntryExitService.query.entryExitGetManyStudentRecordsByDate.name}`, () => {
    it("should call query and return correct data after query success", async () => {
        const response = "response_entryExitGetManyStudentRecordsByDate";
        const filter = {
            student_id: "id01",
            start_date: "2022-06-30T16:00:00+00:00",
            end_date: "2022-07-31T15:59:59+00:00",
        };
        const params: ListQuery<EntryExit_StudentEntryExitRecordsWithAggregateByStudentIdV2QueryVariables> =
            {
                filter,
            };

        (
            studentEntryExitMgmtQueries.entryExitGetManyStudentRecordsByDate as jest.Mock
        ).mockResolvedValue(response);

        const result = await studentEntryExitService.query.entryExitGetManyStudentRecordsByDate(
            params
        );

        expect(result).toEqual(response);
        expect(studentEntryExitMgmtQueries.entryExitGetManyStudentRecordsByDate).toBeCalledWith(
            filter
        );
    });

    it("should throw error if incorrect payload", async () => {
        let error;
        try {
            await studentEntryExitService.query.entryExitGetManyStudentRecordsByDate({
                filter: { student_id: "" },
            });
        } catch (err) {
            error = err;
        }

        expect(error).toBeInstanceOf(InvalidParamError);
        expect(getInvalidParamErrorObject(error)).toEqual<ToStringFormat>({
            action: "entryExitGetManyStudentRecordsByDate",
            errorName: "InvalidParamError",
            errors: [{ field: "student_id", fieldValueIfNotSensitive: "" }],
            serviceName: "entryexitmgmtGraphQL",
        });
    });
});
