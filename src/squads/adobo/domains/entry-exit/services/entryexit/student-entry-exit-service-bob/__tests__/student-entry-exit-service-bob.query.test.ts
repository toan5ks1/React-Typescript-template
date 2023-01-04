import graphqlClient from "src/squads/adobo/domains/entry-exit/internals/hasura-client";

import studentEntryExitQueriesBob from "../student-entry-exit-service-bob.query";

const mockStudentQrMany = [{ qr_url: "qu_url", qr_id: 1, student_id: "id01" }];
const mockStudentEntryExitRecords = {
    entry_at: "2022-02-10T01:28:20.769718+00:00",
    exit_at: "2022-02-10T02:28:20.769718+00:00",
    entryexit_id: 1,
    student_id: "studentid1",
};

jest.mock("@manabie-com/graphql-client");

describe("student-entry-exit-service-bob", () => {
    it("getMany method", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                student_qr: mockStudentQrMany,
            },
        });
        const _callSpy = jest.spyOn(studentEntryExitQueriesBob, "_call");
        const result = await studentEntryExitQueriesBob.getMany({});
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockStudentQrMany);
        _callSpy.mockClear();
    });

    it("getList method", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                student_entryexit_records: [mockStudentEntryExitRecords],
            },
        });
        const _callSpy = jest.spyOn(studentEntryExitQueriesBob, "_call");
        const result = await studentEntryExitQueriesBob.getList({
            student_id: "id01",
        });
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual([mockStudentEntryExitRecords]);
        _callSpy.mockClear();
    });

    it("entryExitGetManyStudentRecordsByDate method", async () => {
        (graphqlClient.request as jest.Mock).mockReturnValue({
            data: {
                student_entryexit_records: [mockStudentEntryExitRecords],
            },
        });
        const _callSpy = jest.spyOn(studentEntryExitQueriesBob, "_call");
        const result = await studentEntryExitQueriesBob.entryExitGetManyStudentRecordsByDate({
            student_id: "id01",
            start_date: "2022-02-01T00:00:00+00:00",
            end_date: "2022-02-28T23:59:59+00:00",
        });
        expect(_callSpy).toHaveBeenCalledTimes(1);
        expect(result).toEqual([mockStudentEntryExitRecords]);
        _callSpy.mockClear();
    });
});
