import { useEffect, useRef } from "react";

import { Menu, MenuItem, MenuItemProps } from "@mui/material";
import IconButtonWithAnchorMenu, {
    IconButtonWithAnchorMenuProps,
} from "src/components/IconButton/IconButtonWithAnchorMenu";

import useActionMenu from "src/hooks/useActionMenu";

interface MenuItemPanelProps {
    menuItems: MenuItemProps[];
    iconButtonVariant?: IconButtonWithAnchorMenuProps["variant"];
}

const MenuItemPanel = ({ menuItems, iconButtonVariant }: MenuItemPanelProps) => {
    const { open, onOpen, onClose } = useActionMenu();
    const anchorRef = useRef<HTMLDivElement>(null);
    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current && !open && anchorRef.current) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <>
            <IconButtonWithAnchorMenu
                ref={anchorRef}
                aria-haspopup="menu"
                sx={{ width: "40px", height: "40px" }}
                onClick={onOpen}
                data-testid="MenuItemPanel__trigger"
                variant={iconButtonVariant}
            />
            <Menu
                data-testid="MenuItemPanel__menuList"
                anchorEl={anchorRef.current}
                open={open}
                onClose={onClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                sx={{ marginTop: "8px" }}
            >
                {menuItems.map((menuItem) => (
                    <MenuItem key={menuItem.key} {...menuItem} />
                ))}
            </Menu>
        </>
    );
};

export default MenuItemPanel;
