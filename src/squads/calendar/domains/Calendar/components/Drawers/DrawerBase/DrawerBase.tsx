import { Drawer as MaterialDrawer, DrawerProps as MaterialDrawerProps } from "@mui/material";

export interface DrawerBaseProps extends MaterialDrawerProps {}

const DrawerBase = ({ children, ...rest }: DrawerBaseProps) => {
    return <MaterialDrawer {...rest}>{children}</MaterialDrawer>;
};

export default DrawerBase;
