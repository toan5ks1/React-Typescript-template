import { memo } from "react";

import { FieldPathValue } from "react-hook-form";
import { arrayHasItem } from "src/common/utils/other";
import { NotificationFormData } from "src/squads/communication/common/constants/types";

import { CloudUpload } from "@mui/icons-material";
import Skeleton from "@mui/material/Skeleton";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import ListMediaChipsBase from "src/components/ListMediaChipsBase";

import useMediaList from "src/squads/communication/hooks/useMediaList";
import useTranslate from "src/squads/communication/hooks/useTranslate";

export interface MediaListUploadNotificationProps {
    mediaIds: FieldPathValue<NotificationFormData, "mediaIds">;
    isSubmittingForm: boolean;
    isUploading: boolean;
    onDeleteMediaChip?: (index: number) => void;
    onUpload?: () => void;
}

const MediaListUploadNotification = ({
    mediaIds,
    isSubmittingForm,
    isUploading,
    onDeleteMediaChip,
    onUpload,
}: MediaListUploadNotificationProps) => {
    const tCommon = useTranslate();

    const { mediaList, isFetchingMediaList } = useMediaList({
        mediaIds,
    });

    if (isFetchingMediaList) {
        return (
            <Skeleton
                data-testid="MediaListUploadNotification__skeleton"
                height={64}
                width="100px"
            />
        );
    }

    if (arrayHasItem(mediaIds)) {
        return (
            <ListMediaChipsBase
                medias={mediaList}
                onDelete={onDeleteMediaChip}
                shouldConfirmDelete={false}
            />
        );
    }

    return (
        <ButtonPrimaryOutlined
            isLoading={isUploading}
            disabled={isUploading || isSubmittingForm}
            size="small"
            data-testid="MediaListUploadNotification__buttonUpload"
            startIcon={<CloudUpload fontSize="small" />}
            onClick={onUpload}
        >
            {isUploading
                ? tCommon(`resources.input.uploading`)
                : tCommon(`ra.common.action.upload`)}
        </ButtonPrimaryOutlined>
    );
};

export default memo(MediaListUploadNotification);
