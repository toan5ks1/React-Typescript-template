import { ReactNode } from "react";

import { ContentState } from "draft-js";

import { Box } from "@mui/material";

import { CustomBlockTypes, findInlineStrategy } from "../wyswyg-utils";

const inlineBlankStrategy = findInlineStrategy(CustomBlockTypes.INLINE_BLANK);

export interface InlineBlankProps {
    offsetKey: string;
    children: ReactNode;
    contentState: ContentState;
    entityKey: string;
}

const blankContent = " ".repeat(12);
const InlineBlank = ({ offsetKey }: InlineBlankProps) => {
    return (
        <Box
            component="span"
            sx={{
                textDecoration: "underline",
            }}
            data-offset-key={offsetKey}
            data-testid="InlineBlank__root"
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
