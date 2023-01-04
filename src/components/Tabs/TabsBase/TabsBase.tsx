import { Tabs as MuiTabs, TabsProps as MuiTabsProps } from "@mui/material";

export interface TabsBaseProps extends MuiTabsProps {}

const TabsBase = ({ children, ...rest }: TabsBaseProps) => {
    return <MuiTabs {...rest}>{children}</MuiTabs>;
};

export default TabsBase;
