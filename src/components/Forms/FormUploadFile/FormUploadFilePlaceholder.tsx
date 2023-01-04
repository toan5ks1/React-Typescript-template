import { HtmlHTMLAttributes } from "react";

import { CloudUploadOutlined as CloudUploadOutlinedIcon } from "@mui/icons-material";
import { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import Loading from "src/components/Loading";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import useTranslate from "src/hooks/useTranslate";

const sx = {
    cloudUploadIcon: {
        fontSize: "3.125rem",
    },
    iconColor: (theme: Theme) => ({
        color: theme.palette.blue?.[200],
    }),
    textColor: (theme: Theme) => ({
        color: theme.palette.blue?.[400],
    }),
};

export interface FormUploadFilePlaceholderProps extends HtmlHTMLAttributes<HTMLDivElement> {
    uploading: boolean;
    isDragActive: boolean;
}

const FormUploadFilePlaceholder = (props: FormUploadFilePlaceholderProps) => {
    const { className, uploading, isDragActive, ...rest } = props;

    const t = useTranslate();

    return (
        <Box display="flex" alignItems="center" justifyContent="center" {...rest}>
            <Box mr={2} sx={sx.iconColor}>
                {uploading ? <Loading /> : <CloudUploadOutlinedIcon sx={sx.cloudUploadIcon} />}
            </Box>

            <TypographyTextSecondary variant="body2">
                {t(`resources.input.${isDragActive ? "dropFileHere" : "dragAndDropFileHere"}`)}{" "}
                <Box component="span" sx={sx.textColor}>
                    {t("resources.input.browse")}
                </Box>
            </TypographyTextSecondary>
        </Box>
    );
};

export default FormUploadFilePlaceholder;
