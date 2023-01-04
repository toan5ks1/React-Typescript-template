import { Box } from "@mui/material";

import PaperRoundedBorders, { PaperRoundedBordersProps } from "../PaperRoundedBorders";

export interface PaperSectionWrapperProps extends PaperRoundedBordersProps {}

const PaperSectionWrapper = ({ children, ...rest }: PaperSectionWrapperProps) => {
    return (
        <PaperRoundedBorders {...rest}>
            <Box pt={3} pb={2} px={4}>
                {children}
            </Box>
        </PaperRoundedBorders>
    );
};

export default PaperSectionWrapper;
