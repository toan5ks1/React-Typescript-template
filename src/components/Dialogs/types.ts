import { ReactElement, ReactNode } from "react";

import { UseFormMethods } from "src/typings/react-hook-form";

import { Breakpoint } from "@mui/material";
import { ButtonBaseProps } from "src/components/Buttons/ButtonBase";

import { WrapperPageContentProps } from "../Wrappers/WrapperPageContent";
import { DialogBaseProps } from "./DialogBase";

export type DialogFooterType = ReactElement | "portal" | "empty" | "default";
export interface DialogWithHeaderFooterProps extends DialogBaseProps {
    onEdit?: () => void;
    onDelete?: () => void;
    onClose: () => void;
    onSave?: () => void;
    onCloseClick?: () => void;
    maxWidthBox?: Breakpoint;
    minWidthBox?: Breakpoint;
    header?: ReactElement;
    footer?: DialogFooterType;
    textClose?: string;
    textSave?: string;
    footerConfirmButtonProps?: {
        variant?: ButtonBaseProps["variant"];
        color?: ButtonBaseProps["color"];
        disabled?: ButtonBaseProps["disabled"];
    };
    shouldDisableClosing?: boolean;
    shouldShowCancelButton?: boolean;
    additionalHeights?: number;
    shouldPressKey?: boolean;
}

export interface DialogFullScreenProps extends DialogBaseProps {
    onSave?: () => void;
    onClose: () => void;
    textClose?: string;
    textSave?: string;
    footerConfirmButtonProps?: {
        variant?: ButtonBaseProps["variant"];
        color?: ButtonBaseProps["color"];
        disabled?: ButtonBaseProps["disabled"];
    };
    footer?: ReactElement;
    title: string;
    isShowingBackdrop?: boolean;
    contentSize?: WrapperPageContentProps["variant"];
    dialogCancelConfirmProps?:
        | Pick<DialogCancelConfirmProps, "title" | "textCancelDialog" | "textSave">
        | boolean;
}

export type DialogFooterProps = Pick<
    DialogWithHeaderFooterProps | DialogFullScreenProps,
    "onClose" | "onSave" | "textClose" | "textSave" | "footerConfirmButtonProps"
>;

export interface DialogHeaderProps
    extends Pick<
        DialogWithHeaderFooterProps,
        "onClose" | "onDelete" | "onEdit" | "title" | "onCloseClick" | "shouldDisableClosing"
    > {
    children?: ReactNode;
    disableBottomPadding?: boolean;
}

export interface DialogCancelConfirmProps
    extends Pick<
        DialogWithHeaderFooterProps,
        | "onSave"
        | "title"
        | "onClose"
        | "open"
        | "textClose"
        | "textSave"
        | "footerConfirmButtonProps"
    > {
    textCancelDialog?: ReactNode;
}

export type DialogFooterConfirmProps = Pick<
    DialogWithHeaderFooterProps,
    | "onClose"
    | "onSave"
    | "textClose"
    | "textSave"
    | "footerConfirmButtonProps"
    | "shouldShowCancelButton"
>;

export type DialogFullScreenHeaderProps = Pick<DialogFullScreenProps, "onClose" | "title">;

export interface FooterButtonProps {
    variant?: ButtonBaseProps["variant"];
    color?: ButtonBaseProps["color"];
}

export interface DialogHFProps<T> extends DialogWithHeaderFooterProps, UseFormMethods<T> {}

export interface DialogFullScreenHFProps<T> extends DialogFullScreenProps, UseFormMethods<T> {}
