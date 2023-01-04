export declare namespace NsLesson_Yasuo_CourseService {
    export interface AttachMaterialsToCourse {
        courseId: string;
        mediaIds: string[];
        lessonGroupId: string;
        files: File[];
    }

    export interface AttachMaterialsToCourseReq extends Omit<AttachMaterialsToCourse, "files"> {
        newMediaIds: string[];
    }
}

export default NsLesson_Yasuo_CourseService;
