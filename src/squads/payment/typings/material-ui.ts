export enum ThemeMode {
    LIGHT = "light",
    DARK = "dark",
}

export type ComponentClasses<T extends string> = {
    [X in T]?: string;
};
