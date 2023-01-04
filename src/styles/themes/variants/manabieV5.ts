import { PaletteOptions, ThemeOptions } from "@mui/material";
import { checkboxClasses } from "@mui/material/Checkbox";
import { listItemClasses } from "@mui/material/ListItem";
import { menuItemClasses } from "@mui/material/MenuItem";
import type { CommonColors } from "@mui/material/styles/createPalette";
import { Shadows } from "@mui/material/styles/shadows";
import { createBreakpoints } from "@mui/system";

import { ColorSchemeKEC, OtherScheme } from "../types";

const grey: ColorSchemeKEC = {
    50: "#FAFAFA",
    100: "#F5F5F5",
    200: "#EEEEEE",
    300: "#E0E0E0",
    400: "#BDBDBD",
    500: "#9E9E9E",
    600: "#9E9E9E",
    700: "#616161",
    800: "#424242",
    900: "#212121",
    A100: "#D5D5D5",
    A200: "#AAAAAA",
    A400: "#616161",
    A700: "#303030",
};

const pink: ColorSchemeKEC = {
    50: "#FCE4EC",
    100: "#F8BBD0",
    200: "#F48FB1",
    300: "#F06292",
    400: "#EC407A",
    500: "#E91E63",
    600: "#D81B60",
    700: "#C2185B",
    800: "#AD1457",
    900: "#880E4F",
    A100: "#F50057",
    A200: "#FF4081",
    A400: "#F50057",
    A700: "#C51162",
};

const orange: ColorSchemeKEC = {
    50: "#FFF3E0",
    100: "#FFE0B2",
    200: "#FFCC80",
    300: "#FFB74D",
    400: "#FFA726",
    500: "#FF9800",
    600: "#FB8C00",
    700: "#F57C00",
    800: "#EF6C00",
    900: "#E65100",
    A100: "#FFD180",
    A200: "#FFAB40",
    A400: "#FF9100",
    A700: "#FF6D00",
};

const green: ColorSchemeKEC = {
    50: "#E8F5E9",
    100: "#C8E6C9",
    200: "#A5D6A7",
    300: "#81C784",
    400: "#66BB6A",
    500: "#4CAF50",
    600: "#43A047",
    700: "#388E3C",
    800: "#2E7D32",
    900: "#1B5E20",
    A100: "#B9F6CA",
    A200: "#69F0AE",
    A400: "#00E676",
    A700: "#00C853",
};

const yellow: ColorSchemeKEC = {
    50: "#FFFDE7",
    100: "#FFF9C4",
    200: "#FFF59D",
    300: "#FFF176",
    400: "#FFEE58",
    500: "#FFEB3B",
    600: "#FDD835",
    700: "#FBC02D",
    800: "#F9A825",
    900: "#F57F17",
    A100: "#FFFF8D",
    A200: "#FFFF00",
    A400: "#FFEA00",
    A700: "#FFD600",
};

const blue: ColorSchemeKEC = {
    50: "#E3F2FD",
    100: "#BBDEFB",
    200: "#90CAF9",
    300: "#1976D2",
    400: "#42A5F5",
    500: "#2196F3",
    600: "#1E88E5",
    700: "#0B79D0",
    800: "#1565C0",
    900: "#0D47A1",
    A100: "#82B1FF",
    A200: "#448AFF",
    A400: "#2979FF",
    A700: "#2962FF",
};

const red: ColorSchemeKEC = {
    50: "#FEEBEE",
    100: "#FECDD2",
    200: "#EF9A9A",
    300: "#BE134D",
    400: "#EF5350",
    500: "#F44336",
    600: "#E53935",
    700: "#BE134D",
    800: "#C62828",
    900: "#B71C1C",
    A100: "#FF8A80",
    A200: "#FF5252",
    A400: "#FF1744",
    A700: "#D50000",
};

const purple: ColorSchemeKEC = {
    50: "#F3E5F5",
    100: "#E1BEE7",
    200: "#CE93D8",
    300: "#BA68C8",
    400: "#AB47BC",
    500: "#9C27B0",
    600: "#8E24AA",
    700: "#7B1FA2",
    800: "#6A1B9A",
    900: "#4A148C",
    A100: "#EA80FC",
    A200: "#E040FB",
    A400: "#D500F9",
    A700: "#AA00FF",
};

const cyan: ColorSchemeKEC = {
    50: "#E0F7FA",
    100: "#B2EBF2",
    200: "#80DEEA",
    300: "#4DD0E1",
    400: "#26C6DA",
    500: "#00BCD4",
    600: "#00ACC1",
    700: "#0097A7",
    800: "#00838F",
    900: "#006064",
    A100: "#84FFFF",
    A200: "#18FFFF",
    A400: "#00E5FF",
    A700: "#00B8D4",
};

const common: Partial<CommonColors> = {
    white: "#fff",
    black: "#000",
};

const other: OtherScheme = {
    darknessGrey: "#27282B",
    body: "#586189",
    description: "#A8AEC7",
    backgroundGrey: "#F4F6F9",
    backgroundLight:
        "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #2196F3",
    disabled: "#DADDE7",
};

const palette: PaletteOptions = {
    primary: {
        main: blue[500],
        light: "#64B6F7",
        dark: blue[700],
        contrastText: common.white,
        background: "#EDF7FE",
        border: "#90CAF9",
    },
    secondary: {
        main: pink[500],
        light: "#F06191",
        dark: red[700],
        contrastText: common.white,
        background: "#FBDCE7",
        border: "#F48EB1",
    },
    info: {
        main: blue[500],
        light: "#64B6F7",
        dark: blue[700],
        contrastText: common.white,
        lightBackground:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #2196F3",
    },
    error: {
        main: red[500],
        light: "#F88078",
        dark: "#E31B0C",
        contrastText: common.white,
        lightBackground:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #F44336",
    },
    warning: {
        main: orange[500],
        light: "#FFB547",
        dark: "#C77700",
        contrastText: common.white,
        lightBackground:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #FF9800",
    },
    success: {
        main: green[500],
        light: "#7BC67E",
        dark: "#3B873E",
        contrastText: common.white,
        lightBackground:
            "linear-gradient(0deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), #4CAF50",
    },
    text: {
        primary: grey[900],
        secondary: "#757575",
        disabled: grey[500],
    },
    divider: "#E0E0E0",
    action: {
        hover: grey[100],
        selected: "#EBEBEB",
        disabledBackground: "#E0E0E0",
        disabled: grey[400],
    },
    background: {
        default: common.white,
    },
    contrastThreshold: 3,
    common,
    grey,
    // addition colors
    border: {
        main: grey[300],
    },
    blue,
    light: blue,
    elderBlue: blue,
    red,
    cyan,
    green,
    yellow,
    purple,
    other,
    pink,
    default: {
        main: grey[300],
        dark: grey[400],
    },
};

export const breakpoints = createBreakpoints({
    values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1440,
        xl: 1920,
    },
});

export const timeTableCellHeight: number = 264;

const customShadow: Shadows = [
    "none",
    "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12)",
    "0px 3px 1px -2px rgba(0, 0, 0, 0.2), 0px 2px 2px rgba(0, 0, 0, 0.14), 0px 1px 5px rgba(0, 0, 0, 0.12)",
    "0px 3px 3px -2px rgba(0, 0, 0, 0.2), 0px 3px 4px rgba(0, 0, 0, 0.14), 0px 1px 8px rgba(0, 0, 0, 0.12)",
    "0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px rgba(0, 0, 0, 0.14), 0px 1px 10px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 5px 8px rgba(0, 0, 0, 0.14), 0px 1px 14px rgba(0, 0, 0, 0.12)",
    "0px 3px 5px -1px rgba(0, 0, 0, 0.2), 0px 6px 10px rgba(0, 0, 0, 0.14), 0px 1px 18px rgba(0, 0, 0, 0.12)",
    "0px 4px 5px -2px rgba(0, 0, 0, 0.2), 0px 7px 10px 1px rgba(0, 0, 0, 0.14), 0px 2px 16px 1px rgba(0, 0, 0, 0.12)",
    "0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)",
    "0px 5px 6px -3px rgba(0, 0, 0, 0.2), 0px 9px 12px 1px rgba(0, 0, 0, 0.14), 0px 3px 16px 2px rgba(0, 0, 0, 0.12)",
    "0px 6px 6px -3px rgba(0, 0, 0, 0.2), 0px 10px 14px 1px rgba(0, 0, 0, 0.14), 0px 4px 18px 3px rgba(0, 0, 0, 0.12)",
    "0px 6px 7px -4px rgba(0, 0, 0, 0.2), 0px 11px 15px 1px rgba(0, 0, 0, 0.14), 0px 4px 20px 3px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 12px 17px 2px rgba(0, 0, 0, 0.14), 0px 5px 22px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 8px -4px rgba(0, 0, 0, 0.2), 0px 13px 19px 2px rgba(0, 0, 0, 0.14), 0px 5px 24px 4px rgba(0, 0, 0, 0.12)",
    "0px 7px 9px -4px rgba(0, 0, 0, 0.2), 0px 14px 21px 2px rgba(0, 0, 0, 0.14), 0px 5px 26px 4px rgba(0, 0, 0, 0.12)",
    "0px 8px 9px -5px rgba(0, 0, 0, 0.2), 0px 15px 22px 2px rgba(0, 0, 0, 0.14), 0px 6px 28px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 10px -5px rgba(0, 0, 0, 0.2), 0px 16px 24px 2px rgba(0, 0, 0, 0.14), 0px 6px 30px 5px rgba(0, 0, 0, 0.12)",
    "0px 8px 11px -5px rgba(0, 0, 0, 0.2), 0px 17px 26px 2px rgba(0, 0, 0, 0.14), 0px 6px 32px 5px rgba(0, 0, 0, 0.12)",
    "0px 9px 11px -5px rgba(0, 0, 0, 0.2), 0px 18px 28px 2px rgba(0, 0, 0, 0.14), 0px 7px 34px 6px rgba(0, 0, 0, 0.12)",
    "0px 9px 12px -6px rgba(0, 0, 0, 0.2), 0px 19px 29px 2px rgba(0, 0, 0, 0.14), 0px 7px 36px 6px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 20px 31px 3px rgba(0, 0, 0, 0.14), 0px 8px 38px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 13px -6px rgba(0, 0, 0, 0.2), 0px 21px 33px 3px rgba(0, 0, 0, 0.14), 0px 8px 40px 7px rgba(0, 0, 0, 0.12)",
    "0px 10px 14px -6px rgba(0, 0, 0, 0.2), 0px 22px 35px 3px rgba(0, 0, 0, 0.14), 0px 8px 42px 7px rgba(0, 0, 0, 0.12)",
    "0px 11px 14px -7px rgba(0, 0, 0, 0.2), 0px 23px 36px 3px rgba(0, 0, 0, 0.14), 0px 9px 44px 8px rgba(0, 0, 0, 0.12)",
    "0px 11px 15px -7px rgba(0, 0, 0, 0.2), 0px 24px 38px 3px rgba(0, 0, 0, 0.14), 0px 9px 46px 8px rgba(0, 0, 0, 0.12)",
];

const theme: Readonly<ThemeOptions> = {
    palette,
    breakpoints,
    shadows: customShadow,
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    fontSize: "0.875rem",
                    lineHeight: 1.43,
                    fontWeight: 400,
                    letterSpacing: "0.15px",
                    textTransform: "none",
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: `4px`,
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                root: {
                    color: "rgba(0, 0, 0, 0.87)",
                    backgroundColor: "#E0E0E0",
                },
                outlined: {
                    backgroundColor: "transparent",
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    [`&.${checkboxClasses.indeterminate}`]: {
                        color: "#757575",
                    },
                },
            },
        },
        MuiDialogContent: {
            styleOverrides: {
                root: {
                    padding: "8px 24px",
                },
            },
        },
        MuiIconButton: {
            styleOverrides: {
                sizeSmall: {
                    padding: "3px",
                },
            },
        },
        MuiInputBase: {
            styleOverrides: {
                root: {
                    lineHeight: "1.1876em",
                },
            },
        },
        MuiMenuItem: {
            styleOverrides: {
                root: {
                    [`&.${menuItemClasses.selected}, &.${menuItemClasses.selected}:hover`]: {
                        backgroundColor: "#EBEBEB",
                    },
                },
            },
            defaultProps: {
                disableGutters: false,
            },
        },
        MuiListItem: {
            styleOverrides: {
                root: {
                    [`&.${listItemClasses.selected}, &.${listItemClasses.selected}:hover`]: {
                        backgroundColor: "#EBEBEB",
                    },
                },
            },
        },

        MuiFormControl: {
            defaultProps: {
                variant: "outlined",
                fullWidth: true,
            },
        },

        MuiPaper: {
            defaultProps: {
                elevation: 2,
            },
        },
        MuiSelect: {
            defaultProps: {
                variant: "outlined",
            },
            styleOverrides: {
                select: {
                    lineHeight: "1.4375em",
                },
            },
        },
        MuiTab: {
            styleOverrides: {
                root: {
                    [breakpoints.up("sm")]: {
                        minWidth: "7rem",
                    },
                    lineHeight: 1.75,
                    padding: "6px 12px",
                },
            },
        },
        MuiTextField: {
            defaultProps: {
                variant: "outlined",
                fullWidth: true,
            },
        },
    },
    mixins: {
        toolbar: {
            minHeight: 56,
            [`${breakpoints.up("xs")} and (orientation: landscape)`]: {
                minHeight: 48,
            },
            [breakpoints.up("sm")]: {
                minHeight: 64,
            },
        },
    },
    typography: {
        fontSize: 14,
        fontFamily: "Roboto, sans-serif",
        h1: {
            fontSize: "6rem",
            fontWeight: 300,
            letterSpacing: "-1.5px",
            textTransform: "none",
        },
        h2: {
            fontSize: "3.75rem",
            fontWeight: 300,
            letterSpacing: "-0.5px",
            textTransform: "none",
        },
        h3: {
            fontSize: "3rem",
            fontWeight: 400,
            letterSpacing: "0px",
            textTransform: "none",
        },
        h4: {
            fontSize: "2.125rem",
            fontWeight: 400,
            letterSpacing: "0.25px",
            textTransform: "none",
        },
        h5: {
            fontSize: "1.5rem",
            fontWeight: 300,
            letterSpacing: "0px",
            textTransform: "none",
        },
        h6: {
            fontSize: "1.25rem",
            fontWeight: 500,
            letterSpacing: "0.15px",
            textTransform: "none",
        },
        subtitle1: {
            fontSize: "1rem",
            fontWeight: 400,
            letterSpacing: "0.15px",
            textTransform: "none",
        },
        subtitle2: {
            fontSize: "0.875rem",
            fontWeight: 500,
            letterSpacing: "0.1px",
            textTransform: "none",
        },
        body1: {
            fontSize: "1rem",
            fontWeight: 400,
            letterSpacing: "0.15px",
            textTransform: "none",
        },
        body2: {
            fontSize: "0.875rem",
            fontWeight: 400,
            letterSpacing: "0.15px",
            textTransform: "none",
        },
        button: {
            fontSize: "0.875rem",
            fontWeight: 500,
            letterSpacing: "0.4px",
            textTransform: "capitalize",
        },
        caption: {
            fontSize: "0.75rem",
            fontWeight: 400,
            letterSpacing: "0.4px",
            textTransform: "none",
        },
        overline: {
            fontSize: "0.75rem",
            fontWeight: 400,
            letterSpacing: "1px",
            textTransform: "capitalize",
        },
    },
};

export default theme;
