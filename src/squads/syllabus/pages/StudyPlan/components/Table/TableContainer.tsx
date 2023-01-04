import { styled } from "@mui/material/styles";

const PREFIX = "StudyPlanItemTable";

export const classes = {
    loNameColumn: `${PREFIX}-loNameColumn`,
    dateColumn: `${PREFIX}-dateColumn`,
    topicColumn: `${PREFIX}-topicColumn`,
    dateEditColumn: `${PREFIX}-dateEditColumn`,
    topicEditColumn: `${PREFIX}-topicEditColumn`,
    visibilityEditColumn: `${PREFIX}-visibilityEditColumn`,
};

export const TableContainer = styled("div")(({ theme }) => ({
    [`& .${classes.loNameColumn}`]: {
        paddingTop: theme.spacing(1.25),
        paddingBottom: theme.spacing(1.25),
    },

    [`& .${classes.dateColumn}`]: {
        width: "13.8%",
    },

    [`& .${classes.topicColumn}`]: {
        width: "17.2%",
    },

    [`& .${classes.dateEditColumn}`]: {
        width: "15.8%",
    },

    [`& .${classes.topicEditColumn}`]: {
        width: "13%",
    },

    [`& .${classes.visibilityEditColumn}`]: {
        width: "1%",
        whiteSpace: "nowrap",
        textAlign: "center",
    },
}));

TableContainer.displayName = "TableContainer";
