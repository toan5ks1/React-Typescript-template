import { SyntheticEvent, useCallback } from "react";

import { DraftBlockType, RichUtils } from "draft-js";

import BlockOrderList from "./BlockOrderList";
import BlockUnOrderList from "./BlockUnOrderList";
import { BlockControlGroupProps } from "./control-types";

const DEFAULT_BLOCK_TYPES = [BlockOrderList, BlockUnOrderList];
const BlockStyleControls = (props: BlockControlGroupProps) => {
    const { editorState, onChange, manualControl } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    const toggleBlockType = useCallback(
        (_e: SyntheticEvent, blockType: DraftBlockType) => {
            onChange(RichUtils.toggleBlockType(editorState, blockType));
        },
        [editorState, onChange]
    );
    return (
        <>
            {(manualControl || DEFAULT_BLOCK_TYPES).map((Control, index) => {
                return <Control key={index} onClick={toggleBlockType} blockType={blockType} />;
            })}
        </>
    );
};

export default BlockStyleControls;
