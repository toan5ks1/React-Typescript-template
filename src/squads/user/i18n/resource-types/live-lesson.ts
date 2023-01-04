declare module NsLiveLesson {
    export interface Status {
        LESSON_STATUS_NONE: string;
        LESSON_STATUS_IN_PROGRESS: string;
        LESSON_STATUS_COMPLETED: string;
        LESSON_STATUS_NOT_STARTED: string;
        LESSON_STATUS_DRAFT: string;
    }

    export interface Columns {
        lessonName: string;
        teacherName: string;
        courseName: string;
        startDate: string;
        startTime: string;
        endDate: string;
        endTime: string;
        status: string;
    }

    export interface Success {
        addLesson: string;
        deleteLesson: string;
        editLesson: string;
    }

    export interface Error {
        deleteLesson: string;
        convertFile: string;
        lessonMemberHasNoUserData: string;
        noCourseInLesson: string;
        noMemberInLesson: string;
        noLessonGroupInLesson: string;
        noMaterialInLesson: string;
        noTeacherInLesson: string;
    }

    export interface Message {
        success: Success;
        error: Error;
    }

    export interface Label {
        course: string;
        to: string;
        from: string;
        lessonStatus: string;
    }

    export interface LessonStatus {
        LESSON_STATUS_NONE: string;
        LESSON_STATUS_IN_PROGRESS: string;
        LESSON_STATUS_COMPLETED: string;
        LESSON_STATUS_NOT_STARTED: string;
        LESSON_STATUS_DRAFT: string;
    }

    export interface Choices {
        lessonStatus: LessonStatus;
    }

    export interface RootObject {
        name: string;
        createTitle: string;
        editTitle: string;
        status: Status;
        columns: Columns;
        message: Message;
        label: Label;
        courseSubTitle: string;
        studentSubTitle: string;
        generalInfo: string;
        courseName: string;
        studentName: string;
        addCourseTitle: string;
        addCourseInfo: string;
        addStudentTitle: string;
        addStudentInfo: string;
        material: string;
        grade: string;
        userName: string;
        email: string;
        lessonName: string;
        startTime: string;
        endTime: string;
        course: string;
        student: string;
        teacherName: string;
        lessonManagement: string;
        choices: Choices;
        lesson: string;
    }
}

export interface LiveLessons extends NsLiveLesson.RootObject {}
