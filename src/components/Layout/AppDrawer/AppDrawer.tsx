import { FC } from "react";

import { Features } from "src/common/constants/enum";

import Drawer, { drawerClasses, DrawerProps } from "@mui/material/Drawer";
import type { Theme, CSSObject } from "@mui/material/styles";
import { styled } from "@mui/material/styles";

import Menu from "./Menu";
import MenuV2 from "./MenuV2";

import useFeatureToggle from "src/hooks/useFeatureToggle";

const DRAWER_WIDTH = 260;
const BOX_SHADOW =
    "0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px rgba(0, 0, 0, 0.14), 0px 1px 3px rgba(0, 0, 0, 0.12);";

const openedMixin = (theme: Theme): CSSObject => ({
    width: DRAWER_WIDTH,
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const StyledDrawer = styled(Drawer, {
    shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => {
    return {
        width: DRAWER_WIDTH,
        flexShrink: 0,
        whiteSpace: "nowrap",
        boxSizing: "border-box",
        ...(open && {
            ...openedMixin(theme),
            [`& .${drawerClasses.paper}`]: {
                backgroundColor: theme.palette.grey[50],
                boxShadow: BOX_SHADOW,
                ...openedMixin(theme),
            },
        }),
        ...(!open && {
            ...closedMixin(theme),
            [`& .${drawerClasses.paper}`]: closedMixin(theme),
        }),
    };
});

StyledDrawer.displayName = "StyledDrawer";

const Spacer = styled("div")(({ theme }) => {
    return { ...theme.mixins.toolbar };
});

export interface AppDrawerProps extends DrawerProps {
    sidebarOpen: boolean;
}

const AppDrawer: FC<AppDrawerProps> = ({ sidebarOpen = true }) => {
    const menuV2 = useFeatureToggle(Features.MICRO_FRONTEND_MANA_SIDEBAR);

    return (
        <StyledDrawer
            variant="permanent"
            anchor="left"
            open={sidebarOpen}
            data-testid="AppDrawer"
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
        >
            <Spacer />
            {menuV2 ? <MenuV2 sidebarOpen={sidebarOpen} /> : <Menu sidebarOpen={sidebarOpen} />}
        </StyledDrawer>
    );
};

export default AppDrawer;
