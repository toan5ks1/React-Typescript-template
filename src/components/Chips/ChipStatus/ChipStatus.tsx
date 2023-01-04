import { Theme } from "@mui/material";

import ChipBase, { ChipBaseProps } from "../ChipBase";

const lightStyles = {
    default: ({ palette }: Theme) => generateColors(palette.grey?.[100], palette.text.secondary),
    error: ({ palette }: Theme) =>
        generateColors(palette.error.lightBackground, palette.error.main),
    warning: ({ palette }: Theme) =>
        generateColors(palette.warning.lightBackground, palette.warning.dark),
    success: ({ palette }: Theme) =>
        generateColors(palette.success.lightBackground, palette.success.dark),
    others: ({ palette }: Theme) => generateColors(palette.purple?.[50], palette.purple?.[500]),
    custom: ({ palette }: Theme) => generateColors(palette.pink?.[50], palette.secondary.main),
};

const darkStyles = {
    default: ({ palette }: Theme) => generateColors(palette.grey?.[400], palette.common.white),
    error: ({ palette }: Theme) => generateColors(palette.error.main, palette.common.white),
    warning: ({ palette }: Theme) => generateColors(palette.warning.main, palette.common.white),
    success: ({ palette }: Theme) => generateColors(palette.success.main, palette.common.white),
    others: ({ palette }: Theme) => generateColors(palette.purple?.[500], palette.common.white),
    custom: ({ palette }: Theme) => generateColors(palette.secondary.main, palette.common.white),
};

export type ChipStatusThemes = "light" | "dark";
export type ChipStatusStyles = "default" | "error" | "warning" | "success" | "others" | "custom";
export interface ChipStatusProps extends ChipBaseProps {
    theme?: ChipStatusThemes;
    status?: ChipStatusStyles;
}

const ChipStatus = (props: ChipStatusProps) => {
    const { theme = "light", status = "default", ...rest } = props;

    return (
        <ChipBase
            sx={theme === "light" ? lightStyles[status] : darkStyles[status]}
            data-testid="ChipStatus"
            {...rest}
        />
    );
};

type ChipStatusColors = {
    background?: string;
    color?: string;
};

const generateColors = (backgroundColorCode?: string, colorCode?: string): ChipStatusColors => ({
    background: backgroundColorCode,
    color: colorCode,
});

export default ChipStatus;
