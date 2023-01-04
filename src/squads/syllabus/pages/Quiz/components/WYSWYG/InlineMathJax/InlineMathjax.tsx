import { useCallback, useRef, useState } from "react";

import { Box, Card } from "@mui/material";
import ButtonBase from "src/components/Buttons/ButtonBase";
import Popper from "src/squads/syllabus/components/Popper";

import { InlineDecoratorProps, InlinePluginProps } from "../Editor/types";
import useEditMathjax from "../useEditMathjax";
import { CustomBlockTypes, findInlineStrategy } from "../wyswyg-utils";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

const inlineMathJaxStrategy = findInlineStrategy(CustomBlockTypes.INLINE_MATHJAX);

const sx = {
    textArea: { padding: "10px", width: "320px", minHeight: "100px" },
    doneBtn: { marginTop: "8px", float: "right" },
    card: { padding: "10px", display: "flex", flexDirection: "column" },
};

const InlineMathJax = function (props: InlinePluginProps) {
    const {
        offsetKey,
        contentState,
        entityKey,
        children,
        readOnly,
        onStartEdit,
        onEndEdit,
        onInlineUpdate,
    } = props;

    const getData = useCallback((): string => {
        return contentState.getEntity(entityKey).getData()["data"];
    }, [contentState, entityKey]);

    const inputElem = useRef<HTMLTextAreaElement>(null);
    const [editMode, setEditMode] = useState(false);
    const { nodeMathJax, hasError, value: texValue, onTexChange } = useEditMathjax(getData);
    const t = useTranslate();

    const onClick = useCallback(() => {
        if (editMode || readOnly) return;

        requestAnimationFrame(() => {
            inputElem.current?.focus();
        });

        setEditMode(true);
        onStartEdit(entityKey);
    }, [entityKey, editMode, inputElem, readOnly, onStartEdit]);

    const onDone = useCallback(() => {
        setEditMode(false);
        onInlineUpdate(entityKey, { data: texValue });
        onEndEdit(entityKey);
    }, [texValue, entityKey, onEndEdit, onInlineUpdate]);

    const onClickAway = useCallback(() => {
        if (hasError) return;

        setEditMode(false);
        onEndEdit(entityKey);
    }, [hasError, onEndEdit, entityKey]);

    return (
        <span data-offset-key={offsetKey}>
            <span ref={nodeMathJax} onClick={onClick}>
                {texValue}
            </span>
            <Popper
                sx={{ zIndex: 1500 }}
                modifiers={[{ name: "offset", options: { offset: [0, 10] } }]}
                open={editMode}
                anchorEl={nodeMathJax.current}
                placement="bottom-start"
                onClose={onClickAway}
            >
                <Card sx={sx.card} square>
                    <Box
                        component="textarea"
                        sx={sx.textArea}
                        ref={inputElem}
                        value={texValue}
                        onChange={onTexChange}
                    />
                    <div>
                        <ButtonBase
                            sx={sx.doneBtn}
                            disabled={hasError}
                            variant="contained"
                            color="primary"
                            onClick={onDone}
                        >
                            {t("ra.common.done")}
                        </ButtonBase>
                    </div>
                </Card>
            </Popper>
            {children}
        </span>
    );
};

export const decorator = (props: InlineDecoratorProps) => {
    return {
        props,
        component: InlineMathJax,
        strategy: inlineMathJaxStrategy,
    };
};

export default InlineMathJax;
