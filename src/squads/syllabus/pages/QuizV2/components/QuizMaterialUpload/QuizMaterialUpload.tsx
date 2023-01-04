import { useCallback } from "react";

import { MAX_FILE_SIZE_PDF } from "src/common/constants/file-size";
import { pick1stElement } from "src/common/utils/other";

import { PaperProps } from "@mui/material/Paper";
import UploadInput from "src/components/Inputs/UploadInput";

import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";

export interface QuizMaterialUploadProps extends PaperProps {
    onUploadSuccess?: (url: string) => void;
}

const QuizMaterialUpload = (props: QuizMaterialUploadProps) => {
    const { onUploadSuccess } = props;
    const { onUploadFiles, isUploading } = useUploadFiles();

    const onChange = useCallback(
        (files: File[]) => {
            onUploadFiles(files, {
                onSuccess: ({ attachments }) => {
                    const pdfUrl = pick1stElement(attachments)?.resource; // available or undefined
                    onUploadSuccess && pdfUrl && onUploadSuccess(pdfUrl);
                },
            });
        },
        [onUploadSuccess, onUploadFiles]
    );

    return (
        <UploadInput
            accept="application/pdf"
            maxSize={MAX_FILE_SIZE_PDF}
            uploading={isUploading}
            onChange={onChange}
        />
    );
};

export default QuizMaterialUpload;
