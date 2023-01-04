import { Breakpoint } from "@mui/material";

import { breakpoints } from "src/styles/themes/variants/manabieV5";

export const mockReturnPixelOfBreakpoint = (breakpoint: Breakpoint) => {
    return breakpoints.values[breakpoint];
};
