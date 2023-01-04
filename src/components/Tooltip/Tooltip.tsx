import { memo } from "react";

import { Box, Tooltip as MuiTooltip, TooltipProps as MuiTooltipProps } from "@mui/material";

export interface TooltipProps extends MuiTooltipProps {}

const Tooltip = ({ className, style, children, title, ...rest }: TooltipProps) => {
    return (
        <MuiTooltip
            arrow
            className={className}
            style={style}
            componentsProps={{
                tooltip: {
                    sx: (theme) => ({
                        background: theme.palette.common.white,
                        boxShadow: `0px 1px 1px ${theme.palette.grey[400]}`,
                    }),
                },
                arrow: {
                    sx: (theme) => ({
                        color: theme.palette.primary.light,
                    }),
                },
            }}
            title={
                <Box
                    sx={(theme) => ({
                        color: theme.palette.primary.light,
                        fontSize: "1rem",
                        lineHeight: "140%",
                        padding: theme.spacing(0.5, 0.25),
                    })}
                >
                    {title}
                </Box>
            }
            {...rest}
        >
            {children}
        </MuiTooltip>
    );
};

export default memo(Tooltip);
