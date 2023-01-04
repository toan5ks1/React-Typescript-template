import { createElement } from "react";

import ControlButton from "./ControlButton";
import {
    BlockComponentType,
    BlockControlProps,
    CreateControlProps,
    InlineComponentType,
    InlineControlProps,
    OmitCreateProps,
} from "./control-types";

import useTranslate from "src/squads/syllabus/hooks/useTranslate";

export function createInlineToolbarButton({
    label,
    icon,
    controlValue,
}: CreateControlProps): InlineComponentType {
    return ({ editorState, onClick }: OmitCreateProps<InlineControlProps>) => {
        const t = useTranslate();
        const currentStyle = editorState.getCurrentInlineStyle();

        return (
            <ControlButton
                tooltip={t(label)}
                active={currentStyle.has(controlValue)}
                onClick={(e: any) => onClick(e, controlValue)}
            >
                {createElement(icon)}
            </ControlButton>
        );
    };
}

export function createBlockToolbarButton({
    label,
    controlValue,
    icon,
}: CreateControlProps): BlockComponentType {
    return ({ blockType, onClick }: OmitCreateProps<BlockControlProps>) => {
        const t = useTranslate();
        return (
            <ControlButton
                tooltip={t(label)}
                active={blockType === controlValue}
                onClick={(e: any) => onClick(e, controlValue)}
            >
                {createElement(icon)}
            </ControlButton>
        );
    };
}
