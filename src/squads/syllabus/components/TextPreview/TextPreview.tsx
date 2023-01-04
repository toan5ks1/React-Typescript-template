import { HtmlHTMLAttributes } from "react";

import { Box, Theme } from "@mui/material";

const sx = {
    root: {
        display: "flex",
        flexDirection: "column",
    },
    title: (theme: Theme) => ({
        marginBottom: theme.spacing(1),
        color: theme.palette.text.light,
        fontWeight: 500,
    }),
    value: {},
};

export interface TextPreviewProps extends HtmlHTMLAttributes<HTMLDivElement> {
    title?: string;
    value?: string | number;
}

const TextPreview = (props: TextPreviewProps) => {
    const { title, value, className, ...rest } = props;

    return (
        <Box {...rest}>
            <Box sx={sx.title}>{title}</Box>
            <Box sx={sx.value}>{value}</Box>
        </Box>
    );
};

export default TextPreview;
