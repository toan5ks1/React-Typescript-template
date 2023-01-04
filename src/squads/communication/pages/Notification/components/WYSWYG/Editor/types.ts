import { ReactNode } from "react";

import { EditorState } from "draft-js";
import { StandardProps } from "src/squads/communication/typings/react-component";

import {
    Controls,
    ToolbarType,
} from "src/squads/communication/pages/Notification/components/WYSWYG/EditorToolbar/toolbar-types";

type EditorClassType = {
    wrapperDraft?: string;
};

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
