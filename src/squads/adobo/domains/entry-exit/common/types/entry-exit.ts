export interface EntryExitRecordFormData {
    entryDate: Date;
    entryTime: Date;
    exitTime: Date | null;
    studentId: string;
    notifyParents: boolean;
}
