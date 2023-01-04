import { PropsWithChildren } from "react";

import { getThemeWithMuiV5 } from "src/styles";

import { ThemeProvider as ThemeProviderV5 } from "@mui/material/styles";

//currently we will expect the style come from manabie first, in the future we will do snapshot separately for each style options
const themeV5 = getThemeWithMuiV5();

const TestThemeProvider = ({ children }: PropsWithChildren<{}>) => {
    return <ThemeProviderV5 theme={themeV5}>{children}</ThemeProviderV5>;
};

export default TestThemeProvider;
