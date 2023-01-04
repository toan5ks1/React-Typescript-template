import { MediaHasura } from "src/squads/lesson/models/media";

import { Material } from "./lesson-convert-types";

export enum LessonConvertActionTypes {
    ADD_LESSON_CONVERT = "ADD_LESSON_CONVERT",
    DELETE_LESSON_CONVERT = "DELETE_LESSON_CONVERT",
    UPDATE_LESSON_CONVERT_STATUS = "UPDATE_LESSON_CONVERT_STATUS",
    CLEAR_LESSON_CONVERT = "CLEAR_LESSON_CONVERT",
}

export declare namespace NsLessonConvert {
    interface AddLessonConvert {
        type: LessonConvertActionTypes.ADD_LESSON_CONVERT;
        payload: {
            lessonGroupId: string;
            courseId: string;
            materials: Pick<MediaHasura, "media_id" | "name">[];
            isRetry?: boolean;
        };
    }

    interface DeleteLessonConvert {
        type: LessonConvertActionTypes.DELETE_LESSON_CONVERT;
        payload: {
            lessonGroupId: string;
            courseId: string;
            materialIds: string[];
        };
    }
    interface UpdateLessonConvertStatus {
        type: LessonConvertActionTypes.UPDATE_LESSON_CONVERT_STATUS;
        payload: {
            lessonGroupId: string;
            courseId: string;
            materials: Material[];
        };
    }
    interface ClearLessonConvert {
        type: LessonConvertActionTypes.CLEAR_LESSON_CONVERT;
        payload: {
            lessonGroupId: string;
            courseId: string;
        };
    }
}

export const LessonConvertActions = {
    addLessonConvert(
        params: NsLessonConvert.AddLessonConvert["payload"]
    ): NsLessonConvert.AddLessonConvert {
        return {
            type: LessonConvertActionTypes.ADD_LESSON_CONVERT,
            payload: params,
        };
    },
    deleteLessonConvert(params: NsLessonConvert.DeleteLessonConvert["payload"]) {
        return {
            type: LessonConvertActionTypes.DELETE_LESSON_CONVERT,
            payload: params,
        };
    },
    updateLessonConvertStatus(
        params: NsLessonConvert.UpdateLessonConvertStatus["payload"]
    ): NsLessonConvert.UpdateLessonConvertStatus {
        return {
            type: LessonConvertActionTypes.UPDATE_LESSON_CONVERT_STATUS,
            payload: params,
        };
    },
    clearLessonConvert(
        params: NsLessonConvert.ClearLessonConvert["payload"]
    ): NsLessonConvert.ClearLessonConvert {
        return {
            type: LessonConvertActionTypes.CLEAR_LESSON_CONVERT,
            payload: params,
        };
    },
};

export type ILessonActions =
    | NsLessonConvert.AddLessonConvert
    | NsLessonConvert.ClearLessonConvert
    | NsLessonConvert.UpdateLessonConvertStatus
    | NsLessonConvert.DeleteLessonConvert;
