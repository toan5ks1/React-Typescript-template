import { PAGE_TITLE_CHAR_LIMIT } from "src/common/constants/other";

import { Box } from "@mui/material";

import TypographyShortenStr from "../TypographyShortenStr";

export interface TypographyPageTitleProps {
    title: string;
    disablePadding?: boolean;
    "data-testid"?: string;
}

const TypographyPageTitle = (props: TypographyPageTitleProps) => {
    const { title, disablePadding } = props;
    return (
        <Box pb={disablePadding ? 0 : 3}>
            <TypographyShortenStr
                variant="h6"
                maxLength={PAGE_TITLE_CHAR_LIMIT}
                aria-label="title"
                data-testid={props["data-testid"]}
            >
                {title}
            </TypographyShortenStr>
        </Box>
    );
};

export default TypographyPageTitle;
