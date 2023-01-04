import { KeyboardEvent, SyntheticEvent, useCallback, useState } from "react";

import { EditorState, RichUtils } from "draft-js";
import { ERPModules } from "src/common/constants/enum";
import { isValidUrl } from "src/common/utils/draft-js";
import sanitizer from "src/internals/sanitizer";

import { InsertLink } from "@mui/icons-material";
import { Box } from "@mui/material";
import ButtonPrimaryContained from "src/components/Buttons/ButtonPrimaryContained";
import PopoverBase from "src/components/Popovers/PopoverBase";
import TextFieldBase from "src/components/TextFields/TextFieldBase";

import ControlButton from "./ControlButton";
import { InlineControlProps, OmitCreateProps } from "./control-types";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";

const prefixUrl = "http://";
const prefixSSLUrl = "https://";

const addPrefixUrl = (url: string) => {
    if (url.startsWith(prefixUrl) || url.startsWith(prefixSSLUrl)) {
        return url;
    }
    return sanitizer.forURL(prefixUrl + url);
};

export const getSelectedText = (editorState: EditorState) => {
    const selectionState = editorState.getSelection();
    const anchorKey = selectionState.getAnchorKey();

    const currentContent = editorState.getCurrentContent();
    const currentContentBlock = currentContent.getBlockForKey(anchorKey);

    const start = selectionState.getStartOffset();
    const end = selectionState.getEndOffset();
    const selectedText = currentContentBlock.getText().slice(start, end);

    return selectedText;
};

const InlineLink = (props: OmitCreateProps<InlineControlProps>) => {
    const { editorState, onChange } = props;
    const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
    const [inputValue, setInputValue] = useState("");

    const confirmLink = useCallback(
        (e?: SyntheticEvent<HTMLButtonElement>, url?: string) => {
            e?.preventDefault();

            const contentState = editorState.getCurrentContent();
            const contentStateWithEntity = contentState.createEntity("LINK", "MUTABLE", {
                url: sanitizer.forURL(url || addPrefixUrl(inputValue)),
            });

            const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
            const newEditorState = EditorState.set(editorState, {
                currentContent: contentStateWithEntity,
            });

            onChange(
                RichUtils.toggleLink(newEditorState, newEditorState.getSelection(), entityKey)
            );

            setInputValue(addPrefixUrl(inputValue));
            handleClose();
        },
        [editorState, inputValue, onChange]
    );

    const promptForLink = (e: SyntheticEvent<HTMLButtonElement>) => {
        let selectedText = getSelectedText(editorState);

        if (isValidUrl(selectedText)) {
            let validatedLink = addPrefixUrl(selectedText);
            setInputValue(validatedLink);
            confirmLink(undefined, validatedLink);
            return;
        }

        e.preventDefault();
        const selection = editorState.getSelection();

        if (!selection.isCollapsed()) {
            // Auto fill link url if user select on url
            const contentState = editorState.getCurrentContent();
            const startKey = editorState.getSelection().getStartKey();
            const startOffset = editorState.getSelection().getStartOffset();

            const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
            const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);

            let url = "";
            if (linkKey) {
                const linkInstance = contentState.getEntity(linkKey);
                url = linkInstance.getData().url;
            }
            setInputValue(url);
            setAnchorEl(e.currentTarget);
        }
    };

    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleEnterKey = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && inputValue.length) {
            confirmLink();
        }
    };

    return (
        <Box>
            <ControlButton
                tooltip={tNotification("insertLink")}
                onClick={promptForLink}
                active={false}
            >
                <InsertLink />
            </ControlButton>
            <PopoverBase
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
            >
                <Box display="flex" p={2} width={400}>
                    <TextFieldBase
                        data-testid="Editor__inputInlineLink"
                        variant="outlined"
                        label="Insert Link"
                        size="small"
                        autoFocus
                        fullWidth={true}
                        value={inputValue}
                        onChange={(e) => {
                            setInputValue(e.target.value);
                        }}
                        onKeyPress={handleEnterKey}
                        inputProps={{ style: { fontSize: 12 } }}
                    />
                    <ButtonPrimaryContained
                        data-testid="Editor__buttonAddInlineLink"
                        style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
                        onClick={confirmLink}
                    >
                        {tNotification("button.addInlineLink")}
                    </ButtonPrimaryContained>
                </Box>
            </PopoverBase>
        </Box>
    );
};

export default InlineLink;
