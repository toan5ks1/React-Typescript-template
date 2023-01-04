import { PropsWithChildren } from "react";

import { ContentBlock, ContentState } from "draft-js";

import { useTheme } from "@mui/material/styles";

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

const BlockLink = (props: PropsWithChildren<{ contentState: ContentState; entityKey: string }>) => {
    const theme = useTheme();
    const { url } = props.contentState.getEntity(props.entityKey).getData();
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
            {props.children}
        </a>
    );
};
export const blockLinkDecorator = {
    strategy: findLinkEntities,
    component: BlockLink,
};

export default BlockLink;
