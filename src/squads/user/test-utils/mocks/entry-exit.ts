import { PaginationWithTotal } from "src/squads/user/service/service-creator";

interface EntryExitRecordFormData {
    entryDate: Date;
    entryTime: Date;
    exitTime: Date | null;
    studentId: string;
    notifyParents: boolean;
}

interface StudentEntryExitRecord {
    entry_at: any;
    entryexit_id: number;
    exit_at?: any;
    student_id: string;
}

export function getMockEntryExitRecordsData(): StudentEntryExitRecord[] {
    return [
        {
            entry_at: "2022-02-10T01:28:20.769718+00:00",
            exit_at: "2022-02-10T02:28:20.769718+00:00",
            entryexit_id: 1,
            student_id: "studentid1",
        },
        {
            entry_at: "2022-02-11T01:28:20.769718+00:00",
            exit_at: undefined,
            entryexit_id: 2,
            student_id: "studentid1",
        },
    ];
}

export function getMockEntryExitRecordsPagination(): PaginationWithTotal {
    return {
        offset: 0,
        page: 0,
        limit: 10,
        rowsPerPage: 10,
        count: 0,
        onPageChange: jest.fn(),
        onRowsPerPageChange: jest.fn(),
    };
}

export function getMockEntryExitRecordFormData(mockDate: string): EntryExitRecordFormData {
    return {
        entryDate: new Date(mockDate),
        entryTime: new Date(mockDate),
        exitTime: null,
        studentId: "studentid1",
        notifyParents: false,
    };
}
