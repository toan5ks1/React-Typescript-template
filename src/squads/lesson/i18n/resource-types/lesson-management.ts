declare module NsLessonManagement {
    interface Actions {
        submitAll: string;
        bulkAction: string;
        submit: string;
        alert: string;
        publish: string;
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
        removedStudentsSuccessfully: string;
        pleaseAddOnlyOneStudentCourse: string;
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
        unableToFetchClass: string;
        unableToFetchSchedule: string;
        noCourseInLesson: string;
        errorDuringFileConversion: string;
        startDateMustComeBeforeEndDate: string;
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
        lessonStatus: string;
        reportStatus: string;
        teachingType: string;
        courseName: string;
        course: string;
        class: string;
        location: string;
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
        locations: string;
        students: string;
        grades: string;
        courses: string;
        lessonStatus: string;
        classes: string;
    }

    interface RecurringLesson {
        oneTime: string;
        weeklyRecurring: string;
        recurringSettings: string;
        pleaseSelectAnOptionToSave: string;
        editRecurringLessons: string;
        onlyThisLesson: string;
        thisAndTheFollowingLessons: string;
        deleteRecurringLessons: string;
        titleWarningDeleteRecurringLessons: string;
        savingOption: string;
        repeatDuration: string;
        repeatDurationTime: string;
    }

    export interface StudentAttendanceStatus {
        STUDENT_ATTEND_STATUS_ATTEND: string;
        STUDENT_ATTEND_STATUS_ABSENT: string;
        STUDENT_ATTEND_STATUS_LATE: string;
        STUDENT_ATTEND_STATUS_LEAVE_EARLY: string;
        STUDENT_ATTEND_STATUS_INFORMED_ABSENT: string;
        STUDENT_ATTEND_STATUS_INFORMED_LATE: string;
    }

    export interface LessonStatus {
        LESSON_SCHEDULING_STATUS_DRAFT: string;
        LESSON_SCHEDULING_STATUS_PUBLISHED: string;
        LESSON_SCHEDULING_STATUS_COMPLETED: string;
        LESSON_SCHEDULING_STATUS_CANCELED: string;
    }

    export interface RootObject {
        lessonStatus: LessonStatus;
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
        previousReport: string;
        viewStudyPlan: string;
        bulkUpdateAttendance: string;
        lessonInfo: string;
        report: string;
        createIndividualReport: string;
        editIndividualReport: string;
        lessonStatusSection: string;
        generalInfo: string;
        course: string;
        startTime: string;
        endTime: string;
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
        totalTime: string;
        minutes: string;
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
        ifYouDeleteThisLessonV2: string;
        studentDoesNotHavePreviousLessonReportForThisCourse: string;
        cannotSaveLessonPleaseAddStudentFromSameCenter: string;
        recurringLesson: RecurringLesson;
        endDate: string;
        cannotCreateLessonReportWhenLessonNoMember: string;
    }
}
export interface LessonManagement extends NsLessonManagement.RootObject {}
