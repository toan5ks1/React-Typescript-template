import { useCallback, useRef, useState } from "react";

import { Box, Button, Card, Theme } from "@mui/material";
import Popper from "src/squads/syllabus/components/Popper";

import useEditMathjax from "../useEditMathjax";
import { BlockPluginProps } from "../wyswyg-types";
import { CustomBlockTypes, findAtomicBlock } from "../wyswyg-utils";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const sx = {
    value: {
        display: "flex",
        justifyContent: "center",
    },
    editPopper: {
        position: "relative",
    },
    editWrapper: {
        display: "flex",
        flexDirection: "column",
        background: "white",
        padding: 12,
        zIndex: 2, //editor has a default zIndex of 1, we need editContent to have a higher zIndex
    },
    textArea: (theme: Theme) => ({
        padding: theme.spacing(1),
    }),
    btn: (theme: Theme) => ({
        margin: theme.spacing(1),
    }),
    btnWrapper: {
        display: "flex",
        justifyContent: "flex-end",
    },
};

const BlockMathJax = ({ blockProps, block, contentState }: BlockPluginProps) => {
    const getData = useCallback((): string => {
        return contentState.getEntity(block.getEntityAt(0)).getData()["data"];
    }, [contentState, block]);
    const inputElem = useRef<HTMLTextAreaElement>(null);
    const [editMode, setEditMode] = useState(false);
    const { nodeMathJax, hasError, value, onTexChange } = useEditMathjax(getData);
    const t = useTranslate();

    const onClick = useCallback(() => {
        if (editMode || blockProps.readOnly) return;

        requestAnimationFrame(() => {
            inputElem.current?.focus();
        });

        setEditMode(true);
        blockProps.onStartEdit(block.getKey());
    }, [editMode, blockProps, block, inputElem]);

    const onRemove = useCallback(() => {
        setEditMode(false);
        blockProps.onBlockRemove(block.getKey());
        blockProps.onEndEdit(block.getKey());
    }, [blockProps, block]);

    const onDone = useCallback(() => {
        setEditMode(false);
        blockProps.onBlockUpdate(block.getKey(), { data: value });
        blockProps.onEndEdit(block.getKey());
    }, [blockProps, block, value]);

    const onClickAway = useCallback(() => {
        if (hasError) return;

        setEditMode(false);
        blockProps.onEndEdit(block.getKey());
    }, [hasError, blockProps, block]);

    return (
        <div>
            <Box sx={sx.value} ref={nodeMathJax} onClick={onClick} />
            <Popper open={editMode} anchorEl={nodeMathJax.current} onClose={onClickAway}>
                <Card sx={sx.editWrapper}>
                    <Box
                        component="textarea"
                        sx={sx.textArea}
                        ref={inputElem}
                        value={value}
                        onChange={onTexChange}
                    />
                    <Box sx={sx.btnWrapper}>
                        <Button sx={sx.btn} color="default" variant="outlined" onClick={onRemove}>
                            {t("ra.common.action.remove")}
                        </Button>
                        <Button
                            sx={sx.btn}
                            disabled={hasError}
                            variant="contained"
                            color="primary"
                            onClick={onDone}
                        >
                            {t(`ra.common.${hasError ? "invalid" : "done"}`)}
                        </Button>
                    </Box>
                </Card>
            </Popper>
        </div>
    );
};

export const blockRendererFn = findAtomicBlock(CustomBlockTypes.BLOCK_MATHJAX, BlockMathJax);

export default BlockMathJax;
