import { useCallback, useState } from "react";

import { useFormContext, useWatch } from "react-hook-form";
import { ERPModules, MIMETypes } from "src/common/constants/enum";
import { MAX_SIZE_EDITOR_UPLOAD } from "src/common/constants/file-size";
import { convertByte } from "src/common/utils/file";
import { removeByIndex, mergeTwoArrayAndRemoveDuplicate } from "src/common/utils/other";
import { NotificationFormData } from "src/squads/communication/common/constants/types";

import { Box } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import UploadInput from "src/components/Inputs/UploadInput";
import MediaListUploadNotification from "src/squads/communication/pages/Notification/components/MediaListUploadNotification";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";
import useTranslate from "src/squads/communication/hooks/useTranslate";
import useUploadFiles from "src/squads/communication/hooks/useUploadFiles";

export interface FormUploadNotificationFileProps {
    isSubmittingForm?: boolean;
    multiple?: boolean;
    maxSize?: number;
}

const FormUploadNotificationFile = ({
    isSubmittingForm = false,
    multiple = false,
    maxSize = MAX_SIZE_EDITOR_UPLOAD,
}: FormUploadNotificationFileProps) => {
    const [shouldOpenAttachmentDialog, setShouldOpenAttachmentDialog] = useState(false);
    const { setValue, control } = useFormContext<NotificationFormData>();
    const { onUploadFiles, isUploading } = useUploadFiles();
    const tCommon = useTranslate();
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
    const mediaIds = useWatch<NotificationFormData, "mediaIds">({
        name: "mediaIds",
        control,
    });

    const { size, unit } = convertByte(maxSize);

    const handleRemoveMedias = useCallback(
        (index: number) => {
            const newMediaIds = removeByIndex(mediaIds, index);
            setValue("mediaIds", newMediaIds, { shouldDirty: true });
        },
        [mediaIds, setValue]
    );

    const handleSetFiles = useCallback(
        (files: File[]) => {
            if (!files || !files.length) return;
            onUploadFiles(files, {
                onSuccess: ({ mediaIds: uploadedIdsList }) => {
                    const newMediaIds = mergeTwoArrayAndRemoveDuplicate(mediaIds, uploadedIdsList);
                    setValue("mediaIds", newMediaIds, { shouldDirty: true });
                },
            });
        },
        [onUploadFiles, mediaIds, setValue]
    );

    return (
        <Box px={2} pt={1}>
            <MediaListUploadNotification
                mediaIds={mediaIds}
                isSubmittingForm={isSubmittingForm}
                isUploading={isUploading}
                onUpload={() => setShouldOpenAttachmentDialog(true)}
                onDeleteMediaChip={isSubmittingForm ? undefined : handleRemoveMedias}
            />
            <DialogWithHeaderFooter
                open={shouldOpenAttachmentDialog}
                onClose={() => setShouldOpenAttachmentDialog(false)}
                title={tNotification(`label.uploadYourFile`)}
                maxWidth="md"
                minWidthBox="sm"
                footer="empty"
            >
                <UploadInput
                    data-testid="NotificationUpsertForm__uploadInputContainer"
                    multiple={multiple}
                    maxSize={maxSize}
                    description={tCommon(`ra.message.maxFileSizeIs`, {
                        fileSize: size,
                        fileUnit: unit,
                    })}
                    accept={[MIMETypes.PDF]}
                    onChange={(uploadFiles: File[]) => {
                        handleSetFiles(uploadFiles);
                        setShouldOpenAttachmentDialog(false);
                    }}
                />
            </DialogWithHeaderFooter>
        </Box>
    );
};

export default FormUploadNotificationFile;
