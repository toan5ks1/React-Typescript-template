import { memo, useRef } from "react";

import clsx from "clsx";
import {
    CompositeDecorator,
    DraftHandleValue,
    Editor as DraftEditor,
    EditorState,
    RichUtils,
} from "draft-js";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { blockLinkDecorator } from "../BlockLink";
import Toolbar from "../EditorToolbar";
import { colorMap } from "../EditorToolbar/Controls/InlineColor";
import { EditorProps } from "./types";

import "draft-js/dist/Draft.css";
import isEmpty from "lodash/isEmpty";

const PREFIX = "Editor";

const classes = {
    root: `${PREFIX}-root`,
    bordered: `${PREFIX}-bordered`,
    error: `${PREFIX}-error`,
    displayOnly: `${PREFIX}-displayOnly`,
    minHeight: `${PREFIX}-minHeight`,
    hiddenPlaceholder: `${PREFIX}-hiddenPlaceholder`,
};

const Root = styled("div")(({ theme }) => ({
    borderRadius: theme.spacing(0.5),
    background: theme.palette.common.white,
    width: "100%",
    height: "100%",
    "& .DraftEditor-root": {
        height: "100% !important",
        padding: 8,
        "&:focus": {
            outline: "none",
        },
    },
    "& .DraftEditor-editorContainer": {
        height: "auto",
    },
    "& .public-DraftEditor-content": {
        whiteSpace: "normal",
        overflow: "auto",
        "&:focus": {
            outline: "none",
        },
    },
    "& .public-DraftEditorPlaceholder-root": {
        width: "unset !important",
        userSelect: "none",
        position: "absolute",
        pointerEvents: "none",
    },

    [`&.${classes.bordered}`]: {
        border: `1px solid rgba(0, 0, 0, 0.23)`,
    },

    [`&.${classes.error}`]: {
        border: `1px solid ${theme.palette.error.main}`,
    },

    [`&.${classes.displayOnly}`]: {
        border: "none",
        minHeight: "auto",
        "& > .DraftEditor-root": {
            padding: 0,
        },
        "& > .Draft-public": {
            padding: "8px 0 0 0",
        },
    },

    [`&.${classes.minHeight}`]: {
        "& .public-DraftEditor-content": {
            minHeight: theme.spacing(11),
        },
    },

    [`&.${classes.hiddenPlaceholder}`]: {
        "& .public-DraftEditorPlaceholder-root": {
            display: "none",
        },
    },
}));

const noop = () => {};

const shouldHiddenPlaceholderRTE = (editorState: EditorState): boolean => {
    const contentState = editorState.getCurrentContent();

    if (!contentState.hasText()) {
        if (contentState.getBlockMap().first().getType() !== "unstyled") {
            return true;
        }
    }

    return false;
};

const Editor = (props: EditorProps) => {
    const {
        editorState,
        onChange = noop,
        displayOnly = false,
        placeholder,
        readOnly = false,
        noStyle = false,
        actions,
        toolbar,
        error,
        editorClassName,
        canPasteFile,
        ...rest
    } = props;

    const editorElem = useRef<DraftEditor>(null);

    const handleKeyCommand = (command: string, editorState: EditorState): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(editorState, command);

        if (newState) {
            onChange(newState);
            return "handled";
        }

        return "not-handled";
    };

    const decorated = EditorState.set(editorState, {
        decorator: new CompositeDecorator([blockLinkDecorator]),
    });

    const shouldShowToolbar = !displayOnly && !isEmpty(toolbar);

    const hiddenPlaceholder = shouldHiddenPlaceholderRTE(editorState);

    return (
        <Root
            className={clsx({
                [classes.root]: true,
                [classes.bordered]: !noStyle,
                [classes.displayOnly]: displayOnly,
                [classes.minHeight]: !displayOnly,
                [classes.hiddenPlaceholder]: hiddenPlaceholder,
                [classes.error]: error,
                [props.className || ""]: true,
            })}
            style={props.style}
        >
            {shouldShowToolbar && (
                <Toolbar editorState={decorated} controls={toolbar} onChange={onChange}>
                    {actions}
                </Toolbar>
            )}
            <Box className={editorClassName?.wrapperDraft} data-testid="Editor__content">
                <DraftEditor
                    {...rest}
                    readOnly={readOnly}
                    ref={editorElem}
                    editorState={decorated}
                    placeholder={placeholder}
                    onChange={onChange}
                    handleKeyCommand={handleKeyCommand}
                    customStyleMap={colorMap}
                    webDriverTestID="Editor__draftEditor"
                />
            </Box>
        </Root>
    );
};

export default memo(Editor);
