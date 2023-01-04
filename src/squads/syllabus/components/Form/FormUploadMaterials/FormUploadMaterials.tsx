import { useEffect, useState } from "react";

import { MIMETypes } from "src/common/constants/enum";
import { MAX_FILE_SIZE_VIDEO } from "src/common/constants/file-size";
import { convertByte } from "src/common/utils/file";
import { removeByIndex } from "src/common/utils/other";
import { Media } from "src/squads/syllabus/common/types/common";

import { Grid } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import UploadInput, { UploadInputProps } from "src/components/Inputs/UploadInput";
import ListMediaChipsBase from "src/components/ListMediaChipsBase";
import { MediaChipBaseType } from "src/components/ListMediaChipsBase/MediaChipBase";
import FormUploadBrightCove, {
    FormUploadBrightCoveProps,
} from "src/squads/syllabus/components/FormUploadBrightCove";

import useOnChangeVideoLink from "src/squads/syllabus/hooks/useOnChangeVideoLink";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export type InputFile = Media | File;

const FormUploadMaterials = (props: {
    files?: InputFile[];
    onChange: (files: InputFile[]) => void;
    variant?: MediaChipBaseType["variant"];
    isBrightCoveOptional?: FormUploadBrightCoveProps["isOptional"];
    formUploadFileProps?: UploadInputProps;
}) => {
    const {
        files: inputFiles,
        isBrightCoveOptional,
        variant,
        formUploadFileProps = {},
        onChange,
    } = props;
    const { multiple } = formUploadFileProps;
    const [files, setFiles] = useState<InputFile[]>(inputFiles ?? []);

    // initial file imported
    useEffect(() => {
        inputFiles && setFiles(inputFiles);
    }, [inputFiles]);

    const showSnackBar = useShowSnackbar();
    const t = useTranslate();
    const { size, unit } = convertByte(MAX_FILE_SIZE_VIDEO);
    const onChangeVideoLink = useOnChangeVideoLink(
        (newFile) => setFiles([...files, newFile]),
        showSnackBar
    );

    const onRemove = (index: number) => {
        const remainFiles = removeByIndex(files, index);
        setFiles(remainFiles);
    };

    const onChangeFileUpload = (filesTemp: InputFile[]) => {
        const all = multiple ? [...files, ...filesTemp] : [...filesTemp];
        setFiles(all);
    };

    useEffect(() => {
        onChange(files);
    }, [files, onChange]);
    return (
        <Grid container spacing={2} direction="column">
            <Grid item>
                <ListMediaChipsBase medias={files} onDelete={onRemove} variant={variant} />
            </Grid>
            <Grid item>
                <UploadInput
                    onChange={onChangeFileUpload}
                    maxSize={MAX_FILE_SIZE_VIDEO}
                    description={t(`ra.message.maxFileSizeIs`, {
                        fileSize: size,
                        fileUnit: unit,
                    })}
                    rootDefaultPadding={false}
                    descDefaultMargin={false}
                    accept={[MIMETypes.PDF, MIMETypes.VIDEO]}
                    {...formUploadFileProps}
                />
            </Grid>
            <Grid item>
                <DividerDashed />
            </Grid>
            <Grid item>
                <FormUploadBrightCove
                    onChange={onChangeVideoLink}
                    isOptional={isBrightCoveOptional}
                />
            </Grid>
        </Grid>
    );
};

export default FormUploadMaterials;
