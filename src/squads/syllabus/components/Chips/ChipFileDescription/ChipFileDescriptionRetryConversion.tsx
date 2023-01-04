import { Box } from "@mui/material";
import { UploadFilesType } from "src/components/ListMediaChipsBase/utils/type";
import ReloadIcon from "src/squads/syllabus/components/SvgIcons/ReloadIcon";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export interface ChipFileDescriptionRetryConversionProps {
    file: UploadFilesType;
    onRetryConvertPdf: (media: UploadFilesType) => void;
}

const ChipFileDescriptionRetryConversion = (props: ChipFileDescriptionRetryConversionProps) => {
    const { file, onRetryConvertPdf } = props;
    const t = useTranslate();

    return (
        <Box
            onClick={() => {
                onRetryConvertPdf(file);
            }}
            sx={(theme) => ({
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                "& > span": {
                    fontSize: theme.typography.overline.fontSize,
                },
                "& > svg": {
                    marginLeft: theme.spacing(0.425),
                },
            })}
            data-testid="ChipFileDescriptionRetryConversion__root"
        >
            <span>{t("resources.courses.lessonConvert.tryAgain")}</span>
            <ReloadIcon />
        </Box>
    );
};

export default ChipFileDescriptionRetryConversion;
