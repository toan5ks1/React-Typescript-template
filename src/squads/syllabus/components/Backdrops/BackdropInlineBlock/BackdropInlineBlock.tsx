import { CSSProperties, PropsWithChildren, ReactNode } from "react";

import Box from "@mui/material/Box";
import BackdropBase, { BackdropBaseProps } from "src/components/Backdrops/BackdropBase";

export interface BackdropInlineBlockProps extends BackdropBaseProps {
    overlayContent?: ReactNode;
    mode?: CSSProperties["position"];
}

const BackdropInlineBlock = (props: PropsWithChildren<BackdropInlineBlockProps>) => {
    const { children, overlayContent, mode = "unset", open, ...backDropProps } = props;

    return (
        <Box position="relative">
            {mode === "absolute" ? (
                <BackdropBase
                    {...backDropProps}
                    data-testid="BackdropInlineBlock__BackdropBase"
                    open={open}
                    sx={(theme) => ({
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        backgroundColor: theme.palette.common.white,
                    })}
                >
                    {overlayContent}
                </BackdropBase>
            ) : (
                open && <Box>{overlayContent}</Box>
            )}

            <Box display={!open ? "unset" : "none"}>{children}</Box>
        </Box>
    );
};

export default BackdropInlineBlock;
