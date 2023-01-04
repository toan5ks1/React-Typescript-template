import { forwardRef } from "react";

import { NavLink, NavLinkProps, Redirect, Route } from "react-router-dom";

import { List, ListItemIcon, Theme, ListItemText } from "@mui/material";
import ListItem, { listItemClasses } from "@mui/material/ListItem";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import useManaSidebarItems from "../../hooks/useManaSidebarItems";

import { pick1stElement } from "@manabie-com/mana-utils";

const sx = {
    footerDrawer: (theme: Theme) => ({
        padding: theme.spacing(2),
        textAlign: "center",
        position: "absolute",
        bottom: 0,
        width: "100%",
        marginBottom: theme.spacing(1),
    }),
    menuItem: (theme: Theme) => ({
        height: theme.spacing(7),
        whiteSpace: "nowrap",
        [`&.${listItemClasses.selected}, &.${listItemClasses.selected}:hover`]: {
            backgroundColor: "#EBEBEB",
        },
    }),
    menuText: (theme: Theme) => ({
        color: theme.palette.text.secondary,
        marginLeft: theme.spacing(4),
    }),
    menuIcon: (theme: Theme) => ({
        minWidth: "unset",
        "& > svg": {
            color: theme.palette.text.secondary,
            margin: "auto",
        },
    }),
    hide: {
        display: "none",
    },
};
const MyNavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(({ children, ...props }, ref) => (
    <NavLink ref={ref} activeClassName="Mui-selected" {...props}>
        {children}
    </NavLink>
));

export interface MenuProps {
    sidebarOpen: boolean;
    defaultItems: ISidebarItem[]; //TODO: will remove this once all team finish init register side method
}
const MenuV2 = ({ sidebarOpen, defaultItems }: MenuProps) => {
    const manaSidebarItems = useManaSidebarItems();
    //TODO: will remove this once all team finish init register side method
    const allowedMenuItems = [...manaSidebarItems, ...defaultItems].sort(
        (prev, next) => prev.order - next.order
    );

    if (!allowedMenuItems.length) return null;

    return (
        <>
            <Route
                exact
                path="/"
                render={() => <Redirect to={pick1stElement(allowedMenuItems)!.to} />}
            />
            <List data-testid="Menu__root">
                {allowedMenuItems.map((e) => {
                    const fn: NavLinkProps["isActive"] = (_, { pathname }) => {
                        return e.isActive(pathname);
                    };

                    return (
                        <ListItem
                            data-testid="MenuItemLink__root"
                            data-value={e.name}
                            aria-label={e.name}
                            key={e.key}
                            sx={sx.menuItem}
                            to={e.to}
                            target={e.target}
                            component={MyNavLink}
                            isActive={fn}
                        >
                            {e.icon && <ListItemIcon sx={sx.menuIcon}>{<e.icon />}</ListItemIcon>}

                            <ListItemText
                                sx={[sx.menuText, !sidebarOpen]}
                                primary={
                                    <TypographyTextSecondary variant="subtitle2">
                                        {e.name}
                                    </TypographyTextSecondary>
                                }
                            />
                        </ListItem>
                    );
                })}
            </List>
        </>
    );
};

export default MenuV2;
