import { QR_BACKGROUND_IMAGE } from "src/squads/adobo/domains/entry-exit/common/constants/const";

import { Theme } from "@mui/material";

export const styles = {
    main: {
        height: "100vh",
        width: "100vw",
        backgroundImage: `url(${QR_BACKGROUND_IMAGE})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        zIndex: 2,
        position: "fixed",
    },
    cameraContainer: (theme: Theme) => ({
        background: "white",
        maxWidth: "545.5px",
        padding: theme.spacing(4, 2.5, 2, 2.5),
        margin: "0 auto",
        borderRadius: "8px",
        position: "relative",
        top: "50%",
        transform: "translateY(-50%)",
    }),
    resultOverlay: {
        position: "fixed",
        width: "100vw",
        bottom: 0,
    },
    hoverText: (theme: Theme) => ({
        color: theme.palette.grey[800],
        fontWeight: 700,
        textAlign: "center",
        padding: theme.spacing(3, 0, 2, 0),
    }),
    darkContainer: (theme: Theme) => ({
        background: theme.palette.common.black,
        opacity: "0.8",
        height: "55vh",
    }),

    disable: (theme: Theme) => ({
        color: theme.palette.grey[200],
    }),
};

export const videoContainerStyle = {
    height: "55vh",
};

export const cameraViewStyle = {
    height: "65vh",
    maxWidth: "auto",
    objectFit: "cover",
    overflow: "hidden",
    margin: "0 auto",
};
