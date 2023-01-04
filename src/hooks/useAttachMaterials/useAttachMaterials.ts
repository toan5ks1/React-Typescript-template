import { useCallback, useState } from "react";

import { UseMutateAsyncFunction } from "react-query";
import { useDispatch } from "react-redux";
import { KeyMediaTypes } from "src/common/constants/const";
import { Entities, ProviderTypes } from "src/common/constants/enum";
import { MediaHasura } from "src/models/media";
import { NsYasuoCourseService } from "src/services/yasuo/course-service-yasuo";
import { AttachMaterialsToCourseReturn } from "src/services/yasuo/course-service-yasuo/course-service-yasuo";
import { LessonConvertActions } from "src/store/lesson-convert";

import useMutationV2 from "src/hooks/data/useMutationV2";
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
        {
            data: {
                mediaList: MediaHasura[];
            };
        },
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

    const { mutateAsync: convertMedia } = useMutationV2<
        {
            data: {
                mediaList: MediaHasura[];
            };
        },
        {
            data: {
                id: null;
            };
        }
    >({
        action: ProviderTypes.CONVERT_MEDIA,
        entity: Entities.LESSON_GROUPS,
    });

    const { mutate: mutateAttachMaterials } = useMutationV2<
        NsYasuoCourseService.AttachMaterialsToCourse,
        AttachMaterialsToCourseReturn
    >({
        action: ProviderTypes.ATTACH_MATERIAL,
        entity: Entities.LESSON_GROUPS,
    });

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
                        const { mediaIds = [], newMediaIds = [] } = res || {};
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
                                    data: {
                                        mediaList: medias,
                                    },
                                });

                                dispatch(
                                    LessonConvertActions.addLessonConvert({
                                        courseId,
                                        lessonGroupId,
                                        materials: medias,
                                    })
                                );
                            } catch (err) {
                                window.warner?.log(err);
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
