import { ChangeEvent, PropsWithChildren, useCallback, useState } from "react";

import { DropzoneOptions } from "react-dropzone";
import { Entities } from "src/common/constants/enum";
import {
    BrightcoveVideoInfo,
    isValidBrightcoveLink,
    parseBrightcoveVideoInfos,
} from "src/models/brightcove";

import { Box, FormHelperText, Grid } from "@mui/material";
import { styled } from "@mui/material/styles";
import ButtonPrimaryOutlined from "src/components/Buttons/ButtonPrimaryOutlined";
import TextFieldBase from "src/components/TextFields/TextFieldBase";
import TypographyHeader from "src/components/Typographys/TypographyHeader";
import BrightcoveLogoIcon from "src/squads/syllabus/components/SvgIcons/BrightcoveLogoIcon";

import useBrightcoveProfileData from "src/hooks/useBrightcoveProfileData";
import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface FormUploadBrightCoveProps extends PropsWithChildren<DropzoneOptions> {
    onChange: (links: BrightcoveVideoInfo[]) => void;
    isOptional?: boolean;
}

const sx = {
    gridContainer: {
        position: "relative",
        alignItems: "center",
    },
    uploadButton: {
        wordBreak: "keep-all",
    },
};

const HelperText = styled("div")({
    position: "absolute",
});

const FormUploadBrightCove = ({ onChange, isOptional = false }: FormUploadBrightCoveProps) => {
    const t = useTranslate();
    const [value, setValue] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [helperTextHeight, setHelperTextHeight] = useState<number>(0);

    const { accountId } = useBrightcoveProfileData();

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setValue(value);
        if (!value?.length && isOptional) {
            setErrorMessage("");
        } else if (!value || !isValidBrightcoveLink(value, accountId)) {
            setErrorMessage(t("ra.message.uploadBrightcoveLinkFail"));
        } else {
            setErrorMessage("");
        }
    };

    const onUpload = useCallback(() => {
        let brightCoveIds = parseBrightcoveVideoInfos(value);
        onChange(brightCoveIds);
        setValue("");
    }, [value, onChange]);

    const hasErrorMessage = Boolean(errorMessage);

    return (
        <Box
            data-testid="FormUploadBrightCove__root"
            mb={hasErrorMessage ? `${helperTextHeight}px` : 0}
        >
            <Box pb={2}>
                <TypographyHeader>{t("resources.input.pasteVideoLink")}</TypographyHeader>
            </Box>

            <Grid container spacing={1} alignItems="center">
                <Grid item>
                    <Box display="flex">
                        <BrightcoveLogoIcon />
                    </Box>
                </Grid>

                <Grid item xs sx={sx.gridContainer}>
                    <TextFieldBase
                        fullWidth
                        inputProps={{ "data-testid": "FormUploadBrightCove__input" }}
                        name="url"
                        size="small"
                        margin="none"
                        label={t(`resources.${Entities.LOS}.brightcoveVideoLink`)}
                        value={value}
                        onChange={handleChange}
                        error={!!errorMessage}
                    />

                    {hasErrorMessage && (
                        <HelperText
                            ref={(ref) => {
                                if (ref && ref.offsetHeight !== helperTextHeight)
                                    setHelperTextHeight(ref.offsetHeight);
                            }}
                        >
                            <FormHelperText variant="standard" error>
                                {errorMessage}
                            </FormHelperText>
                        </HelperText>
                    )}
                </Grid>
                <Grid item>
                    <ButtonPrimaryOutlined
                        sx={sx.uploadButton}
                        data-testid="FormUploadBrightCove__button"
                        aria-label={t("ra.common.action.upload")}
                        disabled={!isValidBrightcoveLink(value, accountId)} //only disabled when doesn't have url
                        onClick={onUpload}
                    >
                        {t("ra.common.action.upload")}
                    </ButtonPrimaryOutlined>
                </Grid>
            </Grid>
        </Box>
    );
};

export default FormUploadBrightCove;
