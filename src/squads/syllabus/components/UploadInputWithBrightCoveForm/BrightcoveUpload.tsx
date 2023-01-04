import { ChangeEvent, PropsWithChildren, useCallback, useState } from "react";

import { DropzoneOptions } from "react-dropzone";
import { Entities } from "src/common/constants/enum";
import {
    BrightcoveVideoInfo,
    isValidBrightcoveLink,
    parseBrightcoveVideoInfos,
} from "src/squads/syllabus/models/brightcove";

import { Box, Theme } from "@mui/material";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import TextFieldBase from "src/components/TextFields/TextFieldBase";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import BrightcoveLogoIcon from "src/squads/syllabus/components/SvgIcons/BrightcoveLogoIcon";

import useBrightcoveProfileData from "src/squads/syllabus/hooks/useBrightcoveProfileData";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface BrightcoveUploadFormProps extends PropsWithChildren<DropzoneOptions> {
    onChange: (brightcoveVideos: BrightcoveVideoInfo[]) => void;
}

const sx = {
    title: (theme: Theme) => ({ paddingBottom: theme.spacing(1) }),
    input: (theme: Theme) => ({ margin: theme.spacing(0, 1) }),
    button: { whiteSpace: "nowrap" },
};

const BrightcoveUpload = ({ onChange }: BrightcoveUploadFormProps) => {
    const t = useTranslate();

    const { accountId } = useBrightcoveProfileData();
    const [videoUrl, setVideoUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const onUpload = useCallback(() => {
        onChange(parseBrightcoveVideoInfos(videoUrl));
        setVideoUrl("");
    }, [videoUrl, onChange, setVideoUrl]);

    const onInputChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
        setVideoUrl(value);

        if (!value || isValidBrightcoveLink(value, accountId)) {
            setErrorMessage("");

            return;
        }

        setErrorMessage(t("ra.message.uploadBrightcoveLinkFail"));
    };

    return (
        <div data-testid="BrightCoveUpload">
            <TypographyHeader sx={sx.title} variant="subtitle2">
                {t("resources.input.pasteVideoLink")}
            </TypographyHeader>
            <Box display="flex" flexDirection="row" alignItems="flex-start">
                <Box display="flex">
                    <BrightcoveLogoIcon />
                </Box>
                <TextFieldBase
                    name="url"
                    sx={sx.input}
                    size="small"
                    margin="none"
                    label={t(`resources.${Entities.LOS}.brightcoveVideoLink`)}
                    value={videoUrl}
                    error={!!errorMessage}
                    helperText={errorMessage}
                    onChange={onInputChange}
                    data-testid="BrightCoveUpload__input"
                />
                <ButtonPrimaryContained
                    sx={sx.button}
                    disabled={!isValidBrightcoveLink(videoUrl, accountId)}
                    aria-label={t(`ra.common.action.upload`)}
                    onClick={onUpload}
                    data-testid="BrightCoveUpload_button"
                >
                    {t(`ra.common.action.upload`)}
                </ButtonPrimaryContained>
            </Box>
        </div>
    );
};

export default BrightcoveUpload;
