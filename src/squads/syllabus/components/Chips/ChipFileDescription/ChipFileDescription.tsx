import { ReactNode, useState } from "react";

import clsx from "clsx";
import { MIMETypes } from "src/common/constants/enum";
import { KeyConversionTaskStatusTypes } from "src/squads/syllabus/common/constants/const";
import { isMaterialConverting } from "src/store/lesson-convert";

import { Box, LinearProgress } from "@mui/material";
import { chipClasses } from "@mui/material/Chip";
import { styled } from "@mui/material/styles";
import ChipBase, { ChipBaseProps } from "src/components/Chips/ChipBase/ChipBase";
import ChipRemoveIcon from "src/components/Chips/ChipRemoveIcon";
import DialogCancelConfirm from "src/components/Dialogs/DialogCancelConfirm";
import ExternalLink from "src/components/ExternalLink";
import FileIcon from "src/components/FileIcon";
import {
    getKeyByValue,
    isMedia,
    MediaType,
    UploadFilesType,
} from "src/components/ListMediaChipsBase/utils/type";
import TypographyShortenStr from "src/components/Typographys/TypographyShortenStr";

import ChipFileDescriptionConversionErrorIcon from "./ChipFileDescriptionConversionErrorIcon";
import ChipFileDescriptionRetryConversion from "./ChipFileDescriptionRetryConversion";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

type EnhanceMimeTypes = MIMETypes | string | undefined;

const PREFIX = "ChipFileDescription";

const classes = {
    root: `${PREFIX}-root`,
    label: `${PREFIX}-label`,
    retry: `${PREFIX}-retry`,
};

const StyledChipBase = styled(ChipBase)(({ theme }) => ({
    padding: theme.spacing(0.5, 0.25, 0.5, 0.25),
    height: 32,
    position: "relative",
    [`& .${chipClasses.deleteIcon}`]: {
        width: "inherit", // default is 22px
    },
    [`& .${classes.retry}`]: {
        background: theme.palette.red?.[500],
        border: `1px solid ${theme.palette.red?.[400]}`,
    },
    [`& .${classes.label}`]: {
        paddingLeft: theme.spacing(0.5),
        paddingRight: theme.spacing(1.75),
    },
}));

StyledChipBase.displayName = "StyledChipBase";

export interface ChipFileDescriptionProps extends ChipBaseProps {
    name: string;
    type?: EnhanceMimeTypes;
    onDelete?: () => void;
    href?: string;
    lessonGroup?: string;
    startNode?: ReactNode;
    endNode?: ReactNode;
    shouldConfirmDelete?: boolean;
    convertPdf?: (media: UploadFilesType) => void;
    file?: UploadFilesType;
    requirePdfConversion?: boolean;
}

const ChipFileDescription = (props: ChipFileDescriptionProps) => {
    const {
        name,
        type,
        onDelete,
        href,
        lessonGroup,
        startNode,
        endNode,
        onClick,
        variant = "outlined",
        shouldConfirmDelete = true,
        className,
        convertPdf,
        file,
        requirePdfConversion = false,
        ...rest
    } = props;

    const t = useTranslate();
    const [isOpenRemoveDialog, setIsOpenRemoveDialog] = useState<boolean>(false);

    const renderChipRemoveIcon = () => {
        if (!shouldConfirmDelete) {
            return <ChipRemoveIcon onClick={onDelete} />;
        }

        return (
            <>
                <ChipRemoveIcon
                    onClick={() => {
                        setIsOpenRemoveDialog(true);
                    }}
                />
                <DialogCancelConfirm
                    open={isOpenRemoveDialog}
                    title={t("resources.common.removeMaterial")}
                    textCancelDialog={t("resources.common.removeMaterialConfirmText", {
                        name,
                        week: lessonGroup,
                        smart_count: lessonGroup ? 2 : 1,
                    })}
                    textSave={t("ra.action.remove")}
                    onClose={() => setIsOpenRemoveDialog(false)}
                    onSave={onDelete}
                />
            </>
        );
    };

    const label = (
        <TypographyShortenStr variant={"body2"} maxLength={20}>
            {name}
        </TypographyShortenStr>
    );

    const onRetryConvertPdf = (file: UploadFilesType) => {
        if (convertPdf && isMedia(file)) {
            convertPdf(file);
        }
    };

    let isFileConverting: boolean = false;
    let isRetryUI: boolean = false;

    if (requirePdfConversion && file?.type === getKeyByValue(MediaType, MediaType.MEDIA_TYPE_PDF)) {
        if (isMedia(file)) {
            const { conversion_tasks } = file;

            const fileStatus =
                conversion_tasks.length > 0
                    ? (conversion_tasks[0].status as string) // Conversion_Tasks
                    : KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_WAITING;

            isFileConverting = isMaterialConverting(status ? status : fileStatus);

            isRetryUI = fileStatus === KeyConversionTaskStatusTypes.CONVERSION_TASK_STATUS_FAILED;
        }
    }

    return (
        <StyledChipBase
            onClick={onClick}
            avatar={
                <>
                    {startNode || (isRetryUI && <ChipFileDescriptionConversionErrorIcon />)}
                    <FileIcon type={type} name={name} />
                </>
            }
            classes={{
                label: classes.label,
                root: clsx(classes.root, { [classes.retry]: isRetryUI }, className),
            }}
            data-testid="ChipFileDescription"
            variant={variant}
            size="medium"
            color="default"
            label={
                <>
                    <Box data-testid="ChipFileDescription__name">
                        {href ? <ExternalLink href={href}>{label}</ExternalLink> : label}
                    </Box>
                    {isFileConverting && (
                        <Box position="absolute" bottom="-1px" width="90%" left="5%">
                            <LinearProgress data-testid="ChipFileDescription__linerProgress" />
                        </Box>
                    )}
                </>
            }
            deleteIcon={
                <Box display="flex" alignItems="center" justifyContent="flex-end">
                    {endNode ||
                        (isRetryUI && file && (
                            <ChipFileDescriptionRetryConversion
                                file={file}
                                onRetryConvertPdf={onRetryConvertPdf}
                            />
                        ))}
                    {onDelete && renderChipRemoveIcon()}
                </Box>
            }
            onDelete={() => {}} // pass an empty fn here to make sure deleteIcon is always rendered
            {...rest}
        />
    );
};

ChipFileDescription.defaultProps = {
    readOnly: false,
};

export default ChipFileDescription;
