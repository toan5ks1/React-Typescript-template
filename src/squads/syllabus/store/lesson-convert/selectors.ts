import { createSelector } from "reselect";
import { KeyConversionTaskStatusTypes } from "src/squads/syllabus/common/constants/const";

import { RootState } from "../store-types";
import { LessonConvert, Material } from "./lesson-convert-types";

const getLocalSelector = ({ lessonConvert }: RootState) => lessonConvert;

export const isMaterialConverting = (status?: string) => {
    return (
        status === KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING ||
        status === KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_CONVERTING
    );
};

export const isLessonConvertFailed = (status?: string) => {
    return (
        status === KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FAILED ||
        status === KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_INVALID
    );
};

export const hasLessonConverting = (material: Material[]): boolean => {
    let result = false;
    const size = material.length;

    for (let i = 0; i < size; i++) {
        const current = material[i];
        if (isMaterialConverting(current.status)) {
            result = true;
            break;
        }
    }

    return result;
};

export const isAllConvertSuccessfully = (material: Material[]): boolean => {
    const size = material.length;

    for (let i = 0; i < size; i++) {
        const current = material[i];
        if (current.status !== KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FINISHED) {
            return false;
        }
    }

    return true;
};

export const getMaterialIds = (
    lessonConvert: LessonConvert,
    courseId: string,
    lessonGroupId: string
) => {
    if (lessonConvert[courseId] && lessonConvert[courseId].has(lessonGroupId)) {
        return lessonConvert[courseId].get(lessonGroupId);
    }
    return [];
};

export const getCurrentLessonSelector = ({
    courseId,
    lessonGroupId,
}: {
    courseId: string;
    lessonGroupId: string;
}) =>
    createSelector(
        ({ lessonConvert }: RootState) => getMaterialIds(lessonConvert, courseId, lessonGroupId),
        (lessonMaterial) => lessonMaterial
    );

export const getConvertMaterialLessonSelector = createSelector(
    getLocalSelector,
    (lessonConvert) => {
        const results: { courseId: string; lessonGroupId: string; material: Material[] }[] = [];
        Object.keys(lessonConvert).forEach((key) => {
            const current = lessonConvert[key];
            current.forEach((material, lessonGroupId) => {
                if (hasLessonConverting(material)) {
                    results.push({ courseId: key, lessonGroupId, material });
                }
            });
        });
        return results;
    }
);
