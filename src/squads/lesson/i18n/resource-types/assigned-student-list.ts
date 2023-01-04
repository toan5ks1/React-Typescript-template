declare module NsAssignedStudentList {
    export interface StudentAssignedStatus {
        STUDENT_ASSIGNED_STATUS_JUST_ASSIGNED: string;
        STUDENT_ASSIGNED_STATUS_UNDER_ASSIGNED: string;
        STUDENT_ASSIGNED_STATUS_OVER_ASSIGNED: string;
    }
    export interface StudentAssignedTableColumn {
        colStudentName: string;
        colCourseName: string;
        colLocation: string;
        colDuration: string;
        colWeek: string;
        colPurchasedSlot: string;
        colAssignedSlot: string;
        colSlotGap: string;
        colStatus: string;
    }
    interface Filters {
        assignedStudentStatus: string;
        students: string;
        courses: string;
        startDate: string;
        endDate: string;
        locations: string;
    }
    export interface RootObject {
        name: string;
        recurring: string;
        slot: string;
        studentAssignedStatus: StudentAssignedStatus;
        columns: StudentAssignedTableColumn;
        enterStudentName: string;
        filters: Filters;
    }
}

export interface AssignedStudentList extends NsAssignedStudentList.RootObject {}
