import produce, { Draft } from "immer";
import { KeyConversionTaskStatusTypes } from "src/common/constants/const";

import { ILessonActions, LessonConvertActionTypes, NsLessonConvert } from "./actions";
import { LessonConvert, Material } from "./lesson-convert-types";

const initialState: LessonConvert = {};

function reducer(state: LessonConvert = initialState, action: ILessonActions): LessonConvert {
    switch (action.type) {
        case LessonConvertActionTypes.ADD_LESSON_CONVERT:
            return produce(state, (draft: Draft<LessonConvert>) => {
                addLessonConvert(draft, action);
            });
        case LessonConvertActionTypes.DELETE_LESSON_CONVERT:
            return produce(state, (draft: Draft<LessonConvert>) => {
                deleteLessonConvert(draft, action);
            });
        case LessonConvertActionTypes.UPDATE_LESSON_CONVERT_STATUS: {
            return produce(state, (draft: Draft<LessonConvert>) => {
                updateLessonConvertStatus(draft, action);
            });
        }
        case LessonConvertActionTypes.CLEAR_LESSON_CONVERT: {
            return produce(state, (draft: Draft<LessonConvert>) => {
                clearLessonConvert(draft, action);
            });
        }
        default:
            return state;
    }
}

const addLessonConvert = (
    draft: Draft<LessonConvert>,
    action: NsLessonConvert.AddLessonConvert
) => {
    const { lessonGroupId, courseId, materials, isRetry } = action.payload;
    if (materials.length === 0) return draft;

    const convert: Material[] = materials.map((item) => {
        return {
            id: item.media_id,
            status: KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING,
            name: item.name,
        };
    });
    if (!draft[courseId]) {
        draft[courseId] = new Map();
        draft[courseId].set(lessonGroupId, convert);

        return draft;
    }
    const current = draft[courseId].get(lessonGroupId) || [];

    if (isRetry && materials.length) {
        const { media_id } = materials[0];
        const index = current.findIndex((item) => item.id === media_id);

        if (index !== -1) {
            current[index] = convert[0];
            return draft;
        }
    }

    draft[courseId].set(lessonGroupId, [...current, ...convert]);
};

const deleteLessonConvert = (
    draft: Draft<LessonConvert>,
    action: NsLessonConvert.DeleteLessonConvert
) => {
    const { lessonGroupId, courseId, materialIds = [] } = action.payload;
    if (!draft[courseId]) return draft;
    const materials = draft[courseId].get(lessonGroupId);

    if (materials) {
        const filtered = materials.filter(({ id }) => materialIds.includes(id));
        draft[courseId].set(lessonGroupId, filtered);
    }
};

const updateLessonConvertStatus = (
    draft: Draft<LessonConvert>,
    action: NsLessonConvert.UpdateLessonConvertStatus
) => {
    const { lessonGroupId, courseId, materials } = action.payload;

    if (!draft[courseId]) return draft;

    const size = materials.length;
    for (let i = 0; i < size; i++) {
        const current = draft[courseId].get(lessonGroupId) || [];
        const modifyIndex = current.findIndex((item) => item.id === materials[i].id);

        if (modifyIndex !== -1) {
            current[modifyIndex] = materials[i];
        }
    }
};

const clearLessonConvert = (
    draft: Draft<LessonConvert>,
    action: NsLessonConvert.ClearLessonConvert
) => {
    const { lessonGroupId, courseId } = action.payload;

    if (!draft[courseId]) return draft;
    draft[courseId].delete(lessonGroupId);
};

export default reducer;
