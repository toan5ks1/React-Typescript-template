import { ReactNode } from "react";

import { ContentState, EditorState } from "draft-js";
import { StandardProps } from "src/typings/react-component";

import { ToolbarType } from "../EditorToolbar/toolbar-types";
import { Controls } from "../wyswyg-types";

type EditorClassType = {
    wrapperDraft?: string;
};

export interface InlineDecoratorProps {
    readOnly: boolean;
    onStartEdit: (key: string) => void;
    onEndEdit: (key: string) => void;
    onInlineUpdate: (entityKey: string, data: any) => void;
}

export interface InlinePluginProps extends InlineDecoratorProps {
    offsetKey: string;
    children: ReactNode;
    contentState: ContentState;
    entityKey: string;
}

export interface EditorProps extends StandardProps {
    editorState: EditorState;
    readOnly?: boolean;
    displayOnly?: boolean;
    noStyle?: boolean;
    placeholder?: string;
    toolbar?: Controls[] | ToolbarType;
    actions?: ReactNode | ReactNode[];
    onChange?: (state: EditorState) => void;
    error?: boolean;
    editorClassName?: EditorClassType;
    canPasteFile?: boolean;
}
