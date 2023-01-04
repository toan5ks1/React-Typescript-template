import { HtmlHTMLAttributes } from "react";

import { Box } from "@mui/material";

export interface FullscreenProps extends HtmlHTMLAttributes<HTMLDivElement> {
    center?: boolean;
}

const Fullscreen = (props: FullscreenProps) => {
    const { className, children, center = true, ...rest } = props;

    return (
        <Box
            sx={{
                height: "100vh",
                width: "100vw",
                display: "flex",
                ...(center && { justifyContent: "center", alignItems: "center" }),
            }}
            className={className}
            {...rest}
        >
            {children}
        </Box>
    );
};

export default Fullscreen;
