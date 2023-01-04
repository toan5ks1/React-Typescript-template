import { useCallback } from "react";

import { ERPModules } from "src/common/constants/enum";
import { arrayHasItem } from "src/common/utils/other";
import { NsLesson_Bob_LessonsService } from "src/squads/lesson/service/bob/lessons-service/types";
import { NsLesson_Bob_UploadService } from "src/squads/lesson/service/bob/upload-service/types";
import inferMutation from "src/squads/lesson/service/infer-mutation";

import { LessonStatus } from "manabuf/bob/v1/lessons_pb";

import useConvertMedia from "src/squads/lesson/hooks/useConvertMedia";
import useResourceTranslate from "src/squads/lesson/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/lesson/hooks/useShowSnackbar";
import {
    transformDataToUpsertLessonManagement,
    transformDataToUpsertLessonManagementV2,
} from "src/squads/lesson/pages/LessonManagement/common/transformers";
import { LessonManagementUpsertFormType } from "src/squads/lesson/pages/LessonManagement/common/types";

export interface UseUpsertLessonOfLessonManagementProps {
    lessonId?: string;
    onError?: (error: Error) => void;
    onSuccess?: (data: NsLesson_Bob_LessonsService.UpsertLessons) => void;
    isEnabledLessonGroup: boolean;
}

export interface UpsertLessonMiddlewareFunction {
    middleWareFunction: (data: LessonManagementUpsertFormType) => boolean;
    onFalse?: () => void;
}

export interface UpsertLessonWithMiddlewareProps {
    data: LessonManagementUpsertFormType;
    middleWares: UpsertLessonMiddlewareFunction[];
    schedulingStatus: LessonStatus;
}

const useUpsertLessonOfLessonManagement = (props: UseUpsertLessonOfLessonManagementProps) => {
    const { lessonId, onError, onSuccess, isEnabledLessonGroup } = props;

    const showSnackbar = useShowSnackbar();
    const tLessonManagement = useResourceTranslate(ERPModules.LESSON_MANAGEMENT);

    const { mutate: upsertLesson, isLoading } = inferMutation({
        entity: "lessons",
        action: lessonId ? "lessonsUpdate" : "lessonsCreate",
    })({
        onError,
        onSuccess: (_, variables) => onSuccess?.(variables),
    });

    const { mutate: upsertDraftLesson, isLoading: isLoadingSaveDraftLesson } = inferMutation({
        entity: "lessons",
        action: lessonId ? "lessonsUpdateDraft" : "lessonsSaveDraft",
    })({
        onError,
        onSuccess: (_, variables) => onSuccess?.(variables),
    });

    const { convertMedia } = useConvertMedia({
        onError: (error) => {
            window.warner?.error("LessonUpsert error during file conversion", error);
            showSnackbar(tLessonManagement("message.error.convertFile"), "error");
        },
    });

    const { mutateAsync: filterAndUploadFiles } = inferMutation({
        entity: "upload",
        action: "uploadFilterAndUploadFiles",
    })({
        onError: (error) => {
            window.warner?.error("LessonUpsert error during file conversion", error);
        },
    });

    const submitLesson = useCallback(
        async (data: LessonManagementUpsertFormType, schedulingStatus: LessonStatus) => {
            const {
                data: { mediaIds },
            } = await filterAndUploadFiles(
                data.materialsList as NsLesson_Bob_UploadService.FilterUploadFiles[]
            );

            await convertMedia(mediaIds);

            const dataToSubmit = isEnabledLessonGroup
                ? transformDataToUpsertLessonManagementV2(
                      data,
                      mediaIds,
                      schedulingStatus,
                      lessonId
                  )
                : transformDataToUpsertLessonManagement(data, mediaIds, schedulingStatus, lessonId);

            schedulingStatus === LessonStatus.LESSON_SCHEDULING_STATUS_PUBLISHED
                ? upsertLesson(dataToSubmit)
                : upsertDraftLesson(dataToSubmit);
        },
        [
            convertMedia,
            filterAndUploadFiles,
            isEnabledLessonGroup,
            lessonId,
            upsertDraftLesson,
            upsertLesson,
        ]
    );

    const upsertLessonWithMiddleWares = useCallback(
        async (props: UpsertLessonWithMiddlewareProps) => {
            const { data, middleWares, schedulingStatus } = props;

            if (!arrayHasItem(middleWares)) {
                await submitLesson(data, schedulingStatus);
                return;
            }

            const middleWaresResult: boolean[] = middleWares.map((middleWare) => {
                if (middleWare.middleWareFunction(data)) return true;

                middleWare.onFalse?.();
                return false;
            });

            const isPassMiddleware = !middleWaresResult.includes(false);
            if (isPassMiddleware) await submitLesson(data, schedulingStatus);
        },
        [submitLesson]
    );

    return {
        upsertLessonWithMiddleWares,
        isLoading,
        isLoadingSaveDraftLesson,
    };
};

export default useUpsertLessonOfLessonManagement;
