import { Media } from "src/squads/lesson/common/types";

import {
    RetrieveLessonsRequestV2,
    RetrieveLessonsResponseV2,
    CreateLessonRequest,
    DeleteLessonRequest,
} from "manabuf/bob/v1/lessons_pb";

import { Lessons } from "src/squads/lesson/__generated__/bob/root-types";

export declare namespace NsLesson_Bob_LessonsService {
    export interface UpsertLessons
        extends Omit<CreateLessonRequest.AsObject, "startTime" | "endTime" | "materialsList"> {
        lessonId?: Lessons["lesson_id"]; // For update lesson
        startTime: Date;
        endTime: Date;
        mediaIds: Media["media_id"][];
    }

    export interface DeleteLessonRequest extends DeleteLessonRequest.AsObject {}

    export interface RetrieveLessonsRequest extends RetrieveLessonsRequestV2.AsObject {}

    export interface RetrieveLessonsResponseLesson
        extends RetrieveLessonsResponseV2.Lesson.AsObject {}
}
