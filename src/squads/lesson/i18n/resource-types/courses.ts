declare module NsCourses {
    export interface LessonConvert {
        converting: string;
        tryAgain: string;
        success: string;
        failedUnknown: string;
    }

    export interface Courses {
        lessonConvert: LessonConvert;
    }
}

export interface Courses extends NsCourses.Courses {}
