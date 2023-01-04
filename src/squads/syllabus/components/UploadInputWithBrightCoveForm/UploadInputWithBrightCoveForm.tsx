import { useCallback, useRef, useState } from "react";

import { useUpdate } from "react-use";
import { MIMETypes, NotifyTypes, UploadState } from "src/common/constants/enum";
import { MAX_FILE_SIZE_VIDEO } from "src/common/constants/file-size";
import { convertByte } from "src/common/utils/file";

import UploadInput, { UploadInputProps } from "src/components/Inputs/UploadInput";
import DividerWithText from "src/squads/syllabus/components/DividerWithText/DividerWithText";

import BrightcoveUpload, { BrightcoveUploadFormProps } from "./BrightcoveUpload";
import UploadingState from "./UploadingState";

import useBrightcoveProfileData from "src/squads/syllabus/hooks/useBrightcoveProfileData";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import useUploadBrightcove from "src/squads/syllabus/hooks/useUploadBrightcove";

export interface UploadInputWithBrightCoveFormProps
    extends Omit<UploadInputProps, "onChange">,
        Pick<BrightcoveUploadFormProps, "onChange"> {}

// TODO: Refactor the status state
const UploadInputWithBrightCoveForm = ({ onChange }: UploadInputWithBrightCoveFormProps) => {
    const t = useTranslate();
    const { size, unit } = convertByte(MAX_FILE_SIZE_VIDEO);
    const { mutateAsync, isLoading } = useUploadBrightcove();
    const { accountId } = useBrightcoveProfileData();

    const [files, setFiles] = useState<File[]>([]);
    const status = useRef<UploadState>(UploadState.DEFAULT);
    const update = useUpdate();
    const showSnackbar = useShowSnackbar();

    const setStatus = useCallback(
        (nextStatus: UploadState) => {
            status.current = nextStatus;
            update();
        },
        [status, update]
    );

    const handleOnChange = useCallback(
        async (files: File[]) => {
            if (files.length === 0 || !onChange) return;

            setFiles(files);

            setStatus(UploadState.LOADING);

            try {
                const result = await mutateAsync(files);

                if (status.current !== UploadState.DEFAULT) {
                    onChange(result.map(({ videoId }) => ({ videoId, accountId })));
                    setStatus(UploadState.DEFAULT);
                }
            } catch (e) {
                setStatus(UploadState.FAILED);
                showSnackbar(t("ra.manabie-error.cannotUpload"), NotifyTypes.ERROR);
            }
        },
        [onChange, setStatus, mutateAsync, accountId, showSnackbar, t]
    );

    const retryFn = useCallback(() => handleOnChange(files), [handleOnChange, files]);

    const cancelFn = useCallback(() => {
        setFiles([]);
        setStatus(UploadState.DEFAULT);
    }, [setStatus, setFiles]);

    return (
        <>
            {status.current == UploadState.DEFAULT && (
                <div>
                    <UploadInput
                        {...{
                            multiple: true,
                            source: "files",
                            accept: [MIMETypes.VIDEO],
                            maxSize: MAX_FILE_SIZE_VIDEO,
                            description: t(`ra.message.maxFileSizeIs`, {
                                fileSize: size,
                                fileUnit: unit,
                            }),
                        }}
                        uploading={isLoading}
                        onChange={handleOnChange}
                    />
                    <DividerWithText text={t(`ra.upload.or`)} />
                    <BrightcoveUpload onChange={onChange} />
                </div>
            )}
            {status.current !== UploadState.DEFAULT && (
                <UploadingState
                    onRetry={retryFn}
                    onDelete={cancelFn}
                    state={status.current}
                    files={files}
                />
            )}
        </>
    );
};

export default UploadInputWithBrightCoveForm;
