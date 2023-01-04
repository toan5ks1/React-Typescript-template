import { useCallback, useEffect } from "react";

import { useFormContext } from "react-hook-form";
import { useDispatch } from "react-redux";
import { ERPModules, MIMETypes, NotifyTypes } from "src/common/constants/enum";
import { MAX_FILE_SIZE_PDF, MAX_FILE_SIZE_VIDEO } from "src/common/constants/file-size";
import {
    filterFiles,
    filterUploadFiles,
    ValidateTypeSchema,
    FilterUploadFiles,
} from "src/common/utils/file";
import { toShortenStr } from "src/common/utils/other";
import { Media } from "src/squads/syllabus/common/types/common";
import { LessonConvertActions } from "src/squads/syllabus/store/lesson-convert";

import { Skeleton } from "@mui/material";
import { dialogClasses } from "@mui/material/Dialog";
import type { DialogProps } from "@mui/material/Dialog";
import { styled, Theme } from "@mui/material/styles";
import FormUploadMaterials from "src/squads/syllabus/components/Form/FormUploadMaterials";
import BaseDialog from "src/squads/syllabus/components/LegacyDialogs/BaseDialog";
import BaseDialogAction from "src/squads/syllabus/components/LegacyDialogs/BaseDialog/BaseDialogAction";

import useAttachMaterials from "src/squads/syllabus/hooks/useAttachMaterials";
import useHookFormField from "src/squads/syllabus/hooks/useHookFormField";
import useMediaList from "src/squads/syllabus/hooks/useMediaList";
import useResourceTranslate from "src/squads/syllabus/hooks/useResourceTranslate";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface LessonTabProp {
    courseId: string;
}

const sx = {
    dialog: {
        [`& .${dialogClasses.paper}`]: {
            maxWidth: "770px",
        },
        margin: 0,
    },
    fileList: (theme: Theme) => ({
        marginBottom: theme.spacing(2),
        "& > div": {
            margin: theme.spacing(0, 1, 1, 0),
        },
    }),
};

const StyledBaseDialogAction = styled(BaseDialogAction)(({ theme }) => ({
    paddingTop: theme.spacing(2),
}));

const validateFilesSchema: ValidateTypeSchema[] = [
    {
        accept: MIMETypes.VIDEO,
        maxSize: MAX_FILE_SIZE_VIDEO,
    },
    {
        accept: MIMETypes.PDF,
        maxSize: MAX_FILE_SIZE_PDF,
    },
];

export interface LessonUploadDialogProps extends Omit<DialogProps, "onClose"> {
    lessonGroupId: string;
    courseId: string;
    mediaIds: string[];
    onClose: () => void;
    refetchLessonGroup: () => void;
}

export const LessonUploadDialog = ({
    open,
    lessonGroupId,
    courseId,
    mediaIds,
    onClose,
    refetchLessonGroup,
}: LessonUploadDialogProps) => {
    const tLesson = useResourceTranslate(ERPModules.LESSON_SYLLABUS);
    const t = useTranslate();

    const dispatch = useDispatch();
    const showSnackbar = useShowSnackbar();

    const { reset } = useFormContext();
    const [files, setFiles] = useHookFormField<{ files: FilterUploadFiles[] }, FilterUploadFiles[]>(
        "files",
        []
    );
    const { onAttachMaterials, loading } = useAttachMaterials({ courseId, lessonGroupId });

    const { mediaList, isFetchingMediaList } = useMediaList({
        mediaIds,
    });

    useEffect(() => {
        setFiles(mediaList as Media[]);
    }, [mediaList, setFiles]);

    const onCancel = useCallback(() => {
        reset({ files: [] });
        onClose();
    }, [onClose, reset]);

    const onSuccess = useCallback(
        (notifyText: string) => {
            showSnackbar(t(notifyText, { smart_count: 1 }));
            refetchLessonGroup();
            onCancel();
        },
        [showSnackbar, t, onCancel, refetchLessonGroup]
    );

    const onFailure = useCallback(
        (alreadyUploadedMediaIds: string[]) => {
            const shortenedLessonGroupName = toShortenStr(lessonGroupId);

            showSnackbar(
                t("ra.common.failedToUploadFiles", {
                    name: shortenedLessonGroupName,
                }),
                NotifyTypes.ERROR
            );
            dispatch(
                LessonConvertActions.deleteLessonConvert({
                    courseId,
                    lessonGroupId,
                    materialIds: alreadyUploadedMediaIds,
                })
            );
        },
        [lessonGroupId, showSnackbar, dispatch, courseId, t]
    );

    const onSave = useCallback(() => {
        const { alreadyUploadedMediaIds, filesNeedToBeUploaded } = filterUploadFiles(files);
        onAttachMaterials({
            query: { mediaIds: alreadyUploadedMediaIds, files: filesNeedToBeUploaded },
            onSuccess: () => onSuccess("ra.common.updatedSuccess"),
            onFailure: () => onFailure(alreadyUploadedMediaIds),
        });
    }, [files, onAttachMaterials, onFailure, onSuccess]);

    const filter = useCallback((files: File[]) => filterFiles(files, validateFilesSchema), []);

    return (
        <BaseDialog
            sx={sx.dialog}
            open={open}
            maxWidth={false}
            minWidth="770px"
            disableEscapeKeyDown
            title={tLesson("uploadMaterials")}
            disabled={loading}
            onClose={onCancel}
        >
            {isFetchingMediaList ? (
                <Skeleton data-testid="LessonUploadDialog__loading" height={210} />
            ) : (
                <FormUploadMaterials
                    files={files}
                    onChange={setFiles}
                    variant="outlined"
                    isBrightCoveOptional
                    formUploadFileProps={{
                        multiple: true,
                        customFilterFn: filter,
                        accept: [MIMETypes.PDF, MIMETypes.VIDEO],
                    }}
                />
            )}

            <StyledBaseDialogAction
                disabled={loading || (!mediaIds.length && !files.length)}
                loading={loading}
                onCancel={onCancel}
                onOK={onSave}
            />
        </BaseDialog>
    );
};

export default LessonUploadDialog;
