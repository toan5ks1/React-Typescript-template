import { cloneElement, forwardRef, ReactNode, useImperativeHandle } from "react";

import { OptionalKeys } from "src/typings/support-types";

import { Box, SxProps, Theme } from "@mui/material";
import DividerBase from "src/components/Divider/DividerBase";
import TabsBase from "src/components/Tabs/TabsBase";

import TabPanel from "../TabPanel";

import useTabs, { MapTabReturns, UseTabsOptions } from "src/hooks/useTabs";

type ClassKeys = OptionalKeys<{ tabs: string; tabPanel: string }>;

export interface TabLayoutProps {
    mapTabs: MapTabReturns[];
    classes?: ClassKeys; // TODO: remove this, use tabsSx and tabPanelSx instead
    hasDivider?: boolean;
    tabHeaderAction?: ReactNode;
    defaultVal?: number;
    customOptions?: UseTabsOptions;
    showCustomTestId?: boolean;
    tabsSx?: SxProps<Theme>;
    tabPanelSx?: SxProps<Theme>;
    addTabNameToQuery?: boolean;
}

export interface TabLayoutRefs {
    changeCurrentTab: (tabNumber: number, eventTarget?: EventTarget) => void;
}

const renderTabHeaderAction = (children: TabLayoutProps["tabHeaderAction"]) => {
    return (
        <Box display="flex" justifyContent="center" alignItems="center">
            <Box display="flex">
                <Box px={2}>
                    <DividerBase orientation="vertical" />
                </Box>
                {children}
            </Box>
        </Box>
    );
};

const getTabNamesList = (mapTabs: MapTabReturns[]) => {
    return mapTabs.map((tabs) => {
        return tabs.tabName.props["data-testid"];
    });
};

const TabLayout = forwardRef<TabLayoutRefs | undefined, TabLayoutProps>(
    (props: TabLayoutProps, ref) => {
        const {
            mapTabs,
            classes: classesOverride = {} as ClassKeys,
            hasDivider,
            tabHeaderAction,
            defaultVal,
            customOptions,
            showCustomTestId,
            tabsSx,
            tabPanelSx,
            addTabNameToQuery,
        } = props;

        const tabNamesList = addTabNameToQuery ? getTabNamesList(mapTabs) : undefined;

        const { currentTab, changeCurrentTab, handleChangeCurrentTabForTabBase } = useTabs<number>(
            defaultVal,
            customOptions,
            tabNamesList
        );

        //TODO: Write unit test for useImperativeHandle
        useImperativeHandle(ref, () => ({
            changeCurrentTab,
        }));

        return (
            <div data-testid="TabLayout">
                <Box display="flex" className={classesOverride.tabs} sx={tabsSx}>
                    <TabsBase
                        value={currentTab}
                        onChange={handleChangeCurrentTabForTabBase}
                        indicatorColor="primary"
                        textColor="primary"
                    >
                        {mapTabs.map((e: MapTabReturns, index: number) =>
                            cloneElement(e.tabName, { ...a11yProps(index, showCustomTestId) })
                        )}
                    </TabsBase>

                    {tabHeaderAction && renderTabHeaderAction(tabHeaderAction)}
                </Box>

                {hasDivider && <DividerBase variant="fullWidth" />}

                {mapTabs.map((e: MapTabReturns, index: number) => {
                    return (
                        <TabPanel
                            className={classesOverride.tabPanel}
                            sx={tabPanelSx}
                            index={index}
                            value={currentTab}
                            key={index}
                        >
                            {e.tabPanel}
                        </TabPanel>
                    );
                })}
            </div>
        );
    }
);

const a11yProps = (index: number, showCustomTestId?: boolean) => {
    return {
        id: `nav-tab-${index}`,
        "aria-controls": `nav-tabpanel-${index}`,
        ...(showCustomTestId ? {} : { "data-testid": "Tab" }),
        key: index,
    };
};

export default TabLayout;
