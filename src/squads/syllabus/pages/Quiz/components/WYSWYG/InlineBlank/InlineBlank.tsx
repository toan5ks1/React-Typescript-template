import { ReactNode } from "react";

import { ContentState } from "draft-js";

import { Box } from "@mui/material";

import { CustomBlockTypes, findInlineStrategy } from "../wyswyg-utils";

const inlineBlankStrategy = findInlineStrategy(CustomBlockTypes.INLINE_BLANK);

export interface InlineImageProps {
    offsetKey: string;
    children: ReactNode;
    contentState: ContentState;
    entityKey: string;
}

const blankContent = " ".repeat(12);
const InlineBlank = ({ offsetKey }: InlineImageProps) => {
    return (
        <Box
            component="span"
            sx={{
                textDecoration: "underline",
                // borderBottom: `1px solid ${theme.palette.common.black}`,
            }}
            data-offset-key={offsetKey}
        >
            {blankContent}
        </Box>
    );
};

export const decorator = {
    strategy: inlineBlankStrategy,
    component: InlineBlank,
    props: {
        readOnly: true,
    },
};

export default InlineBlank;
