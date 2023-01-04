import { Theme } from "@mui/material";
import type { StyleKeys } from "src/components/Table/table-types";

export const tableStyles = (theme: Theme): Partial<StyleKeys> => ({
    // The exact height in the design
    container: { maxHeight: 728 },
    header: {
        position: "sticky",
        top: 0,
        backgroundColor: theme.palette.background.default,
        zIndex: theme.zIndex.drawer - 1,
    },
    footer: {
        position: "sticky",
        bottom: 0,
        backgroundColor: theme.palette.background.default,
        zIndex: theme.zIndex.drawer - 1,
    },
});
