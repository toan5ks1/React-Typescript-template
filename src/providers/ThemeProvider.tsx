import { PropsWithChildren } from "react";

import { ThemeMode } from "src/typings/material-ui";

import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";

import { getThemeWithMuiV5 } from "../styles";

import useLocale from "src/hooks/useLocale";

interface ThemeProviderProps {
    mode?: ThemeMode;
}

const ThemeProvider = ({ children }: PropsWithChildren<ThemeProviderProps>) => {
    const locale = useLocale();
    const theme = getThemeWithMuiV5({ locale });

    return <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>;
};

export default ThemeProvider;
