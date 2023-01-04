import {
    Children,
    cloneElement,
    isValidElement,
    ReactNode,
    SyntheticEvent,
    useEffect,
} from "react";

import {
    EditLocationOutlined as EditLocationOutlinedIcon,
    ExitToApp as ExitToAppIcon,
} from "@mui/icons-material";
import {
    Popper,
    Grow,
    ClickAwayListener,
    IconButton,
    MenuItem,
    MenuList,
    Paper,
    Theme,
} from "@mui/material";
import { styled } from "@mui/material/styles";

import useActionMenu from "src/hooks/useActionMenu";
import useTranslate from "src/hooks/useTranslate";

const StyledPaper = styled(Paper)(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        minWidth: theme.spacing(20),
    },
}));
StyledPaper.displayName = "StyledPaper";

const sx = {
    iconInProfileMenu: (theme: Theme) => ({
        padding: theme.spacing(1 / 2),
        marginRight: theme.spacing(1),
    }),
    menuItem: (theme: Theme) => ({
        color: theme.palette.text.primary,
    }),
};

export interface UserMenuProps {
    children: ReactNode;
    onLogout: () => void;
    onOpenLocationSetting: undefined | Function;
    onOpenCallBack: (isOpen: boolean) => void;
}

const UserMenu = (props: UserMenuProps) => {
    const { onLogout, onOpenCallBack, onOpenLocationSetting } = props;
    const { anchorEl, open, onClose, onOpen } = useActionMenu();

    const t = useTranslate();

    const children = Children.only(props.children);

    useEffect(() => {
        onOpenCallBack(open);
    }, [onOpenCallBack, open]);

    if (!isValidElement(children)) {
        window.warner?.error("UserMenu can only receive 1 children");
        return null;
    }

    return (
        <div>
            {cloneElement(children, {
                onClick: (e: SyntheticEvent<HTMLElement, Event>) => {
                    onOpen(e);
                },
            })}
            <Popper
                data-testid="UserMenu__popper"
                open={open}
                anchorEl={anchorEl}
                placement="bottom-end"
                transition
                disablePortal
            >
                {({ TransitionProps, placement }) => {
                    return (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === "bottom" ? "right bottom" : "right top",
                            }}
                        >
                            <StyledPaper>
                                <ClickAwayListener onClickAway={onClose}>
                                    <MenuList autoFocusItem={open} onKeyDown={onClose}>
                                        {onOpenLocationSetting && (
                                            <MenuItem
                                                data-testid="UserMenu__setting"
                                                sx={sx.menuItem}
                                                onClick={() => onOpenLocationSetting()}
                                            >
                                                <IconButton sx={sx.iconInProfileMenu}>
                                                    <EditLocationOutlinedIcon />
                                                </IconButton>
                                                {t("ra.auth.locationSetting.title")}
                                            </MenuItem>
                                        )}
                                        <MenuItem
                                            data-testid="UserMenu__logout"
                                            sx={sx.menuItem}
                                            onClick={() => {
                                                onClose();
                                                onLogout();
                                            }}
                                        >
                                            <IconButton sx={sx.iconInProfileMenu}>
                                                <ExitToAppIcon />
                                            </IconButton>
                                            {t("ra.auth.logout")}
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </StyledPaper>
                        </Grow>
                    );
                }}
            </Popper>
        </div>
    );
};

export default UserMenu;
