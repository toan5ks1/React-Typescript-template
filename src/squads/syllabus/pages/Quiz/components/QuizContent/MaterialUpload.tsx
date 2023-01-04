import { memo, useCallback } from "react";

import { useDispatch } from "react-redux";
import { MAX_FILE_SIZE_PDF } from "src/common/constants/file-size";
import { pick1stElement } from "src/common/utils/other";
import { QuizActions } from "src/squads/syllabus/store/quiz";

import Paper, { PaperProps } from "@mui/material/Paper";
import UploadInput from "src/components/Inputs/UploadInput";
import BaseBox from "src/squads/syllabus/components/BaseBox";

import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";

export interface MaterialUploadProps extends PaperProps {
    dispatch: ReturnType<typeof useDispatch>;
}

const MaterialUpload = (props: MaterialUploadProps) => {
    const { className, dispatch } = props;
    const { onUploadFiles, isUploading } = useUploadFiles();
    const onChange = useCallback(
        (files: File[]) => {
            onUploadFiles(files, {
                onSuccess: ({ attachments }) => {
                    const pdfUrl = pick1stElement(attachments)?.resource;
                    dispatch(
                        QuizActions.setPdfUrl({
                            url: pdfUrl || "",
                        })
                    );
                },
            });
        },
        [dispatch, onUploadFiles]
    );
    return (
        <BaseBox>
            <Paper className={className} elevation={0}>
                <UploadInput
                    accept="application/pdf"
                    maxSize={MAX_FILE_SIZE_PDF}
                    uploading={isUploading}
                    onChange={onChange}
                />
            </Paper>
        </BaseBox>
    );
};

export default memo(MaterialUpload);
