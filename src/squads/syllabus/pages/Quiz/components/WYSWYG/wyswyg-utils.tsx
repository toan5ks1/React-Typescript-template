import { ElementType } from "react";

import { ContentBlock, ContentState, EditorState, EntityInstance } from "draft-js";
import {
    addDraftBlock,
    addDraftInlineElement,
    removeBlock,
} from "src/squads/syllabus/common/utils/draft-js";

import { Callbacks } from "./wyswyg-types";

export enum CustomBlockTypes {
    INLINE_IMAGE = "INLINE_IMAGE",
    INLINE_MATHJAX = "INLINE_MATHJAX",
    INLINE_BLANK = "INLINE_BLANK",
    BLOCK_AUDIO = "BLOCK_AUDIO",
    BLOCK_IMAGE = "BLOCK_IMAGE",
    BLOCK_MATHJAX = "BLOCK_MATHJAX",
    LOADING_IMAGE = "LOADING_IMAGE",
}

export function findAtomicBlock(type: CustomBlockTypes, component: ElementType) {
    return (contentState: ContentState, blockProps: Callbacks, block: ContentBlock) => {
        if (block.getType() !== "atomic") return null;

        const entity = block.getEntityAt(0);
        if (!entity) return null;

        if (contentState.getEntity(entity).getType() === type) {
            return {
                component,
                editable: false,
                props: blockProps,
            };
        }
    };
}

export function findInlineStrategy(blockType: CustomBlockTypes) {
    return (
        block: ContentBlock,
        callback: (start: number, end: number) => void,
        contentState: ContentState
    ) => {
        block.findEntityRanges((character) => {
            const entityKey = character.getEntity();

            return entityKey !== null && contentState.getEntity(entityKey).getType() === blockType;
        }, callback);
    };
}

const findEntity = (entity: EntityInstance, type: CustomBlockTypes): boolean => {
    return entity?.getType() === type && entity.getData();
};

export const getBlockKeysByEntityType = (
    editorState: EditorState,
    entityType: CustomBlockTypes
) => {
    const content = editorState.getCurrentContent();
    const blockKeys: string[] = [];
    content.getBlocksAsArray().forEach((block) => {
        let selectedBlockKey: string = "";
        block.findEntityRanges(
            (character) => {
                if (character.getEntity() !== null) {
                    const entityKey = character.getEntity();
                    const entity = content.getEntity(entityKey);
                    if (findEntity(entity, entityType)) {
                        selectedBlockKey = block.getKey();
                        return true;
                    }
                }
                return false;
            },
            () => {
                if (selectedBlockKey) {
                    blockKeys.push(selectedBlockKey);
                }
            }
        );
    });
    return blockKeys;
};

export const removeAllEntityByEntityType = (
    editorState: EditorState,
    entityType: CustomBlockTypes
) => {
    const blockKeys: string[] = getBlockKeysByEntityType(editorState, entityType);
    let newState = editorState;
    if (blockKeys && blockKeys.length > 0) {
        blockKeys.forEach((blockKey) => {
            newState = removeBlock(newState, blockKey);
        });
        return newState;
    }
    return editorState;
};

export const removeAllLoadingImage = (editorState: EditorState) => {
    return removeAllEntityByEntityType(editorState, CustomBlockTypes.LOADING_IMAGE);
};

export const addImageBlock = addDraftBlock(CustomBlockTypes.BLOCK_IMAGE);
export const addMathJaxBlock = addDraftBlock(CustomBlockTypes.BLOCK_MATHJAX);
export const addInlineImage = addDraftInlineElement(CustomBlockTypes.INLINE_IMAGE);
export const addInlineMathJax = addDraftInlineElement(CustomBlockTypes.INLINE_MATHJAX);
