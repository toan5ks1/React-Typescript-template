import { cloneElement } from "react";

import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DialogHeader from "src/components/Dialogs/DialogWithHeaderFooter/DialogHeader";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter/DialogWithHeaderFooter";
import { DialogWithHeaderFooterProps } from "src/components/Dialogs/types";
import TabPanel from "src/components/Tabs/TabPanel";
import TabsBase from "src/components/Tabs/TabsBase";

import useTabs, { MapTabReturns } from "src/hooks/useTabs";

export interface DialogWithHeaderFooterTabsLayoutProps extends DialogWithHeaderFooterProps {
    mapTabs: MapTabReturns[];
}

const a11yProps = (index: number) => {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `nav-tabpanel-${index}`,
        "data-testid": "Tab",
        key: index,
    };
};

//https://github.com/mui-org/material-ui/blob/c8b7ad499c6573c63ccb7e1fb21eb2124c6e77c8/packages/material-ui/src/Tabs/Tabs.js#L21
const TAB_HEIGHT = 48;

const DialogWithHeaderFooterTabsLayout = (props: DialogWithHeaderFooterTabsLayoutProps) => {
    const { mapTabs, ...rest } = props;
    const { currentTab, handleChangeCurrentTabForTabBase } = useTabs<string>();

    const theme = useTheme();
    return (
        <DialogWithHeaderFooter
            {...rest}
            // theme.spacing(2) = "16px" read more https://mui.com/guides/migration-v4/#heading-theme-structure
            additionalHeights={Number(theme.spacing(2).slice(0, 2)) + TAB_HEIGHT}
            header={
                <DialogHeader {...rest} disableBottomPadding>
                    <Box pt={2}>
                        <TabsBase
                            value={currentTab}
                            onChange={handleChangeCurrentTabForTabBase}
                            indicatorColor="primary"
                            textColor="primary"
                        >
                            {mapTabs.map((e: MapTabReturns, index: number) =>
                                cloneElement(e.tabName, { ...a11yProps(index) })
                            )}
                        </TabsBase>
                    </Box>
                </DialogHeader>
            }
        >
            {mapTabs.map((e: MapTabReturns, index: number) => (
                <TabPanel index={index} value={currentTab} key={index}>
                    {e.tabPanel}
                </TabPanel>
            ))}
        </DialogWithHeaderFooter>
    );
};

export default DialogWithHeaderFooterTabsLayout;
