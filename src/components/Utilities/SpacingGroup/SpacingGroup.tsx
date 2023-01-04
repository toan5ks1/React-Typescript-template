import { ElementType, PropsWithChildren } from "react";

import { Box, SxProps, Theme } from "@mui/material";

import { StandardProps } from "../../../typings/react-component";

export interface SpacingGroupProps extends StandardProps {
    component?: ElementType;
    direction?: "vertical" | "horizontal";
    spacing?: string | number;
    sx?: SxProps<Theme>;
}

const SpacingGroup = ({
    component = "div",
    direction = "vertical",
    spacing = 8,
    children,
    className,
    sx = [],
    ...rest
}: PropsWithChildren<SpacingGroupProps>) => {
    const spacingUnit = typeof spacing === "string" ? spacing : `${spacing}px`;

    const styles = {
        vertical: {
            "& > *:not(:last-child)": {
                marginBottom: spacingUnit,
            },
        },
        horizontal: {
            "& > *:not(:last-child)": {
                marginRight: spacingUnit,
            },
        },
    };

    return (
        <Box
            component={component}
            className={className}
            sx={[{ ...styles[direction] }, ...(Array.isArray(sx) ? sx : [sx])]}
            {...rest}
        >
            {children}
        </Box>
    );
};

export default SpacingGroup;
