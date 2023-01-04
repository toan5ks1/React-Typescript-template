import { useCallback, useState } from "react";

import { DropzoneOptions, useDropzone } from "react-dropzone";
import { MIMETypes } from "src/common/constants/enum";
import { MAX_SIZE_IMAGE } from "src/common/constants/file-size";
import { convertByte } from "src/common/utils/file";

import { Image as ImageIcon } from "@mui/icons-material";
import { Box, Theme } from "@mui/material";
import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";
import TypographyBase from "src/components/Typographys/TypographyBase";
import ImagePreview, {
    ImagePreviewProps,
} from "src/squads/syllabus/components/Images/ImagePreview";

import useFileRejected from "src/squads/syllabus/hooks/dropzone/useFileRejected";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";

const sx = {
    upload: (theme: Theme) => ({
        border: `1px dashed ${theme.palette.primary.border}`,
        backgroundColor: theme.palette.primary.background,
    }),
    pointer: {
        cursor: "pointer",
    },
};

export interface UploadImagePreviewProps
    extends Pick<DropzoneOptions, "maxSize" | "disabled">,
        Pick<ImagePreviewProps, "shouldConfirmDelete"> {
    defaultValue?: string;
    onChange: (src: string) => void;
    onRemove: () => void;
}

const UploadImagePreview = (props: UploadImagePreviewProps) => {
    const { defaultValue, onChange, onRemove, maxSize, disabled, shouldConfirmDelete } = props;

    const t = useTranslate();
    const { size: fileSize, unit: fileUnit } = convertByte(maxSize);
    const [src, setSrc] = useState<string | undefined>(defaultValue);
    const { onUploadFiles, isUploading } = useUploadFiles();

    const { onDropRejected } = useFileRejected({ maxSize });

    const { getRootProps, getInputProps } = useDropzone({
        multiple: false,
        maxSize,
        accept: MIMETypes.IMAGE,
        disabled: disabled || isUploading,
        onDropRejected,
        onDropAccepted: (files) => {
            onUploadFiles(files, {
                onSuccess: ({ attachments }) => {
                    const src = attachments[0].resource;
                    setSrc(src);
                    onChange(src);
                },
            });
        },
    });

    const _onRemove = useCallback(() => {
        onRemove();
        setSrc(undefined);
    }, [onRemove]);

    // TODO: Current design is 96 (move to variant size whenever design have other sizes)
    const size = 96;

    if (src) {
        return (
            <ImagePreview
                src={src}
                onDelete={_onRemove}
                shouldConfirmDelete={shouldConfirmDelete}
                width={size}
                height={size}
                fullWidth={false}
            />
        );
    }

    return (
        <Box display="flex" flexDirection="column">
            <Box
                {...getRootProps()}
                borderRadius="4px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={sx.upload}
                width={size}
                height={size}
            >
                <input {...getInputProps()} data-testid="UploadImagePreview__input" />

                {isUploading ? (
                    <CircularProgressBase />
                ) : (
                    <Box sx={sx.pointer}>
                        <Box display="flex" justifyContent="center" alignItems="center">
                            <ImageIcon fontSize="medium" color="primary" />
                        </Box>
                        <Box mt={0.5} px={1.5} textAlign="center">
                            <TypographyBase variant="caption" color="textSecondary">
                                {t("ra.upload.uploadImage")}
                            </TypographyBase>
                        </Box>
                    </Box>
                )}
            </Box>
            <Box mt={0.5} display="inline">
                <TypographyBase variant="caption" color="textSecondary">
                    {t("ra.input.file.maxSize", {
                        fileSize,
                        fileUnit,
                    })}
                </TypographyBase>
            </Box>
        </Box>
    );
};

UploadImagePreview.defaultProps = {
    maxSize: MAX_SIZE_IMAGE,
};

export default UploadImagePreview;
