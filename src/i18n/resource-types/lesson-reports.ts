declare module NsLessonReport {
    export interface Columns {
        lessonDate: string;
        teacherName: string;
        studentName: string;
        startTime: string;
        endTime: string;
    }

    export interface Actions {
        submitAll: string;
    }

    export interface Labels {
        student: string;
        teacher: string;
        to: string;
        from: string;
        completed: string;
        incomplete: string;
        optionA: string;
        optionB: string;
        optionC: string;
        optionD: string;
    }

    export interface Messages {
        needToFillInTheRequiredInformation: string;
    }

    export interface RootObject {
        name: string;
        lessonReport: string;
        createReport: string;
        columns: Columns;
        actions: Actions;
        labels: Labels;
        messages: Messages;
        generalInfo: string;
        attendance: string;
        attendanceStatus: string;
        attendanceRemark: string;
        homeworkSubmission: string;
        homeworkStatus: string;
        completion: string;
        score: string;
        attitude: string;
        lessonSpeed: string;
        extraContent: string;
        understanding: string;
        extraHomework: string;
        remarks: string;
        course: string;
        subject: string;
        previousReport: string;
        startTime: string;
        endTime: string;
        generalInformation: string;
        viewStudyPlan: string;
        lesson: string;
        createIndividualReport: string;
        studentsList: string;
        lessonTitle: string;
        group: string;
        individual: string;
        lessonReportInformation: string;
        enterStudentName: string;
        STUDENT_ATTEND_STATUS_ATTEND: string;
        STUDENT_ATTEND_STATUS_ABSENT: string;
        STUDENT_ATTEND_STATUS_LATE: string;
        STUDENT_ATTEND_STATUS_LEAVE_EARLY: string;
    }
}
export interface LessonReport extends NsLessonReport.RootObject {}
