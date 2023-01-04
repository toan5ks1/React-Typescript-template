import { useRef, useState } from "react";

import clsx from "clsx";
import {
    CompositeDecorator,
    ContentBlock,
    DraftHandleValue,
    Editor as DraftEditor,
    EditorState,
    RichUtils,
} from "draft-js";
import { isEmpty } from "lodash";
import { pick1stElement } from "src/squads/syllabus/common/utils/array";
import {
    addDraftBlock,
    convertRawToState,
    createRawFromEditorState,
    removeBlock,
    updateBlock,
    updateInline,
} from "src/squads/syllabus/common/utils/draft-js";
import logger from "src/squads/syllabus/internals/logger";

import { Box } from "@mui/material";
import { styled } from "@mui/material/styles";

import { blockRendererFn as blockRendererFnAudio } from "../BlockAudio";
import { blockRendererFn as blockRendererFnImage } from "../BlockImage";
import { blockRendererFn as blockRendererFnMathJax } from "../BlockMathJax";
import Toolbar from "../EditorToolbar";
import { decorator as inlineBlankDecorator } from "../InlineBlank";
import { decorator as inlineImageDecorator } from "../InlineImage";
import { decorator as inlineMathJaxDecorator } from "../InlineMathJax";
import { decorator as loadingImageDecorator } from "../LoadingImage";
import { CustomBlockTypes, removeAllLoadingImage } from "../wyswyg-utils";
import { EditorProps } from "./types";

import "draft-js/dist/Draft.css";
import useUploadFiles from "src/squads/syllabus/hooks/useUploadFiles";
import { isImage, toBase64 } from "src/squads/syllabus/pages/QuizV2/common/file";

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
    [`&.${classes.root}`]: {
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
const _blockRenderFns = [blockRendererFnImage, blockRendererFnMathJax, blockRendererFnAudio];

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
    const [isPastingFile, setIsPastingFile] = useState<boolean>(false);
    const [liveEdits, setLiveEdits] = useState({});

    const editorElem = useRef<DraftEditor>(null);
    const { onUploadFilesAsync } = useUploadFiles();

    const onEditorBlockRemove = (blockKey: string) => {
        onChange(removeBlock(editorState, blockKey));
    };

    const onEditorBlockUpdate = (blockKey: string, data: any) => {
        onChange(updateBlock(editorState, blockKey, data));
    };

    const onEditorInlineUpdate = (entityKey: string, data: any) => {
        onChange(updateInline(editorState, entityKey, data));
    };

    const _onStartEdit = (blockKey: string) => {
        setLiveEdits((previousLiveEdits) => {
            return { ...previousLiveEdits, [blockKey]: true };
        });
    };

    const _onEndEdit = (blockKey: string) => {
        setLiveEdits((previousLiveEdits) => {
            let removed: any = {};
            for (const k in previousLiveEdits) {
                if (k !== blockKey) removed[k] = true;
            }

            return removed;
        });
    };

    const _readOnly = Object.keys(liveEdits).length > 0 || readOnly || displayOnly;

    const _blockRenderer = (block: ContentBlock) => {
        for (const blockRenderFn of _blockRenderFns) {
            const component = blockRenderFn(
                editorState.getCurrentContent(),
                {
                    readOnly: _readOnly,
                    onStartEdit: _onStartEdit,
                    onEndEdit: _onEndEdit,
                    onBlockRemove: onEditorBlockRemove,
                    onBlockUpdate: onEditorBlockUpdate,
                },
                block
            );

            if (component) return component;
        }

        return null;
    };

    const handleKeyCommand = (command: string, state: EditorState): DraftHandleValue => {
        const newState = RichUtils.handleKeyCommand(state, command);

        if (newState) {
            onChange(newState);
            return "handled";
        }

        return "not-handled";
    };

    const handlePastedFiles = (files: File[]): DraftHandleValue => {
        if (files && files.length > 0 && isImage({ type: files[0].type })) {
            (async () => {
                setIsPastingFile(true);
                const base64 = (await toBase64(files[0])) as string;
                const newState = addDraftBlock(CustomBlockTypes.LOADING_IMAGE)(editorState, base64);
                onChange(newState);
                try {
                    let urls: string[] = [];
                    const resp = await onUploadFilesAsync(files);
                    urls = resp.attachments.map((attach) => attach.resource);
                    const url = pick1stElement<string>(urls);
                    // get newest EditorState after wait for upload
                    const newestEditorState = editorElem.current?.props.editorState as EditorState;

                    const currentEditorState = removeAllLoadingImage(newestEditorState);
                    if (url) {
                        const newState = addDraftBlock(CustomBlockTypes.INLINE_IMAGE)(
                            currentEditorState,
                            url
                        );
                        if (newestEditorState.getSelection().getHasFocus()) {
                            // when cursor still in editor force cursor to where it was before
                            const selection = newestEditorState.getSelection();
                            onChange(EditorState.forceSelection(newState, selection));
                        } else {
                            // remove auto focus when cursor not in editor
                            const raw = createRawFromEditorState(newState);
                            const state = convertRawToState(JSON.stringify(raw)) as EditorState;
                            onChange(state);
                        }
                    } else {
                        onChange(currentEditorState);
                    }
                } catch (err) {
                    logger.warn("[Editor] handlePastedFiles", error);

                    const currentEditorState = removeAllLoadingImage(
                        // get newest EditorState after wait for upload
                        editorElem.current?.props.editorState as EditorState
                    );
                    onChange(currentEditorState);
                } finally {
                    setIsPastingFile(false);
                }
            })();
            return "handled";
        } else {
            return "not-handled";
        }
    };

    const decorated = EditorState.set(editorState, {
        decorator: new CompositeDecorator([
            inlineImageDecorator,
            inlineBlankDecorator,
            loadingImageDecorator,
            inlineMathJaxDecorator({
                readOnly: _readOnly,
                onStartEdit: _onStartEdit,
                onEndEdit: _onEndEdit,
                onInlineUpdate: onEditorInlineUpdate,
            }),
        ]),
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
            data-testid={rest["data-testid"]}
        >
            {shouldShowToolbar && (
                <Toolbar editorState={decorated} controls={toolbar} onChange={onChange}>
                    {actions}
                </Toolbar>
            )}
            <Box className={editorClassName?.wrapperDraft} data-testid="Editor__content">
                <DraftEditor
                    {...rest}
                    ref={editorElem}
                    editorState={decorated}
                    readOnly={_readOnly}
                    placeholder={placeholder}
                    blockRendererFn={_blockRenderer}
                    onChange={onChange}
                    handleKeyCommand={handleKeyCommand}
                    webDriverTestID="Editor__draftEditor"
                    handlePastedFiles={
                        canPasteFile && !isPastingFile ? handlePastedFiles : undefined
                    }
                />
            </Box>
        </Root>
    );
};

export default Editor;
