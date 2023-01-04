import { ReactElement, ReactNode } from "react";

import { MutationMenus } from "src/common/constants/enum";
import { TypeEntity } from "src/typings/react-admin";

import { MenuProps } from "@mui/material";
import { IconButtonWithAnchorMenuProps } from "src/components/IconButton/IconButtonWithAnchorMenu";

export interface CustomAction<T = MutationMenus> {
    action: T;
    Icon?: ReactElement;
    label?: string;
    withConfirm?: boolean;
    className?: string;
    disabled?: boolean;
    labelOptions?: object;
    onClick?: () => void;
    render?: (label: string, onAction: () => void) => ReactNode;
}

export type Action<T = MutationMenus> = MutationMenus | CustomAction<T>;

export interface GetActionPropsReturn<T = MutationMenus>
    extends Omit<CustomAction<T>, "action" | "Icon"> {
    actionType: T;
}

export interface ActionPanelProps<T extends any = any, TAction = MutationMenus>
    extends Omit<MenuProps, "onClick" | "open"> {
    size?: "inherit" | "default" | "small" | "large";
    record?: T;
    loading?: boolean;
    disables?: {
        [x: string]: boolean;
    };
    disabled?: boolean;
    onAction?: (...args: any[]) => void;
    recordName: ReactNode;
    actions?: Action<TAction>[];
    resource?: TypeEntity | string;
    buttonStyle?: IconButtonWithAnchorMenuProps["variant"];
    suffixDeleteTitle?: string;
    getActionProps?: (action: Action<TAction>) => GetActionPropsReturn<TAction>;
}

export interface WrapperActionPanelProps<T extends any = any, TAction = MutationMenus>
    extends Omit<ActionPanelProps<T, TAction>, "onClick"> {
    open: boolean;
    anchorEl: HTMLElement | null;
    onClose: () => void;
    onAction: (e: string) => void;
    menuProps?: MenuProps;
    onClick?: () => void;
}
