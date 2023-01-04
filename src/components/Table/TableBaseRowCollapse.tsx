import { ReactNode } from "react";

import { useToggle } from "react-use";

import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Button, Theme } from "@mui/material";
import { accordionClasses } from "@mui/material/Accordion";
import Collapse, { collapseClasses } from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow, { tableRowClasses } from "@mui/material/TableRow";

const sx = {
    collapse: (theme: Theme) => ({
        [`&.${accordionClasses.expanded}`]: {
            margin: 0,
        },
        [`&.${collapseClasses.wrapper}`]: {
            padding: theme.spacing(3),
        },
    }),
    tableCell: {
        display: "flex",
        alignItems: "center",
        maxWidth: "unset",
    },
    tableRow: (theme: Theme) => ({
        [`&.${tableRowClasses.selected}`]: {
            "&:hover": {
                background: theme.palette.info.lightBackground,
            },
            background: theme.palette.info.lightBackground,
        },
        "&:nth-of-type(even) > td": {
            padding: 0,
        },
    }),
    expandIcon: {
        width: "30px",
        height: "30px",
        minWidth: "30px",
        padding: "unset",
    },
};

export interface TableRowCollapseProps {
    collapseContent: ReactNode;
    rowContent: ReactNode;
    selected: boolean;
    defaultCollapse: boolean;
}

export const TableRowCollapse = ({
    collapseContent,
    rowContent,
    selected,
    defaultCollapse,
}: TableRowCollapseProps) => {
    const [collapse, setCollapse] = useToggle(defaultCollapse);

    return (
        <>
            <TableRow data-testid="TableRowCollapse__row" sx={sx.tableRow} selected={selected}>
                <TableCell sx={sx.tableCell}>
                    <span onClick={setCollapse}>
                        <Button
                            color="default"
                            sx={sx.expandIcon}
                            variant={collapse ? "contained" : "text"}
                            disableElevation
                        >
                            {collapse ? <ExpandMoreIcon /> : <ExpandLessIcon />}
                        </Button>
                    </span>
                    {rowContent}
                </TableCell>
            </TableRow>
            <TableRow data-testid="TableRowCollapse__rowCollapse" sx={sx.tableRow}>
                <TableCell>
                    <Collapse sx={sx.collapse} in={collapse} mountOnEnter unmountOnExit={false}>
                        {collapseContent}
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
};

TableRowCollapse.defaultProps = {
    defaultCollapse: false,
};

export default TableRowCollapse;
