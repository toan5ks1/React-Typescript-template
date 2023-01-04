export interface ColorScheme {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
    A100: string;
    A200: string;
    A400: string;
    A700: string;
}

// This wont follow any restriction
export interface OtherScheme {
    darknessGrey: string;
    body: string;
    description: string;
    backgroundGrey: string;
    backgroundLight: string;
    disabled: string;
}

// Currently used for kec only
export interface ColorSchemeKEC extends ColorScheme {}
