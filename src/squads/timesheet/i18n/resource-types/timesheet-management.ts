declare module NsTimesheetManagement {
    export interface RootObject {
        name: string;
        titles: {
            timesheetManagement: string;
            generalInfo: string;
            createTimesheet: string;
            editTimesheet: string;
            remarks: string;
            remark: string;
            otherWorkingHours: string;
            lessonHours: string;
        };
        labels: {
            date: string;
            location: string;
            staff: string;
            staffName: string;
            staffEmail: string;
            workingType: string;
            timeRange: string;
            totalHours: string;
            remarks: string;
            otherWorkingHours: string;
            start: string;
            end: string;
            status: string;
            type: string;
            numberOfLessons: string;
            lessonHours: string;
        };
        lessonStatus: {
            LESSON_SCHEDULING_STATUS_PUBLISHED: string;
            LESSON_SCHEDULING_STATUS_COMPLETED: string;
            LESSON_SCHEDULING_STATUS_CANCELED: string;
        };
        lessonType: {
            LESSON_TEACHING_METHOD_INDIVIDUAL: string;
            LESSON_TEACHING_METHOD_GROUP: string;
        };
        timesheetStatus: {
            TIMESHEET_STATUS_ALL: string;
            TIMESHEET_STATUS_DRAFT: string;
            TIMESHEET_STATUS_SUBMITTED: string;
            TIMESHEET_STATUS_REJECTED: string;
            TIMESHEET_STATUS_APPROVED: string;
            TIMESHEET_STATUS_CONFIRMED: string;
        };
        timesheetDetail: string;
        messages: {
            success: {
                addTimesheet: string;
                updateTimesheet: string;
            };
            error: {
                timesheetAlreadyExists: string;
            };
            validation: {
                requiredField: string;
                invalidTimeRange: string;
            };
        };
    }
}

export interface TimesheetManagement extends NsTimesheetManagement.RootObject {}
