import { ReactNode } from "react";

import { EditorState } from "draft-js";
import map from "lodash/map";

import { Box, Theme } from "@mui/material";

import { BlockStyleControls, InlineStyleControls } from "./Controls";
import { Controls, ToolbarType } from "./toolbar-types";

import isEmpty from "lodash/isEmpty";

const sx = {
    root: (theme: Theme) => ({
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: theme.spacing(1, 2),
        background: "#FAFAFA",
        alignItems: "center",
        fontSize: 14,
        marginBottom: "5px",
        userSelect: "none",
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        "& > *": {
            flexShrink: 0,
        },
    }),
    controls: {
        display: "flex",
        justifyContent: "flex-start",
        flex: "1 1",
        height: "28px",
    },
};

const toolChooser = {
    [Controls.INLINE]: InlineStyleControls,
    [Controls.BLOCK]: BlockStyleControls,
};

type ControlsType = Controls[] | ToolbarType;

export interface EditorToolbarProps {
    editorState: EditorState;
    children?: ReactNode;
    controls?: ControlsType;
    onChange: (newEditorState: EditorState) => void;
}

const EditorToolbar = ({ editorState, children, controls = [], onChange }: EditorToolbarProps) => {
    if (isEmpty(controls)) return null;

    const renderControlsByType = (controls: Controls[]) => {
        return map(controls, (control) => {
            const ControlComponent = toolChooser[control];

            return !!ControlComponent ? (
                <ControlComponent key={control} editorState={editorState} onChange={onChange} />
            ) : null;
        });
    };

    const renderControlsManual = (controls: ToolbarType) => {
        return (Object.keys(controls) as (keyof ToolbarType)[]).map((key) => {
            if (key === Controls.INLINE) {
                return (
                    <InlineStyleControls
                        key={key}
                        manualControl={controls[key]}
                        editorState={editorState}
                        onChange={onChange}
                    />
                );
            } else {
                return (
                    <BlockStyleControls
                        key={key}
                        manualControl={controls[key]}
                        editorState={editorState}
                        onChange={onChange}
                    />
                );
            }
        });
    };

    return (
        <Box sx={sx.root} data-testid="EditorToolbar__root">
            <Box sx={sx.controls}>
                {Array.isArray(controls)
                    ? renderControlsByType(controls)
                    : renderControlsManual(controls)}
            </Box>
            <div>{children}</div>
        </Box>
    );
};

export default EditorToolbar;
