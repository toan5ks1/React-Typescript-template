import { gridClasses } from "@mui/material/Grid";
import type { Theme } from "@mui/material/styles";

const useTextEntity = {
    textEntity: {
        marginTop: 0,
        marginBottom: 0,
        maxWidth: "100%",
        overflowWrap: "anywhere", //break for contiguous letters with no spaces
    },
    actionWrapper: (theme: Theme) => ({
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        alignItems: "center",

        [theme.breakpoints.down("md")]: {
            flexWrap: "wrap",
        },
    }),
    actionPanel: {
        display: "flex",
        alignItems: "center",

        "& > *:not(:first-of-type)": (theme: Theme) => ({
            marginLeft: theme.spacing(1.5),
        }),
        [`& .${gridClasses.item}:nth-of-type(1) button:not(:disabled)`]: (theme: Theme) => ({
            color: theme.palette.text.light,
        }),
    },
};

export default useTextEntity;
