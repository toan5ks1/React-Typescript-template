import { ReactNode, cloneElement, Children, isValidElement } from "react";

import { ExpandLess as ExpandLessIcon, ExpandMore as ExpandMoreIcon } from "@mui/icons-material";
import {
    Popper,
    Grow,
    ClickAwayListener,
    MenuList,
    MenuItem,
    Button,
    Paper,
    Theme,
} from "@mui/material";

import useActionMenu from "src/hooks/useActionMenu";

const sx = {
    btnRoot: {
        justifyContent: "flex-start",
        paddingLeft: "16px !important",
        paddingRight: "16px !important",
    },
    iconColor: (theme: Theme) => ({
        color: theme.palette.text.light,
    }),
    menuList: {
        paddingRight: "0px !important",
        width: "100% !important",
    },
    listItemRoot: {
        justifyContent: "flex-start",
        width: "100%",
        padding: "4px 4px",
    },
};

export interface MenuComponentProps {
    label?: string;
    id?: string;
    className?: string;
    children?: ReactNode;
    propsChild?: any;
    iconAction?: ReactNode;
    actionButtonProps?: any;
    actionMenuProps?: any;
}

const MenuComponent = ({
    label,
    children,
    propsChild = {},
    actionButtonProps = {},
    actionMenuProps = {},
    iconAction,
    id = "menu-list-grow",
}: MenuComponentProps) => {
    const { anchorEl, open, onClose, onOpen } = useActionMenu();

    return (
        <>
            {iconAction ? (
                isValidElement(iconAction) &&
                cloneElement(iconAction, {
                    ...iconAction.props,
                    onClick: iconAction.props.onClick ? iconAction.props.onClick : onOpen,
                })
            ) : (
                <Button
                    data-testid="MenuComponent__controlButton"
                    {...actionButtonProps}
                    color="primary"
                    aria-haspopup="true"
                    aria-controls={open ? id : undefined}
                    sx={sx.btnRoot}
                    onClick={onOpen}
                >
                    {label}
                    {open ? (
                        <ExpandLessIcon
                            data-testid="MenuComponent__expandLessIcon"
                            sx={sx.iconColor}
                        />
                    ) : (
                        <ExpandMoreIcon
                            data-testid="MenuComponent__expandMoreIcon"
                            sx={sx.iconColor}
                        />
                    )}
                </Button>
            )}

            <Popper
                data-testid="MenuComponent__popper"
                style={{ zIndex: 99 }}
                {...actionMenuProps}
                open={open}
                anchorEl={anchorEl}
                role="popper"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin:
                                placement === "bottom" ? "center top" : "center bottom",
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={onClose}>
                                <MenuList
                                    sx={sx.menuList}
                                    autoFocusItem={open}
                                    id={id}
                                    onKeyDown={onClose}
                                >
                                    {Children.map(children, (child) => {
                                        if (isValidElement(child)) {
                                            const {
                                                onClick,
                                                disabled = false,
                                                ...remainProps
                                            } = child.props;
                                            return (
                                                <MenuItem
                                                    sx={sx.listItemRoot}
                                                    disabled={disabled}
                                                    onClick={() => {
                                                        onClick && onClick();
                                                        onClose();
                                                    }}
                                                >
                                                    {isValidElement(child) &&
                                                        cloneElement(child, {
                                                            onClick,
                                                            ...propsChild,
                                                            ...remainProps,
                                                        })}
                                                </MenuItem>
                                            );
                                        }
                                    })}
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </>
    );
};

MenuComponent.defaultProps = {
    label: "Action",
    propsChild: {},
};

export default MenuComponent;
