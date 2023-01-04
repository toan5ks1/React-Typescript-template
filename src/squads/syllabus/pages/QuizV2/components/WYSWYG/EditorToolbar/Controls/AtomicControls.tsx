import { createElement, useCallback, useState } from "react";

import { Entities } from "src/common/constants/enum";
import { MAX_SIZE_EDITOR_UPLOAD } from "src/common/constants/file-size";
import { convertByte } from "src/common/utils/file";
import { pick1stElement } from "src/common/utils/other";
import { addDraftBlock } from "src/squads/syllabus/common/utils/draft-js";

import ImageIcon from "@mui/icons-material/Image";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import UploadInput from "src/components/Inputs/UploadInput";
import BaseDialog from "src/squads/syllabus/components/LegacyDialogs/BaseDialog";
import { CustomBlockTypes } from "src/squads/syllabus/pages/QuizV2/components/WYSWYG/wyswyg-utils";

import ControlButton from "./ControlButton";
import { MediaControlGroupProps, MediaTypes } from "./control-types";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";

const DEFAULT_MEDIA_TYPES: MediaTypes[] = [
    {
        label: "audio",
        icon: VolumeUpIcon,
        accept: "audio/*",
        craftFn: addDraftBlock(CustomBlockTypes.BLOCK_AUDIO),
    },
    {
        label: "image",
        icon: ImageIcon,
        accept: "image/*",
        craftFn: addDraftBlock(CustomBlockTypes.BLOCK_IMAGE),
    },
];

const AtomicControls = ({ onChange, editorState, manualControl }: MediaControlGroupProps) => {
    const [media, setMedia] = useState<MediaTypes | null>(null);
    const t = useTranslate();
    const { size, unit } = convertByte(MAX_SIZE_EDITOR_UPLOAD);
    const { onUploadFiles, isUploading } = useUploadFiles();

    const onMediaInsert = useCallback((media) => {
        setMedia(media);
    }, []);

    const onMediaInsertClose = useCallback(() => {
        setMedia(null);
    }, []);

    const onFileChanged = useCallback(
        (files: File[]) => {
            //we dont allow multiple upload
            onUploadFiles(files, {
                onSuccess: ({ attachments }) => {
                    const url = pick1stElement(attachments)?.resource;
                    if (url && media) {
                        const newState = media.craftFn(editorState, url);

                        onChange(newState);
                        onMediaInsertClose();
                    }
                },
            });
        },
        [editorState, media, onChange, onMediaInsertClose, onUploadFiles]
    );

    return (
        <>
            {(manualControl || DEFAULT_MEDIA_TYPES).map((media) => {
                return (
                    <ControlButton
                        key={media.accept}
                        active={false}
                        tooltip={t(`resources.${Entities.QUIZZES}.${media.label}`)}
                        onClick={() => onMediaInsert(media)}
                    >
                        {createElement(media.icon)}
                    </ControlButton>
                );
            })}
            {media ? (
                <BaseDialog
                    open={!!media}
                    onClose={onMediaInsertClose}
                    title={t(`resources.${Entities.QUIZZES}.uploadYourFile`)}
                    maxWidth="md"
                    minWidth="500px"
                >
                    <UploadInput
                        multiple={false}
                        maxSize={MAX_SIZE_EDITOR_UPLOAD}
                        description={t(`ra.message.maxFileSizeIs`, {
                            fileSize: size,
                            fileUnit: unit,
                        })}
                        accept={media.accept}
                        uploading={isUploading}
                        onChange={onFileChanged}
                    />
                </BaseDialog>
            ) : null}
        </>
    );
};

export default AtomicControls;
