import { ReactNode } from "react";

import Grid from "@mui/material/Grid";
import TabPanel from "src/components/Tabs/TabPanel";

export interface DialogTabPanelProps {
    tabValue: number;
    index: number;
    columns: ReactNode[];
}

function DialogTabPanel({ tabValue, index, columns }: DialogTabPanelProps) {
    return (
        <TabPanel value={tabValue} index={index}>
            <Grid item container spacing={1}>
                <Grid item xs={6}>
                    {columns[0]}
                </Grid>
                <Grid item xs={6} display="flex" alignItems="center">
                    {columns[1]}
                </Grid>
            </Grid>
        </TabPanel>
    );
}

export default DialogTabPanel;
