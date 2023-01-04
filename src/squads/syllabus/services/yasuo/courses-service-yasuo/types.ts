import { Quiz, QuizType } from "src/models/quiz";

import {
    AddBooksRequest,
    DeleteCoursesRequest,
    DeleteLosRequest,
    DeleteTopicsRequest,
    UpsertBooksRequest,
} from "manabie-yasuo/course_pb";

import type { Courses } from "src/squads/syllabus/__generated__/bob/root-types";

export declare namespace NsSyllabus_Yasuo_CoursesService {
    export interface UpsertCourses {
        name: Courses["name"];
        course_id?: Courses["course_id"];
        school_id: Courses["school_id"];
        display_order: Courses["display_order"];
        icon: Courses["icon"];
        chapter_ids: string[];
        files?: File[];
    }

    export interface DeleteCourses extends DeleteCoursesRequest.AsObject {}

    export interface UpdateBook
        extends Omit<UpsertBooksRequest.Book.AsObject, "country" | "grade" | "subject"> {}

    export interface CreateBook extends Omit<UpdateBook, "bookId"> {}

    export type UpsertBook = CreateBook | UpdateBook;

    export interface DeleteTopics extends DeleteTopicsRequest.AsObject {}

    export interface AddBooksToCourse extends AddBooksRequest.AsObject {}

    export interface AttachMaterialsToCourse {
        courseId: string;
        mediaIds: string[];
        lessonGroupId: string;
        files: File[];
    }

    export interface DeleteLos extends DeleteLosRequest.AsObject {}

    export interface RemoveQuizFromLO {
        loId: string;
        quizId: string;
    }

    export interface UpsertQuizV2 {
        kind: QuizType;
        quizList: Quiz[];
    }

    export interface UpsertQuiz {
        quiz: Quiz;
    }
}

export default NsSyllabus_Yasuo_CoursesService;
