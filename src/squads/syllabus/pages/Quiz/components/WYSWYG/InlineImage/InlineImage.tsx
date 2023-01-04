import { ReactNode } from "react";

import { ContentState } from "draft-js";

import { Box } from "@mui/material";

import { CustomBlockTypes, findInlineStrategy } from "../wyswyg-utils";

const inlineImageStrategy = findInlineStrategy(CustomBlockTypes.INLINE_IMAGE);

export interface InlineImageProps {
    offsetKey: string;
    children: ReactNode;
    contentState: ContentState;
    entityKey: string;
}

const InlineImage = function ({ offsetKey, contentState, entityKey, children }: InlineImageProps) {
    const { data } = contentState.getEntity(entityKey).getData();

    return (
        <span data-offset-key={offsetKey}>
            <Box component="img" sx={{ maxWidth: "100%" }} src={data} alt="wyswyg inlined upload" />
            {children}
        </span>
    );
};

export const decorator = {
    strategy: inlineImageStrategy,
    component: InlineImage,
};

export default InlineImage;
