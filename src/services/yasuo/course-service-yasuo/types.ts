import { Quiz, QuizType } from "src/models/quiz";

import { UpsertBooksRequest } from "manabie-yasuo/course_pb";

import type { Courses } from "src/__generated__/root-types";

export declare namespace NsYasuoCourseService {
    export interface UpsertCourses {
        name: Courses["name"];
        course_id?: Courses["course_id"];
        school_id: Courses["school_id"];
        display_order: Courses["display_order"];
        icon: Courses["icon"];
        chapter_ids: string[];
        files?: File[];
    }

    export type UpsertBooks = UpsertBooksRequest.AsObject["booksList"];

    export interface UpsertChapters {
        name: string;
        school_id: number;
        chapter_id: string;
        book_id: string;
        display_order: number;
    }
    export interface UpsertTopics {
        name: string;
        grade?: number;
        school_id: number;
        chapter_id: string;
        topic_id: string;
        display_order: number;
        status?: string;
        icon_url?: string;
        base64?: string;
    }

    export interface AddBooks {
        courseId: string;
        bookIds: string[];
    }

    export interface AttachMaterialsToCourse {
        courseId: string;
        mediaIds: string[];
        lessonGroupId: string;
        files: File[];
    }

    export interface DeleteLOs {
        lOId: string | string[];
    }

    export interface RemoveQuizFromLO {
        loId: string;
        quizId: string;
    }

    export interface UpsertQuizV2 {
        kind: QuizType;
        quizList: Quiz[];
    }
}

export default NsYasuoCourseService;
