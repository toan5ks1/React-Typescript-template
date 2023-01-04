import {
    ContentBlock,
    ContentState,
    convertFromRaw,
    EditorState,
    RawDraftContentState,
} from "draft-js";

import BlockAudio from "../BlockAudio";
import { Callbacks } from "../wyswyg-types";
import {
    CustomBlockTypes,
    findAtomicBlock,
    findInlineStrategy,
    getBlockKeysByEntityType,
    removeAllEntityByEntityType,
    removeAllLoadingImage,
} from "../wyswyg-utils";

const createContent = (
    entityType: string,
    text: string = " ",
    type: string = "atomic"
): { key: string; contentState: ContentState; block: ContentBlock } => {
    const key: string = "62u02";
    const rawDraftContentState: RawDraftContentState = {
        blocks: [
            {
                key,
                text,
                type,
                depth: 0,
                inlineStyleRanges: [],
                entityRanges: [
                    {
                        offset: 0,
                        length: 1,
                        key: 0,
                    },
                ],
                data: {},
            },
        ],
        entityMap: {
            0: {
                data: {
                    data: "https://example.com/sample.mp3",
                },
                mutability: "IMMUTABLE",
                type: entityType,
            },
        },
    };
    const contentState = convertFromRaw(rawDraftContentState);

    return {
        key,
        contentState,
        block: contentState.getBlockForKey(key),
    };
};

describe(findAtomicBlock.name, () => {
    const blockProps: Callbacks = {
        readOnly: false,
        onBlockRemove: jest.fn(),
        onBlockUpdate: jest.fn(),
        onEndEdit: jest.fn(),
        onStartEdit: jest.fn(),
    };

    it("should return null because it is not atomic block", () => {
        const { contentState, block } = createContent(
            CustomBlockTypes.BLOCK_AUDIO,
            " ",
            "not atomic"
        );

        const blockRendererFn = findAtomicBlock(CustomBlockTypes.BLOCK_AUDIO, BlockAudio);

        expect(blockRendererFn(contentState, blockProps, block)).toEqual(null);
    });

    it("should return null because it has no entity", () => {
        const { block, contentState } = createContent(CustomBlockTypes.BLOCK_AUDIO, "");

        const blockRendererFn = findAtomicBlock(CustomBlockTypes.BLOCK_AUDIO, BlockAudio);

        expect(blockRendererFn(contentState, blockProps, block)).toEqual(null);
    });

    it("should return correct result", () => {
        const { block, contentState } = createContent(CustomBlockTypes.BLOCK_AUDIO);

        const blockRenderFn = findAtomicBlock(CustomBlockTypes.BLOCK_AUDIO, BlockAudio);

        expect(blockRenderFn(contentState, blockProps, block)).toEqual({
            component: BlockAudio,
            editable: false,
            props: blockProps,
        });
    });
});

describe(findInlineStrategy.name, () => {
    it("should trigger callback function", () => {
        const callback = jest.fn();
        const { block, contentState } = createContent(CustomBlockTypes.BLOCK_AUDIO);
        const inlineStrategy = findInlineStrategy(CustomBlockTypes.BLOCK_AUDIO);

        inlineStrategy(block, callback, contentState);

        expect(callback).toBeCalled();
    });

    it("should not trigger callback function", () => {
        const callback = jest.fn();
        const { block, contentState } = createContent(CustomBlockTypes.BLOCK_IMAGE);
        const inlineStrategy = findInlineStrategy(CustomBlockTypes.BLOCK_AUDIO);

        inlineStrategy(block, callback, contentState);

        expect(callback).not.toBeCalled();
    });
});

describe(getBlockKeysByEntityType.name, () => {
    it("should return the correct block key", () => {
        const { key, contentState } = createContent(CustomBlockTypes.BLOCK_AUDIO);
        const editorState = EditorState.createWithContent(contentState);

        expect(getBlockKeysByEntityType(editorState, CustomBlockTypes.BLOCK_AUDIO)).toEqual([key]);
    });

    it("should return no block key", () => {
        const { contentState } = createContent(CustomBlockTypes.BLOCK_AUDIO, "");
        const editorState = EditorState.createWithContent(contentState);

        expect(getBlockKeysByEntityType(editorState, CustomBlockTypes.BLOCK_AUDIO)).toEqual([]);
    });
});

describe(removeAllEntityByEntityType.name, () => {
    it("should remove all entities", () => {
        const { contentState } = createContent(CustomBlockTypes.BLOCK_AUDIO);
        const editorState = EditorState.createWithContent(contentState);

        const newEditorState = removeAllEntityByEntityType(
            editorState,
            CustomBlockTypes.BLOCK_AUDIO
        );

        expect(getBlockKeysByEntityType(newEditorState, CustomBlockTypes.BLOCK_AUDIO)).toEqual([]);
    });
});

describe(removeAllLoadingImage.name, () => {
    it("should remove all loading image entities", () => {
        const { contentState } = createContent(CustomBlockTypes.LOADING_IMAGE);
        const editorState = EditorState.createWithContent(contentState);

        const newEditorState = removeAllLoadingImage(editorState);

        expect(getBlockKeysByEntityType(newEditorState, CustomBlockTypes.LOADING_IMAGE)).toEqual(
            []
        );
    });
});
