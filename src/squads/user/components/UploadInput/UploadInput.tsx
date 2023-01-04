import { ElementType, PropsWithChildren, ReactNode } from "react";

import { useDropzone, DropzoneOptions } from "react-dropzone";

import { Box } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";
import FormUploadFilePlaceholder from "src/squads/user/components/Forms/FormUploadFilePlaceholder";
import { useFormProps } from "src/squads/user/providers/FormPropsProvider";

import { UploadType } from "manabie-yasuo/enum_pb";

import useUploadFiles from "src/squads/user/hooks/useUploadFiles";

export interface UploadInputProps extends PropsWithChildren<DropzoneOptions> {
    uploadType?: keyof typeof UploadType;
    noStyles?: boolean;
    multiple?: boolean;
    description?: ReactNode;
    show?: ElementType<{ files: File[] }>;
    onChange?: (files: File[]) => Promise<void>;
}
const UploadInput = (props: UploadInputProps) => {
    const {
        accept,
        maxSize,
        minSize,
        noStyles = false,
        multiple = false,
        show: Shower,
        description,
        onChange,
        disabled,
    } = props;

    const { readOnly } = useFormProps();

    const { onDropRejected } = useUploadFiles();

    const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
        accept,
        maxSize,
        minSize,
        multiple,
        onDropAccepted: onChange,
        onDropRejected,
        disabled: readOnly || disabled,
    });

    return (
        <>
            <Box
                {...getRootProps()}
                sx={(theme) => ({
                    ...(!noStyles && {
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
                    }),
                })}
                data-testid="UploadInput"
            >
                <input data-testid="UploadInput__inputFile" {...getInputProps()} />
                <FormUploadFilePlaceholder isDragActive={false} uploading={false} />
            </Box>
            {description ? (
                <TypographyBase
                    sx={(theme) => ({
                        display: "inline-block",
                        color: theme.palette.text.secondary,
                        pt: theme.spacing(1),
                    })}
                    variant="caption"
                    data-testid="UploadInput__description"
                >
                    {description}
                </TypographyBase>
            ) : null}
            {Shower ? <Shower files={acceptedFiles} /> : null}
        </>
    );
};

export default UploadInput;
