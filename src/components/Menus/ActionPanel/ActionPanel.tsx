import { cloneElement, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { MutationMenus } from "src/common/constants/enum";

import { Box, Button, MenuItem, Popover } from "@mui/material";
import DialogWithHeaderFooter from "src/components/Dialogs/DialogWithHeaderFooter";
import IconButtonWithAnchorMenu from "src/components/IconButton/IconButtonWithAnchorMenu";
import TypographyTextSecondary from "src/components/Typographys/TypographyTextSecondary";

import { getActionProps as getActionPropsDefault } from "./helpers";
import { Action, ActionPanelProps, WrapperActionPanelProps } from "./types";

import isFunction from "lodash/isFunction";
import useActionMenu from "src/hooks/useActionMenu";
import useDialog from "src/hooks/useDialog";
import useTranslate from "src/hooks/useTranslate";

const sx = {
    menuItem: {
        minWidth: "100px",
        width: "100%",
    },
    text: {
        textTransform: "capitalize",
    },
};

export const WrapperActionPanel = (props: WrapperActionPanelProps) => {
    const {
        actions = [],
        loading,
        disables,
        onAction,
        onClose,
        open,
        anchorEl,
        menuProps = {},
        recordName,
        resource,
        suffixDeleteTitle,
        getActionProps,
    } = props;

    //TODO: refactor useTranslate for flexible to use useTranslate for all squads
    const t = useTranslate();
    const onClick = useCallback(
        (action: MutationMenus) => {
            onAction(action);
            onClose();
        },
        [onAction, onClose]
    );
    const { open: dialogOpen, onOpen: onDialogOpen, onClose: onDialogClose } = useDialog(false);
    const [currentAction, setCurrentAction] = useState<MutationMenus>();

    const suffixDeleteTitleDialog = useMemo(() => {
        if (suffixDeleteTitle) return suffixDeleteTitle;
        return resource ? t(`resources.${resource}.name`) : 1;
    }, [resource, suffixDeleteTitle, t]);

    return (
        <>
            <Popover
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                style={{ marginTop: "8px" }}
                keepMounted
                open={open}
                onClose={onClose}
                data-testid={open ? "ActionPanel__popover--open" : "ActionPanel__popover"}
                {...menuProps}
            >
                <Box p="8px 0" data-testid="ActionPanel__menuList">
                    {actions.map((action: Action) => {
                        const actionProps =
                            typeof getActionProps === "function"
                                ? getActionProps(action)
                                : getActionPropsDefault(action);
                        const {
                            actionType,
                            labelOptions,
                            onClick: onActionClick,
                            render,
                            label = "",
                            withConfirm,
                        } = actionProps;

                        const translatedLabel = t(label, labelOptions);
                        const iLoading = loading || (disables ? disables[actionType] : false);

                        let handleMenuItemClick = () => onClick(actionType);
                        let menuItemProps = {
                            "data-value": actionType,
                            component: Button,
                            sx: sx.menuItem,
                            variant: "text",
                            "aria-label": translatedLabel,
                            disabled: iLoading,
                            onClick: handleMenuItemClick,
                        };
                        let menuItem = (
                            <MenuItem key={actionType} {...menuItemProps}>
                                <Box component="span" sx={sx.text}>
                                    {translatedLabel}
                                </Box>
                            </MenuItem>
                        );

                        if (render) {
                            handleMenuItemClick = () => {
                                onActionClick && onActionClick();
                            };

                            return cloneElement(
                                menuItem,
                                { onClick: handleMenuItemClick },
                                render(translatedLabel, () => onClick(actionType))
                            );
                        }

                        if (withConfirm) {
                            return cloneElement(menuItem, {
                                onClick: () => {
                                    setCurrentAction(actionType);
                                    onDialogOpen();
                                },
                            });
                        }

                        return menuItem;
                    })}
                </Box>
            </Popover>
            <DialogWithHeaderFooter
                open={dialogOpen}
                title={t("ra.common.deleteDialogTitle", {
                    smart_count: suffixDeleteTitleDialog,
                })}
                textSave={t("ra.common.action.confirm")}
                onClose={onDialogClose}
                onSave={() => onClick(currentAction!)}
                footerConfirmButtonProps={{
                    color: "error",
                }}
            >
                <TypographyTextSecondary variant="body2">
                    {t("ra.common.deleteConfirmText", { smart_count: 1 })}&nbsp;
                    <strong>{recordName}</strong>&nbsp;
                    {t("ra.common.deleteConfirmText", { smart_count: 2 })}
                </TypographyTextSecondary>
            </DialogWithHeaderFooter>
        </>
    );
};

const ActionPanel = (props: ActionPanelProps) => {
    const { className, style, record, onAction, buttonStyle, loading, disabled, getActionProps } =
        props;
    const { open, onOpen, onClose } = useActionMenu();

    const anchorRef = useRef<HTMLDivElement>(null);
    const prevOpen = useRef(open);

    useEffect(() => {
        if (prevOpen.current && !open && anchorRef.current) {
            anchorRef.current.focus();
        }

        prevOpen.current = open;
    }, [open]);

    const _onAction = useCallback(
        (actionName) => {
            return isFunction(onAction) ? onAction(actionName, record) : undefined;
        },
        [onAction, record]
    );

    return (
        <Box display="flex" className={className} style={style} data-testid="ActionPanel__root">
            <IconButtonWithAnchorMenu
                ref={anchorRef}
                aria-haspopup="menu"
                sx={{ width: "40px", height: "40px" }}
                onClick={onOpen}
                data-testid="ActionPanel__trigger"
                variant={buttonStyle}
                loading={loading}
                disabled={disabled}
            />
            {open && (
                <WrapperActionPanel
                    {...props}
                    open={open}
                    anchorEl={anchorRef.current}
                    onClose={onClose}
                    onAction={_onAction}
                    getActionProps={getActionProps}
                />
            )}
        </Box>
    );
};

ActionPanel.defaultProps = {
    actions: [],
    loading: false,
    disables: {},
};

export default ActionPanel;
