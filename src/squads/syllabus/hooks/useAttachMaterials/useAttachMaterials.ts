import { useCallback, useState } from "react";

import { UseMutateAsyncFunction } from "react-query";
import { useDispatch } from "react-redux";
import { Entities } from "src/common/constants/enum";
import { KeyMediaTypes } from "src/squads/syllabus/common/constants/const";
import logger from "src/squads/syllabus/internals/logger";
import { MediaHasura } from "src/squads/syllabus/models/media";
import { NsBobModifierClassService } from "src/squads/syllabus/services/bob/lesson-groups-bob/types";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { LessonConvertActions } from "src/squads/syllabus/store/lesson-convert";

import useDataProvider from "src/hooks/useDataProvider";

export interface AttachMaterialsProps {
    query: { files: File[]; mediaIds: string[] };
    fileName?: string;
    onSuccess?: () => void;
    onFailure?: () => void;
}

export interface UseAttachMaterialsProps {
    courseId: string;
    lessonGroupId: string;
    onCancel?: () => void;
    fileName?: string;
}

interface UseAttachMaterialsReturn {
    onAttachMaterials: (...reps: AttachMaterialsProps[]) => void;
    convertMedia: UseMutateAsyncFunction<
        {
            data: {
                id: null;
            };
        },
        Error,
        NsBobModifierClassService.ConvertMedia,
        unknown
    >;
    loading: boolean;
}

const useAttachMaterials = ({
    courseId,
    lessonGroupId,
}: UseAttachMaterialsProps): UseAttachMaterialsReturn => {
    const provider = useDataProvider();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState<boolean>(false);

    const { mutateAsync: convertMedia } = inferMutation({
        entity: "lessonGroups",
        action: "lessonGroupsConvertMedia",
    })();

    const { mutate: mutateAttachMaterials } = inferMutation({
        entity: "lessonGroupsYasuo",
        action: "lessonGroupAttachMaterialsToCourse",
    })();

    const onAttachMaterials = useCallback(
        ({ query, onSuccess, onFailure }: AttachMaterialsProps) => {
            setLoading(true);
            const _onFailure = () => {
                if (onFailure) onFailure();
                setLoading(false);
            };
            const _onSuccess = () => {
                if (onSuccess) onSuccess();
                setLoading(false);
            };

            mutateAttachMaterials(
                {
                    lessonGroupId,
                    courseId,
                    ...query,
                },
                {
                    onSuccess: async (res) => {
                        const { mediaIds = [], newMediaIds = [] } = res.data || {};
                        if (lessonGroupId) {
                            dispatch(
                                LessonConvertActions.deleteLessonConvert({
                                    courseId,
                                    lessonGroupId,
                                    materialIds: mediaIds,
                                })
                            );
                        }
                        if (!newMediaIds.length) return _onSuccess();

                        const { data: medias } = await provider.getList<MediaHasura>(
                            Entities.MEDIA,
                            {
                                filter: {
                                    media_id: newMediaIds,
                                    type: KeyMediaTypes.MEDIA_TYPE_PDF,
                                    converted_images: true,
                                },
                                pagination: {
                                    perPage: newMediaIds.length,
                                    page: 1,
                                },
                                sort: { field: "created_at", order: "ASC" },
                            }
                        );

                        if (lessonGroupId && medias.length) {
                            try {
                                await convertMedia({
                                    mediaList: medias,
                                });

                                dispatch(
                                    LessonConvertActions.addLessonConvert({
                                        courseId,
                                        lessonGroupId,
                                        materials: medias,
                                    })
                                );
                            } catch (err) {
                                logger.info("[useAttachMaterials]", err);

                                return _onFailure();
                            }
                        }
                        return _onSuccess();
                    },
                    onError: _onFailure,
                }
            );
        },
        [courseId, dispatch, lessonGroupId, convertMedia, mutateAttachMaterials, provider]
    );

    return {
        loading,
        convertMedia,
        onAttachMaterials,
    };
};

export default useAttachMaterials;
