import { ReactElement } from "react";

import { IconButton, Tooltip } from "@mui/material";

export interface TooltipWithIconProps {
    tooltipTitle: string;
    icon: ReactElement;
    position: "typography" | "textarea";
}
const TooltipWithIcon = (props: TooltipWithIconProps) => {
    const { tooltipTitle, icon, position } = props;

    return (
        <Tooltip title={tooltipTitle} placement="top" data-testid="TooltipWithIcon__root">
            <IconButton
                disableRipple
                sx={(theme) => {
                    const overrideCSS =
                        position === "textarea"
                            ? {
                                  alignSelf: "flex-start",
                                  marginLeft: theme.spacing(2),
                              }
                            : {};

                    return { padding: "0", ...overrideCSS };
                }}
            >
                {icon}
            </IconButton>
        </Tooltip>
    );
};

export default TooltipWithIcon;
