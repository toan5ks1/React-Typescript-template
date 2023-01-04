export enum AddParentType {
    EXISTING = 1,
    NEW = 2,
}

export enum AddStudentType {
    NORMAL_ADD = 1,
    IMPORT_STUDENT_CSV = 2,
}

export enum UserImportType {
    IMPORT_STUDENT_CSV = 1,
    IMPORT_PARENT_CSV = 2,
}

export enum DebouncedTime {
    AUTO_COMPETE_COURSE = 400,
}

export enum PdfStudentQrCodesTypes {
    STUDENT_CARD = "studentCard",
    QR_CODE_SHEET = "qrCodeSheet",
}

export enum TimesheetConfigTypes {
    ENABLE = "enable",
    DISABLE = "disable",
}
