export declare namespace NsYasuoCourseService {
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

export default NsYasuoCourseService;
