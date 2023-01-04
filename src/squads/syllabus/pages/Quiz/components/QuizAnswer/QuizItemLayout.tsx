import { PropsWithChildren, HtmlHTMLAttributes, ReactNode } from "react";

import { Box } from "@mui/material";
import DividerDashed from "src/components/Divider/DividerDashed";
import TypographyBase from "src/components/Typographys/TypographyBase";

interface QuizItemLayoutProps extends PropsWithChildren<HtmlHTMLAttributes<HTMLDivElement>> {
    primaryTitle?: ReactNode;
    secondaryTitle?: ReactNode;
    visibleDivider: boolean;
}

const QuizItemLayout = (props: QuizItemLayoutProps) => {
    const { primaryTitle, secondaryTitle, visibleDivider, children } = props;

    return (
        <div>
            {visibleDivider && <DividerDashed />}
            <div>
                <TypographyBase variant="h6">{primaryTitle}</TypographyBase>
                <Box mt={2} mb={1}>
                    <TypographyBase variant="subtitle2">{secondaryTitle}</TypographyBase>
                </Box>
                {children}
            </div>
        </div>
    );
};

export default QuizItemLayout;
