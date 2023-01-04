import { ReactNode } from "react";

import { Box } from "@mui/material";
import TypographyBase from "src/components/Typographys/TypographyBase";

export type QuizSectionProps = {
    title: ReactNode;
    children: ReactNode;
};
const QuizSection = ({ title, children }: QuizSectionProps) => {
    return (
        <Box>
            <TypographyBase variant="h6" textTransform="capitalize" mb={2}>
                {title}
            </TypographyBase>
            {children}
        </Box>
    );
};

export default QuizSection;
