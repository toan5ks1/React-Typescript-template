/**
 * WrapperVerticalFooter
 * component contains footer action, use to wrap form which can add more field set block
 * example: see src/squads/syllabus/pages/Flashcard/components/FlashcardUpsertDialog/FlashcardUpsertDialog.tsx
 */
import Box, { BoxProps } from "@mui/material/Box";
import DividerDashed from "src/components/Divider/DividerDashed";

interface WrapperVerticalFooterProps extends BoxProps {
    footer: React.ReactNode;
}

const WrapperVerticalFooter = (props: WrapperVerticalFooterProps) => {
    const { children, footer } = props;
    return (
        <Box px={4} py={3}>
            {children}
            <Box pt={3} pb={2}>
                <DividerDashed />
            </Box>
            <Box display="flex" justifyContent="center">
                {footer}
            </Box>
        </Box>
    );
};

export default WrapperVerticalFooter;
