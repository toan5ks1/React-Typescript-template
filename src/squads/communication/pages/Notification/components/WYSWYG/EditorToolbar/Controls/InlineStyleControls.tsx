import { SyntheticEvent, useCallback } from "react";

import { RichUtils } from "draft-js";

import InlineBold from "./InlineBold";
import InlineItalic from "./InlineItalic";
import InlineUnderline from "./InlineUnderline";
import { InlineComponentType, InlineControlGroupProps } from "./control-types";

const DEFAULT_INLINE_CONTROLS: InlineComponentType[] = [InlineBold, InlineItalic, InlineUnderline];

const InlineStyleControls = (props: InlineControlGroupProps) => {
    const { editorState, onChange, manualControl } = props;

    const toggleInlineStyle = useCallback(
        (_e: SyntheticEvent, inlineStyle: string) => {
            onChange(RichUtils.toggleInlineStyle(editorState, inlineStyle));
        },
        [editorState, onChange]
    );

    return (
        <>
            {(manualControl || DEFAULT_INLINE_CONTROLS).map((Control, index: number) => {
                return (
                    <Control
                        key={index}
                        editorState={editorState}
                        onClick={toggleInlineStyle}
                        onChange={onChange}
                    />
                );
            })}
        </>
    );
};

export default InlineStyleControls;
