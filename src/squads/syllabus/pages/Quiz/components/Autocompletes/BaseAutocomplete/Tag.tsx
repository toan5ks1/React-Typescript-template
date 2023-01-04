import { HtmlHTMLAttributes, ReactNode } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/material";

const sx = {
    root: {
        display: "flex",
        alignItems: "center",
        height: "24px",
        margin: "2px",
        lineHeight: "22px",
        backgroundColor: "#fafafa",
        border: "1px solid #e8e8e8",
        borderRadius: "8px",
        boxSizing: "content-box",
        padding: "0 4px 0 10px",
        outline: "0",
        overflow: "hidden",

        "&:focus": {
            borderColor: "#40a9ff",
            backgroundColor: "#e6f7ff",
        },

        "& span": {
            overflow: "hidden",
            whiteSpace: "nowrap",
            textOverflow: "ellipsis",
        },

        "& svg": {
            fontSize: 12,
            cursor: "pointer",
            padding: 4,
        },
    },
};

export interface TagProps extends HtmlHTMLAttributes<HTMLDivElement> {
    className?: string;
    label: ReactNode;
    onDelete?: (event: any) => void;
}

const Tag = ({ className, label, onDelete, ...props }: TagProps) => {
    return (
        <Box sx={sx.root} {...props}>
            <span>{label}</span>
            <CloseIcon onClick={onDelete} />
        </Box>
    );
};

export default Tag;
