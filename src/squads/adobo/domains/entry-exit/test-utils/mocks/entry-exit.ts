import { DateTime } from "luxon";
import { PaginationWithTotal } from "src/squads/adobo/domains/entry-exit/services/service-creator";

import { Maybe } from "src/squads/adobo/__generated__/bob/root-types";

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
    exit_at?: Maybe<any>;
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

export function getMockEntryExitRecordsDataThisMonth(): StudentEntryExitRecord[] {
    const now = DateTime.local();
    const currentYear = now.year;
    const currentMonth = now.month;
    return [
        {
            entry_at: DateTime.local(currentYear, currentMonth, 2, 8, 30).toISO(),
            exit_at: DateTime.local(currentYear, currentMonth, 2, 18, 30).toISO(),
            entryexit_id: 1,
            student_id: "studentid1",
        },
        {
            entry_at: DateTime.local(currentYear, currentMonth, 1, 8, 30).toISO(),
            exit_at: DateTime.local(currentYear, currentMonth, 1, 18, 30).toISO(),
            entryexit_id: 2,
            student_id: "studentid1",
        },
    ];
}

export function getMockEntryExitRecordsDataLastMonth(): StudentEntryExitRecord[] {
    const now = DateTime.local();
    const currentYear = now.year;
    const prevMonth = now.month - 1;
    return [
        {
            entry_at: DateTime.local(currentYear, prevMonth, 25, 8, 30).toISO(),
            exit_at: DateTime.local(currentYear, prevMonth, 25, 18, 30).toISO(),
            entryexit_id: 3,
            student_id: "studentid1",
        },
        {
            entry_at: DateTime.local(currentYear, prevMonth, 5, 8, 30).toISO(),
            exit_at: DateTime.local(currentYear, prevMonth, 5, 18, 30).toISO(),
            entryexit_id: 4,
            student_id: "studentid1",
        },
    ];
}

export function getMockEntryExitRecordsDataThisYear(): StudentEntryExitRecord[] {
    return [...getMockEntryExitRecordsDataThisMonth(), ...getMockEntryExitRecordsDataLastMonth()];
}

export function getMockEntryExitRecordsFilterData(startDate: string, endDate: string) {
    const currentYear = DateTime.local().year;
    const prevYear = currentYear - 1;

    const data: StudentEntryExitRecord[] = [
        ...getMockEntryExitRecordsDataThisYear(),
        {
            entry_at: DateTime.local(prevYear, 7, 29, 8, 30).toISO(),
            exit_at: DateTime.local(prevYear, 7, 29, 18, 30).toISO(),
            entryexit_id: 5,
            student_id: "studentid1",
        },
    ];

    const filteredData = data.filter((d) => {
        return d.entry_at >= startDate && d.entry_at <= endDate;
    });

    return filteredData;
}
