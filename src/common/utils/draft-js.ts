import {
    AtomicBlockUtils,
    ContentState,
    convertFromHTML,
    convertFromRaw,
    convertToRaw,
    EditorState,
    genKey,
    Modifier,
    RawDraftContentState,
    SelectionState,
} from "draft-js";

import { parseJSON } from "./json";

export const addDraftInlineElement =
    (entityType: string) =>
    (editorState: EditorState, data: string): EditorState => {
        const contentStateWithEntity = editorState
            .getCurrentContent()
            .createEntity(entityType, "IMMUTABLE", {
                data: data,
            });

        const contentStateWithInlineImage = Modifier.replaceText(
            contentStateWithEntity,
            editorState.getSelection(),
            " ",
            undefined,
            contentStateWithEntity.getLastCreatedEntityKey()
        );

        return EditorState.push(editorState, contentStateWithInlineImage, "apply-entity");
    };
export const addDraftBlock =
    (entityType: string) =>
    (editorState: EditorState, data: string): EditorState => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(entityType, "IMMUTABLE", {
            data,
        });
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
            EditorState.set(editorState, { currentContent: contentStateWithEntity }),
            entityKey,
            " "
        );

        return EditorState.forceSelection(
            newEditorState,
            newEditorState.getCurrentContent().getSelectionAfter()
        );
    };
export const removeBlock = (editorState: EditorState, blockKey: string) => {
    const content = editorState.getCurrentContent();
    const block = content.getBlockForKey(blockKey);

    if (block) {
        const targetRange = new SelectionState({
            anchorKey: blockKey,
            anchorOffset: 0,
            focusKey: blockKey,
            focusOffset: block.getLength(),
        });

        const contentAfterRemoving = Modifier.removeRange(content, targetRange, "backward");
        const contentAfterResetBlockType = Modifier.setBlockType(
            contentAfterRemoving,
            contentAfterRemoving.getSelectionAfter(),
            "unstyled"
        );

        const newEditorState: EditorState = EditorState.push(
            editorState,
            contentAfterResetBlockType,
            "remove-range"
        );
        return EditorState.forceSelection(
            newEditorState,
            contentAfterResetBlockType.getSelectionAfter()
        );
    }

    return editorState;
};
export const updateBlock = (editorState: EditorState, blockKey: string, data: any) => {
    const currentContent = editorState.getCurrentContent();
    const block = currentContent.getBlockForKey(blockKey);

    if (block) {
        const entityKey = block.getEntityAt(0);
        return EditorState.set(editorState, {
            currentContent: currentContent.mergeEntityData(entityKey, data),
        });
    }

    return editorState;
};
export const updateInline = (editorState: EditorState, entityKey: string, data: any) => {
    return EditorState.set(editorState, {
        currentContent: editorState.getCurrentContent().mergeEntityData(entityKey, data),
    });
};
export const replaceText = (editorState: EditorState, text: string): EditorState => {
    const contentState = Modifier.replaceText(
        editorState.getCurrentContent(),
        editorState.getSelection(),
        text,
        editorState.getCurrentInlineStyle(),
        undefined
    );

    const newEditorState = EditorState.push(editorState, contentState, "insert-characters");

    return EditorState.forceSelection(newEditorState, contentState.getSelectionAfter());
};
export const isEditorContentEmpty = (content: ContentState) => {
    return (
        content.getPlainText().trim() === "" &&
        content.getBlockMap().size === 1 &&
        content.getFirstBlock().getType() === "unstyled" &&
        !content.getFirstBlock().getEntityAt(0)
    );
};

export function convertFromHTMLToEditorState(html: string) {
    const blocksFromHTML = convertFromHTML(html);
    const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
    );

    return EditorState.createWithContent(state);
}

export function convertRawToState(str: string) {
    const parsed = parseJSON<any>(str);

    return parsed ? EditorState.createWithContent(convertFromRaw(parsed)) : null;
}

export const trimEditorContent = (currentEditorState: EditorState) => {
    const currentContent = currentEditorState.getCurrentContent();

    if (currentContent.getPlainText().trim() === "") return EditorState.createEmpty();

    const newContent = currentContent
        .getBlockMap()
        .reduce((accumulator = ContentState.createFromText(""), block) => {
            const key = block?.getKey() || "";
            const text = block?.getText() || "";
            const trimmedLeft = text.trimLeft();
            const trimmedRight = text.trimRight();
            const offset = text.length - trimmedLeft.length;

            const isMiddleBlocks =
                block !== currentContent.getFirstBlock() && block !== currentContent.getLastBlock();

            if (block?.getType() !== "unstyled" || isMiddleBlocks) {
                // No trimming
                return accumulator;
            }

            // Start trimming
            const textToReplaceLeft = new SelectionState({
                anchorKey: key,
                focusKey: key,
                anchorOffset: 0,
                focusOffset: offset,
            });

            const leftTrimmedContent = Modifier.replaceText(accumulator, textToReplaceLeft, "");

            const textToReplaceRight = new SelectionState({
                anchorKey: key,
                focusKey: key,
                anchorOffset: trimmedRight.length - offset,
                focusOffset: text.length - offset,
            });

            return Modifier.replaceText(leftTrimmedContent, textToReplaceRight, "");
        }, currentContent);

    return EditorState.push(currentEditorState, newContent, "remove-range");
};

export function isValidUrl(url: string) {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
}

export const createEditorStateFromText = (str: string): EditorState => {
    return EditorState.createWithContent(ContentState.createFromText(str));
};

export const createRawFromEditorState = (editorState: EditorState): RawDraftContentState => {
    return convertToRaw(editorState.getCurrentContent());
};

export const getPlainTextFromEditorState = (editorState: EditorState): string => {
    return editorState.getCurrentContent().getPlainText();
};

export const createSimpleHtmlStringFromEditorState = (
    editorState: EditorState,
    key?: string
): string => {
    const plainText = getPlainTextFromEditorState(editorState);
    return `<span data-key="${key || genKey()}">${plainText}</span>`;
};
