import { PropsWithChildren, useState } from "react";

import { getThemeWithMuiV5 } from "src/styles";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { ThemeMode } from "../typings/material-ui";

interface ThemeProviderProps {
    mode?: ThemeMode;
}

const themeV5 = getThemeWithMuiV5();

const ThemeProvider = ({ children }: PropsWithChildren<ThemeProviderProps>) => {
    const [theme] = useState(themeV5);

    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
