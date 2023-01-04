import { cloneElement, useMemo } from "react";

import { match, NavLink, Redirect, Route } from "react-router-dom";
import { pick1stElement } from "src/common/utils/other";
import { Rules } from "src/internals/permission/rules";

import { List, ListItemIcon, Theme, ListItemText } from "@mui/material";
import ListItem, { listItemClasses } from "@mui/material/ListItem";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";
import { useModules } from "src/providers/ModuleProvider";

import useAppPermission from "src/app/useAppPermission";
import useTranslate from "src/hooks/useTranslate";

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

interface MenuProps {
    sidebarOpen: boolean;
}
const Menu = ({ sidebarOpen }: MenuProps) => {
    const t = useTranslate();

    const modules = useModules();

    const { permission } = useAppPermission();
    const allowedMenuItems = useMemo(() => {
        return modules.filter((module) => {
            const isEnabled = permission.can(module.key as keyof Rules, "show") && module.icon;
            if (isEnabled) return module;
        });
    }, [modules, permission]);

    if (!allowedMenuItems.length) return null;

    return (
        <>
            <Route
                exact
                path="/"
                render={() => (
                    <Redirect
                        to={`${pick1stElement(allowedMenuItems)?.basename}/${
                            pick1stElement(allowedMenuItems)?.key
                        }`}
                    />
                )}
            />
            <List data-testid="Menu__root">
                {allowedMenuItems.map((e) => {
                    const Icon = e.icon;
                    const menuText = t(`resources.${e.name}.${e.translateKey}`);
                    const listItem = (
                        <ListItem
                            data-testid="MenuItemLink__root"
                            data-value={e.feature}
                            aria-label={menuText}
                            button
                            component={NavLink}
                            key={e.key}
                            to={`${e.basename}/${e.key}`}
                            target={e.target || ""}
                            activeClassName="Mui-selected"
                            sx={sx.menuItem}
                        >
                            {Icon && (
                                <ListItemIcon sx={sx.menuIcon}>
                                    <Icon />
                                </ListItemIcon>
                            )}

                            <ListItemText
                                sx={[sx.menuText, !sidebarOpen && sx.hide]}
                                primary={
                                    <TypographyTextSecondary variant="subtitle2">
                                        {t(`resources.${e.name}.${e.translateKey}`)}
                                    </TypographyTextSecondary>
                                }
                            />
                        </ListItem>
                    );

                    return cloneElement(listItem, {
                        isActive: (_match: match | null, { pathname }: Location) => {
                            const activePaths: string[] = e.activePaths || [e.key];
                            return activePaths.indexOf(pathname.split("/")[2]) > -1;
                        },
                    });
                })}
            </List>
        </>
    );
};

export default Menu;
