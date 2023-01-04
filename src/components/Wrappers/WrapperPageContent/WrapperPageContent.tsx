import { ReactNode } from "react";

import { Box, BoxProps } from "@mui/material";

type SizeVariant = "with-navigation-page" | "medium" | "dialog-page";
export interface WrapperPageContentProps {
    children: ReactNode;
    variant?: SizeVariant;
    "data-testid"?: string;
}

// The design team wants this
const contentMaxWidthWithNavigationPage = "1600px"; // This is for pages that the navigation's menu exists (List/Details)
const contentMaxWidthDialogPage = "1200px"; // This is for the fullscreen dialogs (Edit/Add)

const sizeOfVariants: {
    [key in SizeVariant]: BoxProps["maxWidth"];
} = {
    // https://manabie.atlassian.net/browse/LT-7152?focusedCommentId=46652
    medium: "792px",
    "with-navigation-page": contentMaxWidthWithNavigationPage,
    "dialog-page": contentMaxWidthDialogPage,
};

const WrapperPageContent = (props: WrapperPageContentProps) => {
    const { children, variant = "with-navigation-page", ...rest } = props;

    return (
        <Box m="0 auto" width="100%" maxWidth={sizeOfVariants[variant]} {...rest}>
            {children}
        </Box>
    );
};

export default WrapperPageContent;
