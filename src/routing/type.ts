export enum MicroFrontendTypes {
    SYLLABUS = "syllabus",
    LESSON = "lesson",
    PAYMENT = "payment",
    ENTRY_EXIT = "entry-exit",
    COMMUNICATION = "communication",
    USER = "user",
    INVOICE = "invoice",
    CALENDAR = "calendar",
    TIMESHEET = "timesheet",
    ARCHITECTURE = "architecture",
}
export interface Routing {
    name: MicroFrontendTypes;
    component: () => JSX.Element;
}
