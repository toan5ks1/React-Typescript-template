import { ReactNode } from "react";

import { ContentBlock, ContentState } from "draft-js";

import { useTheme } from "@mui/material/styles";

export interface BlockLinkProps {
    contentState: ContentState;
    entityKey: string;
    children: ReactNode;
}

export function findLinkEntities(
    contentBlock: ContentBlock,
    callback: (start: number, end: number) => void,
    contentState: ContentState
) {
    contentBlock.findEntityRanges((character) => {
        const entityKey = character.getEntity();
        return entityKey !== null && contentState.getEntity(entityKey).getType() === "LINK";
    }, callback);
}

const BlockLink = ({ children, contentState, entityKey }: BlockLinkProps) => {
    const theme = useTheme();
    const { url } = contentState.getEntity(entityKey).getData();
    return (
        <a
            data-testid="BlockLink__root"
            href={url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => {
                e.stopPropagation();
            }}
            style={{ color: theme.palette.primary.main, textDecoration: "underline" }}
        >
            {children}
        </a>
    );
};
export const blockLinkDecorator = {
    strategy: findLinkEntities,
    component: BlockLink,
};

export default BlockLink;
