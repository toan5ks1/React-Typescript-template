import { useCallback } from "react";

import { Entities, MIMETypes } from "src/common/constants/enum";
import { MAX_FILE_SIZE_PDF } from "src/common/constants/file-size";
import { convertString } from "src/common/constants/helper";
import { pick1stElement } from "src/common/utils/other";
import { KeyMediaTypes } from "src/squads/syllabus/common/constants/const";
import logger from "src/squads/syllabus/internals/logger";
import { OnChangeAttachmentProps } from "src/squads/syllabus/models/learning-objective";
import { inferQuery } from "src/squads/syllabus/services/infer-query";

import { Divider, Grid, GridProps, Theme } from "@mui/material";
import BrightcoveVideoReview from "src/components/BrightcoveVideoReview";
import CircularProgressBase from "src/components/CicularProgress/CicularProgressBase";
import UploadInput from "src/components/Inputs/UploadInput";
import TypographyBase from "src/components/Typographys/TypographyBase";
import SpacingGroup from "src/components/Utilities/SpacingGroup";
import BaseBox from "src/squads/syllabus/components/BaseBox";
import ChipFileDescription from "src/squads/syllabus/components/Chips/ChipFileDescription";
import UploadInputWithBrightCoveForm from "src/squads/syllabus/components/UploadInputWithBrightCoveForm";

import useBrightcoveProfileData from "src/squads/syllabus/hooks/useBrightcoveProfileData";
import useShowSnackbar from "src/squads/syllabus/hooks/useShowSnackbar";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";

const sx = {
    wrapper: (theme: Theme) => ({
        padding: theme.spacing(3, 4),
        marginBottom: theme.spacing(2),
    }),
    attachmentDeleteIcon: (theme: Theme) => ({
        width: theme.spacing(1.75),
        height: theme.spacing(1.75),
        color: theme.palette.text.light,
        margin: 0,
    }),
    divider: (theme: Theme) => ({
        margin: theme.spacing("3px", 0, "3px", "-1px"),
    }),
};

export interface AttachmentSectionProps extends GridProps {
    videoId: string;
    studyGuide: string;
    isLoadingFile: boolean;
    onChangeAttachment: (props: OnChangeAttachmentProps) => void;
}

const AttachmentSection = (props: AttachmentSectionProps) => {
    const t = useTranslate();
    const showSnackbar = useShowSnackbar();
    const { studyGuide, videoId, onChangeAttachment, isLoadingFile, ...rest } = props;
    const { onUploadFiles, isUploading } = useUploadFiles();
    const { accountId } = useBrightcoveProfileData();

    const {
        data: videoDetails,
        isLoading: isFetchingVideoDetails,
        error: videoError,
    } = inferQuery({ entity: "brightcove", action: "syllabusBrightcoveGetVideoInfo" })(
        {
            accountId,
            videoId,
        },
        {
            enabled: Boolean(videoId && accountId),
            onError: (error) => {
                if (
                    error.message === "ra.manabie-error.specified.brightcoveVideoIsBeingProcessed"
                ) {
                    showSnackbar(t(error.message), "info");
                } else {
                    logger.warn("[AttachmentSection]  fetching video info for LO", error);

                    showSnackbar(t(error.message), "error");
                }
            },
        }
    );

    const handleOnChangeAttachment = useCallback(
        async (files: File[]) => {
            onUploadFiles(files, {
                onSuccess: ({ attachments }) => {
                    const studyGuideUrls = attachments.map((item) => item.resource);
                    onChangeAttachment({
                        type: "study_guide",
                        studyGuideUrl: pick1stElement(studyGuideUrls) || "",
                    });
                },
            });
        },
        [onChangeAttachment, onUploadFiles]
    );

    const renderStudyGuide = () => {
        if (isLoadingFile) {
            return <CircularProgressBase />;
        }

        if (studyGuide)
            return (
                <ChipFileDescription
                    name={studyGuide}
                    href={studyGuide}
                    type={KeyMediaTypes.MEDIA_TYPE_PDF}
                    onDelete={() =>
                        onChangeAttachment({
                            type: "study_guide",
                            studyGuideUrl: "",
                        })
                    }
                />
            );

        return (
            <UploadInput
                accept={MIMETypes.PDF}
                multiple={false}
                maxSize={MAX_FILE_SIZE_PDF}
                data-testid="Attachment__studyGuide"
                uploading={isUploading}
                onChange={handleOnChangeAttachment}
            />
        );
    };
    return (
        <BaseBox sx={sx.wrapper} data-testid="AttachmentSection__root">
            <Grid container {...rest}>
                <Grid item xs={6} pr={3}>
                    <SpacingGroup spacing={24}>
                        <TypographyBase gutterBottom={false} variant="h6">
                            {t(`resources.${Entities.LOS}.video`)}
                        </TypographyBase>
                        {videoId ? (
                            videoDetails ? (
                                <BrightcoveVideoReview videoId={videoId}>
                                    <ChipFileDescription
                                        name={
                                            videoDetails.name ||
                                            t(`resources.${Entities.LOS}.viewCurrentVideo`)
                                        }
                                        type={KeyMediaTypes.MEDIA_TYPE_VIDEO}
                                        onDelete={() =>
                                            onChangeAttachment({
                                                type: "video",
                                                video: {
                                                    videoId: "",
                                                    accountId: "",
                                                },
                                            })
                                        }
                                    />
                                </BrightcoveVideoReview>
                            ) : isFetchingVideoDetails ? (
                                <CircularProgressBase />
                            ) : (
                                t(convertString((videoError as Error)?.message))
                            )
                        ) : (
                            <UploadInputWithBrightCoveForm
                                onChange={(brightcoveVideosList) => {
                                    onChangeAttachment({
                                        type: "video",
                                        video: pick1stElement(brightcoveVideosList)!,
                                    });
                                }}
                            />
                        )}
                    </SpacingGroup>
                </Grid>
                <Divider sx={sx.divider} orientation="vertical" flexItem />
                <Grid item xs={6} pl={3}>
                    <SpacingGroup spacing={24}>
                        <TypographyBase gutterBottom={false} variant="h6">
                            {t(`resources.${Entities.LOS}.studyGuide`)}
                        </TypographyBase>
                        {renderStudyGuide()}
                    </SpacingGroup>
                </Grid>
            </Grid>
        </BaseBox>
    );
};

export default AttachmentSection;
