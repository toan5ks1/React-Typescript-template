import { useCallback, useMemo, useState } from "react";

import { Box } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";
import SpacingGroup from "src/components/Utilities/SpacingGroup";

import { BlockPluginProps } from "../wyswyg-types";
import { CustomBlockTypes, findAtomicBlock } from "../wyswyg-utils";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const BlockImage = ({ blockProps, block, contentState }: BlockPluginProps) => {
    const [editMode, setEditMode] = useState(false);

    const t = useTranslate();

    const onClick = useCallback(() => {
        if (editMode || blockProps.readOnly) return;
        setEditMode(true);

        blockProps.onStartEdit(block.getKey());
    }, [editMode, blockProps, block]);

    const onRemove = useCallback(() => {
        setEditMode(false);
        blockProps.onBlockRemove(block.getKey());
        blockProps.onEndEdit(block.getKey());
    }, [blockProps, block]);

    const onCancel = useCallback(() => {
        setEditMode(false);
        blockProps.onEndEdit(block.getKey());
    }, [blockProps, block]);

    const src = useMemo((): string => {
        return contentState.getEntity(block.getEntityAt(0)).getData()["data"];
    }, [contentState, block]);

    return (
        <Box sx={{ textAlign: "center" }}>
            <Box
                component="img"
                sx={{ width: "100%" }}
                src={src}
                alt="rich text inlined"
                onClick={onClick}
            />
            {editMode && (
                <SpacingGroup direction="horizontal" spacing={8}>
                    <ButtonBase color="default" onClick={onCancel}>
                        {t("ra.common.action.cancel")}
                    </ButtonBase>
                    <ButtonBase color="error" onClick={onRemove}>
                        {t("ra.common.action.remove")}
                    </ButtonBase>
                </SpacingGroup>
            )}
        </Box>
    );
};

export const blockRendererFn = findAtomicBlock(CustomBlockTypes.BLOCK_IMAGE, BlockImage);

export default BlockImage;
