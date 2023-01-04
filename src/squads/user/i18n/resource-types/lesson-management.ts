declare module NsLessonManagement {
    interface Actions {
        submitAll: string;
        bulkAction: string;
        submit: string;
    }
    interface Success {
        addLesson: string;
        deleteLesson: string;
        editLesson: string;
    }

    interface Messages {
        success: Success;
        needToFillInTheRequiredInformation: string;
        bulkActionSuccessfully: string;
        createdReportSuccessfully: string;
        submittedIndividualReportSuccessfully: string;
        editedIndividualReportSuccessfully: string;
        deletedIndividualReportSuccessfully: string;
        addedStudentsSuccessfully: string;
    }

    interface Errors {
        errorWhileFetchingFormConfig: string;
        canNotGetPartnerFormConfig: string;
        unableToGetLessonReport: string;
        studentDoesNotBelongToAnyCourse: string;
        unableToFindTeacher: string;
        unableToGetLessonId: string;
        unableToFindLessonInfo: string;
        unableToFetchTheLinkToThisStudentStudyPlan: string;
        unableToFetchLessonGroup: string;
        unableToFetchMedia: string;
        unableToFetchCenter: string;
    }

    interface Columns {
        studentName: string;
        lessonTime: string;
        center: string;
        teachingMedium: string;
        teachingMethod: string;
        grade: string;
        teacher: string;
        lessonDate: string;
        teachingType: string;
        courseName: string;
    }

    interface Status {
        LESSON_REPORT_SUBMITTING_STATUS_SAVED: string;
        LESSON_REPORT_SUBMITTING_STATUS_SUBMITTED: string;
    }

    interface Filters {
        fromDate: string;
        toDate: string;
        dayOfTheWeekFilter: string;
        startTime: string;
        endTime: string;
        teachers: string;
        centers: string;
        students: string;
        grades: string;
        courses: string;
    }

    export interface StudentAttendanceStatus {
        STUDENT_ATTEND_STATUS_ATTEND: string;
        STUDENT_ATTEND_STATUS_ABSENT: string;
        STUDENT_ATTEND_STATUS_LATE: string;
        STUDENT_ATTEND_STATUS_LEAVE_EARLY: string;
        STUDENT_ATTEND_STATUS_INFORMED_ABSENT: string;
        STUDENT_ATTEND_STATUS_INFORMED_LATE: string;
    }

    export interface RootObject {
        columns: Columns;
        filters: Filters;
        actions: Actions;
        createTitle: string;
        editTitle: string;
        messages: Messages;
        errors: Errors;
        name: string;
        lessonReport: string;
        attendance: string;
        attendanceStatus: string;
        attendanceRemark: string;
        homeworkSubmission: string;
        completion: string;
        score: string;
        extraContent: string;
        extraHomework: string;
        remarks: string;
        previousReport: string;
        viewStudyPlan: string;
        lessonTitle: string;
        bulkUpdateAttendance: string;
        lessonInfo: string;
        report: string;
        createIndividualReport: string;
        editIndividualReport: string;
        generalInfo: string;
        homeworkStatus: string;
        attitude: string;
        lessonSpeed: string;
        understanding: string;
        course: string;
        subject: string;
        startTime: string;
        endTime: string;
        generalInformation: string;
        lesson: string;
        reportDetail: string;
        status: Status;
        studentAttendanceStatus: StudentAttendanceStatus;
        missingTranslation: string;
        areYouSureSubmitLessonReport: string;
        addStudent: string;
        enterStudentName: string;
        lessonDetail: string;
        studentInfo: string;
        materialInfo: string;
        dayOfTheWeek: string;
        LESSON_TEACHING_METHOD_INDIVIDUAL: string;
        LESSON_TEACHING_METHOD_GROUP: string;
        LESSON_TEACHING_MEDIUM_ONLINE: string;
        LESSON_TEACHING_MEDIUM_OFFLINE: string;
        futureLessons: string;
        pastLessons: string;
        areYouSureYouWantToDeleteTheLessonReport: string;
        deleteLessonReport: string;
        deleteLesson: string;
        areYouSureDeleteTheLesson: string;
        ifYouDeleteThisLesson: string;
        studentDoesNotHavePreviousLessonReportForThisCourse: string;
    }
}
export interface LessonManagement extends NsLessonManagement.RootObject {}
