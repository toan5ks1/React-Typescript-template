import { OtherScheme, ColorScheme } from "./themes/types";

// Module augmentation for v5
declare module "@mui/material/styles" {
    interface TypeBackground extends PaletteColor {}

    interface TypeText {
        light: string;
    }

    interface TypeBorder {
        main: string;
    }
    interface Color {
        main: string;
        dark: string;
    }

    interface SimplePaletteColorOptions {
        border?: string;
        background?: string;
        lightBackground?: string;
    }

    interface PaletteColor {
        border?: string;
        background?: string;
        lightBackground?: string;
    }

    interface PaletteOptions {
        border?: Partial<TypeBorder>;
        other?: Partial<OtherScheme>;
        // color table
        blue: Partial<ColorScheme>;
        red: Partial<ColorScheme>;
        green: Partial<ColorScheme>;
        cyan: Partial<ColorScheme>;
        yellow: Partial<ColorScheme>;
        purple: Partial<ColorScheme>;
        light: Partial<ColorScheme>;
        elderBlue: Partial<ColorScheme>;
        pink: Partial<ColorScheme>;
        default: Partial<Color>;
    }

    // For custom palette, we dont have fallback to merge with, so type of it should be Partial<X>
    interface Palette {
        border?: TypeBorder;
        other?: Partial<OtherScheme>;
        // color table
        blue?: Partial<ColorScheme>;
        red?: Partial<ColorScheme>;
        green?: Partial<ColorScheme>;
        cyan?: Partial<ColorScheme>;
        yellow?: Partial<ColorScheme>;
        purple?: Partial<ColorScheme>;
        light?: Partial<ColorScheme>;
        elderBlue?: Partial<ColorScheme>;
        pink?: Partial<ColorScheme>;
        default: Color;
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        default: true;
    }
}

export * from "./utils";
