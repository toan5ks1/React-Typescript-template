import { PropsWithChildren } from "react";

import { getThemeWithMuiV5 } from "src/styles";

import { ThemeProvider as ThemeProviderV5 } from "@mui/material/styles";

import { ThemeMode } from "../typings/material-ui";

interface ThemeProviderProps {
    mode?: ThemeMode;
}

const themeV5 = getThemeWithMuiV5();

const ThemeProvider = ({ children }: PropsWithChildren<ThemeProviderProps>) => {
    return <ThemeProviderV5 theme={themeV5}>{children}</ThemeProviderV5>;
};

export default ThemeProvider;
