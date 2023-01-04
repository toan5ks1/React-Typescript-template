import { ReactNode } from "react";

import { EditorState } from "draft-js";
import { isEmpty, map } from "lodash";

import { Box, Theme } from "@mui/material";

import { Controls } from "../wyswyg-types";
import { BlockStyleControls, InlineStyleControls, MediaTypeControls } from "./Controls";
import { ToolbarType } from "./toolbar-types";

const sx = {
    root: (theme: Theme) => ({
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        padding: theme.spacing(1, 2),
        background: theme.palette.grey[50],
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
    [Controls.ATOMIC]: MediaTypeControls,
};

type ControlsType = Controls[] | ToolbarType;

export interface ToolbarProps {
    editorState: EditorState;
    children?: ReactNode;
    controls?: ControlsType;
    onChange: (newEditorState: EditorState) => void;
}

const EditorToolbar = ({ editorState, children, controls = [], onChange }: ToolbarProps) => {
    if (isEmpty(controls)) return null;

    const renderControlsByType = (controlList: Controls[]) => {
        return map(controlList, (control) => {
            const ControlComponent = toolChooser[control];

            return !!ControlComponent ? (
                <ControlComponent key={control} editorState={editorState} onChange={onChange} />
            ) : null;
        });
    };

    const renderControlsManual = (controlList: ToolbarType) => {
        return (Object.keys(controlList) as (keyof ToolbarType)[]).map((key) => {
            if (key === Controls.ATOMIC) {
                return (
                    <MediaTypeControls
                        key={key}
                        manualControl={controlList[key]}
                        editorState={editorState}
                        onChange={onChange}
                    />
                );
            }
            if (key === Controls.INLINE) {
                return (
                    <InlineStyleControls
                        key={key}
                        manualControl={controlList[key]}
                        editorState={editorState}
                        onChange={onChange}
                    />
                );
            }
            if (key === Controls.BLOCK) {
                return (
                    <BlockStyleControls
                        key={key}
                        manualControl={controlList[key]}
                        editorState={editorState}
                        onChange={onChange}
                    />
                );
            }
        });
    };

    return (
        <Box sx={sx.root}>
            <Box sx={sx.controls}>
                {Array.isArray(controls)
                    ? renderControlsByType(controls)
                    : renderControlsManual(controls)}
            </Box>
            {children ? <Box>{children}</Box> : null}
        </Box>
    );
};

export default EditorToolbar;
