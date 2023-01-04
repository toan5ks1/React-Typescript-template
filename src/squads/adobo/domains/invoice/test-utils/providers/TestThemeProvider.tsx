import { PropsWithChildren } from "react";

import { getThemeWithMuiV5 } from "src/styles";

import { ThemeProvider } from "@mui/material/styles";

//currently we will expect the style come from manabie first, in the future we will do snapshot separately for each style options
const theme = getThemeWithMuiV5();

const TestThemeProvider = ({ children }: PropsWithChildren<{}>) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default TestThemeProvider;
