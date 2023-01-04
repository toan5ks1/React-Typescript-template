import { createElement } from "react";

import { ERPModules } from "src/common/constants/enum";

import ControlButton from "./ControlButton";
import {
    BlockControlProps,
    CreateControlProps,
    InlineComponentType,
    InlineControlProps,
    OmitCreateProps,
} from "./control-types";

import useResourceTranslate from "src/squads/communication/hooks/useResourceTranslate";

export function createInlineToolbarButton({
    label,
    icon,
    controlValue,
}: CreateControlProps): InlineComponentType {
    return ({ editorState, onClick }: OmitCreateProps<InlineControlProps>) => {
        const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
        const currentStyle = editorState.getCurrentInlineStyle();

        return (
            <ControlButton
                tooltip={tNotification(label)}
                active={currentStyle.has(controlValue)}
                onClick={(e: any) => onClick(e, controlValue)}
            >
                {createElement(icon)}
            </ControlButton>
        );
    };
}

export function createBlockToolbarButton({ label, controlValue, icon }: CreateControlProps) {
    return ({ blockType, onClick }: OmitCreateProps<BlockControlProps>) => {
        const tNotification = useResourceTranslate(ERPModules.NOTIFICATIONS);
        return (
            <ControlButton
                tooltip={tNotification(label)}
                active={blockType === controlValue}
                onClick={(e: any) => onClick(e, controlValue)}
            >
                {createElement(icon)}
            </ControlButton>
        );
    };
}
