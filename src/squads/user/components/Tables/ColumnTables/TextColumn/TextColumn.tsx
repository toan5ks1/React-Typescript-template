import { memo } from "react";

import Skeleton from "@mui/material/Skeleton";
import DoubleDash from "src/squads/user/components/DoubleDash";

import BaseColumn, { BaseColumnProps } from "../BaseColumn";

export interface TextColumnProps extends Pick<BaseColumnProps, "sx" | "title" | "onMouseEnter"> {
    content?: string | null;
    isLoading?: boolean;
    dataTestIdLoading?: string;
    dataTestIdContent?: string;
}

function TextColumn({
    content,
    isLoading,
    dataTestIdLoading,
    dataTestIdContent,
    ...rest
}: TextColumnProps) {
    if (isLoading) return <Skeleton data-testid={dataTestIdLoading} />;
    if (!Boolean(content)) return <DoubleDash data-testid={dataTestIdContent} />;

    return <BaseColumn data-testid={dataTestIdContent} content={content} {...rest} />;
}

export default memo(TextColumn);
