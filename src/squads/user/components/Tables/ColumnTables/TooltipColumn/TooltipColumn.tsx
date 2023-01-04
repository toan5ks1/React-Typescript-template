import { memo } from "react";

import TextColumn, { TextColumnProps } from "../TextColumn";

import useDisplayTooltip from "src/squads/user/hooks/useDisplayTooltip";

export interface TooltipColumnProps extends Omit<TextColumnProps, "title" | "sx" | "onMouseEnter"> {
    maxLines: number;
}

function TooltipColumn({ maxLines, content, ...rest }: TooltipColumnProps) {
    const { handleMouseEnter, shouldDisplayTooltip } = useDisplayTooltip();
    return (
        <TextColumn
            title={shouldDisplayTooltip && content ? content : ""}
            onMouseEnter={handleMouseEnter}
            content={content}
            sx={{
                display: "-webkit-box",
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
            }}
            {...rest}
        />
    );
}

export default memo(TooltipColumn);
