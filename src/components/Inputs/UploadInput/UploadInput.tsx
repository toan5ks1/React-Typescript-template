import { PropsWithChildren, ReactNode } from "react";

import { useDropzone, DropzoneOptions } from "react-dropzone";

import { Box } from "@mui/material";
import FormUploadFilePlaceholder from "src/components/Forms/FormUploadFile/FormUploadFilePlaceholder";
import TypographyBase from "src/components/Typographys/TypographyBase";
import { useFormProps } from "src/providers/FormPropsProvider";

import useDropAccepted, { UseDropAcceptedProps } from "src/hooks/useDropAccepted";
import useUploadFiles from "src/hooks/useUploadFiles";

export interface UploadInputProps extends PropsWithChildren<DropzoneOptions>, UseDropAcceptedProps {
    multiple?: boolean;
    uploading?: boolean;
    description?: ReactNode;
    rootDefaultPadding?: boolean;
    descDefaultMargin?: boolean;
}

//todo: allow upload multiple files
const UploadInput = (props: UploadInputProps) => {
    const {
        accept,
        maxSize,
        minSize,
        multiple = false,
        uploading,
        description,
        onChange,
        customFilterFn,
        disabled,
        rootDefaultPadding = true,
        descDefaultMargin = true,
    } = props;

    const { onDropAccepted } = useDropAccepted({
        customFilterFn,
        onChange,
    });
    const { readOnly } = useFormProps();

    const { onDropRejected } = useUploadFiles(maxSize);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept,
        maxSize,
        minSize,
        multiple,
        onDropAccepted,
        onDropRejected,
        disabled: uploading || readOnly || disabled,
    });

    return (
        <>
            <Box
                {...getRootProps()}
                sx={(theme) => ({
                    padding: rootDefaultPadding ? theme.spacing(3) : theme.spacing(2, 3),
                    ...{
                        width: "100%",
                        minHeight: 82,
                        border: `1px dashed rgba(33, 150, 243, 0.5)`,
                        borderRadius: theme.spacing(0.5),
                        background: "rgba(33, 150, 243, 0.08)",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        "&:focus": {
                            outline: "unset",
                        },
                    },
                })}
                data-testid="UploadInput"
            >
                <input data-testid="UploadInput__inputFile" {...getInputProps()} />
                <FormUploadFilePlaceholder
                    isDragActive={isDragActive}
                    uploading={uploading || false}
                />
            </Box>
            {description && (
                <TypographyBase
                    sx={(theme) => ({
                        display: "inline-block",
                        color: theme.palette.text.secondary,
                        margin: descDefaultMargin
                            ? theme.spacing(1.5, 0)
                            : theme.spacing(1.1, 0, 0, 0),
                    })}
                    variant="caption"
                    data-testid="UploadInput__description"
                >
                    {description}
                </TypographyBase>
            )}
        </>
    );
};

export default UploadInput;
