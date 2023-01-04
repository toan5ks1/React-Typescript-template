import { SyntheticEvent, useCallback } from "react";

import { DraftBlockType, RichUtils } from "draft-js";

import BlockFontSize from "./BlockFontSize";
import BlockUnOrderList from "./BlockUnOrderList";
import { BlockControlGroupProps } from "./control-types";

const DEFAULT_BLOCK_TYPES = [BlockFontSize, BlockUnOrderList];
const BlockStyleControls = (props: BlockControlGroupProps) => {
    const { editorState, onChange, manualControl } = props;
    const selection = editorState.getSelection();
    const blockType = editorState
        .getCurrentContent()
        .getBlockForKey(selection.getStartKey())
        .getType();

    const toggleBlockType = useCallback(
        (_e: SyntheticEvent, draftBlockType: DraftBlockType) => {
            onChange(RichUtils.toggleBlockType(editorState, draftBlockType));
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
