import { HTMLAttributes } from "react";

import { Box, Theme } from "@mui/material";
import ChipBase from "src/components/Chips/ChipBase";

export interface InfoNotificationDetailSentTableRowProps extends HTMLAttributes<HTMLDivElement> {
    rowLabel: string;
    rowItems?: string[];
}

const sx = {
    root: {
        display: "table-row",
        "&:first-of-type > *": {
            paddingTop: 0,
        },
    },
    tableCell: (theme: Theme) => ({
        display: "table-cell",
        paddingTop: theme.spacing(2),
    }),
    rowTitle: {
        textAlign: "right",
        whiteSpace: "nowrap",
    },
    cellItem: (theme: Theme) => ({
        marginLeft: theme.spacing(1),
    }),
};

const InfoNotificationDetailSentTableRow = ({
    rowLabel,
    rowItems,
    ...props
}: InfoNotificationDetailSentTableRowProps) => {
    return (
        <Box sx={sx.root} {...props} data-testid="InfoNotificationDetailSentTableRow__container">
            <Box sx={[sx.tableCell, sx.rowTitle]}>
                <span>{rowLabel}</span>
            </Box>
            <Box sx={sx.tableCell}>
                {rowItems &&
                    rowItems.map((item, index) => (
                        <ChipBase
                            key={index}
                            label={item}
                            sx={sx.cellItem}
                            data-testid="ChipBase_item"
                            size="small"
                        />
                    ))}
            </Box>
        </Box>
    );
};

export default InfoNotificationDetailSentTableRow;
