import {
    UpsertChaptersRequest,
    DeleteChaptersRequest,
} from "manabuf/eureka/v1/chapter_modifier_pb";

export declare namespace NsSyllabus_ChapterService {
    export interface UpsertChapters extends Pick<UpsertChaptersRequest.AsObject, "bookId"> {
        chaptersList: {
            chapterId: string;
            chapterName: string;
            displayOrder: number;
            schoolId: number;
        }[];
    }

    interface DeleteChapters extends DeleteChaptersRequest.AsObject {}
}

export default NsSyllabus_ChapterService;
