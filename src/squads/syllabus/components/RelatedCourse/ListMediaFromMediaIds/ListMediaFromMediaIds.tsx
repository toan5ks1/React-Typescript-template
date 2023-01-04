import { useCallback, useRef } from "react";

import { useDispatch } from "react-redux";
import { useUnmount } from "react-use";
import { removeByIndex, toShortenStr } from "src/common/utils/other";
import { filterUploadFiles, isMedia } from "src/squads/syllabus/common/utils/file";
import { MediaHasura } from "src/squads/syllabus/models/media";
import inferMutation from "src/squads/syllabus/services/infer-mutation";
import { LessonConvertActions } from "src/squads/syllabus/store/lesson-convert";

import { Skeleton } from "@mui/material";
import ListMediaChipsBase from "src/components/ListMediaChipsBase";
import { MediaChipBaseProps } from "src/components/ListMediaChipsBase/MediaChipBase";

import { Media } from "src/squads/syllabus/__generated__/bob/root-types";
import useAttachMaterials from "src/squads/syllabus/hooks/useAttachMaterials";
import useMediaList from "src/squads/syllabus/hooks/useMediaList";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface ListMediaFromMediaIdsProps extends Partial<MediaChipBaseProps> {
    mediaIds: string[];
    lessonGroupId?: string;
    courseId?: string;
    onDeleteMediaSuccessfully?: () => void;
}

const ListMediaFromMediaIds = (props: ListMediaFromMediaIdsProps) => {
    const { mediaIds, courseId, onDeleteMediaSuccessfully, lessonGroupId, ...rest } = props;

    const { mediaList, isFetchingMediaList, refetchMedia } = useMediaList({
        mediaIds: mediaIds,
    });

    const showSnackbar = useShowSnackbar();
    const t = useTranslate();

    const { onAttachMaterials } = useAttachMaterials({
        courseId: courseId ? courseId : "",
        lessonGroupId: lessonGroupId ? lessonGroupId : "",
    });

    const onSuccess = useCallback(
        (file: Media) => {
            const shortenedFileName = toShortenStr(file.name || "");
            showSnackbar(
                t("ra.common.removeSuccess", { name: `"${shortenedFileName}"`, smart_count: 2 })
            );
            onDeleteMediaSuccessfully?.();
        },
        [onDeleteMediaSuccessfully, showSnackbar, t]
    );

    const { mutate: onConvertMedia } = inferMutation({
        entity: "lessonGroups",
        action: "lessonGroupsConvertMedia",
    })();

    const deleteMedia = useCallback(
        (index: number) => {
            const remainFiles: Media[] = removeByIndex(mediaList as Media[], index);
            const file = mediaList[index] as Media;

            const { alreadyUploadedMediaIds, filesNeedToBeUploaded } =
                filterUploadFiles(remainFiles);

            onAttachMaterials({
                query: {
                    mediaIds: alreadyUploadedMediaIds,
                    files: filesNeedToBeUploaded,
                },
                onSuccess: () => onSuccess(file),
                onFailure: () => {
                    showSnackbar(t("ra.common.removeFail"), "error");
                },
            });
        },
        [mediaList, onAttachMaterials, onSuccess, showSnackbar, t]
    );

    const unMountedRef = useRef<boolean>(false);
    useUnmount(() => {
        unMountedRef.current = true;
    });
    const dispatch = useDispatch();
    const onRetryConvertPdf = (material: MediaHasura) => {
        if (courseId && lessonGroupId && isMedia(material)) {
            dispatch(
                LessonConvertActions.addLessonConvert({
                    courseId,
                    lessonGroupId,
                    materials: [
                        {
                            media_id: material.media_id,
                            name: material?.name || "",
                        },
                    ],
                    isRetry: true,
                })
            );
        }

        onConvertMedia(
            { mediaList: [material] },
            {
                onError: (error) => {
                    window.warner?.error("Error during file conversion", error.message, error);
                    showSnackbar(
                        t("ra.common.failedToUploadFiles", { name: t(error.message) }),
                        "error"
                    );
                },
                onSuccess: () => {
                    if (!unMountedRef.current) {
                        courseId && refetchMedia?.();
                    }
                },
            }
        );
    };

    if (isFetchingMediaList)
        return (
            <div data-testid="ListMediaFromMediaIds__skeleton">
                <Skeleton height={64} width="100px" />
            </div>
        );
    if (!mediaList || !mediaList.length) return null;

    return (
        <ListMediaChipsBase
            medias={mediaList}
            onDelete={deleteMedia}
            convertPdf={onRetryConvertPdf}
            {...rest}
        />
    );
};

export default ListMediaFromMediaIds;
