import { SyntheticEvent } from "react";

import { EditorState } from "draft-js";

import { OverridableComponent } from "@mui/material/OverridableComponent";

export interface ControlGroupProps {
    editorState: EditorState;
    onChange: (e: EditorState) => void;
}

export interface ControlButtonProps {
    label: string;
    icon: OverridableComponent<any>;
    onClick: (e: SyntheticEvent<HTMLElement>, style: string, removedStyles?: string[]) => void;
}

export interface InlineControlProps extends ControlButtonProps {
    editorState: EditorState;
}

export interface BlockControlProps extends ControlButtonProps {
    blockType: string;
}

export interface MediaControlProps extends ControlButtonProps {
    accept: string;
}

export type InlineComponentType = (props: OmitCreateProps<InlineControlProps>) => JSX.Element;

export interface InlineControlGroupProps extends ControlGroupProps {
    manualControl?: InlineComponentType[];
}

export interface CreateControlProps {
    controlValue: string;
    label: string;
    icon: any;
}

export type OmitCreateProps<T> = Omit<T, keyof CreateControlProps>;
export type BlockComponentType = (props: OmitCreateProps<BlockControlProps>) => JSX.Element;

export interface BlockControlGroupProps extends ControlGroupProps {
    manualControl?: BlockComponentType[];
}

export interface MediaTypes {
    label: string;
    accept: string;
    icon: OverridableComponent<any>;
    craftFn: (state: EditorState, data: string) => EditorState;
}

export interface MediaControlGroupProps extends ControlGroupProps {
    manualControl?: MediaTypes[];
}
