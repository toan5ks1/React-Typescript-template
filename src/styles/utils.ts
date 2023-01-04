import { buttonClasses } from "@mui/material/Button";
import { jaJP, viVN } from "@mui/material/locale";
import { alpha, createTheme, ThemeOptions } from "@mui/material/styles";
import { Theme } from "@mui/system";
import { deepmerge } from "@mui/utils";

import pjThemeV5 from "./themes";

import { LanguageEnums } from "src/typings/i18n-provider";

const cssUnits = {
    //absolute
    cm: "cm",
    mm: "mm",
    in: "in",
    px: "px",
    pt: "pt",
    pc: "pc",

    //relative
    em: "em",
    ex: "ex",
    ch: "ch",
    rem: "rem",
    vw: "vw",
    vh: "vh",
    vmin: "vmin",
    vmax: "vmax",
    "%": "%",
};

export type TypeCssValue = string | number;

export function hasUnit(a: TypeCssValue) {
    return typeof a === "string" && Object.keys(cssUnits).some((unit) => a.includes(unit));
}

export function toUnit(a: TypeCssValue, toUnit = cssUnits.px) {
    return hasUnit(a) ? String(a) : `${a}${toUnit}`;
}

export function getThemeV5(options: ThemeOptions = {}): ThemeOptions {
    return deepmerge(pjThemeV5 as ThemeOptions, options);
}

export function getThemeWithMuiV5({
    locale = LanguageEnums.EN,
    options,
}: {
    locale?: LanguageEnums;
    options?: ThemeOptions;
} = {}) {
    let mainTheme: Theme;
    switch (locale) {
        case LanguageEnums.JA:
            mainTheme = createTheme(getThemeV5(options), jaJP);
            break;
        case LanguageEnums.VI:
            mainTheme = createTheme(getThemeV5(options), viVN);
            break;
        case LanguageEnums.EN:
        default:
            mainTheme = createTheme(getThemeV5(options));
    }

    return createTheme(mainTheme as ThemeOptions, {
        components: {
            MuiButton: {
                variants: [
                    {
                        props: { variant: "contained", color: "default" },
                        style: {
                            color: mainTheme.palette.getContrastText(mainTheme.palette.grey[300]),
                        },
                    },
                    {
                        props: { variant: "outlined", color: "default" },
                        style: {
                            color: mainTheme.palette.text.primary,
                            borderColor:
                                mainTheme.palette.mode === "light"
                                    ? "rgba(0, 0, 0, 0.23)"
                                    : "rgba(255, 255, 255, 0.23)",
                            [`&.${buttonClasses.disabled}`]: {
                                border: `1px solid ${mainTheme.palette.action.disabledBackground}`,
                            },
                            "&:hover": {
                                borderColor:
                                    mainTheme.palette.mode === "light"
                                        ? "rgba(0, 0, 0, 0.23)"
                                        : "rgba(255, 255, 255, 0.23)",
                                backgroundColor: alpha(
                                    mainTheme.palette.text.primary,
                                    mainTheme.palette.action.hoverOpacity
                                ),
                            },
                        },
                    },
                    {
                        props: { color: "default", variant: "text" },
                        style: {
                            color: mainTheme.palette.text.primary,
                            "&:hover": {
                                backgroundColor: alpha(
                                    mainTheme.palette.text.primary,
                                    mainTheme.palette.action.hoverOpacity
                                ),
                            },
                        },
                    },
                ],
            },
        },
    });
}
